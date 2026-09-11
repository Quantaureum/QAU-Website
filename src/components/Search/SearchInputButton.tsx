import * as React from "react"
import { SearchIcon } from "lucide-react"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils/cn"

import { Button, type ButtonProps } from "../ui/buttons/Button"

const SearchInputButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    const t = useTranslations("common")

    return (
      <Button
        ref={ref}
        aria-label={t("aria-toggle-search-button")}
        data-testid="search-input-button"
        variant="ghost"
        className={cn(
          "group me-3 gap-2 border border-disabled hover:border-primary-hover",
          className
        )}
        {...props}
      >
        <SearchIcon className="size-4" aria-hidden />
        {t("search")}
      </Button>
    )
  }
)

SearchInputButton.displayName = "SearchButton"

export default SearchInputButton
