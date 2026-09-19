"use client"

import Morpher from "@/components/Morpher"
import { Button } from "@/components/ui/buttons/Button"

import { screens } from "@/lib/utils/screen"

import {
  DESKTOP_LANGUAGE_BUTTON_NAME,
  HAMBURGER_BUTTON_ID,
  MOBILE_LANGUAGE_BUTTON_NAME,
} from "@/lib/constants"

import { useIsClient } from "@/hooks/useIsClient"
import { useMediaQuery } from "@/hooks/useMediaQuery"

// The two targets need different triggers: the mobile button is a Radix Tabs
// trigger, which activates on focus and ignores a synthetic click, while the
// desktop one is a popover trigger, which needs the click. Doing both covers
// each without branching.
const activate = (button: HTMLElement) => {
  button.focus()
  button.click()
}

// The mobile menu's content is lazy-loaded, so its language button mounts a few
// hundred ms after the hamburger click -- longer on a cold chunk fetch. Poll for
// it instead of betting on a fixed delay (ETHORG-1AK).
const MENU_MOUNT_TIMEOUT_MS = 3000

const activateWhenPresent = (selector: string) => {
  const deadline = performance.now() + MENU_MOUNT_TIMEOUT_MS
  const attempt = () => {
    const button = document.querySelector<HTMLElement>(selector)
    if (button) return activate(button)
    if (performance.now() < deadline) requestAnimationFrame(attempt)
  }
  requestAnimationFrame(attempt)
}

const LanguageMorpher = () => {
  const isClient = useIsClient()

  const handleMobileClick = () => {
    document.getElementById(HAMBURGER_BUTTON_ID)?.click()
    activateWhenPresent(`button[name="${MOBILE_LANGUAGE_BUTTON_NAME}"]`)
  }
  const handleDesktopClick = () => {
    const button = document.querySelector<HTMLElement>(
      `button[name="${DESKTOP_LANGUAGE_BUTTON_NAME}"]`
    )
    if (button) activate(button)
  }

  const [isLarge] = useMediaQuery([`(min-width: ${screens.md})`])

  // Use fallback value during SSR to prevent hydration mismatch
  // Default to false (mobile) during SSR, then use actual value on client
  const isLargeScreen = isClient && isLarge

  return (
    <Button
      className="mx-auto w-fit text-md text-primary no-underline"
      onClick={isLargeScreen ? handleDesktopClick : handleMobileClick}
      variant="ghost"
    >
      {/* Localized renderings of "Quantaureum" — one per supported locale.
          Latin-script languages keep the brand spelling; non-Latin writing
          systems use a phonetic transliteration. These are display
          transliterations, not official brand translations. */}
      <Morpher
        words={[
          "Quantaureum",
          "کوانتوریوم",
          "কোয়ান্টোরিয়াম",
          "Kvantaureum",
          "Quantaureum",
          "Quantaureum",
          "Quantaureum",
          "क्वांटोरियम",
          "Kuantoreum",
          "Quantaureum",
          "クオンタウレウム",
          "퀀타우레움",
          "क्वांटोरियम",
          "Kwantaureum",
          "Quantaureum",
          "Квантауреум",
          "Kwantaureum",
          "குவாண்டோரியம்",
          "క్వాంటోరియమ్",
          "Kuantoryum",
          "Квантауреум",
          "کوانٹوریئم",
          "Quantaureum",
          "昆塔",
          "昆塔",
        ]}
        charSet="abcdxyz01234567{}%$?!"
      />
    </Button>
  )
}

LanguageMorpher.displayName = "LanguageMorpher"

export default LanguageMorpher
