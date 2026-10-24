"use client"

/**
 * Cloudflare Turnstile 前端组件
 *
 * 用法：
 *   <TurnstileWidget onChange={setToken} />
 *
 * - 未配置 NEXT_PUBLIC_TURNSTILE_SITE_KEY 时返回 null（服务端自动进入降级模式）
 * - 组件卸载/过期时 onChange 回调收到 ''（表单提交按钮应据此禁用）
 */

import React, { useEffect, useRef, useState } from "react"

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: Record<string, unknown> & {
          sitekey: string
          callback: (token: string) => void
          "expired-callback": () => void
          "error-callback": (code: string) => void
        }
      ) => string
      remove: (id: string) => void
      reset: (id?: string) => void
    }
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js"

function loadScriptOnce(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve()
  if (document.querySelector(`script[src="${SCRIPT_SRC}"]`))
    return Promise.resolve()
  return new Promise((resolve, reject) => {
    const s = document.createElement("script")
    s.src = SCRIPT_SRC
    s.async = true
    s.defer = true
    s.onload = () => resolve()
    s.onerror = () => reject(new Error("turnstile script load failed"))
    document.head.appendChild(s)
  })
}

export default function TurnstileWidget({
  onChange,
}: {
  onChange: (token: string) => void
}) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!siteKey || !containerRef.current) return

    let cancelled = false

    loadScriptOnce()
      .then(() => {
        // script 异步加载完成后 window.turnstile 可能有延迟
        const waitTurnstile = (tries = 0) => {
          if (cancelled) return
          if (window.turnstile) {
            setReady(true)
          } else if (tries < 40) {
            setTimeout(() => waitTurnstile(tries + 1), 100)
          }
        }
        waitTurnstile()
      })
      .catch(() => {
        /* 加载失败时保持隐藏，服务端会降级 */
      })

    return () => {
      cancelled = true
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current)
        } catch {
          /* ignore */
        }
      }
    }
  }, [siteKey])

  useEffect(() => {
    if (!siteKey || !ready || !containerRef.current || widgetIdRef.current)
      return
    try {
      widgetIdRef.current = window.turnstile!.render(containerRef.current, {
        sitekey: siteKey,
        theme: "dark",
        callback: (token: string) => onChange(token),
        // FIX(2026-09-09): Managed 模式下无交互会过期，过期时清空 token 并
        // reset 重新跑一次无感验证，避免用户提交时拿不到 token
        "expired-callback": () => {
          onChange("")
          try {
            window.turnstile?.reset(widgetIdRef.current || undefined)
          } catch {
            /* ignore */
          }
        },
        "error-callback": () => {
          onChange("")
          try {
            window.turnstile?.reset(widgetIdRef.current || undefined)
          } catch {
            /* ignore */
          }
        },
      })
    } catch {
      /* 渲染失败：服务端降级模式兜底 */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteKey, ready])

  if (!siteKey) return null

  return <div ref={containerRef} className="my-3" />
}
