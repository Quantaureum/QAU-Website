import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { Params } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"
import { Section } from "@/components/ui/section"

import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import FeedbackForm from "./FeedbackForm"

const Page = async (props: { params: Promise<Params> }) => {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/feedback/")
  const messages = pick(allMessages, requiredNamespaces)

  const t = await getTranslations("page-feedback")

  return (
    <I18nProvider locale={locale} messages={messages}>
      <MainArticle className="flex w-full flex-col items-center py-16">
        <Section className="w-full max-w-2xl">
          <h1 className="mb-2">{t("page-feedback-title")}</h1>
          <p className="mb-8 text-body-medium">
            {t("page-feedback-sub-title")}
          </p>
          <FeedbackForm />
        </Section>
      </MainArticle>
    </I18nProvider>
  )
}

export default Page
