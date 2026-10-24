/**
 * Cookie 安全属性（统一出口）
 *
 * LOCALHOST FIX (2026-09-09): 原先所有 auth cookie 用
 * `secure: process.env.NODE_ENV === 'production'`，生产构建下即使是
 * http://localhost 也打上 Secure 标志——浏览器会拒绝经 HTTP 发送该
 * cookie，导致本地生产模式登录态完全失效（登录成功但 API 全部 401）。
 *
 * 规则：仅当请求明确来自非 localhost 来源时才加 Secure。
 * - 线上 HTTPS 部署：宿主非 localhost → secure: true（不变）
 * - 本地 next start：localhost → secure: false（本次修复目标）
 * - 注意不要用请求 Host 判断（可伪造），这里用部署环境变量与
 *   NODE_ENV 组合判断，见 shouldUseSecureCookie。
 */

const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1", "[::1]", "0.0.0.0"])

/**
 * 判断当前部署是否面向 localhost（用环境变量而非请求头，防伪造）。
 * NEXT_PUBLIC_SITE_URL 若未设置则默认按非 localhost 处理（线上安全优先）。
 */
export function shouldUseSecureCookie(): boolean {
  if (process.env.NODE_ENV !== "production") return false
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_BASE_URL || ""
  try {
    const host = new URL(siteUrl).hostname
    return !LOCAL_HOSTNAMES.has(host)
  } catch {
    // 无 site URL 或非 URL 形态：退回旧逻辑，线上安全优先
    return true
  }
}

/** auth_token 等 cookie 的通用安全属性 */
export function secureCookieAttrs() {
  return {
    httpOnly: true,
    secure: shouldUseSecureCookie(),
    sameSite: "strict" as const,
    path: "/",
  }
}
