export const dynamic = "force-static"

// RFC 9116 security.txt.
//
// Served from a route handler (same pattern as app/robots.txt/route.ts) and
// exposed at the canonical path /.well-known/security.txt through the
// rewrite in next.config.js. A static file under public/.well-known/ would
// never reach production: the standalone deploy copies an allowlist of
// public/ subdirectories into the bundle, and a dot-directory is not part
// of it, so the file was missing and the endpoint answered 404.
const SECURITY_TXT = `Contact: mailto:security@quantaureum.com
Expires: 2027-12-31T23:59:00.000Z
Preferred-Languages: en
Canonical: https://quantaureum.com/.well-known/security.txt
`

export const GET = () =>
  new Response(SECURITY_TXT, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  })
