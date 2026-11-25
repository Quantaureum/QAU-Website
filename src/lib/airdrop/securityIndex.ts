/**
 * Quantaureum production-grade security module.
 *
 * Provides comprehensive security features:
 * - input validation and sanitization
 * - CSRF protection
 * - rate limiting
 * - crypto utilities
 * - security logging
 */
import crypto from "crypto"

import { trustedClientIp } from "@/lib/security/clientIp"

/** Minimal shape of the optional 'redis' client (dynamic require). */
interface RedisLike {
  connect: () => Promise<void>
  set: (
    key: string,
    value: string,
    opts?: Record<string, unknown>
  ) => Promise<unknown>
  get: (key: string) => Promise<string | null>
  del: (key: string) => Promise<unknown>
}

import { shouldUseSecureCookie } from "./cookieSecurity"

// ==================== Configuration ====================

export const SecurityConfig = {
  // Rate-limit configuration
  rateLimit: {
    windowMs: 60 * 1000, // 1-minute window
    maxRequests: 100, // max requests per window
    blockDuration: 15 * 60 * 1000, // 15-minute block
  },

  // CSRF configuration
  csrf: {
    tokenLength: 32,
    cookieName: "_csrf",
    headerName: "x-csrf-token",
  },

  // Session configuration
  session: {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    secure: shouldUseSecureCookie(),
    httpOnly: true,
    sameSite: "strict" as const,
  },

  // Password policy
  password: {
    minLength: 12,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecial: true,
    maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days
  },
}

// ==================== Input validation ====================

export class InputValidator {
  // Validate an Ethereum address
  static isValidAddress(address: string): boolean {
    return /^0x[a-fA-F0-9]{40}$/.test(address)
  }

  // Validate a transaction hash
  static isValidTxHash(hash: string): boolean {
    return /^0x[a-fA-F0-9]{64}$/.test(hash)
  }

  // Validate an email address
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email) && email.length <= 254
  }

  // Validate password strength
  static isStrongPassword(password: string): {
    valid: boolean
    errors: string[]
  } {
    const errors: string[] = []
    const {
      minLength,
      requireUppercase,
      requireLowercase,
      requireNumbers,
      requireSpecial,
    } = SecurityConfig.password

    if (password.length < minLength)
      errors.push(`Password must be at least ${minLength} characters`)
    if (requireUppercase && !/[A-Z]/.test(password))
      errors.push("Password must contain an uppercase letter")
    if (requireLowercase && !/[a-z]/.test(password))
      errors.push("Password must contain a lowercase letter")
    if (requireNumbers && !/\d/.test(password))
      errors.push("Password must contain a number")
    if (requireSpecial && !/[!@#$%^&*(),.?":{}|<>]/.test(password))
      errors.push("Password must contain a special character")

    return { valid: errors.length === 0, errors }
  }

  // Sanitize HTML to prevent XSS
  static sanitizeHtml(input: string): string {
    return input
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;")
  }

  // Validate a numeric range
  static isValidNumber(value: number, min: number, max: number): boolean {
    return !isNaN(value) && isFinite(value) && value >= min && value <= max
  }

  // Validate a URL
  static isValidUrl(url: string): boolean {
    try {
      const parsed = new URL(url)
      return ["http:", "https:"].includes(parsed.protocol)
    } catch {
      return false
    }
  }
}

// ==================== Rate limiting ====================

interface RateLimitEntry {
  count: number
  firstRequest: number
  blocked: boolean
  blockedUntil?: number
}

interface RateLimitStore {
  get(key: string): RateLimitEntry | undefined
  set(key: string, value: RateLimitEntry): void
  delete(key: string): void
  entries(): IterableIterator<[string, RateLimitEntry]>
  size: number
  keys(): IterableIterator<string>
}

class InMemoryRateLimitStore implements RateLimitStore {
  private store = new Map<string, RateLimitEntry>()

  get(key: string) {
    return this.store.get(key)
  }
  set(key: string, value: RateLimitEntry) {
    this.store.set(key, value)
  }
  delete(key: string) {
    this.store.delete(key)
  }
  entries() {
    return this.store.entries()
  }
  get size() {
    return this.store.size
  }
  keys() {
    return this.store.keys()
  }
}

class RedisRateLimitStore implements RateLimitStore {
  private redis: RedisLike | null = null
  private localCache = new Map<string, RateLimitEntry>()

  constructor(redisUrl?: string) {
    if (redisUrl || process.env.REDIS_URL) {
      this.initRedis(redisUrl).catch(() => {
        this.redis = null
      })
    }
  }

  private async initRedis(redisUrl?: string) {
    try {
      // Dynamically load the optional 'redis' dependency: wrap the require
      // in eval so webpack cannot statically resolve it; when redis is not
      // installed, fall back to in-memory rate limiting (original behavior).
      const requireFn: (id: string) => {
        createClient: (opts: { url?: string }) => RedisLike
      } =
        /* eslint-disable-next-line no-eval */
        eval('typeof require === "function" ? require : null')
      if (!requireFn) throw new Error("require unavailable")
      const { createClient } = requireFn("redis")
      this.redis = createClient({ url: redisUrl || process.env.REDIS_URL })
      await this.redis.connect().catch(() => {
        console.warn(
          "Redis connection failed, falling back to in-memory rate limiting"
        )
        this.redis = null
      })
    } catch {
      console.warn(
        "Redis module not available, falling back to in-memory rate limiting"
      )
      this.redis = null
    }
  }

  private async syncToRedis(key: string, value: RateLimitEntry): Promise<void> {
    if (!this.redis) return
    try {
      await this.redis.set(`ratelimit:${key}`, JSON.stringify(value), {
        PX: 3600000,
      })
    } catch {
      // Redis sync failure is non-fatal: the in-memory map stays authoritative.
    }
  }

  private async syncFromRedis(
    key: string
  ): Promise<RateLimitEntry | undefined> {
    if (!this.redis) return undefined
    try {
      const data = await this.redis.get(`ratelimit:${key}`)
      return data ? JSON.parse(data) : undefined
    } catch {
      return undefined
    }
  }

  get(key: string): RateLimitEntry | undefined {
    return this.localCache.get(key)
  }

  async set(key: string, value: RateLimitEntry): Promise<void> {
    this.localCache.set(key, value)
    await this.syncToRedis(key, value)
  }

  delete(key: string): void {
    this.localCache.delete(key)
    if (this.redis) {
      this.redis.del(`ratelimit:${key}`).catch(() => {})
    }
  }

  entries(): IterableIterator<[string, RateLimitEntry]> {
    return this.localCache.entries()
  }

  get size(): number {
    return this.localCache.size
  }

  keys(): IterableIterator<string> {
    return this.localCache.keys()
  }
}

function createRateLimitStore(): RateLimitStore {
  if (process.env.REDIS_URL) {
    return new RedisRateLimitStore()
  }
  return new InMemoryRateLimitStore()
}

const rateLimitStore = createRateLimitStore()

const MAX_STORE_ENTRIES = 10000

export class RateLimiter {
  static check(identifier: string): { allowed: boolean; retryAfter?: number } {
    const now = Date.now()
    const { windowMs, maxRequests, blockDuration } = SecurityConfig.rateLimit

    if (rateLimitStore.size > MAX_STORE_ENTRIES) {
      const oldestKey = rateLimitStore.keys().next().value
      if (oldestKey) {
        rateLimitStore.delete(oldestKey)
      }
    }

    let entry = rateLimitStore.get(identifier)

    if (entry?.blocked && entry.blockedUntil && entry.blockedUntil > now) {
      return {
        allowed: false,
        retryAfter: Math.ceil((entry.blockedUntil - now) / 1000),
      }
    }

    if (!entry || now - entry.firstRequest > windowMs) {
      entry = { count: 0, firstRequest: now, blocked: false }
    }

    entry.count++

    if (entry.count > maxRequests) {
      entry.blocked = true
      entry.blockedUntil = now + blockDuration
      rateLimitStore.set(identifier, entry)
      return { allowed: false, retryAfter: Math.ceil(blockDuration / 1000) }
    }

    rateLimitStore.set(identifier, entry)
    return { allowed: true }
  }

  static reset(identifier: string): void {
    rateLimitStore.delete(identifier)
  }

  static cleanup(): void {
    const now = Date.now()
    const { windowMs } = SecurityConfig.rateLimit

    for (const [key, entry] of rateLimitStore.entries()) {
      if (now - entry.firstRequest > windowMs && !entry.blocked) {
        rateLimitStore.delete(key)
      }
      if (entry.blockedUntil && entry.blockedUntil < now) {
        rateLimitStore.delete(key)
      }
    }
  }
}

// Periodic cleanup
if (typeof setInterval !== "undefined") {
  setInterval(() => RateLimiter.cleanup(), 60000)
}

// ==================== CSRF protection ====================

export class CSRFProtection {
  static generateToken(): string {
    return crypto.randomBytes(SecurityConfig.csrf.tokenLength).toString("hex")
  }

  static validateToken(token: string, storedToken: string): boolean {
    if (!token || !storedToken) return false
    // Timing-safe comparison to prevent timing attacks
    return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(storedToken))
  }
}

// ==================== Crypto utilities ====================

export class CryptoUtils {
  private static readonly ALGORITHM = "aes-256-gcm"
  private static readonly IV_LENGTH = 16
  private static readonly AUTH_TAG_LENGTH = 16

  // Q-009 fix: Use per-encryption random salt instead of hardcoded 'salt'
  // A hardcoded salt defeats the purpose of key derivation — same password always
  // produces the same key, enabling precomputation attacks (rainbow tables).

  // Encrypt data
  static encrypt(data: string, key: string): string {
    const iv = crypto.randomBytes(this.IV_LENGTH)
    const salt = crypto.randomBytes(16) // Q-009 fix: random salt per encryption
    const keyBuffer = crypto.scryptSync(key, salt, 32)
    const cipher = crypto.createCipheriv(this.ALGORITHM, keyBuffer, iv)

    let encrypted = cipher.update(data, "utf8", "hex")
    encrypted += cipher.final("hex")

    const authTag = cipher.getAuthTag()

    return (
      salt.toString("hex") +
      ":" +
      iv.toString("hex") +
      ":" +
      authTag.toString("hex") +
      ":" +
      encrypted
    )
  }

  // Decrypt data
  static decrypt(encryptedData: string, key: string): string {
    const parts = encryptedData.split(":")
    if (parts.length !== 4) throw new Error("Invalid encrypted data format")

    const salt = Buffer.from(parts[0], "hex") // Q-009 fix: extract random salt
    const iv = Buffer.from(parts[1], "hex")
    const authTag = Buffer.from(parts[2], "hex")
    const encrypted = parts[3]

    const keyBuffer = crypto.scryptSync(key, salt, 32)
    const decipher = crypto.createDecipheriv(this.ALGORITHM, keyBuffer, iv)
    decipher.setAuthTag(authTag)

    let decrypted = decipher.update(encrypted, "hex", "utf8")
    decrypted += decipher.final("utf8")

    return decrypted
  }

  // Hash a password
  static async hashPassword(password: string): Promise<string> {
    const salt = crypto.randomBytes(16).toString("hex")
    return new Promise((resolve, reject) => {
      crypto.scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) reject(err)
        resolve(salt + ":" + derivedKey.toString("hex"))
      })
    })
  }

  // Verify a password
  static async verifyPassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    const [salt, key] = hash.split(":")
    return new Promise((resolve, reject) => {
      crypto.scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) reject(err)
        resolve(crypto.timingSafeEqual(Buffer.from(key, "hex"), derivedKey))
      })
    })
  }

  // Generate a secure random token
  static generateSecureToken(length: number = 32): string {
    return crypto.randomBytes(length).toString("hex")
  }
}

// ==================== Security logging ====================

export enum SecurityEventType {
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAILED = "LOGIN_FAILED",
  LOGOUT = "LOGOUT",
  PASSWORD_CHANGE = "PASSWORD_CHANGE",
  PASSWORD_RESET_REQUEST = "PASSWORD_RESET_REQUEST",
  PASSWORD_RESET_SUCCESS = "PASSWORD_RESET_SUCCESS",
  PASSWORD_RESET_FAILED = "PASSWORD_RESET_FAILED",
  RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED",
  CSRF_VIOLATION = "CSRF_VIOLATION",
  INVALID_INPUT = "INVALID_INPUT",
  UNAUTHORIZED_ACCESS = "UNAUTHORIZED_ACCESS",
  SUSPICIOUS_ACTIVITY = "SUSPICIOUS_ACTIVITY",
  TRANSACTION_INITIATED = "TRANSACTION_INITIATED",
  TRANSACTION_COMPLETED = "TRANSACTION_COMPLETED",
  TRANSACTION_FAILED = "TRANSACTION_FAILED",
  // 2FA events
  TWO_FACTOR_SETUP = "TWO_FACTOR_SETUP",
  TWO_FACTOR_ENABLED = "TWO_FACTOR_ENABLED",
  TWO_FACTOR_DISABLED = "TWO_FACTOR_DISABLED",
  TWO_FACTOR_SUCCESS = "TWO_FACTOR_SUCCESS",
  TWO_FACTOR_FAILED = "TWO_FACTOR_FAILED",
  // KYC events
  KYC_SUBMITTED = "KYC_SUBMITTED",
  KYC_APPROVED = "KYC_APPROVED",
  KYC_REJECTED = "KYC_REJECTED",
  // Payment events
  PAYMENT_INITIATED = "PAYMENT_INITIATED",
  PAYMENT_VERIFIED = "PAYMENT_VERIFIED",
  PAYMENT_FAILED = "PAYMENT_FAILED",
  // Whitelist events
  WHITELIST_APPLICATION = "WHITELIST_APPLICATION",
  WHITELIST_APPROVED = "WHITELIST_APPROVED",
  WHITELIST_REJECTED = "WHITELIST_REJECTED",
  // Referral events
  REFERRAL_CODE_CREATED = "REFERRAL_CODE_CREATED",
  REFERRAL_REWARD_EARNED = "REFERRAL_REWARD_EARNED",
  REFERRAL_REWARD_PAID = "REFERRAL_REWARD_PAID",
}

interface SecurityLogEntry {
  timestamp: string
  eventType: SecurityEventType
  userId?: string
  ip?: string
  userAgent?: string
  details?: Record<string, unknown>
  severity: "info" | "warning" | "error" | "critical"
}

export class SecurityLogger {
  private static logs: SecurityLogEntry[] = []
  private static readonly MAX_LOGS = 10000

  static log(
    eventType: SecurityEventType,
    severity: SecurityLogEntry["severity"],
    details?: Record<string, unknown>,
    userId?: string,
    ip?: string,
    userAgent?: string
  ): void {
    const entry: SecurityLogEntry = {
      timestamp: new Date().toISOString(),
      eventType,
      severity,
      details: this.sanitizeDetails(details),
      userId,
      ip: this.maskIP(ip),
      userAgent,
    }

    this.logs.push(entry)

    // Keep the log size within the limit
    if (this.logs.length > this.MAX_LOGS) {
      this.logs = this.logs.slice(-this.MAX_LOGS)
    }

    // In production this should be shipped to a log service
    if (severity === "critical" || severity === "error") {
      console.error("[SECURITY]", JSON.stringify(entry))
    } else if (process.env.NODE_ENV !== "production") {
      console.log("[SECURITY]", JSON.stringify(entry))
    }
  }

  // Redact sensitive information
  private static sanitizeDetails(
    details?: Record<string, unknown>
  ): Record<string, unknown> | undefined {
    if (!details) return undefined

    const sensitiveKeys = [
      "password",
      "privateKey",
      "secret",
      "token",
      "apiKey",
    ]
    const sanitized = { ...details }

    for (const key of Object.keys(sanitized)) {
      if (sensitiveKeys.some((sk) => key.toLowerCase().includes(sk))) {
        sanitized[key] = "[REDACTED]"
      }
    }

    return sanitized
  }

  // Partially mask an IP address
  private static maskIP(ip?: string): string | undefined {
    if (!ip) return undefined
    const parts = ip.split(".")
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.xxx.xxx`
    }
    return ip.substring(0, ip.length / 2) + "..."
  }

  static getRecentLogs(count: number = 100): SecurityLogEntry[] {
    return this.logs.slice(-count)
  }

  static getLogsByType(eventType: SecurityEventType): SecurityLogEntry[] {
    return this.logs.filter((log) => log.eventType === eventType)
  }
}

// ==================== Security middleware helpers ====================

export function getClientIP(request: Request): string {
  // Delegates to the shared trusted derivation: only the proxy-appended
  // tail of X-Forwarded-For (or a proxy-owned x-real-ip) is usable — the
  // leftmost XFF entry is client-supplied and spoofable.
  return trustedClientIp(request.headers)
}

export function getUserAgent(request: Request): string {
  return request.headers.get("user-agent") || "unknown"
}

// ==================== Exports ====================

export default {
  SecurityConfig,
  InputValidator,
  RateLimiter,
  CSRFProtection,
  CryptoUtils,
  SecurityLogger,
  SecurityEventType,
  getClientIP,
  getUserAgent,
}
