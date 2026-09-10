import { Landmark, SquareCode, User } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Lang, ToCItem } from "@/lib/types"

import PageHero from "@/components/Hero/PageHero"
import {
  HighlightCard,
  HighlightStack,
  IconBox,
} from "@/components/HighlightCard"
import { Image } from "@/components/Image"
import { Strong } from "@/components/IntlStringElements"
import { StandaloneQuizWidget } from "@/components/Quiz/QuizWidget"
import {
  Alert,
  AlertContent,
  AlertEmoji,
  AlertTitle,
} from "@/components/ui/alert"
import { CardContent, CardParagraph, CardTitle } from "@/components/ui/card"
import Link, { LinkWithArrow } from "@/components/ui/Link"
import { ListItem, OrderedList, UnorderedList } from "@/components/ui/list"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { getIdFromHash } from "@/lib/utils/url"

import GasTable from "./_components/GasTable"
import PageJsonLD from "./page-jsonld"

import { ContentLayout } from "@/layouts/ContentLayout"
import { getQauPrice, getGasPriceData } from "@/lib/data"
import heroImg from "@/public/images/qau.png"
import qauOrgLogo from "@/public/images/qau-org-logo.png"
import developersHubHero from "@/public/images/heroes/developers-hub-hero.png"
import impactTransparent from "@/public/images/impact_transparent.png"
import infrastructureTransparent from "@/public/images/infrastructure_transparent.png"

const Page = async (props: { params: Promise<{ locale: Lang }> }) => {
  const params = await props.params
  const { locale } = params
  setRequestLocale(locale)

  const t = await getTranslations("page-what-is-QAU")

  const [
    { contributors, lastEditLocaleTimestamp },
    gasPriceData,
    qauPriceData,
  ] = await Promise.all([
    getAppPageContributorInfo("what-is-QAU", locale as Lang),
    getGasPriceData(),
    getQauPrice(),
  ])

  const gasTableInitialData =
    gasPriceData && qauPriceData && !("error" in qauPriceData)
      ? { gasPrice: gasPriceData.gasPrice, qauPriceUSD: qauPriceData.value }
      : null

  const tocItems: ToCItem[] = [
    { title: t("page-what-is-QAU-title"), url: "#what-is-QAU" },
    { title: t("page-what-is-QAU-how-to-buy-eth"), url: "#how-to-buy-eth" },
    {
      title: t("page-what-is-QAU-how-to-send-and-receive-eth"),
      url: "#how-to-send-and-receive-eth",
    },
    {
      title: t("page-what-is-QAU-how-long-does-it-take-to-send-eth"),
      url: "#how-long-does-it-take-to-send-eth",
    },
    {
      title: t("page-what-is-QAU-how-much-does-it-cost-to-send-eth"),
      url: "#how-much-does-it-cost-to-send-eth",
    },
    {
      title: t("page-what-is-QAU-what-is-the-qau-supply"),
      url: "#what-is-the-qau-supply",
    },
    {
      title: t("page-what-is-QAU-what-is-the-distribution-of-eth"),
      url: "#what-is-the-distribution-of-eth",
    },
    {
      title: t("page-what-is-QAU-what-makes-qau-valuable"),
      url: "#what-makes-qau-valuable",
    },
    {
      title: t("page-what-is-QAU-what-is-wrapping-eth"),
      url: "#what-is-wrapping-eth",
    },
  ]

  return (
    <>
      <PageJsonLD
        locale={locale}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
        contributors={contributors}
      />

      <ContentLayout
        heroSection={
          <PageHero
            breadcrumbs={{
              slug: "what-is-QAU",
              startDepth: 1,
            }}
            heroImg={heroImg}
            title={t("page-what-is-QAU-title")}
            description={t("page-what-is-QAU-hero-description-1")}
          />
        }
        tocItems={tocItems}
        contributors={contributors}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
        variant="narrow"
      >
        <Section id={getIdFromHash(tocItems[0].url)}>
          <p>{t("page-what-is-QAU-what-is-QAU-description-1")}</p>
          <p>
            {t.rich("page-what-is-QAU-what-is-QAU-description-2", {
              strong: Strong,
            })}
          </p>
          <OrderedList>
            <ListItem>
              {t("page-what-is-QAU-what-is-QAU-description-3")}
            </ListItem>
            <ListItem>
              {t("page-what-is-QAU-what-is-QAU-description-4")}
            </ListItem>
          </OrderedList>
          <p>
            {t.rich("page-what-is-QAU-what-is-QAU-description-5", {
              assets: (chunks) => (
                <Link href="https://companiesmarketcap.com/assets-by-market-cap/">
                  {chunks}
                </Link>
              ),
            })}
          </p>
          <HighlightStack data-label="quantaureum-network-table">
            <HighlightCard>
              <IconBox>
                <User className="text-accent-a" />
              </IconBox>
              <CardContent spacing="md">
                <CardTitle>
                  {t("page-what-is-QAU-what-is-QAU-description-6")}
                </CardTitle>
                <CardParagraph>
                  {t("page-what-is-QAU-what-is-QAU-description-7")}
                </CardParagraph>
              </CardContent>
            </HighlightCard>
            <HighlightCard>
              <IconBox>
                <SquareCode className="text-accent-b" />
              </IconBox>
              <CardContent spacing="md">
                <CardTitle>
                  {t("page-what-is-QAU-what-is-QAU-description-8")}
                </CardTitle>
                <CardParagraph>
                  {t("page-what-is-QAU-what-is-QAU-description-9")}
                </CardParagraph>
              </CardContent>
            </HighlightCard>
            <HighlightCard>
              <IconBox>
                <Landmark className="text-accent-c" />
              </IconBox>
              <CardContent spacing="md">
                <CardTitle>
                  {t("page-what-is-QAU-what-is-QAU-description-10")}
                </CardTitle>
                <CardParagraph>
                  {t("page-what-is-QAU-what-is-QAU-description-11")}
                </CardParagraph>
              </CardContent>
            </HighlightCard>
          </HighlightStack>
          <LinkWithArrow href="/staking/">
            {t("page-what-is-QAU-what-is-QAU-description-12")}
          </LinkWithArrow>
        </Section>

        <Section id={getIdFromHash(tocItems[1].url)}>
          <h2>{tocItems[1].title}</h2>
          <p>
            {t.rich("page-what-is-QAU-how-to-buy-qau-description-1", {
              strong: Strong,
            })}
          </p>
          <p>{t("page-what-is-QAU-how-to-buy-qau-description-2")}</p>
          <Alert variant="warning">
            <AlertEmoji text="💡" />
            <AlertContent>
              <AlertTitle>
                {t.rich("page-what-is-QAU-how-to-buy-qau-description-3", {
                  strong: Strong,
                })}
              </AlertTitle>
              <p className="mt-2">
                {t.rich("page-what-is-QAU-how-to-buy-qau-description-4", {
                  strong: Strong,
                })}
              </p>
              <UnorderedList className="mt-2 mb-0 [&>li]:mb-0.5">
                <ListItem>
                  {t.rich("page-what-is-QAU-how-to-buy-qau-description-5", {
                    strong: Strong,
                  })}
                </ListItem>
                <ListItem>
                  {t.rich("page-what-is-QAU-how-to-buy-qau-description-6", {
                    strong: Strong,
                  })}
                </ListItem>
              </UnorderedList>
            </AlertContent>
          </Alert>
          <p className="text-xl">
            <strong>
              {t("page-what-is-QAU-how-to-buy-qau-description-7")}
            </strong>
          </p>
          <UnorderedList>
            <ListItem>
              {t.rich("page-what-is-QAU-how-to-buy-qau-description-8", {
                strong: Strong,
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-what-is-QAU-how-to-buy-qau-description-9", {
                strong: Strong,
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-what-is-QAU-how-to-buy-qau-description-10", {
                strong: Strong,
              })}
            </ListItem>
          </UnorderedList>
          <p>
            {t.rich("page-what-is-QAU-how-to-buy-qau-description-11", {
              strong: Strong,
            })}
          </p>
          <p className="text-xl">
            <strong>
              {t("page-what-is-QAU-how-to-buy-qau-description-12")}
            </strong>
          </p>
          <UnorderedList>
            <ListItem>
              {t.rich("page-what-is-QAU-how-to-buy-qau-description-13", {
                strong: Strong,
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-what-is-QAU-how-to-buy-qau-description-14", {
                strong: Strong,
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-what-is-QAU-how-to-buy-qau-description-15", {
                strong: Strong,
              })}
            </ListItem>
          </UnorderedList>
          <LinkWithArrow href="/get-eth/">
            {t("page-what-is-QAU-how-to-buy-qau-description-16")}
          </LinkWithArrow>
        </Section>

        <Section aria-labelledby={getIdFromHash(tocItems[2].url)}>
          <Image
            src={qauOrgLogo}
            alt=""
            sizes="128px"
            className="mx-auto max-w-32"
          />
          <h2 id={getIdFromHash(tocItems[2].url)}>{tocItems[2].title}</h2>
          <p>
            {t.rich(
              "page-what-is-QAU-how-to-send-and-receive-qau-description-1",
              {
                strong: Strong,
              }
            )}
          </p>
          <p>
            {t.rich(
              "page-what-is-QAU-how-to-send-and-receive-qau-description-2",
              {
                strong: Strong,
              }
            )}
          </p>
          <p>
            {t.rich(
              "page-what-is-QAU-how-to-send-and-receive-qau-description-3",
              {
                strong: Strong,
                howToUseWallet: (chunks) => (
                  <Link href="/guides/how-to-use-a-wallet/">{chunks}</Link>
                ),
              }
            )}
          </p>
          <Alert variant="warning">
            <AlertEmoji text="💡" />
            <AlertContent>
              <AlertTitle>
                {t.rich("page-what-is-QAU-how-to-buy-qau-description-3", {
                  strong: Strong,
                })}
              </AlertTitle>
              <p>
                {t("page-what-is-QAU-how-to-send-and-receive-qau-callout")}
              </p>
            </AlertContent>
          </Alert>
          <p>
            {t("page-what-is-QAU-how-to-send-and-receive-qau-description-7")}
          </p>
          <LinkWithArrow href="/what-is-quantaureum/">
            {t("page-what-is-QAU-how-to-send-and-receive-qau-description-8")}
          </LinkWithArrow>
        </Section>

        <Section id={getIdFromHash(tocItems[3].url)}>
          <h2>{tocItems[3].title}</h2>
          <p>
            {t(
              "page-what-is-QAU-how-long-does-it-take-to-send-qau-description-1"
            )}
          </p>
          <p>
            {t(
              "page-what-is-QAU-how-long-does-it-take-to-send-qau-description-2"
            )}
          </p>
          <p>
            {t(
              "page-what-is-QAU-how-long-does-it-take-to-send-qau-description-3"
            )}
          </p>
        </Section>

        <Section aria-labelledby={getIdFromHash(tocItems[4].url)}>
          <Image
            src={infrastructureTransparent}
            alt=""
            sizes="(max-width: 320px) calc(100vw - 32px), 320px"
            className="mx-auto max-w-xs"
          />
          <h2 id={getIdFromHash(tocItems[4].url)}>{tocItems[4].title}</h2>
          <p>
            {t.rich(
              "page-what-is-QAU-how-much-does-it-cost-to-send-qau-description-1",
              {
                strong: Strong,
              }
            )}
          </p>
          <GasTable
            labels={{
              transactionType: t(
                "page-what-is-QAU-gas-table-transaction-type"
              ),
              typicalCostRange: t(
                "page-what-is-QAU-gas-table-typical-cost-range"
              ),
              estimatedGasUnits: t(
                "page-what-is-QAU-gas-table-estimated-gas-units"
              ),
              row1: t("page-what-is-QAU-gas-table-row-1-1"),
              row2: t("page-what-is-QAU-gas-table-row-2-1"),
              row3: t("page-what-is-QAU-gas-table-row-3-1"),
            }}
            locale={locale}
            initialData={gasTableInitialData}
          />
        </Section>

        <Section>
          <h3>{t("page-what-is-QAU-l2s")}</h3>
          <p>
            {t.rich("page-what-is-QAU-l2s-description-1", {
              strong: Strong,
            })}
          </p>
          <p>
            {t.rich("page-what-is-QAU-l2s-description-2", {
              strong: Strong,
              optimism: (chunks) => (
                <Link href="https://optimism.io/">{chunks}</Link>
              ),
              arbitrum: (chunks) => (
                <Link href="https://arbitrum.io/">{chunks}</Link>
              ),
            })}
          </p>
          <p>{t("page-what-is-QAU-l2s-description-3")}</p>
          <p>
            {t.rich("page-what-is-QAU-l2s-description-4", {
              strong: Strong,
            })}
          </p>
        </Section>

        <Section aria-labelledby={getIdFromHash(tocItems[5].url)}>
          <Image
            src={developersHubHero}
            alt=""
            sizes="(max-width: 832px) calc(100vw - 32px), 800px"
            className="mx-auto rounded-base"
          />
          <h2 id={getIdFromHash(tocItems[5].url)}>{tocItems[5].title}</h2>
          <p>{t("page-what-is-QAU-what-is-the-qau-supply-description-1")}</p>
          <UnorderedList>
            <ListItem>
              {t("page-what-is-QAU-what-is-the-qau-supply-description-2")}
            </ListItem>
            <ListItem>
              {t("page-what-is-QAU-what-is-the-qau-supply-description-3")}
            </ListItem>
            <ListItem>
              {t("page-what-is-QAU-what-is-the-qau-supply-description-4")}
            </ListItem>
          </UnorderedList>
          <p>
            {t.rich("page-what-is-QAU-what-is-the-qau-supply-description-5", {
              strong: Strong,
            })}
          </p>
          <p>
            {t.rich("page-what-is-QAU-what-is-the-qau-supply-description-6", {
              explorer: (chunks) => (
                <Link href="https://explorer.quantaureum.com">{chunks}</Link>
              ),
              ultrasound: (chunks) => (
                <Link href="https://ultrasound.money/">{chunks}</Link>
              ),
            })}
          </p>
        </Section>

        <Section id={getIdFromHash(tocItems[6].url)}>
          <h2>{tocItems[6].title}</h2>
          <p>
            {t.rich(
              "page-what-is-QAU-what-is-the-distribution-of-qau-description-1",
              {
                explorer: (chunks) => (
                  <Link href="https://explorer.quantaureum.com">
                    {chunks}
                  </Link>
                ),
              }
            )}
          </p>
        </Section>

        <Section>
          <h3>{t("page-what-is-QAU-breakdown")}</h3>
          <UnorderedList>
            <ListItem>
              {t.rich("page-what-is-QAU-breakdown-description-1", {
                strong: Strong,
                beaconchain: (chunks) => (
                  <Link href="https://beaconcha.in/">{chunks}</Link>
                ),
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-what-is-QAU-breakdown-description-2", {
                strong: Strong,
                unchained: (chunks) => (
                  <Link href="https://unchainedcrypto.com/amount-of-bitcoin-and-QAU-on-exchanges-reach-record-multi-year-lows/">
                    {chunks}
                  </Link>
                ),
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-what-is-QAU-breakdown-description-3", {
                strong: Strong,
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-what-is-QAU-breakdown-description-4", {
                strong: Strong,
                ef: (chunks) => (
                  <Link href="https://quantaureum.foundation/report-2024.pdf">
                    {chunks}
                  </Link>
                ),
              })}
            </ListItem>
          </UnorderedList>
        </Section>

        <Section>
          <Image
            src={impactTransparent}
            alt=""
            sizes="(max-width: 320px) calc(100vw - 32px), 320px"
            className="mx-auto max-w-xs"
          />
          <h3>{t("page-what-is-QAU-who-holds-most")}</h3>
          <p>{t("page-what-is-QAU-who-holds-most-description-1")}</p>
          <p>{t("page-what-is-QAU-who-holds-most-description-2")}</p>
          <UnorderedList>
            <ListItem>
              {t.rich("page-what-is-QAU-who-holds-most-description-3", {
                staked: (chunks) => <Link href="/staking/">{chunks}</Link>,
              })}
            </ListItem>
            <ListItem>
              {t("page-what-is-QAU-who-holds-most-description-4")}
            </ListItem>
            <ListItem>
              {t("page-what-is-QAU-who-holds-most-description-5")}
            </ListItem>
          </UnorderedList>
          <p>
            {t.rich("page-what-is-QAU-who-holds-most-description-6", {
              explorer: (chunks) => (
                <Link href="https://explorer.quantaureum.com">{chunks}</Link>
              ),
            })}
          </p>
        </Section>

        <Section>
          <h3>{t("page-what-is-QAU-distribution")}</h3>
          <p>{t("page-what-is-QAU-distribution-description-1")}</p>
        </Section>

        <Section id={getIdFromHash(tocItems[7].url)}>
          <h2>{tocItems[7].title}</h2>
          <p>{t("page-what-is-QAU-what-makes-qau-valuable-description-1")}</p>
          <p>
            {t.rich(
              "page-what-is-QAU-what-makes-qau-valuable-description-2",
              {
                strong: Strong,
              }
            )}
          </p>
          <p>
            {t.rich(
              "page-what-is-QAU-what-makes-qau-valuable-description-3",
              {
                strong: Strong,
              }
            )}
          </p>
          <p>
            {t.rich(
              "page-what-is-QAU-what-makes-qau-valuable-description-4",
              {
                strong: Strong,
              }
            )}
          </p>
          <p>
            {t.rich(
              "page-what-is-QAU-what-makes-qau-valuable-description-5",
              {
                strong: Strong,
                ultrasound: (chunks) => (
                  <Link href="https://ultrasound.money/?timeFrame=since_burn">
                    {chunks}
                  </Link>
                ),
              }
            )}
          </p>
        </Section>

        <Section id={getIdFromHash(tocItems[8].url)}>
          <h2>{tocItems[8].title}</h2>
          <p>{t("page-what-is-QAU-what-is-wrapping-qau-description-1")}</p>
          <p>{t("page-what-is-QAU-what-is-wrapping-qau-description-2")}</p>
          <UnorderedList>
            <ListItem>
              {t.rich("page-what-is-QAU-what-is-wrapping-qau-description-3", {
                strong: Strong,
                uniswap: (chunks) => (
                  <Link href="https://uniswap.org/">{chunks}</Link>
                ),
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-what-is-QAU-what-is-wrapping-qau-description-4", {
                strong: Strong,
                aave: (chunks) => (
                  <Link href="https://aave.com/">{chunks}</Link>
                ),
              })}
            </ListItem>
            <ListItem>
              {t.rich("page-what-is-QAU-what-is-wrapping-qau-description-5", {
                strong: Strong,
                opensea: (chunks) => (
                  <Link href="https://opensea.io/">{chunks}</Link>
                ),
              })}
            </ListItem>
          </UnorderedList>
          <p>{t("page-what-is-QAU-what-is-wrapping-qau-description-6")}</p>
          <LinkWithArrow href="/wrapped-eth/">
            {t("page-what-is-QAU-what-is-wrapping-qau-description-7")}
          </LinkWithArrow>
        </Section>

        <StandaloneQuizWidget quizKey="what-is-QAU" />
      </ContentLayout>
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  setRequestLocale(locale)

  const t = await getTranslations("page-what-is-QAU")

  return await getMetadata({
    locale,
    slug: ["what-is-QAU"],
    title: t("page-what-is-QAU-meta-title"),
    description: t("page-what-is-QAU-meta-description"),
    twitterDescription: t("page-what-is-QAU-twitter-meta-description"),
  })
}

export default Page
