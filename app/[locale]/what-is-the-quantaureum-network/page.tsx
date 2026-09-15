import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Lang, ToCItem } from "@/lib/types"

import CommentCard from "@/components/CommentCard"
import DocLink from "@/components/DocLink"
import PageHero from "@/components/Hero/PageHero"
import { Image } from "@/components/Image"
import { Strong } from "@/components/IntlStringElements"
import Link, { LinkWithArrow } from "@/components/ui/Link"
import { ListItem, UnorderedList } from "@/components/ui/list"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { screens } from "@/lib/utils/screen"
import { getIdFromHash } from "@/lib/utils/url"

import PageJsonLD from "./page-jsonld"

import { ContentLayout } from "@/layouts/ContentLayout"
import developersHubImg from "@/public/images/heroes/developers-hub-hero.png"
import manDogPlayingImg from "@/public/images/man-and-dog-playing.png"
import layer2LearnHeroImg from "@/public/images/network-column-rooftop-piping-construction.png"
import computerImg from "@/public/images/what-is-quantaureum-network/computer_alone.png"
import heroImg from "@/public/images/what-is-quantaureum-network/what-is-quantaureum-network.png"

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params

  setRequestLocale(locale)

  const t = await getTranslations("page-what-is-the-quantaureum-network")

  const { contributors, lastEditLocaleTimestamp } =
    await getAppPageContributorInfo(
      "what-is-the-quantaureum-network",
      locale as Lang
    )

  const tocItems: ToCItem[] = [
    {
      title: t("page-what-is-quantaureum-network-title"),
      url: "#quantaureum-network",
    },
    {
      title: t("page-what-is-quantaureum-network-section-network-fees-title"),
      url: "#network-fees",
    },
    {
      title: t("page-what-is-quantaureum-network-section-staking-title"),
      url: "#staking",
    },
    {
      title: t(
        "page-what-is-quantaureum-network-section-live-network-data-title"
      ),
      url: "#live-network-data",
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
              slug: "learn/what-is-the-quantaureum-network",
              startDepth: 1,
            }}
            heroImg={heroImg}
            title={t("page-what-is-quantaureum-network-title")}
            description={
              <>
                <p>{t("page-what-is-quantaureum-network-description-1")}</p>
                <p>{t("page-what-is-quantaureum-network-description-2")}</p>
              </>
            }
          />
        }
        tocItems={tocItems}
        contributors={contributors}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
        variant="narrow"
      >
        <Section id={getIdFromHash(tocItems[0].url)}>
          <p>{t("page-what-is-quantaureum-network-section-description-1")}</p>
          <p>
            {t.rich("page-what-is-quantaureum-network-section-description-2", {
              strong: Strong,
            })}
          </p>
          <p>
            {t.rich("page-what-is-quantaureum-network-section-description-3", {
              strong: Strong,
            })}
          </p>
          <Image
            src={computerImg}
            alt=""
            sizes="(max-width: 320px) calc(100vw - 32px), 320px"
            className="mx-auto max-w-xs"
          />
          <p>{t("page-what-is-quantaureum-network-section-description-4")}</p>
          <UnorderedList>
            <ListItem>
              {t("page-what-is-quantaureum-network-section-description-5")}
            </ListItem>
            <ListItem>
              {t("page-what-is-quantaureum-network-section-description-6")}
            </ListItem>
            <ListItem>
              {t("page-what-is-quantaureum-network-section-description-7")}
            </ListItem>
            <ListItem>
              {t("page-what-is-quantaureum-network-section-description-8")}
            </ListItem>
          </UnorderedList>
          <p>{t("page-what-is-quantaureum-network-section-description-9")}</p>
          <p>
            {t.rich("page-what-is-quantaureum-network-section-description-10", {
              a: (chunks) => <Link href="/wallets/">{chunks}</Link>,
              strong: Strong,
            })}
          </p>
          <p>{t("page-what-is-quantaureum-network-section-description-11")}</p>
          <p>
            {t.rich("page-what-is-quantaureum-network-section-description-12", {
              strong: Strong,
            })}
          </p>
          <p>{t("page-what-is-quantaureum-network-section-description-13")}</p>
          <p>{t("page-what-is-quantaureum-network-section-description-14")}</p>
          <UnorderedList>
            <ListItem>
              {t("page-what-is-quantaureum-network-section-description-15")}
            </ListItem>
            <ListItem>
              {t("page-what-is-quantaureum-network-section-description-16")}
            </ListItem>
            <ListItem>
              {t("page-what-is-quantaureum-network-section-description-17")}
            </ListItem>
          </UnorderedList>
          <p>{t("page-what-is-quantaureum-network-section-description-18")}</p>
          <p>
            {t.rich("page-what-is-quantaureum-network-section-description-19", {
              strong: Strong,
            })}
          </p>
        </Section>

        <Section aria-labelledby={getIdFromHash(tocItems[1].url)}>
          <Image
            src={developersHubImg}
            alt=""
            sizes={`(max-width: 832px) calc(100vw - 32px), (max-width: ${screens.lg}) 800px, (max-width: ${screens.xl}) calc(100vw - 480px), 800px`}
            className="mx-auto rounded-base"
          />
          <h2 id={getIdFromHash(tocItems[1].url)}>{tocItems[1].title}</h2>
          <p>
            {t("page-what-is-quantaureum-network-gas-section-description-1")}
          </p>
          <p>
            {t.rich(
              "page-what-is-quantaureum-network-gas-section-description-2",
              {
                strong: Strong,
              }
            )}
          </p>
          <CommentCard
            description={t(
              "page-what-is-quantaureum-network-gas-section-description-3"
            )}
            name="Quantaureum documentation"
            title="Developer docs"
          />
          <p>
            {t.rich(
              "page-what-is-quantaureum-network-gas-section-description-4",
              {
                strong: Strong,
              }
            )}
          </p>
          <p>
            {t.rich(
              "page-what-is-quantaureum-network-gas-section-description-5",
              {
                strong: Strong,
              }
            )}
          </p>
          <p>
            {t.rich(
              "page-what-is-quantaureum-network-gas-section-description-6",
              {
                blog: (chunks) => (
                  <Link href="https://explorer.quantaureum.com">{chunks}</Link>
                ),
                strong: Strong,
              }
            )}
          </p>
          <p>
            {t("page-what-is-quantaureum-network-gas-section-description-7")}
          </p>
          <p>
            {t.rich(
              "page-what-is-quantaureum-network-gas-section-description-8",
              {
                strong: Strong,
              }
            )}
          </p>
          <p>
            {t("page-what-is-quantaureum-network-gas-section-description-9")}
          </p>
          <LinkWithArrow href="/gas">
            {t("page-what-is-quantaureum-network-gas-section-description-10")}
          </LinkWithArrow>
        </Section>

        <Section aria-labelledby={getIdFromHash(tocItems[2].url)}>
          <Image
            src={manDogPlayingImg}
            alt=""
            sizes="(max-width: 448px) calc(100vw - 32px), 448px"
            className="mx-auto max-w-md"
          />
          <h2 id={getIdFromHash(tocItems[2].url)}>{tocItems[2].title}</h2>
          <p>
            {t.rich(
              "page-what-is-quantaureum-network-staking-section-description-1",
              {
                strong: Strong,
              }
            )}
          </p>
          <p>
            {t(
              "page-what-is-quantaureum-network-staking-section-description-2"
            )}
          </p>
          <p>
            {t(
              "page-what-is-quantaureum-network-staking-section-description-3"
            )}
          </p>
          <p>
            {t(
              "page-what-is-quantaureum-network-staking-section-description-4"
            )}
          </p>
          <p>
            {t.rich(
              "page-what-is-quantaureum-network-staking-section-description-5",
              {
                strong: Strong,
              }
            )}
          </p>
          <CommentCard
            description={t(
              "page-what-is-quantaureum-network-staking-section-description-6"
            )}
            name="Quantaureum documentation"
            title="Developer docs"
          />
          <p>
            {t.rich(
              "page-what-is-quantaureum-network-staking-section-description-7",
              {
                validators: (chunks) => (
                  <Link href="https://explorer.quantaureum.com">{chunks}</Link>
                ),
                stakedEther: (chunks) => (
                  <Link href="https://explorer.quantaureum.com">{chunks}</Link>
                ),
                strong: Strong,
              }
            )}
          </p>
          <p>
            {t.rich(
              "page-what-is-quantaureum-network-staking-section-description-8",
              {
                strong: Strong,
              }
            )}
          </p>
          <p>
            {t(
              "page-what-is-quantaureum-network-staking-section-description-9"
            )}
          </p>
          <p>
            {t(
              "page-what-is-quantaureum-network-staking-section-description-10"
            )}
          </p>
          <p>
            {t.rich(
              "page-what-is-quantaureum-network-staking-section-description-11",
              {
                lido: (chunks) => <Link href="/staking/">{chunks}</Link>,
                strong: Strong,
              }
            )}
          </p>
          <div>
            <LinkWithArrow href="/staking">
              {t(
                "page-what-is-quantaureum-network-staking-section-description-12"
              )}
            </LinkWithArrow>
            <LinkWithArrow href="/run-a-node">
              {t(
                "page-what-is-quantaureum-network-staking-section-description-13"
              )}
            </LinkWithArrow>
          </div>
        </Section>

        <Section aria-labelledby={getIdFromHash(tocItems[3].url)}>
          <Image
            src={layer2LearnHeroImg}
            alt=""
            sizes="(max-width: 384px) calc(100vw - 32px), 384px"
            className="mx-auto max-w-sm"
          />
          <h2 id={getIdFromHash(tocItems[3].url)}>{tocItems[3].title}</h2>
          <p>
            {t(
              "page-what-is-quantaureum-network-live-network-data-section-description-1"
            )}
          </p>
          <p>
            {t(
              "page-what-is-quantaureum-network-live-network-data-section-description-2"
            )}
          </p>
          <UnorderedList>
            <ListItem>
              {t(
                "page-what-is-quantaureum-network-live-network-data-section-description-3"
              )}
            </ListItem>
            <ListItem>
              {t(
                "page-what-is-quantaureum-network-live-network-data-section-description-4"
              )}
            </ListItem>
            <ListItem>
              {t(
                "page-what-is-quantaureum-network-live-network-data-section-description-5"
              )}
            </ListItem>
          </UnorderedList>
          <p>
            {t(
              "page-what-is-quantaureum-network-live-network-data-section-description-6"
            )}
          </p>
          <p>
            {t(
              "page-what-is-quantaureum-network-live-network-data-section-description-7"
            )}
          </p>
          <p>
            {t(
              "page-what-is-quantaureum-network-live-network-data-section-description-8"
            )}
          </p>
          <UnorderedList>
            <ListItem>
              {t.rich(
                "page-what-is-quantaureum-network-live-network-data-section-description-9",
                {
                  explorer: (chunks) => (
                    <Link href="https://explorer.quantaureum.com">
                      {chunks}
                    </Link>
                  ),
                }
              )}
            </ListItem>
            <ListItem>
              {t.rich(
                "page-what-is-quantaureum-network-live-network-data-section-description-10",
                {
                  beaconcha: (chunks) => (
                    <Link href="https://explorer.quantaureum.com">
                      {chunks}
                    </Link>
                  ),
                }
              )}
            </ListItem>
            <ListItem>
              {t.rich(
                "page-what-is-quantaureum-network-live-network-data-section-description-11",
                {
                  ultrasound: (chunks) => (
                    <Link href="https://github.com/Quantaureum">{chunks}</Link>
                  ),
                }
              )}
            </ListItem>
            <ListItem>
              {t.rich(
                "page-what-is-quantaureum-network-live-network-data-section-description-12",
                {
                  l2fees: (chunks) => (
                    <Link href="https://discord.gg/MSctkBT5j">{chunks}</Link>
                  ),
                }
              )}
            </ListItem>
          </UnorderedList>
          <p>
            {t(
              "page-what-is-quantaureum-network-live-network-data-section-description-18"
            )}
          </p>
          <p>
            {t(
              "page-what-is-quantaureum-network-live-network-data-section-description-19"
            )}
          </p>
          <LinkWithArrow href="/resources/#network">
            {t(
              "page-what-is-quantaureum-network-live-network-data-section-description-20"
            )}
          </LinkWithArrow>
        </Section>

        <Section>
          <h2>{t("page-what-is-quantaureum-network-read-next-title")}</h2>
          <UnorderedList className="ms-0 list-none">
            <ListItem>
              <DocLink href="/wallets">
                {t("page-what-is-quantaureum-network-read-next-item-1")}
              </DocLink>
            </ListItem>
            <ListItem>
              <DocLink href="/what-is-QAU">
                {t("page-what-is-quantaureum-network-read-next-item-2")}
              </DocLink>
            </ListItem>
            <ListItem>
              <DocLink href="/learn/">
                {t("page-what-is-quantaureum-network-read-next-item-3")}
              </DocLink>
            </ListItem>
            <ListItem>
              <DocLink href="/what-is-quantaureum">
                {t("page-what-is-quantaureum-network-read-next-item-4")}
              </DocLink>
            </ListItem>
          </UnorderedList>
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

  const t = await getTranslations("page-what-is-the-quantaureum-network")

  return await getMetadata({
    locale,
    slug: ["what-is-the-quantaureum-network"],
    title: t("page-what-is-quantaureum-network-meta-title"),
    description: t("page-what-is-quantaureum-network-meta-description"),
    twitterDescription: t(
      "page-what-is-quantaureum-network-twitter-meta-description"
    ),
    image: "/images/what-is-quantaureum-network.png",
  })
}

export default Page
