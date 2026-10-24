/**
 * Authentication utilities for API routes
 */

import jwt from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"

const JWT_SECRET = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET || ""

// SECURITY: Fail at startup if JWT_SECRET is not configured
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required but not set")
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
    const decoded = jwt.verify(token, JWT_SECRET!) as JWTPayload
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
  // JWT_SECRET is guaranteed to be defined here because the module throws at startup if it's not set
  return jwt.sign(payload, JWT_SECRET!, { expiresIn: "24h" })
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
