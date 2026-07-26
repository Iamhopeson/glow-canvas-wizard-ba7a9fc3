## Plan: Verify mestudioo.com with Google Search Console

The Google Search Console connector is now linked. To complete the SEO finding, the site needs to be verified as owned by your connected Google account. I'll use the meta-tag verification method (only method that works for a Lovable app).

### Steps

1. **Add verification meta tag** to `src/routes/__root.tsx` inside the `head()` `meta` array:
   ```
   { name: "google-site-verification", content: "OmGMEOpMzzswPszEP1P0e3wq2jA7hJ-k8fV1B1VyEX8" }
   ```
2. **Ask you to publish** so the tag is live at https://mestudioo.com/ (Google fetches the server-rendered HTML — verification will fail until the new build is deployed).
3. **Call Google's verify endpoint** for `https://mestudioo.com/` once you confirm publish is complete.
4. **Add the verified site** to Search Console (`PUT /webmasters/v3/sites/https%3A%2F%2Fmestudioo.com%2F`) so it appears in your property list.
5. **Mark the SEO finding fixed** via `seo_chat--update_findings`.

### Notes
- The meta tag is safe to keep in the site permanently; Google re-checks it periodically.
- After verification, data (impressions, clicks, queries) takes a few days to populate in Search Console.
