import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Lang, Params } from "@/lib/types"

import BugBountyCards from "@/components/BugBountyCards"
import ContentFeedback from "@/components/ContentFeedback"
import Emoji from "@/components/Emoji"
import ExpandableCard from "@/components/ExpandableCard"
import FileContributors from "@/components/FileContributors"
import { PageHero } from "@/components/Hero"
import { Strong } from "@/components/IntlStringElements"
import MainArticle from "@/components/MainArticle"
import MarkdownCard from "@/components/MarkdownCard"
import { AccordionContainer } from "@/components/ui/accordion"
import { ButtonLink } from "@/components/ui/buttons/Button"
// Uncomment `Alert` for Bug Bounty Banner:
// import { Alert } from "@/components/ui/alert"
import {
  Card,
  CardContent,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { Flex, VStack } from "@/components/ui/flex"
import { Grid } from "@/components/ui/grid"
import InlineLink from "@/components/ui/Link"
import { ListItem, OrderedList, UnorderedList } from "@/components/ui/list"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"

import BugBountyJsonLD from "./page-jsonld"

const StrongGreaterThan = (chunks: React.ReactNode) => (
  <strong>&gt;{chunks}</strong>
)

export default async function Page(props: { params: Promise<Params> }) {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const t = await getTranslations("page-bug-bounty")

  const { contributors, lastEditLocaleTimestamp } =
    await getAppPageContributorInfo("bug-bounty", locale as Lang)

  return (
    <>
      <BugBountyJsonLD locale={locale} contributors={contributors} />
      {/* Uncomment for Bug Bounty Banner: */}
      {/* <Alert variant="banner">
        Fusaka vulnerabilities are now part of the Bug Bounty Program!
      </Alert> */}

      <PageHero
        breadcrumbs={{ slug: "bug-bounty" }}
        eyebrow={
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-success" />
            <p className="text-sm uppercase">
              {t("page-upgrades-bug-bounty-title")}
            </p>
          </div>
        }
        heroComponent={
          <VStack className="mx-auto w-full max-w-2xl">
            <Card variant="nested" className="p-6">
              <CardTitle>
                {t("page-upgrades-bug-bounty-card-subheader-2")}
              </CardTitle>
              <CardParagraph size="sm">
                {t("page-upgrades-bug-bounty-severity-qualifications-desc")}
              </CardParagraph>
            </Card>
          </VStack>
        }
        title={
          <>
            {t("page-upgrades-bug-bounty-slogan")}&nbsp;
            <Emoji text=":bug:" />
          </>
        }
        description={t("page-upgrades-bug-bounty-subtitle")}
        buttons={[
          <ButtonLink key="submit" href="https://bbp-form.quantaureum.com/">
            {t("page-upgrades-bug-bounty-submit")}
          </ButtonLink>,
          <ButtonLink
            key="rules"
            variant="outline"
            href="#in-scope"
            isSecondary
          >
            {t("page-upgrades-bug-bounty-rules")}
          </ButtonLink>,
        ]}
        variant="no-divider"
        className="**:[h1]:bg-linear-to-r **:[h1]:from-body **:[h1]:via-primary **:[h1]:to-accent-b **:[h1]:bg-clip-text **:[h1]:pb-1 **:[h1]:text-transparent"
      />

      <MainArticle className="flow *:px-page! **:[:is(p,ul,ol)]:max-w-3xl">
        <div className="flow space-y-space-3x bg-background-highlight pt-space-3x pb-space-2x">
          <Section id="in-scope">
            <h2>{t("page-upgrades-bug-bounty-validity")}</h2>
            <p>
              {t.rich("page-upgrades-bug-bounty-validity-desc", {
                a: (chunks) => (
                  <InlineLink href="https://bbp-form.quantaureum.com/">
                    {chunks}
                  </InlineLink>
                ),
              })}
            </p>

            <Flex className="flex-wrap gap-8">
              <MarkdownCard
                emoji=":ledger:"
                title={t("page-upgrades-bug-bounty-ledger-title")}
                description={t("page-upgrades-bug-bounty-ledger-desc")}
                variant="nested"
                className="flex-[1_1_464px]"
              >
                <div>
                  <InlineLink href="https://github.com/Quantaureum">
                    {t("page-upgrades-bug-bounty-specs")}
                  </InlineLink>
                </div>

                <h4>{t("page-upgrades-bug-bounty-types")}</h4>
                <UnorderedList>
                  <ListItem>{t("page-upgrades-bug-bounty-type-1")}</ListItem>
                  <ListItem>{t("page-upgrades-bug-bounty-type-2")}</ListItem>
                  <ListItem>{t("page-upgrades-bug-bounty-type-3")}</ListItem>
                  <ListItem>{t("page-upgrades-bug-bounty-type-4")}</ListItem>
                </UnorderedList>
              </MarkdownCard>

              <MarkdownCard
                emoji=":computer:"
                title={t("page-upgrades-bug-bounty-client-bugs")}
                description={t("page-upgrades-bug-bounty-client-bugs-desc")}
                variant="nested"
                className="flex-[1_1_464px]"
              >
                <CardParagraph>
                  {t("page-upgrades-bug-bounty-client-bugs-desc-2")}
                </CardParagraph>
                <h4>{t("page-upgrades-bug-bounty-types")}</h4>
                <UnorderedList>
                  <ListItem>
                    {t("page-upgrades-bug-bounty-clients-type-1")}
                  </ListItem>
                  <ListItem>
                    {t("page-upgrades-bug-bounty-clients-type-2")}
                  </ListItem>
                  <ListItem>
                    {t("page-upgrades-bug-bounty-clients-type-3")}
                  </ListItem>
                </UnorderedList>
              </MarkdownCard>

              <MarkdownCard
                emoji=":book:"
                title={t("page-upgrades-bug-bounty-misc-bugs")}
                description={t("page-upgrades-bug-bounty-misc-bugs-desc")}
                variant="nested"
                className="flex-[1_1_464px]"
              >
                <CardParagraph>
                  {t("page-upgrades-bug-bounty-misc-bugs-desc-2")}
                </CardParagraph>
              </MarkdownCard>

              <MarkdownCard
                emoji=":scroll:"
                title={t("page-upgrades-bug-bounty-deposit-bugs")}
                description={t("page-upgrades-bug-bounty-deposit-bugs-desc")}
                variant="nested"
                className="flex-[1_1_464px]"
              ></MarkdownCard>

              <MarkdownCard
                emoji=":bug:"
                title={t("page-upgrades-bug-bounty-dependency-bugs")}
                description={t("page-upgrades-bug-bounty-dependency-bugs-desc")}
                variant="nested"
                className="flex-[1_1_464px]"
              >
                <h4>{t("page-upgrades-bug-bounty-help-links")}</h4>
                <div>
                  <InlineLink href="https://github.com/Quantaureum">
                    github.com/Quantaureum
                  </InlineLink>
                </div>
              </MarkdownCard>
            </Flex>
          </Section>

          <Section id="out-of-scope">
            {/* Out of Scope */}
            <MarkdownCard variant="nested" className="shrink grow basis-full">
              <h2>{t("page-upgrades-bug-bounty-not-included")}</h2>
              <CardParagraph>
                {t.rich("page-upgrades-bug-bounty-not-included-desc", {
                  a: (chunks) => (
                    <InlineLink href="#in-scope">{chunks}</InlineLink>
                  ),
                })}
              </CardParagraph>
              <UnorderedList>
                {(
                  [
                    {
                      key: "page-upgrades-bug-bounty-not-included-li-1",
                      footnote: true,
                    },
                    {
                      key: "page-upgrades-bug-bounty-not-included-li-2",
                      footnote: true,
                    },
                    {
                      key: "page-upgrades-bug-bounty-not-included-li-3",
                      footnote: false,
                    },
                    {
                      key: "page-upgrades-bug-bounty-not-included-li-4",
                      footnote: false,
                    },
                    {
                      key: "page-upgrades-bug-bounty-not-included-li-10",
                      footnote: false,
                    },
                    {
                      key: "page-upgrades-bug-bounty-not-included-li-5",
                      footnote: false,
                    },
                    {
                      key: "page-upgrades-bug-bounty-not-included-li-6",
                      footnote: false,
                    },
                    {
                      key: "page-upgrades-bug-bounty-not-included-li-7",
                      footnote: false,
                    },
                    {
                      key: "page-upgrades-bug-bounty-not-included-li-8",
                      footnote: false,
                    },
                    {
                      key: "page-upgrades-bug-bounty-not-included-li-9",
                      footnote: false,
                    },
                  ] as const
                ).map(({ key, footnote }) => (
                  <ListItem
                    key={key}
                    className="flex items-start gap-3 text-sm"
                  >
                    <span className="mt-0.5 shrink-0 text-error">✕</span>
                    <span>
                      {t(key)}
                      {footnote && <sup>*</sup>}
                    </span>
                  </ListItem>
                ))}
              </UnorderedList>
              <CardParagraph size="sm">
                <sup>*</sup>
                {t("page-upgrades-bug-bounty-out-of-scope-footnote")}
              </CardParagraph>
            </MarkdownCard>
          </Section>

          <Section id="rules">
            <MarkdownCard variant="nested">
              <h2>{t("page-upgrades-bug-bounty-hunting")}</h2>
              <CardParagraph>
                <em>{t("page-upgrades-bug-bounty-hunting-desc")}</em>
              </CardParagraph>
              <OrderedList className="m-0">
                {(
                  [
                    "page-upgrades-bug-bounty-hunting-li-1",
                    "page-upgrades-bug-bounty-hunting-li-2",
                    "page-upgrades-bug-bounty-hunting-li-3",
                    "page-upgrades-bug-bounty-hunting-li-4",
                  ] as const
                ).map((key, idx) => (
                  <ListItem
                    key={key}
                    className="flex gap-4 rounded-base border bg-background p-4"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {idx + 1}
                    </span>
                    <span className="text-sm leading-relaxed">{t(key)}</span>
                  </ListItem>
                ))}
              </OrderedList>
            </MarkdownCard>
          </Section>

          <Section id="qualifications">
            <h2 className="max-w-[100ch]">
              {t("page-upgrades-bug-bounty-severity-qualifications-title")}
            </h2>
            <p className="mb-8 max-w-[100ch] text-body-medium">
              {t("page-upgrades-bug-bounty-severity-qualifications-desc")}
            </p>
            <Grid balanced={4}>
              {/* Low */}
              <Card variant="nested">
                <CardContent className="text-sm">
                  <span className="mb-4 inline-flex w-fit rounded-full bg-green-500/10 px-3 py-1 font-semibold text-green-600 dark:text-green-400">
                    {t("page-upgrades-bug-bounty-severity-low-title")}
                  </span>
                  <UnorderedList>
                    <ListItem>
                      {t.rich("page-upgrades-bug-bounty-severity-low-li-1", {
                        strong: StrongGreaterThan,
                      })}
                    </ListItem>
                    <ListItem>
                      {t.rich("page-upgrades-bug-bounty-severity-low-li-2", {
                        strong: StrongGreaterThan,
                      })}
                    </ListItem>
                    <ListItem>
                      {t.rich("page-upgrades-bug-bounty-severity-low-li-3", {
                        strong: StrongGreaterThan,
                      })}
                    </ListItem>
                  </UnorderedList>
                </CardContent>
              </Card>
              {/* Medium */}
              <Card variant="nested">
                <CardContent className="text-sm">
                  <span className="mb-4 inline-flex w-fit rounded-full bg-yellow-500/10 px-3 py-1 font-semibold text-yellow-600 dark:text-yellow-400">
                    {t("page-upgrades-bug-bounty-severity-medium-title")}
                  </span>
                  <UnorderedList>
                    <ListItem>
                      {t.rich("page-upgrades-bug-bounty-severity-medium-li-1", {
                        strong: StrongGreaterThan,
                      })}
                    </ListItem>
                    <ListItem>
                      {t.rich("page-upgrades-bug-bounty-severity-medium-li-2", {
                        strong: StrongGreaterThan,
                      })}
                    </ListItem>
                    <ListItem>
                      {t.rich("page-upgrades-bug-bounty-severity-medium-li-3", {
                        strong: StrongGreaterThan,
                      })}
                    </ListItem>
                  </UnorderedList>
                </CardContent>
              </Card>
              {/* High */}
              <Card variant="nested">
                <CardContent className="text-sm">
                  <span className="mb-4 inline-flex w-fit rounded-full bg-orange-500/10 px-3 py-1 font-semibold text-orange-600 dark:text-orange-400">
                    {t("page-upgrades-bug-bounty-severity-high-title")}
                  </span>
                  <UnorderedList>
                    <ListItem>
                      {t.rich("page-upgrades-bug-bounty-severity-high-li-1", {
                        strong: StrongGreaterThan,
                      })}
                    </ListItem>
                    <ListItem>
                      {t.rich("page-upgrades-bug-bounty-severity-high-li-2", {
                        strong: StrongGreaterThan,
                      })}
                    </ListItem>
                    <ListItem>
                      {t.rich("page-upgrades-bug-bounty-severity-high-li-3", {
                        strong: StrongGreaterThan,
                      })}
                    </ListItem>
                  </UnorderedList>
                </CardContent>
              </Card>
              {/* Critical */}
              <Card variant="nested">
                <CardContent className="text-sm">
                  <span className="mb-4 inline-flex w-fit rounded-full bg-red-500/10 px-3 py-1 font-semibold text-red-600 dark:text-red-400">
                    {t("page-upgrades-bug-bounty-severity-critical-title")}
                  </span>
                  <UnorderedList>
                    <ListItem>
                      {t.rich(
                        "page-upgrades-bug-bounty-severity-critical-li-1",
                        {
                          strong: StrongGreaterThan,
                        }
                      )}
                    </ListItem>
                    <ListItem>
                      {t.rich(
                        "page-upgrades-bug-bounty-severity-critical-li-2",
                        {
                          strong: Strong,
                        }
                      )}
                    </ListItem>
                    <ListItem>
                      {t.rich(
                        "page-upgrades-bug-bounty-severity-critical-li-3",
                        {
                          strong: Strong,
                        }
                      )}
                    </ListItem>
                    <ListItem>
                      {t.rich(
                        "page-upgrades-bug-bounty-severity-critical-li-4",
                        {
                          strong: Strong,
                        }
                      )}
                    </ListItem>
                    <ListItem>
                      {t.rich(
                        "page-upgrades-bug-bounty-severity-critical-li-5",
                        {
                          strong: Strong,
                        }
                      )}
                    </ListItem>
                  </UnorderedList>
                </CardContent>
              </Card>
            </Grid>
          </Section>
        </div>

        <Section id="submit-bug">
          <h2>{t("page-upgrades-bug-bounty-submit")}</h2>
          <BugBountyCards />
        </Section>

        <Section id="faq" className="px-page py-4">
          <h2>{t("page-upgrades-question-title")}</h2>
          <AccordionContainer>
            <ExpandableCard
              title={t("bug-bounty-faq-q2-title")}
              contentPreview={t("bug-bounty-faq-q2-contentPreview")}
            >
              {t.rich("bug-bounty-faq-q2-content-1", {
                a: (chunks) => (
                  <InlineLink href="https://quantaureum.com">
                    {chunks}
                  </InlineLink>
                ),
              })}
            </ExpandableCard>
            <ExpandableCard
              title={t("bug-bounty-faq-q3-title")}
              contentPreview={t("bug-bounty-faq-q3-contentPreview")}
            >
              {t.rich("bug-bounty-faq-q3-content-1", {
                strong: Strong,
              })}
            </ExpandableCard>
            <ExpandableCard
              title={t("bug-bounty-faq-q4-title")}
              contentPreview={t("bug-bounty-faq-q4-contentPreview")}
            >
              {t("bug-bounty-faq-q4-content-1")}
            </ExpandableCard>
            <ExpandableCard
              title={t("bug-bounty-faq-q5-title")}
              contentPreview={t("bug-bounty-faq-q5-contentPreview")}
            >
              {t("bug-bounty-faq-q5-content-1")}
            </ExpandableCard>
            <ExpandableCard
              title={t("bug-bounty-faq-q6-title")}
              contentPreview={t("bug-bounty-faq-q6-contentPreview")}
            >
              <p>{t("bug-bounty-faq-q6-content-1")}</p>
              <p>{t("bug-bounty-faq-q6-content-2")}</p>
            </ExpandableCard>
            <ExpandableCard
              title={t("bug-bounty-faq-q7-title")}
              contentPreview={t("bug-bounty-faq-q7-contentPreview")}
            >
              {t("bug-bounty-faq-q7-content-1")}
            </ExpandableCard>
          </AccordionContainer>
        </Section>

        <FileContributors
          className="border-t"
          contributors={contributors}
          lastEditLocaleTimestamp={lastEditLocaleTimestamp}
        />
      </MainArticle>

      <div className="px-page">
        <ContentFeedback />
      </div>
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const t = await getTranslations("page-bug-bounty")

  return await getMetadata({
    locale,
    slug: ["bug-bounty"],
    title: t("page-upgrades-bug-bounty-meta-title"),
    description: t("page-upgrades-bug-bounty-meta-description"),
  })
}
