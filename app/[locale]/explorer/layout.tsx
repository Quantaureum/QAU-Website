import { pick } from "lodash"
import { getMessages, setRequestLocale } from "next-intl/server"

import I18nProvider from "@/components/I18nProvider"

export default async function ExplorerLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const messages = pick(await getMessages(), "common", "page-explorer")

  return (
    <I18nProvider locale={locale} messages={messages}>
      {children}
    </I18nProvider>
  )
}
