/**
 * Authentication utilities for API routes
 */

import jwt from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"

// SECURITY: JWT_SECRET must be set in the deployment environment. Checked
// lazily at sign/verify time rather than at module load, because Next
// evaluates route modules during build (when secrets are absent).
function requireSecret(): string {
  const s = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET || ""
  if (!s)
    throw new Error("JWT_SECRET environment variable is required but not set")
  return s
}

export interface JWTPayload {
  uid: string
  email: string
  role: string
  iat?: number
  exp?: number
}

/**
 * NextAuth configuration (placeholder for compatibility)
 * Note: This project uses custom JWT authentication, not NextAuth
 * This export is provided for backward compatibility with existing code
 */

/**
 * Verify a raw JWT token string (not from a request)
 * Used for verifying tokens stored in cookies or passed directly
 */
export function verifyRawToken(token: string): JWTPayload | null {
  if (!token) return null

  try {
    const decoded = jwt.verify(token, requireSecret()) as JWTPayload
    return decoded
  } catch {
    return null
  }
}

/**
 * Generate JWT token
 */
export function generateToken(
  payload: Omit<JWTPayload, "iat" | "exp">
): string {
  return jwt.sign(payload, requireSecret(), { expiresIn: "24h" })
}

/**
 * Check if user has admin role
 */
export function isAdmin(user: JWTPayload | null): boolean {
  if (!user) return false
  return user.role === "admin" || user.role === "super_admin"
}

/**
 * Middleware helper to require authentication
 */
export function requireAuth(
  request: NextRequest
): { user: JWTPayload } | { error: NextResponse } {
  const token = request.cookies.get("auth_token")?.value
  const user = token ? verifyRawToken(token) : null
  if (!user) {
    return {
      error: NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      ),
    }
  }
  return { user }
}

/**
 * Middleware helper to require admin role
 */
export function requireAdmin(
  request: NextRequest
): { user: JWTPayload } | { error: NextResponse } {
  const authResult = requireAuth(request)
  if ("error" in authResult) return authResult

  if (!isAdmin(authResult.user)) {
    return {
      error: NextResponse.json(
        { success: false, message: "Forbidden: Admin access required" },
        { status: 403 }
      ),
    }
  }
  return authResult
}
