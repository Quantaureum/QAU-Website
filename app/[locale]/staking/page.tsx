import { Fragment } from "react"
import { pick } from "lodash"
import {
  CircleAlert,
  CircleDotDashed,
  Cloud,
  Cpu,
  Droplets,
  ThumbsDown,
  ThumbsUp,
  Workflow,
} from "lucide-react"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import ExpandableCard from "@/components/ExpandableCard"
import PageHero from "@/components/Hero/PageHero"
import I18nProvider from "@/components/I18nProvider"
import {
  BenefitBetterSecurityIcon,
  BenefitEarnRewardsIcon,
  BenefitMoreSustainableIcon,
} from "@/components/icons/staking"
import { Image, type ImageProps } from "@/components/Image"
import { Emphasis, Strong } from "@/components/IntlStringElements"
import StakingCommunityCallout from "@/components/Staking/StakingCommunityCallout"
import { AccordionContainer } from "@/components/ui/accordion"
import { ButtonLink } from "@/components/ui/buttons/Button"
import {
  Card,
  CardContent,
  CardIconContainer,
  CardLinkFake,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { Grid } from "@/components/ui/grid"
import HR from "@/components/ui/hr"
import InlineLink from "@/components/ui/Link"
import { ListItem, UnorderedList } from "@/components/ui/list"
import { Section } from "@/components/ui/section"
import { Tag } from "@/components/ui/tag"

import { cn } from "@/lib/utils/cn"
import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { buildTopicDropdown } from "@/lib/utils/topicDropdown"

import { staking } from "@/data/topics/staking"

import StakingPageJsonLD from "./page-jsonld"

import { ContentLayout } from "@/layouts/ContentLayout"
import poolsImg from "@/public/images/staking/leslie-pool.png"
import saasImg from "@/public/images/staking/leslie-saas.png"
import soloImg from "@/public/images/staking/leslie-solo.png"
import cexImg from "@/public/images/staking/leslie-withdrawal.png"
import heroImg from "@/public/images/staking/staking-hero.png"

type IndicatorLevel = "good" | "meh" | "poor"

const Indicator = ({ level }: { level: IndicatorLevel }) => {
  if (level === "good")
    return <ThumbsUp className="size-5 shrink-0 text-success" />
  if (level === "meh")
    return <CircleAlert className="size-5 shrink-0 text-warning" />
  return <ThumbsDown className="size-5 shrink-0 text-error" />
}

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const { contributors, lastEditLocaleTimestamp } =
    await getAppPageContributorInfo("staking", locale as Lang)

  const t = await getTranslations("page-staking")

  // Glossary tooltips mount client-side, so their namespace has to reach the
  // client; the root layout only provides `common`. A nested provider replaces
  // the outer messages rather than merging, so `common` has to be re-listed.
  const clientMessages = pick(await getMessages({ locale }), ["common"])

  const benefits = [
    {
      title: t("page-staking-benefits-1-title"),
      Icon: BenefitEarnRewardsIcon,
      description: t.rich("page-staking-benefits-1-description", {
        a: (chunks) => (
          <InlineLink href="/what-is-the-quantaureum-network/">
            {chunks}
          </InlineLink>
        ),
      }),
    },
    {
      title: t("page-staking-benefits-2-title"),
      Icon: BenefitBetterSecurityIcon,
      description: t("page-staking-benefits-2-description"),
    },
    {
      title: t("page-staking-benefits-3-title"),
      Icon: BenefitMoreSustainableIcon,
      description: t("page-staking-benefits-3-description"),
      ctaLabel: t("page-staking-benefits-3-link"),
      href: "/what-is-the-quantaureum-network/",
    },
  ]

  // Custom staking-option palette; these box washes and tag colors are unique
  // to the staking pages (tokens in src/styles/semantic-tokens.css).
  const stakingOptions: {
    title: string
    titleColor: string
    boxClasses: string
    tagClasses: string
    pills: string[]
    paragraphs: React.ReactNode[]
    image: ImageProps["src"]
    imageAlt: string
    href: string
    buttonLabel: string
  }[] = [
    {
      title: t("page-staking-hierarchy-solo-h2"),
      titleColor: "text-staking-gold",
      boxClasses: "border-staking-gold/20 bg-tint-staking-gold",
      tagClasses: "bg-staking-gold/20 !text-staking-gold",
      pills: [
        t("page-staking-hierarchy-solo-pill-1"),
        t("page-staking-hierarchy-solo-pill-2"),
        t("page-staking-hierarchy-solo-pill-3"),
        t("page-staking-hierarchy-solo-pill-4"),
      ],
      paragraphs: [
        t("page-staking-hierarchy-solo-p1"),
        t("page-staking-hierarchy-solo-p2"),
        t.rich("page-staking-hierarchy-solo-p3", {
          a: (chunks) => <InlineLink href="/staking/">{chunks}</InlineLink>,
        }),
      ],
      image: soloImg,
      imageAlt: "",
      href: "/run-a-node/",
      buttonLabel: t("page-staking-more-on-solo"),
    },
    {
      title: t("page-staking-hierarchy-saas-h2"),
      titleColor: "text-staking-green",
      boxClasses: "border-staking-green/20 bg-tint-staking-green",
      tagClasses: "bg-staking-green/20 !text-staking-green",
      pills: [
        t("page-staking-hierarchy-saas-pill-1"),
        t("page-staking-hierarchy-saas-pill-2"),
        t("page-staking-hierarchy-saas-pill-3"),
      ],
      paragraphs: [
        t("page-staking-hierarchy-saas-p1"),
        t("page-staking-hierarchy-saas-p2"),
        t("page-staking-hierarchy-saas-p3"),
      ],
      image: saasImg,
      imageAlt: "",
      href: "/staking/#faq",
      buttonLabel: t("page-staking-more-on-saas"),
    },
    {
      title: t("page-staking-hierarchy-pools-h2"),
      titleColor: "text-staking-blue",
      boxClasses: "border-staking-blue/20 bg-tint-staking-blue",
      tagClasses: "bg-staking-blue/20 !text-staking-blue",
      pills: [
        t("page-staking-hierarchy-pools-pill-1"),
        t("page-staking-hierarchy-pools-pill-2"),
        t("page-staking-hierarchy-pools-pill-3"),
        t("page-staking-hierarchy-pools-pill-4"),
      ],
      paragraphs: [
        t("page-staking-hierarchy-pools-p1"),
        t.rich("page-staking-hierarchy-pools-p2", {
          a: (chunks) => <InlineLink href="/staking/#faq">{chunks}</InlineLink>,
        }),
        t.rich("page-staking-hierarchy-pools-p3", {
          a: (chunks) => <InlineLink href="/wallets/">{chunks}</InlineLink>,
        }),
        t("page-staking-hierarchy-pools-p4"),
      ],
      image: poolsImg,
      imageAlt: "",
      href: "/staking/",
      buttonLabel: t("page-staking-more-on-pools"),
    },
    {
      title: t("page-staking-hierarchy-cex-h2"),
      titleColor: "text-staking-red",
      boxClasses: "border-staking-red/20 bg-tint-staking-red",
      tagClasses: "bg-staking-red/20 !text-staking-red",
      pills: [
        t("page-staking-hierarchy-cex-pill-1"),
        t("page-staking-hierarchy-cex-pill-2"),
      ],
      paragraphs: [
        t("page-staking-hierarchy-cex-p1"),
        t("page-staking-hierarchy-cex-p2"),
        t.rich("page-staking-hierarchy-cex-p3", {
          link1: (chunks) => <InlineLink href="/wallets/">{chunks}</InlineLink>,
          link2: (chunks) => <InlineLink href="/wallets/">{chunks}</InlineLink>,
        }),
      ],
      image: cexImg,
      imageAlt: "",
      // There is no CEX page; the pools page covers custodial products in this section
      href: "/staking/#faq",
      buttonLabel: t("page-staking-more-on-cex"),
    },
  ]

  const comparisonColumns: {
    area: string
    title: string
    Glyph: React.ElementType
    glyphClasses: string
    rewards: React.ReactNode[]
    risks: React.ReactNode[]
    requirements: React.ReactNode[]
    href: string
    buttonLabel: string
  }[] = [
    {
      area: "solo",
      title: t("page-staking-dropdown-solo"),
      Glyph: Cpu,
      glyphClasses: "bg-staking-gold/20 text-staking-gold",
      rewards: [
        t("page-staking-section-comparison-solo-rewards-li1"),
        t("page-staking-section-comparison-solo-rewards-li2"),
        t("page-staking-section-comparison-solo-rewards-li3"),
      ],
      risks: [
        t("page-staking-section-comparison-solo-risks-li1"),
        t("page-staking-section-comparison-solo-risks-li2"),
        t("page-staking-section-comparison-solo-risks-li3"),
        t("page-staking-section-comparison-solo-risks-li4"),
      ],
      requirements: [
        t.rich("page-staking-section-comparison-solo-requirements-li2", {
          link1: (chunks) => (
            <InlineLink href="/run-a-node/">{chunks}</InlineLink>
          ),
          link2: (chunks) => (
            <InlineLink href="/run-a-node/">{chunks}</InlineLink>
          ),
        }),
        t.rich("page-staking-section-comparison-solo-requirements-li3", {
          a: (chunks) => (
            <InlineLink href="https://github.com/Quantaureum">
              {chunks}
            </InlineLink>
          ),
        }),
      ],
      href: "/run-a-node/",
      buttonLabel: t("page-staking-more-on-solo"),
    },
    {
      area: "saas",
      title: t("page-staking-hierarchy-saas-h2"),
      Glyph: Cloud,
      glyphClasses: "bg-staking-green/20 text-staking-green",
      rewards: [
        t("page-staking-section-comparison-saas-rewards-li1"),
        t("page-staking-section-comparison-saas-rewards-li2"),
      ],
      risks: [
        t("page-staking-section-comparison-saas-risks-li1"),
        t("page-staking-section-comparison-saas-risks-li2"),
      ],
      requirements: [
        t("page-staking-section-comparison-saas-requirements-li1"),
        t("page-staking-section-comparison-saas-requirements-li2"),
        t("page-staking-section-comparison-saas-requirements-li3"),
      ],
      href: "/staking/#faq",
      buttonLabel: t("page-staking-more-on-saas"),
    },
    {
      area: "pool",
      title: t("page-staking-hierarchy-pools-h2"),
      Glyph: Droplets,
      glyphClasses: "bg-staking-blue/20 text-staking-blue",
      rewards: [
        t("page-staking-section-comparison-pools-rewards-li1"),
        t.rich("page-staking-section-comparison-pools-rewards-li2", {
          a: (chunks) => <InlineLink href="/staking/#faq">{chunks}</InlineLink>,
        }),
        t.rich("page-staking-section-comparison-pools-rewards-li3", {
          a: (chunks) => <InlineLink href="/staking/#faq">{chunks}</InlineLink>,
        }),
      ],
      risks: [
        t.rich("page-staking-section-comparison-pools-risks-li2", {
          a: (chunks) => <InlineLink href="/bug-bounty/">{chunks}</InlineLink>,
        }),
      ],
      requirements: [
        t("page-staking-section-comparison-pools-requirements-li1"),
        t("page-staking-section-comparison-pools-requirements-li2"),
      ],
      href: "/staking/",
      buttonLabel: t("page-staking-more-on-pools"),
    },
  ]

  const glanceColumns = [
    t("page-staking-glance-col-approach"),
    t("page-staking-glance-col-your-keys"),
    t("page-staking-glance-col-your-hardware"),
    t("page-staking-glance-col-middleware"),
    t("page-staking-glance-col-who-pays"),
    t("page-staking-glance-col-minimum-eth"),
  ]

  const glanceRows: {
    title: string
    Glyph: React.ElementType
    cells: { level: IndicatorLevel; text: string }[]
  }[] = [
    {
      title: t("page-staking-dropdown-solo"),
      Glyph: Cpu,
      cells: [
        { level: "good", text: t("page-staking-glance-home-keys") },
        { level: "good", text: t("page-staking-glance-home-hardware") },
        { level: "good", text: t("page-staking-glance-home-middleware") },
        { level: "good", text: t("page-staking-glance-home-who-pays") },
        { level: "poor", text: t("page-staking-glance-home-minimum-eth") },
      ],
    },
    {
      title: t("page-staking-glance-bonded-title"),
      Glyph: Workflow,
      cells: [
        { level: "meh", text: t("page-staking-glance-bonded-keys") },
        { level: "good", text: t("page-staking-glance-bonded-hardware") },
        { level: "meh", text: t("page-staking-glance-bonded-middleware") },
        { level: "meh", text: t("page-staking-glance-bonded-who-pays") },
        { level: "meh", text: t("page-staking-glance-bonded-minimum-eth") },
      ],
    },
    {
      title: t("page-staking-hierarchy-saas-h2"),
      Glyph: Cloud,
      cells: [
        { level: "meh", text: t("page-staking-glance-delegated-keys") },
        { level: "meh", text: t("page-staking-glance-delegated-hardware") },
        { level: "meh", text: t("page-staking-glance-delegated-middleware") },
        { level: "meh", text: t("page-staking-glance-delegated-who-pays") },
        { level: "poor", text: t("page-staking-glance-delegated-minimum-eth") },
      ],
    },
    {
      title: t("page-staking-hierarchy-pools-h2"),
      Glyph: Droplets,
      cells: [
        { level: "meh", text: t("page-staking-glance-pools-keys") },
        { level: "meh", text: t("page-staking-glance-pools-hardware") },
        { level: "meh", text: t("page-staking-glance-pools-middleware") },
        { level: "meh", text: t("page-staking-glance-pools-who-pays") },
        { level: "good", text: t("page-staking-glance-pools-minimum-eth") },
      ],
    },
    {
      title: t("page-staking-hierarchy-cex-h2"),
      Glyph: CircleDotDashed,
      cells: [
        { level: "poor", text: t("page-staking-glance-cex-keys") },
        { level: "poor", text: t("page-staking-glance-cex-hardware") },
        { level: "poor", text: t("page-staking-glance-cex-middleware") },
        { level: "poor", text: t("page-staking-glance-cex-who-pays") },
        { level: "good", text: t("page-staking-glance-cex-minimum-eth") },
      ],
    },
  ]

  const dropdownLinks = buildTopicDropdown(staking.dropdown, t, "Clicked")

  const tocItems = {
    whatIsStaking: {
      id: "what-is-staking",
      title: t("page-staking-section-what-title"),
    },
    whyStakeYourQau: {
      id: "why-stake-your-qau",
      title: t("page-staking-section-why-title"),
    },
    howToStakeYourQau: {
      id: "how-to-stake-your-qau",
      title: t("page-staking-toc-how-to-stake-your-qau"),
    },
    comparisonOfOptions: {
      id: "comparison-of-options",
      title: t("page-staking-toc-comparison-of-options"),
    },
    joinTheCommunity: {
      id: "join-the-community",
      title: t("page-staking-join-community"),
    },
    faq: {
      id: "faq",
      title: t("page-staking-faq-title"),
    },
    further: {
      id: "further",
      title: t("page-staking-toc-further"),
    },
  } as const

  const tocArray = Object.keys(tocItems).map((key) => {
    const { id, title } = tocItems[key as keyof typeof tocItems]
    return { title, url: "#" + id }
  })

  return (
    <>
      <StakingPageJsonLD
        locale={locale}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
        contributors={contributors}
      />

      <ContentLayout
        tocItems={tocArray}
        contributors={contributors}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
        dropdownLinks={dropdownLinks}
        heroSection={
          <PageHero
            breadcrumbs={{ slug: "staking" }}
            heroImg={heroImg}
            title={t("page-staking-hero-header")}
            description={<>{t("page-staking-hero-subtitle")}</>}
          />
        }
      >
        <I18nProvider locale={locale} messages={clientMessages}>
          <Section id={tocItems.whatIsStaking.id}>
            <h2>{tocItems.whatIsStaking.title}</h2>
            <p>{t("page-staking-section-what-p1")}</p>
            <p>
              {t.rich("page-staking-section-what-p2", {
                a: (chunks) => <InlineLink href="/">{chunks}</InlineLink>,
              })}
            </p>
            <p>{t("page-staking-section-what-p3")}</p>
          </Section>

          <Section id={tocItems.whyStakeYourQau.id}>
            <h2>{tocItems.whyStakeYourQau.title}</h2>
            <Grid columns={3}>
              {benefits.map(({ title, description, Icon, ctaLabel, href }) => (
                <Card key={title} href={href}>
                  <CardContent>
                    <CardIconContainer>
                      <Icon className="text-primary" />
                    </CardIconContainer>
                    <CardTitle>{title}</CardTitle>
                    <CardParagraph>{description}</CardParagraph>
                    {href && ctaLabel && (
                      <CardLinkFake>{ctaLabel}</CardLinkFake>
                    )}
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </Section>

          <Section id={tocItems.howToStakeYourQau.id}>
            <h2>{tocItems.howToStakeYourQau.title}</h2>
            <p>{t("page-staking-section-how-to-p1")}</p>
            <p>{t("page-staking-section-how-to-p2")}</p>
            <div className="flex flex-col gap-8 py-space" data-flow="skip">
              {stakingOptions.map(
                ({
                  title,
                  titleColor,
                  boxClasses,
                  tagClasses,
                  pills,
                  paragraphs,
                  image,
                  imageAlt,
                  href,
                  buttonLabel,
                }) => (
                  <div
                    key={title}
                    className={cn(
                      "flex flex-col gap-6 rounded-4xl border p-6 md:p-12",
                      boxClasses
                    )}
                  >
                    <div className="flex flex-col-reverse gap-6 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex flex-col gap-4">
                        <h3 className={cn("text-h2", titleColor)}>{title}</h3>
                        <div className="flex flex-wrap gap-2">
                          {pills.map((pill) => (
                            <Tag
                              key={pill}
                              status="normal"
                              variant="subtle"
                              size="small"
                              className={tagClasses}
                            >
                              {pill}
                            </Tag>
                          ))}
                        </div>
                      </div>
                      <Image
                        src={image}
                        alt={imageAlt}
                        className="h-40 w-auto max-w-full self-center object-contain"
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      {paragraphs.map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>
                    <ButtonLink href={href} className="w-fit">
                      {buttonLabel}
                    </ButtonLink>
                  </div>
                )
              )}
            </div>
            <p>{t.rich("page-staking-hierarchy-subtext", { em: Emphasis })}</p>
          </Section>

          <HR variant="narrow" />

          <Section id={tocItems.comparisonOfOptions.id}>
            <h2>{tocItems.comparisonOfOptions.title}</h2>
            <p>{t("page-staking-section-comparison-subtitle")}</p>

            <div
              className={cn(
                "grid auto-cols-fr auto-rows-[minmax(0,auto)] gap-x-1",
                // Sub-header label rows
                "**:[h4]:mb-space **:[h4]:border-b **:[h4]:border-body **:[h4]:bg-background-highlight **:[h4]:p-4 **:[h4]:text-base",
                // Full-width text-centered button links
                "**:data-[label=button-link]:w-full **:data-[label=button-link]:text-center",
                // Mobile: stack the three columns with space between them
                "[grid-template-areas:'solo-title''solo-rewards''solo-risks''solo-reqs''solo-cta''saas-title''saas-rewards''saas-risks''saas-reqs''saas-cta''pool-title''pool-rewards''pool-risks''pool-reqs''pool-cta']",
                // Desktop: aligned three-column comparison
                "xl:gap-y-0 xl:[grid-template-areas:'solo-title_saas-title_pool-title''solo-rewards_saas-rewards_pool-rewards''solo-risks_saas-risks_pool-risks''solo-reqs_saas-reqs_pool-reqs''solo-cta_saas-cta_pool-cta']",
                "**:has-data-[label=button-link]:mt-space **:has-data-[label=button-link]:max-xl:pb-space-3x!"
              )}
            >
              {comparisonColumns.map(
                ({
                  area,
                  title,
                  Glyph,
                  glyphClasses,
                  rewards,
                  risks,
                  requirements,
                  href,
                  buttonLabel,
                }) => (
                  <Fragment key={area}>
                    <div
                      className="flex items-center gap-4 border-b border-body bg-background-highlight p-4"
                      style={{ gridArea: `${area}-title` }}
                    >
                      <div
                        className={cn(
                          "flex size-12 shrink-0 items-center justify-center rounded-full",
                          glyphClasses
                        )}
                      >
                        <Glyph className="size-7" />
                      </div>
                      <h3 className="text-2xl">{title}</h3>
                    </div>
                    <div style={{ gridArea: `${area}-rewards` }}>
                      <h4>
                        {t("page-staking-section-comparison-rewards-title")}
                      </h4>
                      <UnorderedList className="pe-4 text-sm">
                        {rewards.map((item, idx) => (
                          <ListItem key={idx}>{item}</ListItem>
                        ))}
                      </UnorderedList>
                    </div>
                    <div style={{ gridArea: `${area}-risks` }}>
                      <h4>
                        {t("page-staking-section-comparison-risks-title")}
                      </h4>
                      <UnorderedList className="pe-4 text-sm">
                        {risks.map((item, idx) => (
                          <ListItem key={idx}>{item}</ListItem>
                        ))}
                      </UnorderedList>
                    </div>
                    <div style={{ gridArea: `${area}-reqs` }}>
                      <h4>
                        {t(
                          "page-staking-section-comparison-requirements-title"
                        )}
                      </h4>
                      <UnorderedList className="pe-4 text-sm">
                        {requirements.map((item, idx) => (
                          <ListItem key={idx}>{item}</ListItem>
                        ))}
                      </UnorderedList>
                    </div>
                    <div style={{ gridArea: `${area}-cta` }} className="px-2">
                      <ButtonLink href={href}>{buttonLabel}</ButtonLink>
                    </div>
                  </Fragment>
                )
              )}
            </div>

            <h3 className="mt-space-2x">{t("page-staking-glance-title")}</h3>
            <p>{t("page-staking-glance-description")}</p>
            {/* `contain-inline-size` stops the table's min-width leaking out as an
                intrinsic minimum, which would stop the article shrinking and push
                the ToC aside off-screen just above the lg breakpoint */}
            <div className="w-full overflow-x-auto contain-inline-size">
              <table className="w-full min-w-200 border-collapse overflow-hidden rounded-base">
                <thead>
                  <tr className="border-b border-body bg-background-highlight">
                    {glanceColumns.map((column) => (
                      <th
                        key={column}
                        className="p-4 text-start align-bottom text-sm font-black"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {glanceRows.map(({ title, Glyph, cells }) => (
                    <tr
                      key={title}
                      className="border-body bg-background-highlight not-last:border-b"
                    >
                      <td className="p-4 align-top">
                        <div className="flex flex-col gap-2">
                          <Glyph className="size-8 text-primary" />
                          <span className="font-black">{title}</span>
                        </div>
                      </td>
                      {cells.map(({ level, text }, idx) => (
                        <td key={idx} className="p-4 align-top text-sm">
                          <div className="flex flex-col gap-2">
                            <Indicator level={level} />
                            <span>{text}</span>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              {t.rich("page-staking-glance-restaking", {
                a: (chunks) => (
                  <InlineLink href="/staking/#faq">{chunks}</InlineLink>
                ),
                strong: Strong,
              })}
            </p>
          </Section>

          <HR variant="narrow" />

          <StakingCommunityCallout id={tocItems.joinTheCommunity.id} />

          <Section id={tocItems.faq.id}>
            <h2>{tocItems.faq.title}</h2>
            <AccordionContainer>
              <ExpandableCard title={t("page-staking-faq-4-question")}>
                <p>{t("page-staking-faq-4-answer-p1")}</p>
                <p>{t("page-staking-faq-4-answer-p2")}</p>
                <p>{t("page-staking-faq-4-answer-p3")}</p>
                <ButtonLink className="self-start" href="/roadmap/">
                  {t("page-upgrades-merge-btn")}
                </ButtonLink>
              </ExpandableCard>
              <ExpandableCard title={t("page-staking-faq-5-question")}>
                <p>{t("page-staking-faq-5-answer-p1")}</p>
                <p>{t("page-staking-faq-5-answer-p2")}</p>
                <ButtonLink className="self-start" href="/staking/">
                  {t("page-staking-faq-5-answer-link")}
                </ButtonLink>
              </ExpandableCard>
              <ExpandableCard title={t("page-staking-faq-6-question")}>
                <p>{t("page-staking-faq-6-answer-p1")}</p>
                <p>{t("page-staking-faq-6-answer-p2")}</p>
              </ExpandableCard>
              <ExpandableCard title={t("page-staking-faq-7-question")}>
                <p>{t("page-staking-faq-7-answer-p1")}</p>
                <p>{t("page-staking-faq-7-answer-p2")}</p>
              </ExpandableCard>
              <ExpandableCard title={t("page-staking-faq-1-question")}>
                {t.rich("page-staking-faq-1-answer", { em: Emphasis })}
              </ExpandableCard>
              <ExpandableCard title={t("page-staking-faq-2-question")}>
                {t("page-staking-faq-2-answer")}
              </ExpandableCard>
              <ExpandableCard title={t("page-staking-faq-3-question")}>
                <p>{t("page-staking-faq-3-answer-p1")}</p>
                <p>
                  {t.rich("page-staking-faq-3-answer-p2", {
                    a: (chunks) => (
                      <InlineLink href="/staking/">{chunks}</InlineLink>
                    ),
                  })}
                </p>
              </ExpandableCard>
              <ExpandableCard title={t("page-staking-faq-8-question")}>
                <p>{t("page-staking-faq-8-answer-p1")}</p>
                <ButtonLink className="self-start" href="/staking/#faq">
                  {t("page-staking-faq-8-answer-link")}
                </ButtonLink>
              </ExpandableCard>
            </AccordionContainer>
          </Section>

          <Section id={tocItems.further.id}>
            <h2>{tocItems.further.title}</h2>
            <UnorderedList>
              <ListItem>
                <InlineLink href="/roadmap/">
                  {t("page-staking-further-reading-1-link")}
                </InlineLink>
              </ListItem>
              <ListItem>
                <InlineLink href="https://github.com/Quantaureum">
                  {t("page-staking-further-reading-2-link")}
                </InlineLink>
              </ListItem>
              <ListItem>
                <InlineLink href="/what-is-quantaureum/">
                  {t("page-staking-further-reading-4-link")}
                </InlineLink>
              </ListItem>
              <ListItem>
                <InlineLink href="/bug-bounty/">
                  {t("page-staking-further-reading-6-link")}
                </InlineLink>
              </ListItem>
            </UnorderedList>
          </Section>
        </I18nProvider>
      </ContentLayout>
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const t = await getTranslations("page-staking")

  return await getMetadata({
    locale,
    slug: ["staking"],
    title: t("page-staking-meta-title"),
    description: t("page-staking-meta-description"),
    image: "/images/qau-logo.png",
  })
}

export default Page
