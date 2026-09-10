import { Code, HardDrive } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { Image } from "@/components/Image"
import {
  Card,
  CardBanner,
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

import learnImage from "@/public/images/heroes/guides-hub-hero.jpg"
import developersImage from "@/public/images/homepage/get-started/developers.png"

type GetStartedGridProps = {
  className?: string
  eventCategory?: string
}

const GetStartedGrid = async ({
  className,
  eventCategory = "Homepage",
}: GetStartedGridProps) => {
  const t = await getTranslations("page-index")

  const cards = [
    {
      id: "developers",
      icon: Code,
      iconBg: "bg-blue-100 dark:bg-blue-900",
      iconColor: "text-accent-a",
      title: t("page-index-get-started-build-title"),
      description: t("page-index-get-started-build-description"),
      bullets: [
        t("page-index-get-started-build-bullet-1"),
        t("page-index-get-started-build-bullet-2"),
        t("page-index-get-started-build-bullet-3"),
      ],
      bulletColor: "bg-accent-a",
      cta: t("page-index-get-started-build-cta"),
      href: "/developers/",
      image: developersImage,
    },
    {
      id: "node",
      icon: HardDrive,
      iconBg: "bg-purple-50 dark:bg-purple-900",
      iconColor: "text-primary",
      title: t("page-index-get-started-node-title"),
      description: t("page-index-get-started-node-description"),
      bullets: [
        t("page-index-get-started-node-bullet-1"),
        t("page-index-get-started-node-bullet-2"),
        t("page-index-get-started-node-bullet-3"),
      ],
      bulletColor: "bg-primary",
      cta: t("page-index-get-started-node-cta"),
      href: "/run-a-node/",
      image: learnImage,
    },
  ]

  return (
    <Section id="get-started" className={cn("relative", className)}>
      <div className="flex flex-col gap-12 rounded-t-4xl bg-radial-primary px-4 pt-20 pb-8 md:px-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <SectionHeader className="mt-0 mb-0">
            {t("page-index-get-started-title")}
          </SectionHeader>
          <p className="max-w-[42rem] text-lg text-body-medium lg:text-2xl">
            {t("page-index-get-started-subtitle")}
          </p>
        </div>

        <Grid columns={3} size="wide" className="mx-auto w-7xl max-w-full">
          {cards.map((card) => (
            <Card
              key={card.title}
              href={card.href}
              size="lg"
              customEventOptions={{
                eventCategory,
                eventAction: "section_click",
                eventName: `get_started/${card.id}`,
              }}
              variant="nested"
              border
            >
              <CardHeader>
                <CardBanner>
                  <Image
                    src={card.image}
                    alt=""
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                  />
                </CardBanner>
              </CardHeader>
              <CardContent spacing="sm">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "flex size-10 items-center justify-center rounded-lg",
                      card.iconBg
                    )}
                  >
                    <card.icon className={cn("size-6", card.iconColor)} />
                  </div>
                  <CardTitle>{card.title}</CardTitle>
                </div>

                <CardParagraph>{card.description}</CardParagraph>

                <ul className="m-0">
                  {card.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-center gap-3.5 last:mb-0"
                    >
                      <span
                        className={cn(
                          "size-1.5 shrink-0 rounded-full",
                          card.bulletColor
                        )}
                      />
                      <span className="text-sm leading-5 text-body-medium">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <CardButtonFake withChevron>{card.cta}</CardButtonFake>
              </CardFooter>
            </Card>
          ))}
        </Grid>
      </div>
    </Section>
  )
}

export default GetStartedGrid
