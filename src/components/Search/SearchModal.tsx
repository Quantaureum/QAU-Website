"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"

import { ChevronRightIcon, SearchIcon } from "lucide-react"

import type { SearchEntry } from "@/lib/search/searchIndex"

type SearchModalProps = {
  onClose: () => void
  locale: string
}

const SearchModal = ({ onClose, locale }: SearchModalProps) => {
  const t = useTranslations("common")
  const [query, setQuery] = useState("")
  const [hits, setHits] = useState<SearchEntry[]>([])
  const [loading, setLoading] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    inputRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [onClose])

  const fetchHits = useCallback(
    async (q: string) => {
      setLoading(true)
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(q)}&locale=${locale}`
        )
        const data = await res.json()
        setHits(data.hits || [])
      } catch {
        setHits([])
      } finally {
        setLoading(false)
      }
    },
    [locale]
  )

  // initial + debounced fetch
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => fetchHits(query), 150)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query, fetchHits])

  return (
    <div
      className="fixed inset-0 z-modal flex items-start justify-center bg-overlay p-4 pt-[10vh]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      data-testid="search-modal"
    >
      <div
        className="flex w-full max-w-xl flex-col overflow-hidden rounded-xl bg-background shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b px-4 py-3">
          <SearchIcon className="size-5 shrink-0 text-body-light" />
          <input
            ref={inputRef}
            type="search"
            className="w-full bg-transparent text-lg outline-none"
            placeholder={t("search-quantaureum-org")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label={t("search-quantaureum-org")}
          />
        </div>

        <div className="max-h-[50vh] overflow-y-auto p-2">
          {loading && hits.length === 0 ? (
            <p className="px-3 py-6 text-center text-body-medium">
              {t("loading-content")}…
            </p>
          ) : hits.length === 0 ? (
            <p className="px-3 py-6 text-center text-body-medium">
              {t("docsearch-no-results-text")}
            </p>
          ) : (
            <ul className="m-0 list-none p-0">
              {hits.map((hit) => (
                <li key={hit.url}>
                  <a
                    href={hit.url}
                    className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 no-underline hover:bg-background-highlight"
                  >
                    <span className="min-w-0">
                      <span className="block truncate font-medium">
                        {hit.title}
                      </span>
                      {hit.description && (
                        <span className="block truncate text-sm text-body-medium">
                          {hit.description}
                        </span>
                      )}
                    </span>
                    <span className="flex shrink-0 items-center gap-2">
                      <span className="rounded-full border px-2 py-0.5 text-xs text-body-light">
                        {hit.section}
                      </span>
                      <ChevronRightIcon className="size-4 text-body-light rtl:-scale-x-100" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-end border-t px-4 py-2">
          <button
            type="button"
            className="rounded-md px-3 py-1.5 text-sm text-body-medium hover:bg-background-highlight"
            onClick={onClose}
          >
            {t("close")}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchModal
