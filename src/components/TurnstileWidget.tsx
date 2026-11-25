"use client"

/**
 * Cloudflare Turnstile frontend widget.
 *
 * Usage:
 *   <TurnstileWidget onChange={setToken} />
 *
 * - Returns null when NEXT_PUBLIC_TURNSTILE_SITE_KEY is not configured (the
 *   server automatically enters degraded mode)
 * - onChange receives '' on unmount/expiry (form submit buttons should
 *   disable themselves accordingly)
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
        // window.turnstile may lag slightly behind the script's async load
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
        /* Stay hidden on load failure; the server degrades gracefully */
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
        // FIX(2026-09-09): in Managed mode the challenge expires without
        // interaction; on expiry clear the token and reset to re-run the
        // invisible verification so submission never lacks a token
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
      /* Render failure: the server-side degraded mode is the fallback */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteKey, ready])

  if (!siteKey) return null

  return <div ref={containerRef} className="my-3" />
}
