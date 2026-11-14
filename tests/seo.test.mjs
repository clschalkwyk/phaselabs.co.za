import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import vm from 'node:vm';
import { pages, pagePaths, findPage, legacyRedirect, sitemapPaths, siteOrigin } from '../src/pages.js';
import { pageLoaders } from '../src/page-components.js';
import { pageHead, legacyBrowserScript, cloudFrontRedirectFunction, escapeHtml } from '../scripts/page-output.mjs';

const read = path => readFile(new URL(path, import.meta.url), 'utf8');
const htmlFor = page => read(`../dist/${page.path === '/' ? 'index.html' : page.path.slice(1)}`);

test('page registry has unique paths and loaders within the verified static deployment scope', () => {
  assert.equal(new Set(pages.map(page => page.id)).size, pages.length);
  assert.equal(new Set(pages.map(page => page.path)).size, pages.length);
  assert.deepEqual(Object.keys(pageLoaders).sort(), pages.map(page => page.id).sort());
  pages.forEach(page => {
    assert.match(page.path, /^(\/|\/assets\/[a-z0-9-]+\.html)$/);
    assert.equal(findPage(page.path).id, page.id);
    assert.ok(page.title && page.description && page.entry);
  });
});

test('every built page has one self-canonical, complete metadata and useful raw HTML', async () => {
  for (const page of pages) {
    const html = await htmlFor(page);
    const head = html.match(/<head>([\s\S]*?)<\/head>/)[1];
    assert.equal((head.match(/rel="canonical"/g) || []).length, 1, page.id);
    assert.equal((head.match(/<title>/g) || []).length, 1, page.id);
    assert.ok(head.includes(`href="${siteOrigin}${page.path}"`), page.id);
    assert.ok(head.includes(`<title>${escapeHtml(page.title)}</title>`), page.id);
    assert.ok(head.includes(`name="description" content="${escapeHtml(page.description)}"`), page.id);
    assert.ok(head.includes(`property="og:url" content="${siteOrigin}${page.path}"`), page.id);
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, page.id);
    assert.match(html, /<main\b/);
    assert.doesNotMatch(html, /name="robots" content="noindex|<!--page-content-->|\/src\/|Loading Sambane|data-msg=|\$!|\uFFFD/);
    assert.ok(html.indexOf('<meta charset="UTF-8"') < 1024, 'Charset remains early in the document');
  }
  const guide = await htmlFor(findPage(pagePaths.cardbuddyGuide));
  for (const term of ['CardBuddy documentation', 'Install or update', 'Share a contact QR, image or PDF', 'Storage and troubleshooting', 'Version 1.13']) assert.ok(guide.includes(term), term);
  const sambane = await htmlFor(findPage(pagePaths.sambane));
  for (const term of ['What the prototype demonstrated', 'Illustrated workflow', 'Documented Testnet run', 'SM Web Systems']) assert.ok(sambane.includes(term), term);
});

test('pre-rendered pages have production assets and Sambane styles without waiting for JavaScript', async () => {
  for (const page of pages) {
    const html = await htmlFor(page);
    const assets = [...html.matchAll(/(?:src|href)="(\/assets\/[^"?#]+)(?:[?#][^"]*)?"/g)].map(match => match[1]);
    assert.ok(assets.some(path => path.endsWith('.js')), page.id);
    assert.ok(assets.some(path => path.endsWith('.css')), page.id);
    for (const path of new Set(assets)) await access(new URL(`../dist${path}`, import.meta.url));
  }
  const html = await htmlFor(findPage(pagePaths.sambane));
  assert.match(html, /rel="stylesheet"[^>]+href="\/assets\/SambanePage-[^"]+\.css"/);
  const home = await htmlFor(pages[0]);
  assert.ok(home.includes(`href="${pagePaths.cardbuddyGuide}"`));
  assert.ok(home.includes(`href="${pagePaths.sambane}"`));
  assert.doesNotMatch(home, /href="\/\?(guide|project)=/);
});

test('legacy query redirects preserve anchors and other parameters, with no open redirect', () => {
  const cases = [
    ['/?guide=cardbuddy', pagePaths.cardbuddyGuide],
    ['/?project=sambane#prototype-payment', `${pagePaths.sambane}#prototype-payment`],
    ['/index.html?guide=cardbuddy&utm_source=qr#share-a-contact-qr-image-or-pdf', `${pagePaths.cardbuddyGuide}?utm_source=qr#share-a-contact-qr-image-or-pdf`],
    ['/?guide=cardbuddy&project=sambane&tag=a&tag=b', `${pagePaths.sambane}?tag=a&tag=b`],
    ['/?guide=cardbuddy&next=https%3A%2F%2Fexample.com', `${pagePaths.cardbuddyGuide}?next=https%3A%2F%2Fexample.com`],
    ['/?guide=unknown', null],
    ['/?utm_source=mail', null],
    ['/assets/sambane.html?guide=cardbuddy', null],
  ];
  const inline = legacyBrowserScript().replace(/^<script>\n|\n<\/script>$/g, '');
  for (const [path, expected] of cases) {
    const href = siteOrigin + path;
    assert.equal(legacyRedirect(new URL(href)), expected);
    let actual = null;
    vm.runInNewContext(inline, { URL, window: { location: { href, replace: value => { actual = value; } } } });
    assert.equal(actual, expected, path);
  }
});

test('optional CloudFront redirect is narrowly scoped and generated from the registry', async () => {
  const source = cloudFrontRedirectFunction();
  assert.equal(await read('../.prerender/cloudfront-legacy-redirects.js'), source);
  const context = vm.createContext({});
  vm.runInContext(source, context);
  const redirect = context.handler({ request: { method: 'GET', uri: '/', querystring: { guide: { value: 'cardbuddy' }, tag: { value: 'a%20b', multiValue: [{ value: 'a%20b' }, { value: 'c' }] } } } });
  assert.equal(redirect.statusCode, 301);
  assert.equal(redirect.headers.location.value, `${pagePaths.cardbuddyGuide}?tag=a%20b&tag=c`);
  for (const request of [
    { method: 'POST', uri: '/', querystring: { guide: { value: 'cardbuddy' } } },
    { method: 'GET', uri: pagePaths.sambane, querystring: { guide: { value: 'cardbuddy' } } },
    { method: 'GET', uri: '/', querystring: { guide: { value: 'unknown' } } },
  ]) assert.equal(context.handler({ request }), request);
});

test('sitemap contains only real canonical documents within its assets scope', async () => {
  const sitemap = await read('../dist/assets/sitemap.xml');
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
  assert.deepEqual(urls, sitemapPaths.map(path => siteOrigin + path));
  assert.equal(new Set(urls).size, urls.length);
  for (const path of sitemapPaths) {
    assert.match(path, /^\/assets\/[^?]+\.html$/);
    const html = await read(`../dist${path}`);
    assert.ok(html.includes(`rel="canonical" href="${siteOrigin}${path}"`));
  }
});

test('hydration leaves canonical metadata alone and browser-specific consent stays separate', async () => {
  const main = await read('../src/main.jsx');
  assert.match(main, /hydrateRoot\(root, content\)/);
  assert.match(main, /createRoot\(document\.getElementById\('analytics-root'\)\)/);
  for (const path of ['../src/main.jsx', '../src/CardBuddyGuide.jsx', '../src/SambanePage.jsx']) {
    assert.doesNotMatch(await read(path), /document\.title\s*=|querySelector\(['"].*canonical/);
  }
  assert.doesNotMatch(pageHead(pages[1]), /\?guide=|href="https:\/\/phaselabs.co.za\/"/);
});

test('deploy tests first, keeps HTML uncached and leaves CloudFront routing untouched', async () => {
  const workflow = await read('../.github/workflows/deploy.yml');
  assert.ok(workflow.indexOf('npm test') < workflow.indexOf('aws-actions/configure-aws-credentials'));
  assert.match(workflow, /--exclude '\*\.html' --exclude 'sitemap\.xml'/);
  assert.match(workflow, /--content-type 'text\/html; charset=utf-8' --cache-control 'no-cache,no-store,must-revalidate'/);
  assert.match(workflow, /paths\+=\("\/\$key" "\/\$key\?\*"\)/);
  assert.ok(workflow.includes("'/?*'"));
  assert.ok(workflow.includes("'/index.html?*'"));
  assert.match(workflow, /cmp dist\/index\.html \/tmp\/live-legacy\.html/);
  assert.match(workflow, /--paths "\$\{paths\[@\]\}"/);
  assert.doesNotMatch(workflow, /update-distribution|publish-function|create-function|s3 sync dist\/\s/);
});
