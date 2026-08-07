## Plan: Transparent logo + SEO smoke test

### 1. Remove the logo background

The current logo asset (`me-studio-logo.png`) is a 1255x1255 PNG whose background is a solid opaque dark navy (`#111827`) — not transparent. On the light site this shows as a dark square behind the ouroboros mark in the nav and footer.

- Regenerate the logo as a true transparent PNG: keep the ouroboros ring + `.me` wordmark in the dark ink color, make every background pixel fully transparent (with anti-aliased edge alpha so it doesn't look jagged at 32px).
- Upload it as a new CDN asset and point `src/assets/me-studio-logo.png.asset.json` at it, so `Nav.tsx` and `Footer.tsx` pick it up with no code change.
- Regenerate `public/favicon.ico` from the same transparent source (multi-size 16/32/48).

### 2. SEO smoke test

Run an automated check against the running app and report a pass/fail table:

- `/` returns 200 and the server-rendered HTML contains: single `<h1>`, unique `<title>` ("Derrick Hopeson | Software Developer @ me.studio"), meta description, canonical, `og:title`/`og:description`/`og:url`/`og:image`, `twitter:card`/`twitter:image`.
- Title < 60 chars, description < 160 chars.
- JSON-LD blocks (Organization, WebSite, Service) parse as valid JSON.
- `/robots.txt` returns 200, is not `Disallow: /`.
- `/sitemap.xml` returns 200 and is well-formed XML with at least the home URL.
- `/llms.txt` returns 200.
- All `<img>` tags have non-empty `alt`.
- The `google-site-verification` meta tag is present.

Anything that fails gets fixed in the same pass (metadata-level fixes only, no layout changes), and I'll list the results.

### Notes
- No content, layout, or copy changes beyond the logo asset swap.
- Search Console property verification still needs the site published; that's separate from this smoke test.
