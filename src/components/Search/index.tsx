"use client"

import { useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import { useLocale, useTranslations } from "next-intl"
import * as Portal from "@radix-ui/react-portal"
import { Slot } from "@radix-ui/react-slot"

import { trackCustomEvent } from "@/lib/utils/matomo"

import SearchButton from "./SearchButton"
import SearchInputButton from "./SearchInputButton"

import { useDisclosure } from "@/hooks/useDisclosure"

const SearchModal = dynamic(() => import("./SearchModal"))

interface SearchProps {
  asChild?: boolean
  children?: React.ReactElement<unknown>
}

const Search = ({ asChild = false, children }: SearchProps) => {
  const disclosure = useDisclosure()
  const { isOpen, onOpen, onClose } = disclosure

  const locale = useLocale()
  const searchButtonRef = useRef<HTMLButtonElement>(null)
  const t = useTranslations("common")

  const handleOpen = () => {
    onOpen()
    trackCustomEvent({
      eventCategory: "nav bar",
      eventAction: "click",
      eventName: "search open",
    })
  }

  // Keyboard shortcut: cmd/ctrl+K toggles the local search modal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        (e.metaKey || e.ctrlKey) &&
        typeof e.key === "string" &&
        e.key.toLowerCase() === "k"
      ) {
        e.preventDefault()
        isOpen ? onClose() : handleOpen()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  })

  const searchModalProps = {
    onClose,
    locale: locale as string,
  }

  return (
    <>
      {asChild ? (
        <Slot
          ref={searchButtonRef}
          onClick={handleOpen}
          data-testid="search-button"
        >
          {children}
        </Slot>
      ) : (
        <>
          <SearchButton
            onClick={handleOpen}
            data-testid="search-button"
            className="xl:hidden"
          />
          <SearchInputButton className="max-xl:hidden" onClick={handleOpen} />
        </>
      )}
      <Portal.Root>
        {isOpen && <SearchModal {...searchModalProps} />}
      </Portal.Root>
    </>
  )
}

export default Search
