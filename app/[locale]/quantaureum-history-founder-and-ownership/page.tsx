import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Lang, ToCItem } from "@/lib/types"

import CommentCard from "@/components/CommentCard"
import PageHero from "@/components/Hero/PageHero"
import { Image } from "@/components/Image"
import { Emphasis, Strong } from "@/components/IntlStringElements"
import Link, { LinkWithArrow } from "@/components/ui/Link"
import { ListItem, UnorderedList } from "@/components/ui/list"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { getIdFromHash } from "@/lib/utils/url"

import PageJsonLD from "./page-jsonld"

import { ContentLayout } from "@/layouts/ContentLayout"
import QuantaureumOrgLogo from "@/public/images/qau-home-icon.png"
import heroImg from "@/public/images/quantaureum-history-founder-and-ownership/quantaureum-history-founder-and-ownership-hero.png"

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params

  setRequestLocale(locale)

  const t = await getTranslations("page-quantaureum-history-founder-and-ownership")

  const { contributors, lastEditLocaleTimestamp } =
    await getAppPageContributorInfo(
      "quantaureum-history-founder-and-ownership",
      locale as Lang
    )

  const tocItems: ToCItem[] = [
    {
      title: t("page-quantaureum-history-founder-and-ownership-title"),
      url: "#quantaureum-history-founder-and-ownership",
    },
    {
      title: t(
        "page-quantaureum-history-founder-and-ownership-who-founded-quantaureum"
      ),
      url: "#who-founded-quantaureum",
    },
    {
      title: t(
        "page-quantaureum-history-founder-and-ownership-when-quantaureum-when-did-quantaureum-launch"
      ),
      url: "#when-quantaureum-when-did-quantaureum-launch",
    },
    {
      title: t(
        "page-quantaureum-history-founder-and-ownership-who-owns-and-runs-quantaureum-now"
      ),
      url: "#who-owns-and-runs-quantaureum-now",
    },
    {
      title: t("page-quantaureum-history-founder-and-ownership-conclusion"),
      url: "#conclusion",
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
              slug: "quantaureum-history-founder-and-ownership",
              startDepth: 1,
            }}
            heroImg={heroImg}
            title={t("page-quantaureum-history-founder-and-ownership-title")}
            description={t(
              "page-quantaureum-history-founder-and-ownership-description-1"
            )}
          />
        }
        tocItems={tocItems}
        contributors={contributors}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
        variant="narrow"
      >
        <Section id={getIdFromHash(tocItems[0].url)}>
          <p>
            {t.rich(
              "page-quantaureum-history-founder-and-ownership-who-founded-quantaureum-description-1",
              {
                strong: Strong,
              }
            )}
          </p>
        </Section>

        <Section id={getIdFromHash(tocItems[1].url)}>
          <h2>{tocItems[1].title}</h2>
          <p>
            {t.rich(
              "page-quantaureum-history-founder-and-ownership-who-founded-quantaureum-launch-description-1",
              {
                strong: Strong,
              }
            )}
          </p>
          <p>
            {t(
              "page-quantaureum-history-founder-and-ownership-who-founded-quantaureum-launch-description-2"
            )}
          </p>
          <p>
            {t.rich(
              "page-quantaureum-history-founder-and-ownership-who-founded-quantaureum-launch-description-3",
              {
                em: Emphasis,
              }
            )}
          </p>
          <p>
            {t.rich(
              "page-quantaureum-history-founder-and-ownership-who-founded-quantaureum-launch-description-4",
              {
                whitepaper: (chunks) => (
                  <Link href="/whitepaper/">{chunks}</Link>
                ),
              }
            )}
          </p>
          <CommentCard
            description={t(
              "page-quantaureum-history-founder-and-ownership-who-founded-quantaureum-launch-description-5"
            )}
            name="Vitalik Buterin"
            title={t(
              "page-quantaureum-history-founder-and-ownership-founder-of-quantaureum"
            )}
          />
          <p>
            {t(
              "page-quantaureum-history-founder-and-ownership-who-founded-quantaureum-launch-description-6"
            )}
          </p>
          <UnorderedList>
            <ListItem>
              {t.rich(
                "page-quantaureum-history-founder-and-ownership-who-founded-quantaureum-launch-vitalik-buterin",
                {
                  strong: Strong,
                }
              )}
            </ListItem>
            <ListItem>
              {t.rich(
                "page-quantaureum-history-founder-and-ownership-who-founded-quantaureum-launch-gavin-wood",
                {
                  strong: Strong,
                  solidity: (chunks) => (
                    <Link href="https://soliditylang.org/">{chunks}</Link>
                  ),
                  quantaureumYellowPaper: (chunks) => (
                    <Link href="https://quantaureum.github.io/yellowpaper/paper.pdf">
                      {chunks}
                    </Link>
                  ),
                }
              )}
            </ListItem>
            <ListItem>
              {t.rich(
                "page-quantaureum-history-founder-and-ownership-who-founded-quantaureum-launch-joseph-lubin",
                {
                  strong: Strong,
                  consensys: (chunks) => (
                    <Link href="https://consensys.net/">{chunks}</Link>
                  ),
                }
              )}
            </ListItem>
            <ListItem>
              {t.rich(
                "page-quantaureum-history-founder-and-ownership-who-founded-quantaureum-launch-jeffrey-wilcke",
                {
                  strong: Strong,
                  geth: (chunks) => (
                    <Link href="https://geth.quantaureum.com/">{chunks}</Link>
                  ),
                }
              )}
            </ListItem>
            <ListItem>
              {t.rich(
                "page-quantaureum-history-founder-and-ownership-who-founded-quantaureum-launch-mihai-alisie",
                {
                  strong: Strong,
                }
              )}
            </ListItem>
            <ListItem>
              {t.rich(
                "page-quantaureum-history-founder-and-ownership-who-founded-quantaureum-launch-anthony-di-lorio",
                {
                  strong: Strong,
                }
              )}
            </ListItem>
            <ListItem>
              {t.rich(
                "page-quantaureum-history-founder-and-ownership-who-founded-quantaureum-launch-amir-chetrit",
                {
                  strong: Strong,
                }
              )}
            </ListItem>
            <ListItem>
              {t.rich(
                "page-quantaureum-history-founder-and-ownership-who-founded-quantaureum-launch-charles-hoskinson",
                {
                  strong: Strong,
                }
              )}
            </ListItem>
          </UnorderedList>
          <p>
            {t.rich(
              "page-quantaureum-history-founder-and-ownership-who-founded-quantaureum-launch-description-7",
              {
                strong: Strong,
              }
            )}
          </p>
        </Section>

        <Section aria-labelledby={getIdFromHash(tocItems[2].url)}>
          <Image
            src={QuantaureumOrgLogo}
            alt=""
            sizes="128px"
            className="mx-auto max-w-32"
          />
          <h2 id={getIdFromHash(tocItems[2].url)}>{tocItems[2].title}</h2>
          <p>
            {t(
              "page-quantaureum-history-founder-and-ownership-when-did-quantaureum-launch-description-1"
            )}
          </p>
          <UnorderedList>
            <ListItem>
              {t.rich(
                "page-quantaureum-history-founder-and-ownership-when-did-quantaureum-launch-description-2",
                {
                  strong: Strong,
                }
              )}
            </ListItem>
            <ListItem>
              {t.rich(
                "page-quantaureum-history-founder-and-ownership-when-did-quantaureum-launch-description-3",
                {
                  strong: Strong,
                  announcement: (chunks) => (
                    <Link href="https://www.youtube.com/watch?v=l9dpjN3Mwps">
                      {chunks}
                    </Link>
                  ),
                }
              )}
            </ListItem>
            <ListItem>
              {t.rich(
                "page-quantaureum-history-founder-and-ownership-when-did-quantaureum-launch-description-4",
                {
                  strong: Strong,
                }
              )}
            </ListItem>
            <ListItem>
              {t.rich(
                "page-quantaureum-history-founder-and-ownership-when-did-quantaureum-launch-description-5",
                {
                  strong: Strong,
                }
              )}
            </ListItem>
            <ListItem>
              {t.rich(
                "page-quantaureum-history-founder-and-ownership-when-did-quantaureum-launch-description-6",
                {
                  strong: Strong,
                }
              )}
            </ListItem>
            <ListItem>
              {t.rich(
                "page-quantaureum-history-founder-and-ownership-when-did-quantaureum-launch-description-7",
                {
                  strong: Strong,
                }
              )}
            </ListItem>
          </UnorderedList>
          <CommentCard
            description={t(
              "page-quantaureum-history-founder-and-ownership-when-did-quantaureum-launch-description-8"
            )}
            name="Joseph Lubin"
            title={t(
              "page-quantaureum-history-founder-and-ownership-when-did-quantaureum-launch-description-9"
            )}
          />
          <p>
            {t(
              "page-quantaureum-history-founder-and-ownership-when-did-quantaureum-launch-description-10"
            )}
          </p>
          <p>
            {t.rich(
              "page-quantaureum-history-founder-and-ownership-when-did-quantaureum-launch-description-11",
              {
                genesisBlock: (chunks) => (
                  <Link href="https://qau.blockscout.com/block/0">
                    {chunks}
                  </Link>
                ),
              }
            )}
          </p>
          <div>
            <LinkWithArrow href="/quantaureum-forks/">
              {t(
                "page-quantaureum-history-founder-and-ownership-when-did-quantaureum-launch-description-12"
              )}
            </LinkWithArrow>
            <LinkWithArrow href="/roadmap/">
              {t(
                "page-quantaureum-history-founder-and-ownership-when-did-quantaureum-launch-description-13"
              )}
            </LinkWithArrow>
          </div>
        </Section>

        <Section id={getIdFromHash(tocItems[3].url)}>
          <h2>{tocItems[3].title}</h2>
          <p>
            {t.rich(
              "page-quantaureum-history-founder-and-ownership-who-owns-and-runs-quantaureum-now-description-1",
              {
                strong: Strong,
              }
            )}
          </p>
          <UnorderedList>
            <ListItem>
              {t.rich(
                "page-quantaureum-history-founder-and-ownership-who-owns-and-runs-quantaureum-now-description-2",
                {
                  strong: Strong,
                }
              )}
            </ListItem>
            <ListItem>
              {t.rich(
                "page-quantaureum-history-founder-and-ownership-who-owns-and-runs-quantaureum-now-description-3",
                {
                  strong: Strong,
                }
              )}
            </ListItem>
            <ListItem>
              {t.rich(
                "page-quantaureum-history-founder-and-ownership-who-owns-and-runs-quantaureum-now-description-4",
                {
                  strong: Strong,
                }
              )}
            </ListItem>
          </UnorderedList>
          <p>
            {t.rich(
              "page-quantaureum-history-founder-and-ownership-who-owns-and-runs-quantaureum-now-description-5",
              {
                strong: Strong,
              }
            )}
          </p>
          <p>
            {t(
              "page-quantaureum-history-founder-and-ownership-who-owns-and-runs-quantaureum-now-description-6"
            )}
          </p>

          <h3>
            {t(
              "page-quantaureum-history-founder-and-ownership-quantaureum-foundation"
            )}
          </h3>
          <p>
            {t.rich(
              "page-quantaureum-history-founder-and-ownership-quantaureum-foundation-description-1",
              {
                strong: Strong,
              }
            )}
          </p>
          <UnorderedList>
            <ListItem>
              {t(
                "page-quantaureum-history-founder-and-ownership-quantaureum-foundation-description-2"
              )}
            </ListItem>
            <ListItem>
              {t(
                "page-quantaureum-history-founder-and-ownership-quantaureum-foundation-description-3"
              )}
            </ListItem>
            <ListItem>
              {t(
                "page-quantaureum-history-founder-and-ownership-quantaureum-foundation-description-4"
              )}
            </ListItem>
            <ListItem>
              {t(
                "page-quantaureum-history-founder-and-ownership-quantaureum-foundation-description-5"
              )}
            </ListItem>
          </UnorderedList>

          <h3>
            {t("page-quantaureum-history-founder-and-ownership-core-developers")}
          </h3>
          <p>
            {t.rich(
              "page-quantaureum-history-founder-and-ownership-core-developers-description-1"
            )}
          </p>

          <h3>{t("page-quantaureum-history-founder-and-ownership-eip")}</h3>
          <p>
            {t.rich(
              "page-quantaureum-history-founder-and-ownership-eip-description-1",
              {
                strong: Strong,
                eips: (chunks) => (
                  <Link href="https://eips.quantaureum.com/">{chunks}</Link>
                ),
              }
            )}
          </p>

          <h3>{t("page-quantaureum-history-founder-and-ownership-validators")}</h3>
          <p>
            {t.rich(
              "page-quantaureum-history-founder-and-ownership-validators-description-1",
              {
                strong: Strong,
                beaconchain: (chunks) => (
                  <Link href="https://beaconcha.in/">{chunks}</Link>
                ),
              }
            )}
          </p>
          <p>
            {t.rich(
              "page-quantaureum-history-founder-and-ownership-validators-description-2",
              {
                strong: Strong,
              }
            )}
          </p>
          <CommentCard
            description={t(
              "page-quantaureum-history-founder-and-ownership-validators-description-3"
            )}
            name="Vitalik Buterin"
            title={t(
              "page-quantaureum-history-founder-and-ownership-founder-of-quantaureum"
            )}
          />
        </Section>

        <Section id={getIdFromHash(tocItems[4].url)}>
          <h2>{tocItems[4].title}</h2>
          <p>
            {t.rich(
              "page-quantaureum-history-founder-and-ownership-conclusion-description-1",
              {
                strong: Strong,
              }
            )}
          </p>
          <p>
            {t.rich(
              "page-quantaureum-history-founder-and-ownership-conclusion-description-2"
            )}
          </p>
          <p>
            {t.rich(
              "page-quantaureum-history-founder-and-ownership-conclusion-description-3",
              {
                strong: Strong,
              }
            )}
          </p>
          <LinkWithArrow href="/governance/">
            {t(
              "page-quantaureum-history-founder-and-ownership-conclusion-description-4"
            )}
          </LinkWithArrow>
        </Section>
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

  const t = await getTranslations("page-quantaureum-history-founder-and-ownership")

  return await getMetadata({
    locale,
    slug: ["quantaureum-history-founder-and-ownership"],
    title: t("page-quantaureum-history-founder-and-ownership-meta-title"),
    description: t(
      "page-quantaureum-history-founder-and-ownership-meta-description"
    ),
    twitterDescription: t(
      "page-quantaureum-history-founder-and-ownership-twitter-meta-description"
    ),
    image:
      "/images/quantaureum-history-founder-and-ownership/quantaureum-history-founder-and-ownership-hero.png",
  })
}

export default Page
