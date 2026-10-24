/**
 * Cloudflare Turnstile 机器人验证
 *
 * 防女巫第二层：注册/发送验证码前需通过人机验证。
 *
 * - 未配置 TURNSTILE_SECRET_KEY 时自动降级（不启用），
 *   降级时改用「蜜罐字段 + 提交时序」启发式检查（见 fallbackHumanCheck）。
 * - 前端组件见 src/components/TurnstileWidget.tsx：
 *   未配置 site key 时同样不渲染，前后端状态自动一致（都由 env 决定）。
 *
 * 环境变量：
 *  - NEXT_PUBLIC_TURNSTILE_SITE_KEY  —— Cloudflare 后台获取（widget key）
 *  - TURNSTILE_SECRET_KEY            —— 服务端校验密钥
 *  - TURNSTILE_VERIFY_URL 可选，默认官方 endpoint
 */

const DEFAULT_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify"

export interface TurnstileCheckResult {
  ok: boolean
  /** 未启用 Turnstile 时为 true（降级模式） */
  skipped: boolean
  reason?: string
}

export function isTurnstileEnabled(): boolean {
  return Boolean(
    process.env.TURNSTILE_SECRET_KEY &&
      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  )
}

/**
 * 服务端校验 Turnstile token。
 * @param token 前端 window.turnstile 拿到的 cf-turnstile-response
 * @param ip 客户端 IP（可选，Cloudflare 用于辅助判定）
 */
export async function verifyTurnstile(
  token: string | undefined | null,
  ip?: string
): Promise<TurnstileCheckResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

  // 未配置：降级模式（不阻断，交给蜜罐+时序检查）
  if (!secret || !siteKey) {
    return { ok: true, skipped: true }
  }

  if (!token) {
    return { ok: false, skipped: false, reason: "请完成人机验证" }
  }

  try {
    const body = new URLSearchParams({ secret, response: token })
    if (ip) body.set("remoteip", ip)

    const res = await fetch(
      process.env.TURNSTILE_VERIFY_URL || DEFAULT_VERIFY_URL,
      {
        method: "POST",
        body,
      }
    )
    const data = (await res.json()) as {
      success: boolean
      "error-codes"?: string[]
    }

    if (data.success) return { ok: true, skipped: false }

    console.warn("[turnstile] verify failed:", data["error-codes"])
    return { ok: false, skipped: false, reason: "人机验证未通过，请重试" }
  } catch (err) {
    // 网络异常时 fail-open（Cloudflare 故障不能锁死全部用户），但记录日志
    console.error("[turnstile] verify error:", err)
    return { ok: true, skipped: false }
  }
}

/**
 * 降级模式的启发式人机检查：
 *  - 蜜罐字段：正常用户看不见该输入框，机器人填了即拒绝
 *  - 提交时序：表单渲染到提交不足 N 秒视为脚本（真实用户要读表单+填邮箱+等验证码）
 */
export function fallbackHumanCheck(opts: {
  honeypotValue?: string
  formLoadedAt?: number
  minSeconds?: number
}): { ok: boolean; reason?: string } {
  const minSeconds = opts.minSeconds ?? 3

  if (opts.honeypotValue && opts.honeypotValue.trim() !== "") {
    return { ok: false, reason: "请求无效，请刷新页面重试" }
  }

  if (opts.formLoadedAt) {
    const elapsed = (Date.now() - opts.formLoadedAt) / 1000
    if (elapsed < minSeconds) {
      return { ok: false, reason: "操作过快，请稍后再试" }
    }
  }

  return { ok: true }
}
