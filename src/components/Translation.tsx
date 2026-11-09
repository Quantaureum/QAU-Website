import parse from "html-react-parser"
import { type TranslationValues, useTranslations } from "next-intl"

import {
  buildTranslationParserOptions,
  type TransformMap,
} from "@/lib/utils/translationMarkup"

import TooltipLink from "./TooltipLink"

type TranslationProps = {
  id: string
  ns?: string
  values?: TranslationValues
  transform?: TransformMap
}

/**
 * Renders the message for `id` ("key" within `ns`, or legacy "namespace:key"),
 * falling back to English for untranslated locales. Without `values` the raw
 * message is fetched and html-parsed so Crowdin-era embedded HTML (real tags
 * with attributes, e.g. `<a href>`) survives; `<a>` maps to TooltipLink.
 *
 * @deprecated Legacy catalog messages only — do not adopt for new strings.
 * Author new messages as plain ICU (`useTranslations`/`getTranslations`) or,
 * when markup is needed, `t.rich` with tags supplied from code. Glossary
 * tooltips don't require this component: render `GlossaryTooltip` directly,
 * or pass `TooltipLink` as a `t.rich` tag handler with the href in code —
 * only messages whose href lives inside the translated string need this.
 */
const Translation = ({
  id,
  ns = "common",
  values,
  transform = {},
}: TranslationProps) => {
  const t = useTranslations()
  const key = id.includes(":") ? id.replace(":", ".") : `${ns}.${id}`
  const message = values ? t(key, values) : t.raw(key)
  // non-string raw messages (nested objects, missing keys) fall back to the id
  const translatedText = typeof message === "string" ? message : id

  // Custom components mapping used when parsing the translation text
  const defaultTransform: TransformMap = {
    a: TooltipLink,
  }

  const allTransforms: TransformMap = { ...defaultTransform, ...transform }

  const options = buildTranslationParserOptions(allTransforms)

  return <>{parse(translatedText, options)}</>
}

export default Translation
