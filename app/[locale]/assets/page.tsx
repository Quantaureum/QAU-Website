import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import AssetDownload, {
  type AssetDownloadProps,
} from "@/components/AssetDownload"
import ContentFeedback from "@/components/ContentFeedback"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import { Grid } from "@/components/ui/grid"
import InlineLink from "@/components/ui/Link"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"

import AssetsJsonLD from "./page-jsonld"

import qauDiamondBlack from "@/public/images/assets/qau-mark-black.png"
import qauDiamondBlackGray from "@/public/images/assets/qau-mark-black-gray.png"
import qauDiamondBlackWhite from "@/public/images/assets/qau-mark-black-white.jpg"
import qauDiamondGlyph from "@/public/images/assets/qau-mark-glyph.png"
import qauDiamondPurple from "@/public/images/assets/qau-mark-purple.png"
import qauDiamondPurplePurple from "@/public/images/assets/qau-mark-purple-purple.png"
import qauDiamondPurpleWhite from "@/public/images/assets/qau-mark-purple-white.jpg"
import qauDiamondColor from "@/public/images/assets/qau-mark-rainbow.png"
import qauGlyphColored from "@/public/images/assets/qau-glyph-colored.png"
import qauLandscapeBlack from "@/public/images/assets/quantaureum-logo-landscape-black.png"
import qauLandscapeBlackGray from "@/public/images/assets/quantaureum-logo-landscape-black-gray.png"
import qauLandscapePurple from "@/public/images/assets/quantaureum-logo-landscape-purple.png"
import qauLandscapePurplePurple from "@/public/images/assets/quantaureum-logo-landscape-purple-purple.png"
import qauLandscapePurpleWhite from "@/public/images/assets/quantaureum-logo-landscape-purple-white.png"
import qauPortraitBlack from "@/public/images/assets/quantaureum-logo-portrait-black.png"
import qauPortraitBlackGray from "@/public/images/assets/quantaureum-logo-portrait-black-gray.png"
import qauPortraitPurple from "@/public/images/assets/quantaureum-logo-portrait-purple.png"
import qauPortraitPurplePurple from "@/public/images/assets/quantaureum-logo-portrait-purple-purple.png"
import qauPortraitPurpleWhite from "@/public/images/assets/quantaureum-logo-portrait-purple-white.png"
import qauWordmarkBlack from "@/public/images/assets/quantaureum-wordmark-black.png"
import qauWordmarkBlackGray from "@/public/images/assets/quantaureum-wordmark-black-gray.png"
import qauWordmarkPurple from "@/public/images/assets/quantaureum-wordmark-purple.png"
import qauWordmarkPurplePurple from "@/public/images/assets/quantaureum-wordmark-purple-purple.png"
import qauWordmarkPurpleWhite from "@/public/images/assets/quantaureum-wordmark-purple-white.png"
import developers from "@/public/images/developers-qau-blocks.png"
import doge from "@/public/images/doge-computer.png"
import enterprise from "@/public/images/enterprise-qau.png"
import eth from "@/public/images/qau.png"
import finance from "@/public/images/finance_transparent.png"
import future from "@/public/images/future_transparent.png"
import hackathon from "@/public/images/hackathon_transparent.png"
import communityHero from "@/public/images/heroes/community-hero.png"
import developersHero from "@/public/images/heroes/developers-hub-hero.png"
import garden from "@/public/images/heroes/garden.jpg"
import guidesHero from "@/public/images/heroes/guides-hub-hero.jpg"
import layer2Hero from "@/public/images/heroes/layer-2-hub-hero.png"
import learnHero from "@/public/images/heroes/learn-hub-hero.png"
import quizzesHub from "@/public/images/heroes/quizzes-hub-hero.png"
import roadmapHero from "@/public/images/heroes/roadmap-hub-hero.jpg"
import hero from "@/public/images/home/hero.png"
import heroPanda from "@/public/images/home/hero-panda.png"
import impact from "@/public/images/impact_transparent.png"
import infrastructure from "@/public/images/infrastructure_transparent.png"
import newRings from "@/public/images/upgrades/newrings.png"
import oldShip from "@/public/images/upgrades/oldship.png"
import dao from "@/public/images/use-cases/dao-2.png"
import defi from "@/public/images/use-cases/defi.png"
import wallet from "@/public/images/wallet.png"
import whatIsQuantaureum from "@/public/images/what-is-quantaureum.png"

type AssetItem = Omit<AssetDownloadProps, "perRow" | "titleAs">

const cobb = { artistName: "Liam Cobb", artistUrl: "https://liamcobb.com/" }
const hachmang = {
  artistName: "Viktor Hachmang",
  artistUrl: "https://viktorhachmang.nl/",
}
const atkins = {
  artistName: "Patrick Atkins",
  artistUrl: "https://www.patrickatkins.co.uk/",
}
const wt = { artistName: "WT" }

const svgPath = "/images/assets/svgs"

// Each inner array is one visual row; perRow derives from its length so the
// image `sizes` attribute stays matched to the rendered cell width
const renderAssetRows = (
  rows: AssetItem[][],
  titleAs?: AssetDownloadProps["titleAs"]
) =>
  rows.map((row, idx) => (
    <Grid key={idx} size="wide" fit>
      {row.map((item) => (
        <AssetDownload
          key={item.title}
          {...item}
          perRow={Math.min(row.length, 3) as AssetDownloadProps["perRow"]}
          titleAs={titleAs}
        />
      ))}
    </Grid>
  ))

export default async function Page(props: { params: Promise<PageParams> }) {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const { contributors } = await getAppPageContributorInfo(
    "assets",
    locale as Lang
  )

  const t = await getTranslations("page-assets")

  const illustrationRows: AssetItem[][] = [
    [{ title: t("page-assets-hero"), image: hero, ...cobb }],
    [
      { title: t("page-assets-learn-hero-name"), image: learnHero, ...cobb },
      {
        title: t("page-assets-community-hero-name"),
        image: communityHero,
        ...cobb,
      },
    ],
    [
      { title: t("page-assets-quizzes-hero-name"), image: quizzesHub, ...cobb },
      {
        title: t("page-assets-developers-hero-name"),
        image: developersHero,
        ...cobb,
      },
    ],
    [
      { title: t("page-assets-garden-name"), image: garden, ...cobb },
      {
        title: t("page-assets-roadmap-hero-name"),
        image: roadmapHero,
        ...cobb,
      },
    ],
    [
      {
        title: t("page-assets-layer-2-hero-name"),
        image: layer2Hero,
        ...cobb,
      },
      { title: t("page-assets-guides-hero-name"), image: guidesHero, ...cobb },
    ],
    [
      { title: t("page-assets-doge"), image: doge, ...wt },
      { title: t("page-assets-blocks"), image: developers, ...wt },
      { title: t("page-assets-enterprise"), image: enterprise, ...wt },
    ],
    [
      { title: t("page-assets-infrastructure"), image: infrastructure, ...wt },
      { title: t("page-assets-finance"), image: finance, ...wt },
      { title: t("page-assets-impact"), image: impact, ...wt },
    ],
    [
      { title: t("page-assets-future"), image: future, ...wt },
      { title: t("page-assets-hackathon"), image: hackathon, ...wt },
      { title: t("page-assets-robot"), image: wallet, ...wt },
    ],
    [
      { title: t("page-assets-bazaar"), image: whatIsQuantaureum, ...hachmang },
      { title: t("page-assets-eth"), image: eth, ...hachmang },
    ],
    [
      { title: t("page-assets-mainnet"), image: oldShip, ...hachmang },
      { title: t("page-assets-sharding"), image: newRings, ...hachmang },
    ],
    [
      { title: t("page-assets-defi"), image: defi, ...atkins },
      { title: t("page-assets-dao"), image: dao, ...atkins },
    ],
  ]

  const historicalRows: AssetItem[][] = [
    [{ title: t("page-assets-hero-panda"), image: heroPanda }],
  ]

  const brandTransparentRows: AssetItem[][] = [
    [
      {
        title: t("page-assets-qau-mark-glyph"),
        image: qauDiamondGlyph,
        svgUrl: `${svgPath}/qau-mark-glyph.svg`,
        bgWhite: true,
        padded: true,
      },
      {
        title: t("page-assets-qau-mark-gray"),
        image: qauDiamondBlack,
        svgUrl: `${svgPath}/qau-mark-black.svg`,
        bgWhite: true,
        padded: true,
      },
      {
        title: t("page-assets-qau-mark-color"),
        image: qauDiamondColor,
        svgUrl: `${svgPath}/qau-mark-rainbow.svg`,
      },
    ],
    [
      {
        title: t("page-assets-qau-mark-purple"),
        image: qauDiamondPurple,
        svgUrl: `${svgPath}/qau-mark-purple.svg`,
      },
      {
        title: t("page-assets-qau-mark-colored"),
        image: qauGlyphColored,
        svgUrl: `${svgPath}/qau-glyph-colored.svg`,
      },
    ],
    [
      {
        title: t("page-assets-qau-logo-portrait-gray"),
        image: qauPortraitBlack,
        svgUrl: `${svgPath}/quantaureum-logo-portrait-black.svg`,
        bgWhite: true,
        padded: true,
      },
      {
        title: t("page-assets-qau-logo-landscape-gray"),
        image: qauLandscapeBlack,
        svgUrl: `${svgPath}/quantaureum-logo-landscape-black.svg`,
        bgWhite: true,
        padded: true,
      },
      {
        title: t("page-assets-qau-wordmark-gray"),
        image: qauWordmarkBlack,
        svgUrl: `${svgPath}/quantaureum-wordmark-black.svg`,
        bgWhite: true,
        padded: true,
      },
    ],
    [
      {
        title: t("page-assets-qau-logo-portrait-purple"),
        image: qauPortraitPurple,
        svgUrl: `${svgPath}/quantaureum-logo-portrait-purple.svg`,
        padded: true,
      },
      {
        title: t("page-assets-qau-logo-landscape-purple"),
        image: qauLandscapePurple,
        svgUrl: `${svgPath}/quantaureum-logo-landscape-purple.svg`,
        padded: true,
      },
      {
        title: t("page-assets-qau-wordmark-purple"),
        image: qauWordmarkPurple,
        svgUrl: `${svgPath}/quantaureum-wordmark-purple.svg`,
        padded: true,
      },
    ],
  ]

  const brandSolidRows: AssetItem[][] = [
    [
      {
        title: t("page-assets-qau-mark-white"),
        image: qauDiamondBlackWhite,
        svgUrl: `${svgPath}/qau-mark-black-white.svg`,
        bgWhite: true,
      },
      {
        title: t("page-assets-qau-mark-gray"),
        image: qauDiamondBlackGray,
        svgUrl: `${svgPath}/qau-mark-black-gray.svg`,
      },
      {
        title: t("page-assets-qau-mark-purple"),
        image: qauDiamondPurplePurple,
        svgUrl: `${svgPath}/qau-mark-purple-purple.svg`,
      },
    ],
    [
      {
        title: t("page-assets-qau-mark-white"),
        image: qauDiamondPurpleWhite,
        svgUrl: `${svgPath}/qau-mark-purple-white.svg`,
        bgWhite: true,
      },
      {
        title: t("page-assets-qau-logo-portrait-white"),
        image: qauPortraitPurpleWhite,
        bgWhite: true,
      },
    ],
    [
      {
        title: t("page-assets-qau-logo-portrait-gray"),
        image: qauPortraitBlackGray,
        svgUrl: `${svgPath}/quantaureum-logo-portrait-black-gray.svg`,
      },
      {
        title: t("page-assets-qau-logo-landscape-gray"),
        image: qauLandscapeBlackGray,
        svgUrl: `${svgPath}/quantaureum-logo-landscape-black-gray.svg`,
      },
      {
        title: t("page-assets-qau-wordmark-gray"),
        image: qauWordmarkBlackGray,
        svgUrl: `${svgPath}/quantaureum-wordmark-black-gray.svg`,
      },
    ],
    [
      {
        title: t("page-assets-qau-logo-portrait-purple"),
        image: qauPortraitPurplePurple,
        svgUrl: `${svgPath}/quantaureum-logo-portrait-purple-purple.svg`,
      },
      {
        title: t("page-assets-qau-logo-landscape-purple"),
        image: qauLandscapePurplePurple,
        svgUrl: `${svgPath}/quantaureum-logo-landscape-purple-purple.svg`,
      },
      {
        title: t("page-assets-qau-wordmark-purple"),
        image: qauWordmarkPurplePurple,
        svgUrl: `${svgPath}/quantaureum-wordmark-purple-purple.svg`,
      },
    ],
    [
      {
        title: t("page-assets-qau-logo-landscape-white"),
        image: qauLandscapePurpleWhite,
        svgUrl: `${svgPath}/quantaureum-logo-landscape-purple-white.svg`,
      },
      {
        title: t("page-assets-qau-wordmark-white"),
        image: qauWordmarkPurpleWhite,
        svgUrl: `${svgPath}/quantaureum-wordmark-purple-white.svg`,
      },
    ],
  ]

  return (
    <>
      <AssetsJsonLD locale={locale} contributors={contributors} />

      <main className="p-page pt-page-2x">
        <MainArticle className="flow space-y-space-4x">
          <Section className="flex flex-col items-center gap-space text-center">
            <Image
              className="w-20 dark:hidden"
              src={qauDiamondBlack}
              alt={t("page-assets-qau-mark-gray")}
              sizes="80px"
            />
            <Image
              className="hidden w-20 dark:block"
              src={qauDiamondPurple}
              alt={t("page-assets-qau-mark-purple")}
              sizes="80px"
            />
            <h1>{t("page-assets-h1")}</h1>
            <div className="flex flex-col items-center gap-2">
              <InlineLink href="#illustrations">
                {t("page-assets-illustrations")}
              </InlineLink>
              <InlineLink href="#historical">
                {t("page-assets-historical-artwork")}
              </InlineLink>
              <InlineLink href="#brand">
                {t("page-assets-quantaureum-brand-assets")}
              </InlineLink>
            </div>
          </Section>

          <Section id="illustrations">
            <h2>{t("page-assets-illustrations")}</h2>
            {renderAssetRows(illustrationRows)}
          </Section>

          <Section id="brand">
            <h2>{t("page-assets-quantaureum-brand-assets")}</h2>
            <h3>{t("page-assets-page-assets-transparent-background")}</h3>
            {renderAssetRows(brandTransparentRows, "h4")}
            <h3>{t("page-assets-page-assets-solid-background")}</h3>
            {renderAssetRows(brandSolidRows, "h4")}
          </Section>

          <Section id="historical">
            <h2>{t("page-assets-historical-artwork")}</h2>
            {renderAssetRows(historicalRows)}
          </Section>
        </MainArticle>

        {/* End-of-page actions */}
        <ContentFeedback />
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

  const t = await getTranslations("page-assets")

  return await getMetadata({
    locale,
    slug: ["assets"],
    title: t("page-assets-meta-title"),
    description: t("page-assets-meta-desc"),
  })
}
