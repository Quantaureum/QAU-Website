import React from "react"
import parse from "html-react-parser"
import { renderToStaticMarkup } from "react-dom/server"
import { expect, test } from "@playwright/test"

import { buildTranslationParserOptions } from "@/lib/utils/translationMarkup"

const render = (html: string) =>
  renderToStaticMarkup(
    React.createElement(
      React.Fragment,
      null,
      parse(html, buildTranslationParserOptions({}))
    )
  )

/**
 * Payloads that html-react-parser passes through untouched (React does not
 * neutralize them in SSR output): scripts, embedded documents, meta refresh,
 * base URL override and srcset. None of them may survive the Translation
 * sanitizer, otherwise a malicious catalog string could run code or act on the
 * page.
 */
const PAYLOADS = [
  { name: "inline script", html: "<script>window.__pwned = 1</script>" },
  {
    name: "remote script",
    html: '<script src="https://evil.example/probe.js"></script>',
  },
  {
    name: "svg script",
    html: "<svg><script>window.__pwned = 2</script></svg>",
  },
  { name: "iframe", html: '<iframe src="https://evil.example/"></iframe>' },
  {
    name: "meta refresh",
    html: '<meta http-equiv="refresh" content="0;url=https://evil.example/">',
  },
  { name: "base href", html: '<base href="https://evil.example/">' },
  {
    name: "img srcset",
    html: '<img src="/x.png" srcset="https://evil.example/x.png 1x">',
  },
]

const FORBIDDEN_MARKUP = [
  /<script/i,
  /<iframe/i,
  /<meta/i,
  /<base/i,
  /<svg/i,
  /<img/i,
  /<object/i,
  /<embed/i,
  /srcset=/i,
]

test.describe("Translation rich-text sanitizer", () => {
  for (const { name, html } of PAYLOADS) {
    test(`strips ${name} so it cannot execute or apply`, () => {
      const output = render(html)

      for (const pattern of FORBIDDEN_MARKUP) {
        expect(output).not.toMatch(pattern)
      }
    })
  }

  test("keeps allowlisted inline markup", () => {
    const output = render(
      "<span>see <strong>this</strong> and <em>that</em><br></span>"
    )

    expect(output).toContain("<span>")
    expect(output).toContain("<strong>this</strong>")
    expect(output).toContain("<em>that</em>")
    expect(output).toContain("<br")
  })

  test("keeps safe href/title and drops unsafe href and event handlers", () => {
    const safe = render('<a href="https://example.com/path" title="docs">x</a>')
    expect(safe).toContain('href="https://example.com/path"')
    expect(safe).toContain('title="docs"')

    for (const href of [
      "javascript:alert(1)",
      "data:text/html,x",
      "vbscript:msgbox(1)",
      "java\tscript:alert(1)",
    ]) {
      const output = render(`<a href="${href}" onclick="alert(1)">x</a>`)
      expect(output).not.toContain("javascript")
      expect(output).not.toContain("data:text/html")
      expect(output).not.toContain("vbscript")
      expect(output).not.toContain("onclick")
    }
  })
})
