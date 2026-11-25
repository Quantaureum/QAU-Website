/**
 * Production-grade API security middleware.
 *
 * Provides:
 * - rate limiting
 * - CSRF verification
 * - input validation
 * - security response headers
 * - request logging
 */

// AUDIT FIX (2026-09-08): the code previously called timingSafeEqual on the
// Web Crypto global object, which has no such method — the CSRF comparison
// never actually ran (reaching that branch always threw).
import { timingSafeEqual } from "crypto"

import { NextRequest, NextResponse } from "next/server"

import {
  getClientIP,
  getUserAgent,
  InputValidator,
  RateLimiter,
  SecurityEventType,
  SecurityLogger,
} from "./securityIndex"

// ==================== Security response headers ====================

export function addSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("X-XSS-Protection", "1; mode=block")

  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    )
  }

  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=()"
  )

  return response
}

// ==================== Rate-limit middleware ====================

export async function withRateLimit(
  request: NextRequest,
  handler: () => Promise<NextResponse>
): Promise<NextResponse> {
  const ip = getClientIP(request)
  const path = new URL(request.url).pathname
  const identifier = `${ip}:${path}`

  const result = RateLimiter.check(identifier)

  if (!result.allowed) {
    SecurityLogger.log(
      SecurityEventType.RATE_LIMIT_EXCEEDED,
      "warning",
      { path, retryAfter: result.retryAfter },
      undefined,
      ip,
      getUserAgent(request)
    )

    const response = NextResponse.json(
      {
        error: "Too many requests, please try again later",
        retryAfter: result.retryAfter,
      },
      { status: 429 }
    )
    response.headers.set("Retry-After", String(result.retryAfter))
    return addSecurityHeaders(response)
  }

  return handler()
}

// ==================== Input-validation middleware ====================

export interface ValidationRule {
  field: string
  type: "string" | "number" | "boolean" | "address" | "email" | "txHash" | "url"
  required?: boolean
  min?: number
  max?: number
  pattern?: RegExp
  custom?: (value: unknown) => boolean
}

export function validateInput(
  data: Record<string, unknown>,
  rules: ValidationRule[]
): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  for (const rule of rules) {
    const value = data[rule.field]

    // Required-field check
    if (
      rule.required &&
      (value === undefined || value === null || value === "")
    ) {
      errors.push(`${rule.field} is required`)
      continue
    }

    if (value === undefined || value === null) continue

    // Type validation
    switch (rule.type) {
      case "string":
        if (typeof value !== "string") {
          errors.push(`${rule.field} must be a string`)
        } else {
          if (rule.min && value.length < rule.min) {
            errors.push(`${rule.field} must be at least ${rule.min} characters`)
          }
          if (rule.max && value.length > rule.max) {
            errors.push(`${rule.field} must not exceed ${rule.max} characters`)
          }
          if (rule.pattern && !rule.pattern.test(value)) {
            errors.push(`${rule.field} has an invalid format`)
          }
        }
        break

      case "number": {
        const num = Number(value)
        if (isNaN(num)) {
          errors.push(`${rule.field} must be a number`)
        } else {
          if (rule.min !== undefined && num < rule.min) {
            errors.push(`${rule.field} must not be less than ${rule.min}`)
          }
          if (rule.max !== undefined && num > rule.max) {
            errors.push(`${rule.field} must not be greater than ${rule.max}`)
          }
        }
        break
      }
      case "boolean":
        if (typeof value !== "boolean") {
          errors.push(`${rule.field} must be a boolean`)
        }
        break

      case "address":
        if (
          typeof value !== "string" ||
          !InputValidator.isValidAddress(value)
        ) {
          errors.push(`${rule.field} is not a valid wallet address`)
        }
        break

      case "email":
        if (typeof value !== "string" || !InputValidator.isValidEmail(value)) {
          errors.push(`${rule.field} is not a valid email address`)
        }
        break

      case "txHash":
        if (typeof value !== "string" || !InputValidator.isValidTxHash(value)) {
          errors.push(`${rule.field} is not a valid transaction hash`)
        }
        break

      case "url":
        if (typeof value !== "string" || !InputValidator.isValidUrl(value)) {
          errors.push(`${rule.field} is not a valid URL`)
        }
        break
    }

    // Custom validation
    if (rule.custom && !rule.custom(value)) {
      errors.push(`${rule.field} validation failed`)
    }
  }

  return { valid: errors.length === 0, errors }
}

// ==================== Secure API handler wrapper ====================

export interface SecureHandlerOptions {
  rateLimit?: boolean
  validateBody?: ValidationRule[]
  requireAuth?: boolean
  allowedMethods?: string[]
  logRequest?: boolean
  skipCSRF?: boolean // some endpoints (e.g. webhooks) may skip CSRF verification
}

export function createSecureHandler(
  handler: (
    request: NextRequest,
    validatedData?: Record<string, unknown>
  ) => Promise<NextResponse>,
  options: SecureHandlerOptions = {}
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const ip = getClientIP(request)
    const userAgent = getUserAgent(request)
    const path = new URL(request.url).pathname

    try {
      // Allowed-methods check
      if (
        options.allowedMethods &&
        !options.allowedMethods.includes(request.method)
      ) {
        return addSecurityHeaders(
          NextResponse.json({ error: "Method not allowed" }, { status: 405 })
        )
      }

      // Rate limiting
      if (options.rateLimit !== false) {
        const identifier = `${ip}:${path}`
        const rateLimitResult = RateLimiter.check(identifier)

        if (!rateLimitResult.allowed) {
          SecurityLogger.log(
            SecurityEventType.RATE_LIMIT_EXCEEDED,
            "warning",
            { path },
            undefined,
            ip,
            userAgent
          )

          const response = NextResponse.json(
            {
              error: "Too many requests",
              retryAfter: rateLimitResult.retryAfter,
            },
            { status: 429 }
          )
          response.headers.set(
            "Retry-After",
            String(rateLimitResult.retryAfter)
          )
          return addSecurityHeaders(response)
        }
      }

      // CSRF protection - verify the CSRF token on every state-changing
      // operation
      // audit-fix CRITICAL-1: enable CSRF verification to prevent cross-site
      // request forgery attacks
      if (
        !options.skipCSRF &&
        ["POST", "PUT", "PATCH", "DELETE"].includes(request.method)
      ) {
        const csrfTokenFromHeader = request.headers.get("x-csrf-token")
        const csrfTokenFromCookie = request.cookies.get("_csrf")?.value

        // Safe comparison: timingSafeEqual to prevent timing attacks
        if (!csrfTokenFromHeader || !csrfTokenFromCookie) {
          SecurityLogger.log(
            SecurityEventType.CSRF_VIOLATION,
            "warning",
            { path, reason: "missing_token", ip },
            undefined,
            ip,
            userAgent
          )
          return addSecurityHeaders(
            NextResponse.json(
              { error: "CSRF token missing", code: "CSRF_VIOLATION" },
              { status: 403 }
            )
          )
        }

        // Verify the tokens match (timing-attack safe)
        const headerBuffer = Buffer.from(csrfTokenFromHeader)
        const cookieBuffer = Buffer.from(csrfTokenFromCookie)

        if (headerBuffer.length !== cookieBuffer.length) {
          SecurityLogger.log(
            SecurityEventType.CSRF_VIOLATION,
            "warning",
            { path, reason: "token_mismatch", ip },
            undefined,
            ip,
            userAgent
          )
          return addSecurityHeaders(
            NextResponse.json(
              { error: "CSRF token invalid", code: "CSRF_VIOLATION" },
              { status: 403 }
            )
          )
        }

        if (!timingSafeEqual(headerBuffer, cookieBuffer)) {
          SecurityLogger.log(
            SecurityEventType.CSRF_VIOLATION,
            "warning",
            { path, reason: "token_mismatch", ip },
            undefined,
            ip,
            userAgent
          )
          return addSecurityHeaders(
            NextResponse.json(
              { error: "CSRF token invalid", code: "CSRF_VIOLATION" },
              { status: 403 }
            )
          )
        }
      }

      // Request-body validation
      let validatedData: Record<string, unknown> | undefined = undefined
      if (
        options.validateBody &&
        ["POST", "PUT", "PATCH"].includes(request.method)
      ) {
        try {
          const body = await request.json()
          const validation = validateInput(body, options.validateBody)

          if (!validation.valid) {
            SecurityLogger.log(
              SecurityEventType.INVALID_INPUT,
              "warning",
              { errors: validation.errors, path },
              undefined,
              ip,
              userAgent
            )

            return addSecurityHeaders(
              NextResponse.json(
                {
                  error: "Input validation failed",
                  details: validation.errors,
                },
                { status: 400 }
              )
            )
          }

          validatedData = body
        } catch {
          return addSecurityHeaders(
            NextResponse.json(
              { error: "Invalid request body" },
              { status: 400 }
            )
          )
        }
      }

      // Log the request
      if (options.logRequest) {
        SecurityLogger.log(
          SecurityEventType.TRANSACTION_INITIATED,
          "info",
          { path, method: request.method },
          undefined,
          ip,
          userAgent
        )
      }

      // Run the handler
      const response = await handler(request, validatedData)
      return addSecurityHeaders(response)
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error"
      SecurityLogger.log(
        SecurityEventType.SUSPICIOUS_ACTIVITY,
        "error",
        { error: message, path },
        undefined,
        ip,
        userAgent
      )

      return addSecurityHeaders(
        NextResponse.json({ error: "Internal server error" }, { status: 500 })
      )
    }
  }
}

// ==================== Error-response helpers ====================

export function errorResponse(
  message: string,
  status: number = 400
): NextResponse {
  return addSecurityHeaders(
    NextResponse.json({ message, error: message, success: false }, { status })
  )
}

export function successResponse(
  data: Record<string, unknown>,
  status: number = 200
): NextResponse {
  return addSecurityHeaders(
    NextResponse.json({ ...data, success: true }, { status })
  )
}

// ==================== Exports ====================

export default {
  addSecurityHeaders,
  withRateLimit,
  validateInput,
  createSecureHandler,
  errorResponse,
  successResponse,
}
