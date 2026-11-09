import {
  type ComponentType,
  createElement,
  Fragment,
  type ReactNode,
} from "react"
import {
  type DOMNode,
  domToReact,
  Element,
  type HTMLReactParserOptions,
} from "html-react-parser"

export type TransformMap = Record<
  string,
  ComponentType<Record<string, unknown>>
>

/**
 * Inline tags legacy translated strings are allowed to contain. Any other
 * element is stripped while keeping its text children.
 *
 * This matters because html-react-parser passes unknown tags straight through:
 * React blocks `javascript:` URLs and drops `on*` props, but it does NOT
 * neutralize `<script>`, `<iframe>`, `<meta http-equiv>`, `<base>` or
 * `srcset` in SSR output, so those would execute/act for anyone who can land a
 * translated string. Keep this list as small as the catalog actually needs.
 */
const ALLOWED_TAGS = new Set(["a", "b", "br", "em", "i", "span", "strong"])

const ALLOWED_PROTOCOLS = /^(?:https?:|mailto:)/i
const HAS_SCHEME = /^[a-z][a-z0-9+.-]*:/i

/**
 * Allows only absolute `http(s)`/`mailto` links, hashes and relative paths.
 * Control characters and whitespace are stripped before the scheme check so
 * `java\tscript:`-style obfuscation cannot slip through.
 */
const sanitizeHref = (href: string): string | undefined => {
  const value = href.trim()
  if (!value) return undefined
  // Matching control characters is the whole point of this strip, so the
  // no-control-regex warning does not apply here.
  const normalized = value.replace(
    // eslint-disable-next-line no-control-regex
    /[\u0000-\u001F\u007F\s]/g,
    ""
  )
  if (HAS_SCHEME.test(normalized)) {
    return ALLOWED_PROTOCOLS.test(normalized) ? value : undefined
  }
  return value
}

/** Only `href` (on links) and `title` survive; everything else is dropped. */
const sanitizeTagProps = (name: string, attribs: Record<string, string>) => {
  const props: Record<string, string> = {}
  const href =
    name === "a" && attribs.href ? sanitizeHref(attribs.href) : undefined
  if (href) props.href = href
  if (attribs.title) props.title = attribs.title
  return props
}

/**
 * Builds the html-react-parser options used for legacy catalog messages.
 */
export const buildTranslationParserOptions = (
  allTransforms: TransformMap
): HTMLReactParserOptions => {
  const options: HTMLReactParserOptions = {
    replace: (domNode: DOMNode) => {
      if (!(domNode instanceof Element)) return undefined

      const children = domToReact(domNode.children as DOMNode[], options)

      // Unknown/dangerous element: drop the tag, keep its text descendants.
      if (!ALLOWED_TAGS.has(domNode.name)) {
        return createElement(Fragment, null, children)
      }

      const props = sanitizeTagProps(domNode.name, domNode.attribs)
      const Component = allTransforms[domNode.name]
      if (Component) return <Component {...props}>{children}</Component>

      return createElement(domNode.name, props, ...(children as ReactNode[]))
    },
  }

  return options
}
