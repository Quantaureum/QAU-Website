import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import ChecklistGrid from "@/components/ChecklistGrid"
import ContentFeedback from "@/components/ContentFeedback"
import { CopyButton } from "@/components/CopyToClipboard"
import { HubHero } from "@/components/Hero"
import I18nProvider from "@/components/I18nProvider"
import { Image } from "@/components/Image"
import { ImageWithFallback } from "@/components/Image/ImageWithFallback"
import MainArticle from "@/components/MainArticle"
import { ButtonLink } from "@/components/ui/buttons/Button"
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
import {
  EdgeScrollContainer,
  EdgeScrollItem,
} from "@/components/ui/edge-scroll-container"
import { Grid } from "@/components/ui/grid"
import InlineLink from "@/components/ui/Link"
import { Section } from "@/components/ui/section"

import { cn } from "@/lib/utils/cn"
import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { formatDateRange } from "@/lib/utils/date"
import { getMetadata } from "@/lib/utils/metadata"
import { screens } from "@/lib/utils/screen"

import BuilderCard from "./_components/BuilderCard"
import BuilderSwiper from "./_components/BuilderSwiper/lazy"
import VideoCourseCard from "./_components/VideoCourseCard"
import VideoCourseSwiper from "./_components/VideoCourseSwiper/lazy"
import PageJsonLD from "./page-jsonld"
import { getBuilderPaths, getHackathons, getVideoCourses } from "./utils"

import resourcesBanner from "@/public/images/developers/resources-banner.png"
import tutorialTagsBanner from "@/public/images/developers/tutorial-tags-banner.png"
import dogeImage from "@/public/images/doge-computer.png"
import heroImage from "@/public/images/heroes/developers-hub-hero.png"
import fallbackThumbnail from "@/public/images/qau-glyph-thumbnail.png"

const DocsColumn = ({
  heading,
  links,
  children,
}: {
  heading: string
  links: { href: string; label: string; description: string }[]
  children?: React.ReactNode
}) => (
  <div className="flow">
    <h3>{heading}</h3>
    {links.map(({ href, label, description }) => (
      <div key={href}>
        <InlineLink href={href}>{label}</InlineLink>
        <p className="text-body-medium">{description}</p>
      </div>
    ))}
    {children}
  </div>
)

const DevelopersPage = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params
  setRequestLocale(locale)
  const t = await getTranslations("page-developers-index")
  const tCommon = await getTranslations("common")

  // client messages for the swipers (the page has no root I18nProvider)
  const allMessages = await getMessages({ locale })
  const messages = pick(allMessages, "component-swiper")

  const paths = await getBuilderPaths()

  const whyGridItems = [
    {
      heading: t("page-developers-why-grid-money-heading"),
      description: t("page-developers-why-grid-money-desc"),
    },
    {
      heading: t("page-developers-why-grid-skills-heading"),
      description: t("page-developers-why-grid-skills-desc"),
    },
    {
      heading: t("page-developers-why-grid-censorship-heading"),
      description: t("page-developers-why-grid-censorship-desc"),
    },
    {
      heading: t("page-developers-why-grid-sovereignty-heading"),
      description: t("page-developers-why-grid-sovereignty-desc"),
    },
  ]

  const courses = await getVideoCourses()

  const hackathons = (await getHackathons()).slice(0, 5)

  const { contributors } = await getAppPageContributorInfo(
    "developers",
    locale as Lang
  )

  return (
    <>
      <PageJsonLD
        locale={locale}
        paths={paths}
        courses={courses}
        hackathons={hackathons}
        contributors={contributors}
      />

      <HubHero
        heroImg={heroImage}
        header={`${t("page-developers-title-1")} ${t(
          "page-developers-title-2"
        )} ${t("page-developers-title-3")}`}
        title={tCommon("developers")}
        description={t("page-developers-subtitle")}
      />

      <main className="pb-page">
        <MainArticle className="flow *:[section]:px-page">
          {/* Get started */}
          <Section id="build" className="py-space-3x">
            <h2>{t("page-developers-get-started")}</h2>
            <p>{t("page-developers-build-section-desc")}</p>

            {/* Desktop */}
            <Grid balanced={4} className="max-md:hidden">
              {paths.map((path, idx) => (
                <BuilderCard path={path} key={idx} />
              ))}
            </Grid>

            {/* Mobile */}
            <div className="-mx-page md:hidden">
              <I18nProvider locale={locale} messages={messages}>
                <BuilderSwiper paths={paths} />
              </I18nProvider>
            </div>
          </Section>

          {/* Why build on Quantaureum */}
          <Section
            id="why"
            data-flow="skip"
            className="grid grid-cols-1 items-center gap-6 bg-background-highlight py-space-3x md:gap-10 lg:grid-cols-2"
          >
            <div className="flow">
              <h2>{t("page-developers-why-title")}</h2>
              <p>{t("page-developers-why-subtitle")}</p>
            </div>
            <ChecklistGrid items={whyGridItems} />
          </Section>

          {/* Resources */}
          <Section
            id="resources"
            data-flow="skip"
            className="bg-background-highlight py-space-3x"
          >
            <h2 className="sr-only">
              {t("page-developers-resources-section-title")}
            </h2>

            <Grid columns={2} size="wide">
              {/* Quickstart your idea */}
              <Card variant="nested" size="lg" hoverLift>
                <CardHeader>
                  <CardBanner background="none" size="lg">
                    <Image
                      src={tutorialTagsBanner}
                      alt=""
                      sizes={`(max-width: ${screens.sm}) 100vw, calc(50vw - 14rem)`}
                      className="h-56 object-cover"
                    />
                  </CardBanner>
                </CardHeader>
                <CardContent>
                  <CardTitle size="lg">
                    {t("page-developers-jump-right-in-title")}
                  </CardTitle>
                  <CardParagraph>
                    {t("page-developers-quickstart-scaffold-subtext")}
                  </CardParagraph>

                  <div className="flex items-center rounded-lg border bg-background px-3 py-1">
                    <span className="flex-1 font-mono text-sm">
                      git clone https://github.com/Quantaureum/qau.git && cd qau
                      && go build -o build/qaud ./cmd/qaud
                    </span>
                    <CopyButton
                      message="git clone https://github.com/Quantaureum/qau.git && cd qau && go build -o build/qaud ./cmd/qaud"
                      size="sm"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <InlineLink href="https://github.com/Quantaureum">
                    {t("page-developers-quickstart-scaffold-docs")}
                  </InlineLink>
                </CardFooter>
              </Card>

              {/* Get help */}
              <Card
                href="https://discord.gg/MSctkBT5j"
                variant="nested"
                size="lg"
              >
                <CardHeader>
                  <CardBanner background="none" size="lg">
                    <Image
                      src={resourcesBanner}
                      alt=""
                      sizes={`(max-width: ${screens.sm}) 100vw, calc(50vw - 14rem)`}
                      className="object-top"
                    />
                  </CardBanner>
                </CardHeader>
                <CardContent>
                  <CardTitle size="lg">
                    {t("page-developers-get-help-title")}
                  </CardTitle>
                  <CardParagraph>
                    {t("page-developers-get-help-desc")}
                  </CardParagraph>
                </CardContent>
                <CardFooter>
                  <CardButtonFake variant="outline" isSecondary>
                    Discord
                  </CardButtonFake>
                </CardFooter>
              </Card>

              {/* Resources */}
              <Card
                href="/learn/"
                variant="nested"
                size="lg"
                customEventOptions={{
                  eventCategory: "mid_boxes",
                  eventAction: "click",
                  eventName: "play-with-code",
                }}
              >
                <CardHeader>
                  <CardBanner background="none" size="lg" fit="contain">
                    <Image
                      src={resourcesBanner}
                      alt=""
                      sizes={`(max-width: ${screens.sm}) 100vw, calc(50vw - 14rem)`}
                    />
                  </CardBanner>
                </CardHeader>
                <CardContent>
                  <CardTitle size="lg">
                    {t("page-developers-resources-title")}
                  </CardTitle>
                  <CardParagraph>
                    {t("page-developers-resources-desc")}
                  </CardParagraph>
                </CardContent>
                <CardFooter>
                  <CardButtonFake variant="outline" isSecondary>
                    {t("page-developers-play-code")}
                  </CardButtonFake>
                </CardFooter>
              </Card>

              {/* Tutorials */}
              <Card
                href="/open-source/"
                variant="nested"
                size="lg"
                customEventOptions={{
                  eventCategory: "mid_boxes",
                  eventAction: "click",
                  eventName: "view-tutorials",
                }}
              >
                <CardHeader>
                  <CardBanner background="none" size="lg" fit="contain">
                    <Image
                      src={tutorialTagsBanner}
                      alt=""
                      sizes={`(max-width: ${screens.sm}) 100vw, calc(50vw - 14rem)`}
                    />
                  </CardBanner>
                </CardHeader>
                <CardContent>
                  <CardTitle size="lg">
                    {t("page-developers-tutorials-title")}
                  </CardTitle>
                  <CardParagraph>
                    {t("page-developers-tutorials-desc")}
                  </CardParagraph>
                </CardContent>
                <CardFooter>
                  <CardButtonFake variant="outline" isSecondary>
                    {t("page-developers-learn-tutorials-cta")}
                  </CardButtonFake>
                </CardFooter>
              </Card>
            </Grid>
          </Section>

          {/* Video courses */}
          <Section id="courses">
            <h2>{t("page-developers-video-courses-title")}</h2>
            <p>{t("page-developers-video-courses-desc")}</p>

            {/* Desktop */}
            <div className="relative flex w-screen gap-4 overflow-x-auto p-px pb-2 max-2xl:-mx-page max-2xl:px-page max-sm:hidden 2xl:w-full">
              {courses.map((course, idx) => (
                <VideoCourseCard
                  key={idx}
                  course={course}
                  className="w-[20%] flex-1 max-2xl:min-w-[20rem] xl:w-full"
                />
              ))}
            </div>

            {/* Mobile */}
            <div className="w-screen max-xl:-ms-page sm:hidden xl:w-full">
              <I18nProvider locale={locale} messages={messages}>
                <VideoCourseSwiper courses={courses} />
              </I18nProvider>
            </div>
          </Section>

          {/* Explore the documentation */}
          <Section id="docs" className="bg-background-highlight py-space-3x">
            <div className="flow">
              <h2>{t("page-developers-explore-documentation")}</h2>
              <p>{t("page-developers-docs-section-desc")}</p>
            </div>

            <Grid columns={3}>
              <DocsColumn
                heading={t("page-developers-docs-introductions")}
                links={[
                  {
                    href: "/developers/docs/intro-to-quantaureum/",
                    label: t("page-developers-intro-qau-link"),
                    description: t("page-developers-into-qau-desc"),
                  },
                  {
                    href: "/developers/docs/intro-to-QAU/",
                    label: t("page-developers-intro-QAU-link"),
                    description: t("page-developers-intro-QAU-desc"),
                  },
                  {
                    href: "/developers/docs/dapps/",
                    label: t("page-developers-intro-dapps-link"),
                    description: t("page-developers-intro-dapps-desc"),
                  },
                  {
                    href: "/developers/docs/quantaureum-stack/",
                    label: t("page-developers-intro-stack"),
                    description: t("page-developers-intro-stack-desc"),
                  },
                  {
                    href: "/developers/docs/web2-vs-web3/",
                    label: t("page-developers-web3-link"),
                    description: t("page-developers-web3-desc"),
                  },
                  {
                    href: "/developers/docs/programming-languages/",
                    label: t("page-developers-languages"),
                    description: t("page-developers-language-desc"),
                  },
                ]}
              >
                <Image
                  className="hidden max-w-100 lg:block"
                  src={dogeImage}
                  alt={t("page-assets-doge")}
                  sizes="400px"
                />
              </DocsColumn>

              <DocsColumn
                heading={t("page-developers-fundamentals")}
                links={[
                  {
                    href: "/developers/docs/accounts/",
                    label: t("page-developers-accounts-link"),
                    description: t("page-developers-account-desc"),
                  },
                  {
                    href: "/developers/docs/transactions/",
                    label: t("page-developers-transactions-link"),
                    description: t("page-developers-transactions-desc"),
                  },
                  {
                    href: "/developers/docs/blocks/",
                    label: t("page-developers-blocks-link"),
                    description: t("page-developers-block-desc"),
                  },
                  {
                    href: "/developers/docs/evm/",
                    label: t("page-developers-evm-link"),
                    description: t("page-developers-evm-desc"),
                  },
                  {
                    href: "https://github.com/Quantaureum",
                    label: t("page-developers-gas-link"),
                    description: t("page-developers-gas-desc"),
                  },
                  {
                    href: "/developers/docs/nodes-and-clients/",
                    label: t("page-developers-node-clients-link"),
                    description: t("page-developers-node-clients-desc"),
                  },
                  {
                    href: "/developers/docs/networks/",
                    label: t("page-developers-networks-link"),
                    description: t("page-developers-networks-desc"),
                  },
                ]}
              />

              <DocsColumn
                heading={t("page-developers-stack")}
                links={[
                  {
                    href: "/developers/docs/smart-contracts/",
                    label: t("page-developers-smart-contracts-link"),
                    description: t("page-developers-smart-contracts-desc"),
                  },
                  {
                    href: "/developers/docs/frameworks/",
                    label: t("page-developers-frameworks-link"),
                    description: t("page-developers-frameworks-desc"),
                  },
                  {
                    href: "/developers/docs/apis/javascript/",
                    label: t("page-developers-js-libraries-link"),
                    description: t("page-developers-js-libraries-desc"),
                  },
                  {
                    href: "/developers/docs/apis/backend/",
                    label: t("page-developers-api-link"),
                    description: t("page-developers-api-desc"),
                  },
                  {
                    href: "/developers/docs/data-and-analytics/block-explorers/",
                    label: t("page-developers-block-explorers-link"),
                    description: t("page-developers-block-explorers-desc"),
                  },
                  {
                    href: "/developers/docs/smart-contracts/security/",
                    label: t("page-developers-smart-contract-security-link"),
                    description: t(
                      "page-developers-smart-contract-security-desc"
                    ),
                  },
                  {
                    href: "/developers/docs/storage/",
                    label: t("page-developers-storage-link"),
                    description: t("page-developers-storage-desc"),
                  },
                  {
                    href: "/developers/docs/ides/",
                    label: t("page-developers-dev-env-link"),
                    description: t("page-developers-dev-env-desc"),
                  },
                ]}
              />
            </Grid>
          </Section>

          {/* Hackathons */}
          <Section id="hackathons">
            <h2>{t("page-developers-hackathons-title")}</h2>
            <p>{t("page-developers-hackathons-desc")}</p>

            <EdgeScrollContainer>
              {hackathons.map((event) => {
                const {
                  title,
                  link,
                  bannerImage,
                  location,
                  startTime,
                  endTime,
                } = event

                return (
                  <EdgeScrollItem
                    key={event.id}
                    asChild
                    className={cn(
                      "ms-4 w-[calc(100%-4rem)] max-w-md md:min-w-96 md:flex-1 lg:max-w-[33%]",
                      "*:max-w-md *:min-w-72 *:flex-1"
                    )}
                  >
                    <Card
                      href={link}
                      customEventOptions={{
                        eventCategory: "hackathons",
                        eventAction: "click",
                        eventName: title,
                      }}
                      variant="ghost"
                      size="sm"
                    >
                      <CardHeader>
                        <CardBanner size="sm" zoom>
                          <ImageWithFallback
                            src={bannerImage}
                            alt=""
                            width={448}
                            height={144}
                            sizes="(max-width: 768px) 100vw, 33vw"
                            fallback={
                              <Image
                                src={fallbackThumbnail}
                                alt=""
                                sizes="276px"
                              />
                            }
                          />
                        </CardBanner>
                      </CardHeader>
                      <CardContent>
                        <CardTitle>{title}</CardTitle>
                        <CardParagraph variant="subtitle" size="sm">
                          {formatDateRange(startTime, endTime, locale, {
                            year: "numeric",
                          })}
                        </CardParagraph>
                        <CardParagraph variant="subtitle" size="sm">
                          {location}
                        </CardParagraph>
                      </CardContent>
                    </Card>
                  </EdgeScrollItem>
                )
              })}
            </EdgeScrollContainer>

            <div
              className={cn("flex", hackathons.length > 0 && "justify-center")}
            >
              <ButtonLink
                href="https://ethglobal.com/"
                className="max-md:w-full"
                customEventOptions={{
                  eventCategory: "hackathons",
                  eventAction: "click",
                  eventName: "visit-ethglobal",
                }}
              >
                {t("page-developers-visit-ethglobal")}
              </ButtonLink>
            </div>
          </Section>

          {/* Founders */}
          <Section id="founders">
            <div className="gradient-ring-primary/4xl mx-auto mb-12 flex max-w-screen-lg flex-col items-center gap-y-8 bg-radial-primary px-8 py-12 lg:mb-32 xl:mb-36">
              <div className="flex flex-col gap-y-4 text-center">
                <h2>{t("page-developers-founders-title")}</h2>
                <p>{t("page-developers-founders-desc")}</p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-center">
                <ButtonLink
                  href="mailto:founders@quantaureum.com?subject=Founder%20inquiry"
                  customEventOptions={{
                    eventCategory: "founders",
                    eventAction: "click",
                    eventName: "email",
                  }}
                >
                  {t("page-developers-get-in-touch")}
                </ButtonLink>
                <ButtonLink
                  href="https://github.com/Quantaureum"
                  isSecondary
                  variant="outline"
                  customEventOptions={{
                    eventCategory: "founders",
                    eventAction: "click",
                    eventName: "grant-options",
                  }}
                >
                  {t("page-developers-see-grant-options")}
                </ButtonLink>
              </div>
            </div>
          </Section>
        </MainArticle>

        {/* End-of-page actions */}
        <div className="px-page">
          <ContentFeedback />
        </div>
      </main>
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const t = await getTranslations("page-developers-index")

  return await getMetadata({
    locale,
    slug: ["developers"],
    title: t("page-developer-meta-title"),
    description: t("page-developers-meta-desc"),
  })
}

export default DevelopersPage
