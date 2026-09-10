import { getTranslations } from "next-intl/server"

import { Section, SectionHeader, SectionTag } from "@/components/ui/section"

import { cn } from "@/lib/utils/cn"

type Layer = {
  level: string
  nameKey: string
  descKey: string
}

const LAYERS: Layer[] = [
  { level: "L7", nameKey: "l7-name", descKey: "l7-desc" },
  { level: "L6", nameKey: "l6-name", descKey: "l6-desc" },
  { level: "L5", nameKey: "l5-name", descKey: "l5-desc" },
  { level: "L4", nameKey: "l4-name", descKey: "l4-desc" },
  { level: "L3", nameKey: "l3-name", descKey: "l3-desc" },
  { level: "L2", nameKey: "l2-name", descKey: "l2-desc" },
  { level: "L1", nameKey: "l1-name", descKey: "l1-desc" },
]

type ArchitectureSectionProps = {
  className?: string
}

const ArchitectureSection = async ({ className }: ArchitectureSectionProps) => {
  const t = await getTranslations("page-index")

  return (
    <Section className={cn("py-20 lg:py-24", className)}>
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-16 flex flex-col items-center gap-4 text-center">
          <SectionTag variant="plain">{t("page-index-arch-tag")}</SectionTag>
          <SectionHeader className="mt-0 mb-0">
            {t("page-index-arch-title")}
          </SectionHeader>
          <p className="max-w-2xl text-lg text-body-medium">
            {t("page-index-arch-subtitle")}
          </p>
        </div>

        <ol className="mx-auto flex max-w-3xl list-none flex-col gap-2 p-0">
          {LAYERS.map(({ level, nameKey, descKey }) => (
            <li
              key={level}
              className="flex items-baseline gap-4 rounded-xl border bg-background px-5 py-4 transition-colors hover:border-primary"
            >
              <span className="w-10 shrink-0 font-mono text-sm font-bold text-primary">
                {level}
              </span>
              <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                <h3 className="shrink-0 text-base font-bold sm:w-44">
                  {t(`page-index-arch-${nameKey}`)}
                </h3>
                <p className="text-sm text-body-medium">
                  {t(`page-index-arch-${descKey}`)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}

export default ArchitectureSection
