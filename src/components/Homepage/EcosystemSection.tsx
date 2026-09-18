import type { LucideIcon } from "lucide-react"
import { Gauge, HardDrive, Layers, Wallet } from "lucide-react"
import { getTranslations } from "next-intl/server"

import {
  Card,
  CardButtonFake,
  CardContent,
  CardFooter,
  CardHeader,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { Grid } from "@/components/ui/grid"
import { Section, SectionHeader } from "@/components/ui/section"

import { cn } from "@/lib/utils/cn"

type EcoCard = {
  id: string
  icon: LucideIcon
  titleKey: string
  descKey: string
  ctaKey: string
  href: string
}

const CARDS: EcoCard[] = [
  {
    id: "explorer",
    icon: Layers,
    titleKey: "explorer-title",
    descKey: "explorer-desc",
    ctaKey: "explorer-cta",
    href: "/explorer/",
  },
  {
    id: "wallets",
    icon: Wallet,
    titleKey: "wallets-title",
    descKey: "wallets-desc",
    ctaKey: "wallets-cta",
    href: "/wallets/",
  },
  {
    id: "staking",
    icon: HardDrive,
    titleKey: "staking-title",
    descKey: "staking-desc",
    ctaKey: "staking-cta",
    href: "/staking/",
  },
  {
    id: "gas",
    icon: Gauge,
    titleKey: "gas-title",
    descKey: "gas-desc",
    ctaKey: "gas-cta",
    href: "/gas/",
  },
]

type EcosystemSectionProps = {
  className?: string
  eventCategory?: string
}

const EcosystemSection = async ({
  className,
  eventCategory = "Homepage",
}: EcosystemSectionProps) => {
  const t = await getTranslations("page-index")

  return (
    <Section className={cn("py-20 lg:py-24", className)}>
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-16 flex flex-col items-center gap-4 text-center">
          <SectionHeader className="mt-0 mb-0">
            {t("page-index-ecosystem-title")}
          </SectionHeader>
          <p className="max-w-xl text-lg text-body-medium">
            {t("page-index-ecosystem-subtitle")}
          </p>
        </div>

        <Grid columns={4} size="wide" className="mx-auto w-7xl max-w-full">
          {CARDS.map((card) => (
            <Card
              key={card.id}
              href={card.href}
              customEventOptions={{
                eventCategory,
                eventAction: "section_click",
                eventName: `ecosystem/${card.id}`,
              }}
              variant="nested"
              border
            >
              <CardHeader>
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <card.icon className="size-6 text-primary" />
                </div>
                <CardTitle>
                  {t(`page-index-ecosystem-${card.titleKey}`)}
                </CardTitle>
              </CardHeader>
              <CardContent spacing="sm">
                <CardParagraph>
                  {t(`page-index-ecosystem-${card.descKey}`)}
                </CardParagraph>
              </CardContent>
              <CardFooter>
                <CardButtonFake withChevron>
                  {t(`page-index-ecosystem-${card.ctaKey}`)}
                </CardButtonFake>
              </CardFooter>
            </Card>
          ))}
        </Grid>
      </div>
    </Section>
  )
}

export default EcosystemSection
