# PhaseLabs website

React/Vite site, pre-rendered at build time and served as static HTML from S3 through CloudFront. The existing manual GitHub workflow is the only publication step.

## Build and verify

```sh
npm ci
npm run build
npm test
npm run preview
```

The client build creates the JavaScript/CSS assets. A separate, temporary server build renders the same React components into complete HTML for every registered page. Production hydration adds interactions without replacing the content. The analytics consent UI is browser-only, avoiding saved-consent differences during hydration. No analytics requests occur during pre-rendering.

Generated files are in `dist/`; temporary server code is in `.prerender/`. Neither is committed. The tests include raw generated HTML, canonical/metadata checks, asset paths, legacy redirects, sitemap scope, and existing consent/diagram safeguards. Run the build before tests that inspect its output.

## Page URLs and adding a page

- Homepage: `/`
- CardBuddy guide: `/assets/cardbuddy-guide.html`
- Sambane: `/assets/sambane.html`
- Existing privacy policy: `/assets/cardbuddy-privacy.html`

Explicit `.html` URLs work as S3 objects without directory rewrites. The `/assets/` prefix stays within the deployment scope already demonstrated by the privacy policy and commit `b5561ce`. No new AWS permissions or directory-index behavior are assumed.

To add a page:

1. Add a component with a unique filename. Keep initial rendering independent of `window`, `document`, browser storage and device preferences. Read those in effects instead. Keep the first client render identical to the server render.
2. Register its id, explicit `/assets/name.html` path, source entry, title and description in `src/pages.js`. Add optional Open Graph overrides if needed.
3. Register the dynamic component loader in `src/page-components.js` and link to `pagePaths.<id>` from existing content.
4. If replacing an old query selector, add its alias to `legacyRoutes`. Do not put secret or user-specific values in this registry.
5. Build and test. The renderer generates the page, correct CSS links, metadata and sitemap entry. The deployment workflow uploads every generated HTML document uncached, invalidates it and compares the live bytes after publication.

The homepage, guide and Sambane each contain their own canonical and meaningful body content in the HTTP response, even without JavaScript. Production JavaScript does not change canonical tags. Content updates remain in the React components rather than duplicated static files.

## Historical links and HTTP redirects

`/?guide=cardbuddy` and `/?project=sambane` still work in browsers. An early inline script uses `location.replace` to send visitors to the new page, preserving section anchors and other query parameters. The app repeats the same check defensively. Unrelated root query strings and existing document paths are not redirected.

**This is a client-side redirect, not an HTTP 301.** The root HTML remains the homepage when JavaScript is unavailable. Its direct links still lead to the guide and Sambane. A static S3 object cannot select a different redirect based on a query string.

The build also prepares `.prerender/cloudfront-legacy-redirects.js`, a narrow, tested viewer-request CloudFront Function for permanent HTTP redirects. It is **not installed or published** by this workflow. Before using it, an authorized operator must inspect distribution `E1X4CLJ9EE3X8L`, its default cache behavior and existing Function/Lambda@Edge associations. Integrate with an existing viewer-request handler if there is one; never overwrite it blindly. Preserve the current origin, permissions, cache behaviors, security settings and unrelated routes. Function creation/association requires separately verified permissions and approval.

When installing the edge redirect, update the workflow's legacy-response checks from homepage byte comparison to HTTP `301`/`Location` checks. After installation, verify both old query routes, including a URL with extra parameters, and confirm the homepage and privacy page still return `200`. The new static pages do not depend on this optional edge step.

## Search Console after publication

1. Verify both new document URLs return HTTP `200`, their full page body and exactly one matching self-canonical. Confirm old browser bookmarks still reach the right page and section.
2. Inspect each new URL in Search Console, run the live test, and request indexing if appropriate.
3. Submit `https://phaselabs.co.za/assets/sitemap.xml`. It includes only canonical `/assets/` documents because that sitemap is scoped to its directory. The homepage is self-canonical and linked across the site. A root sitemap/robots file can be considered later if root-object deployment permissions are confirmed.
4. Check Google's selected canonical after recrawling. The old query URL may remain an alternate or redirect entry; the important result is that the new guide URL is eligible as its own page.

Distinct HTML, canonicals and a sitemap improve discovery and remove the shared-homepage canonical conflict. Google still chooses what and when to index; neither inclusion nor ranking is guaranteed.

Current hosting configuration is not managed in this repository. Public checks before this change showed existing missing paths, `/robots.txt` and `/sitemap.xml` returning `404` with the homepage error document. This change does not modify that error behavior or claim a server-side legacy redirect is active.

References: [Google canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), [Google redirect guidance](https://developers.google.com/search/docs/crawling-indexing/301-redirects), and [CloudFront default root object behavior](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DefaultRootObject.html).
