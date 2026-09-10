import { getTranslations } from "next-intl/server"

import { ChevronNext } from "@/components/Chevron"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { BaseLink } from "@/components/ui/Link"
import { Section, SectionHeader, SectionTag } from "@/components/ui/section"

import { cn } from "@/lib/utils/cn"

const TOPICS = [
  { id: "security", href: "/roadmap/security/" },
  { id: "scaling", href: "/roadmap/scaling/" },
  { id: "privacy", href: "/roadmap/privacy/" },
  { id: "ux", href: "/roadmap/user-experience/" },
  { id: "verkle", href: "/roadmap/verkle-trees/" },
]

type RoadmapSectionProps = {
  className?: string
  eventCategory?: string
}

const RoadmapSection = async ({
  className,
  eventCategory = "Homepage",
}: RoadmapSectionProps) => {
  const t = await getTranslations("page-index")

  return (
    <Section className={cn("py-20 lg:py-24", className)}>
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 text-center">
        <SectionTag variant="plain">{t("page-index-roadmap-tag")}</SectionTag>
        <SectionHeader className="mt-0 mb-0">
          {t("page-index-roadmap-title")}
        </SectionHeader>
        <p className="max-w-2xl text-lg text-body-medium">
          {t("page-index-roadmap-subtitle")}
        </p>

        <ul className="flex flex-wrap justify-center gap-3">
          {TOPICS.map(({ id, href }) => (
            <li key={id}>
              <BaseLink
                href={href}
                hideArrow
                className="rounded-full border px-4 py-2 text-sm font-medium no-underline transition-colors hover:border-primary hover:text-primary"
              >
                {t(`page-index-roadmap-topic-${id}`)}
              </BaseLink>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap justify-center gap-4">
          <ButtonLink
            href="/roadmap/"
            size="lg"
            customEventOptions={{
              eventCategory,
              eventAction: "section_click",
              eventName: "roadmap/explore",
            }}
          >
            {t("page-index-roadmap-cta")} <ChevronNext />
          </ButtonLink>
          <ButtonLink
            href="https://discord.gg/MSctkBT5j"
            variant="outline"
            size="lg"
            customEventOptions={{
              eventCategory,
              eventAction: "section_click",
              eventName: "roadmap/discord",
            }}
          >
            {t("page-index-roadmap-cta-community")}
          </ButtonLink>
        </div>
      </div>
    </Section>
  )
}

export default RoadmapSection
