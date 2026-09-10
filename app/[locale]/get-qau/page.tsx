import { pick } from "lodash"
import {
  CircleDashed,
  CircleDot,
  DatabaseCheck,
  HandCoins,
  Users,
  Wallet as WalletIcon,
} from "lucide-react"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"
import type { ComponentType, ReactNode } from "react"

import type { Lang, PageParams } from "@/lib/types"

import CardList, {
  type CardProps as CardListCardProps,
} from "@/components/CardList"
import ContentFeedback from "@/components/ContentFeedback"
import QauPriceCard from "@/components/QauPriceCard"
import FileContributors from "@/components/FileContributors"
import PageHero from "@/components/Hero/PageHero"
import I18nProvider from "@/components/I18nProvider"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import Translation from "@/components/Translation"
import { ButtonLink } from "@/components/ui/buttons/Button"
import Callout from "@/components/ui/callout"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardIconContainer,
  CardLinkFake,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import Eyebrow from "@/components/ui/eyebrow"
import { Grid } from "@/components/ui/grid"
import InlineLink from "@/components/ui/Link"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { screens } from "@/lib/utils/screen"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { exchangesByCountryLastUpdated } from "@/data/exchangesByCountry"

import CentralizedExchanges from "./_components/CentralizedExchangesLazy"
import GetQauPageJsonLD from "./page-jsonld"

import handEth from "@/public/images/developers-qau-blocks.png"
import dapps from "@/public/images/doge-computer.png"
import worldMapDark from "@/public/images/get-qau/world-map-dark.png"
import worldMapLight from "@/public/images/get-qau/world-map-light.png"
import qauCoins from "@/public/images/get-qau-coins.png"
import wallet from "@/public/images/wallet.png"

type WayToGetQau = {
  icon: ComponentType<{ className?: string }>
  title: ReactNode
  description: ReactNode
  linkText: ReactNode
  href: string
}

export default async function Page(props: { params: Promise<PageParams> }) {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const t = await getTranslations("page-get-qau")

  const waysToGetQau: WayToGetQau[] = [
    {
      icon: CircleDot,
      title: t("page-get-qau-cex"),
      description: t("page-get-qau-cex-desc"),
      linkText: t("page-get-qau-cex-link-desc"),
      href: "#country-picker",
    },
    {
      icon: HandCoins,
      title: t("page-get-qau-earn"),
      description: t("page-get-qau-earn-desc"),
      linkText: t("page-get-qau-daos-link-desc"),
      href: "/dao/",
    },
    {
      icon: Users,
      title: t("page-get-qau-receive"),
      description: t("page-get-qau-peers-desc"),
      linkText: t("page-get-qau-receive-link"),
      href: "/guides/how-to-use-a-wallet/",
    },
    {
      icon: CircleDashed,
      title: t("page-get-qau-dex"),
      description: <Translation id="page-get-qau:page-get-qau-dex-desc" />,
      linkText: t("page-get-qau-try-dex"),
      href: "/apps/categories/defi/",
    },
    {
      icon: WalletIcon,
      title: t("page-get-qau-wallets"),
      description: t("page-get-qau-wallets-purchasing"),
      linkText: t("page-get-qau-wallets-link"),
      href: "/wallets/",
    },
    {
      icon: DatabaseCheck,
      title: t("page-get-qau-staking"),
      description: t("page-get-qau-staking-desc"),
      linkText: t("page-get-qau-staking-link-desc"),
      href: "/staking/",
    },
  ]

  const safetyArticles: CardListCardProps[] = [
    {
      title: t("page-get-qau-article-protecting-yourself"),
      link: "https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds",
      description: t("page-get-qau-article-protecting-yourself-desc"),
    },
    {
      title: t("page-get-qau-article-keeping-crypto-safe"),
      link: "https://blog.coinbase.com/the-keys-to-keeping-your-crypto-safe-96d497cce6cf",
      description: t("page-get-qau-article-keeping-crypto-safe-desc"),
    },
  ]

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/get-qau")
  const messages = pick(allMessages, requiredNamespaces)

  const { contributors, lastEditLocaleTimestamp } =
    await getAppPageContributorInfo("get-qau", locale as Lang)

  return (
    <>
      <GetQauPageJsonLD
        locale={locale}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
        contributors={contributors}
      />

      <PageHero
        variant="no-divider"
        breadcrumbs={{ slug: "get-qau" }}
        heroComponent={
          <div className="relative grid size-full place-items-center">
            <Image
              src={qauCoins}
              alt=""
              preload
              sizes={`(max-width: ${screens.lg}) 100vw, 50vw`}
              className="h-auto w-full object-contain max-lg:max-h-64 max-lg:w-auto"
            />
            <QauPriceCard className="absolute inset-x-0 top-1/2 mx-auto -translate-y-1/2" />
          </div>
        }
        title={t("page-get-qau-hero-title")}
        description={t("page-get-qau-hero-subtitle")}
        buttons={[
          {
            content: t("page-get-qau-get-qau-btn"),
            href: "#country-picker",
            matomo: {
              eventCategory: "Search by country button",
              eventAction: "click",
              eventName: "search_by_country",
            },
          },
        ]}
      />

      <main className="p-page pt-page-2x">
        <I18nProvider locale={locale} messages={messages}>
          <MainArticle className="flow">
            <Section id="ways">
              <h2 className="text-center text-h1">
                {t("page-get-qau-ways-you-can-get-qau")}
              </h2>
              <Grid columns={3}>
                {waysToGetQau.map(
                  ({ icon: Icon, title, description, linkText, href }) => (
                    <Card key={href + String(title)} href={href}>
                      <CardHeader>
                        <CardIconContainer>
                          <Icon />
                        </CardIconContainer>
                      </CardHeader>
                      <CardContent>
                        <CardTitle>{title}</CardTitle>
                        <CardParagraph>{description}</CardParagraph>
                      </CardContent>
                      <CardFooter buttons="inherit">
                        <CardLinkFake withForwardArrow>{linkText}</CardLinkFake>
                      </CardFooter>
                    </Card>
                  )
                )}
              </Grid>

              <p className="text-body-medium">
                <em>
                  {t("listing-policy-disclaimer")}{" "}
                  <InlineLink href="https://github.com/Quantaureum/quantaureum-website/issues/new/choose">
                    {t("listing-policy-raise-issue-link")}
                  </InlineLink>
                </em>
              </p>
            </Section>

            <Section>
              <Callout
                image={handEth}
                title={t("page-get-qau-new-to-qau-title")}
                description={t("page-get-qau-new-to-qau-desc")}
              >
                <ButtonLink href="/eth/">
                  {t("page-get-qau-whats-qau-link")}
                </ButtonLink>
              </Callout>
            </Section>

            <Section
              id="country-picker"
              data-flow="skip"
              className="relative flex min-h-[700px] flex-col items-center justify-center rounded-2xl bg-accent-a/5 px-page py-hero-3x dark:bg-accent-a/10"
            >
              <Image
                src={worldMapLight}
                alt=""
                aria-hidden
                sizes="(max-width: 896px) 100vw, 896px"
                className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-auto w-full max-w-4xl rounded-t-2xl select-none dark:hidden"
              />
              <Image
                src={worldMapDark}
                alt=""
                aria-hidden
                sizes="(max-width: 896px) 100vw, 896px"
                className="pointer-events-none absolute inset-x-0 top-0 mx-auto hidden h-auto w-full max-w-4xl rounded-t-2xl select-none dark:block"
              />
              <div className="relative z-10 flex flex-col items-center gap-6">
                <Eyebrow>{t("page-get-qau-exchanges-eyebrow")}</Eyebrow>
                <h2 className="text-center text-h1">
                  {t("page-get-qau-find-exchange-title")}
                </h2>
                <p className="max-w-2xl text-center text-lg text-body-medium">
                  {t("page-get-qau-find-exchange-desc")}
                </p>
              </div>

              {/* CLIENT SIDE */}
              <div className="relative z-10 mt-6 flex w-full flex-col items-center">
                <CentralizedExchanges
                  lastDataUpdateDate={exchangesByCountryLastUpdated}
                />
              </div>
            </Section>

            <Section
              id="safety"
              data-flow="skip"
              className="rounded-2xl bg-background-highlight p-8 md:p-16"
            >
              <Grid balanced={2} className="items-center gap-8">
                <Image
                  src={wallet}
                  className="mx-auto h-auto w-full max-w-sm"
                  sizes={`(max-width: ${screens.sm}) 100vw, (max-width: ${screens.md}) 60vw, calc(${screens["2xl"]} / 2)`}
                  alt=""
                />
                <div className="flex flex-col gap-6">
                  <Eyebrow>{t("page-get-qau-safety-eyebrow")}</Eyebrow>
                  <h2 className="text-h1">{t("page-get-qau-keep-it-safe")}</h2>
                  <p className="text-lg text-body-medium">
                    {t("page-get-qau-description")}
                  </p>
                  <p className="text-lg text-body-medium">
                    {t("page-get-qau-security")}
                  </p>
                </div>
              </Grid>

              <Grid columns={3} className="mt-space-2x">
                <Card variant="nested" href="/wallets/">
                  <CardContent>
                    <CardTitle>
                      {t("page-get-qau-protect-qau-in-wallet")}
                    </CardTitle>
                    <CardParagraph>
                      {t("page-get-qau-protect-qau-desc")}
                    </CardParagraph>
                    <CardLinkFake>
                      {t("page-get-qau-your-address-wallet-link")}
                    </CardLinkFake>
                  </CardContent>
                </Card>

                <Card variant="nested">
                  <CardContent>
                    <CardTitle>{t("page-get-qau-your-address")}</CardTitle>
                    <CardParagraph>
                      {t("page-get-qau-your-address-desc")}
                    </CardParagraph>
                    <div className="select-none">
                      <div className="rounded bg-background-highlight p-2">
                        <p className="mb-0 font-monospace text-xs break-all text-body-medium">
                          0x0125e2478d69eXaMpLe81766fef5c120d30fb53f
                        </p>
                      </div>
                      <p className="mt-2 mb-0 text-end text-xs text-body-medium">
                        {t("page-get-qau-do-not-copy")}
                      </p>
                    </div>
                    <CardParagraph>
                      {t("page-get-qau-your-address-desc-3")}
                    </CardParagraph>
                  </CardContent>
                </Card>

                <Card variant="nested" href="/security/">
                  <CardContent>
                    <CardTitle>
                      {t("page-get-qau-wallet-instructions")}
                    </CardTitle>
                    <CardParagraph>
                      {t("page-get-qau-wallet-instructions-lost")}
                    </CardParagraph>
                    <CardLinkFake>
                      {t("page-get-qau-more-on-security")}
                    </CardLinkFake>
                  </CardContent>
                </Card>
              </Grid>

              <div className="mx-auto mt-space-2x flex w-full max-w-2xl flex-col items-center gap-space">
                <h3 className="text-center">
                  {t("page-get-qau-community-safety")}
                </h3>
                <CardList className="w-full" items={safetyArticles} />
              </div>
            </Section>

            <Section>
              <Callout
                title={t("page-get-qau-use-your-qau")}
                description={t("page-get-qau-use-your-qau-dapps")}
                image={dapps}
                alt=""
              >
                <ButtonLink href="/apps/">
                  {t("page-get-qau-checkout-dapps-btn")}
                </ButtonLink>
              </Callout>

              <FileContributors
                className="my-space-4x border-t"
                contributors={contributors}
                lastEditLocaleTimestamp={lastEditLocaleTimestamp}
              />
            </Section>
          </MainArticle>

          <ContentFeedback />
        </I18nProvider>
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

  const t = await getTranslations("page-get-qau")

  return await getMetadata({
    locale,
    slug: ["get-eth"],
    title: t("page-get-qau-meta-title"),
    description: t("page-get-qau-meta-description"),
  })
}
