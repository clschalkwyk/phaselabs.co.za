import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { basename, dirname, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pages, siteOrigin, sitemapPaths } from '../src/pages.js';
import { pageHead, legacyBrowserScript, cloudFrontRedirectFunction, escapeHtml } from './page-output.mjs';
import { renderPage } from '../.prerender/entry-server.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const template = await readFile(resolve(dist, 'index.html'), 'utf8');
const manifest = JSON.parse(await readFile(resolve(dist, '.vite/manifest.json'), 'utf8'));
if (!template.includes('<!--page-content-->') || !template.includes('<!--page-head-start-->')) throw new Error('The page template is missing its render markers.');

function cssFor(entry, seen = new Set()) {
  if (seen.has(entry)) return [];
  seen.add(entry);
  const chunk = manifest[entry];
  if (!chunk) throw new Error(`Missing client manifest entry: ${entry}`);
  return [...(chunk.css || []), ...(chunk.imports || []).flatMap(child => cssFor(child, seen))];
}

for (const page of pages) {
  const content = await renderPage(page.id);
  if (!content.includes('<main') || !content.includes('<h1')) throw new Error(`Page ${page.id} did not render meaningful content.`);
  // Rollup can promote a dynamic entry to a shared chunk when modules are reused.
  const candidates = Object.keys(manifest).filter(key => manifest[key].isDynamicEntry && manifest[key].name === basename(page.entry, extname(page.entry)));
  const entry = manifest[page.entry] ? page.entry : candidates.length === 1 ? candidates[0] : null;
  if (!entry) throw new Error(`Cannot identify a unique client entry for ${page.id}`);
  const css = [...new Set(cssFor(entry))].filter(file => !template.includes(`href="/${file}"`));
  const links = css.map(file => `<link rel="stylesheet" crossorigin href="/${escapeHtml(file)}" />`);
  links.push(`<link rel="modulepreload" crossorigin href="/${escapeHtml(manifest[entry].file)}" />`);
  let html = template.replace(/<!--page-head-start-->[\s\S]*?<!--page-head-end-->/, () => pageHead(page));
  html = html.replace('<!--page-content-->', () => content);
  html = html.replace('</head>', () => `${links.join('\n    ')}\n  </head>`);
  if (page.id === 'home') html = html.replace('<meta charset="UTF-8" />', () => `<meta charset="UTF-8" />\n    ${legacyBrowserScript()}`);
  const file = resolve(dist, page.path === '/' ? 'index.html' : page.path.slice(1));
  if (!file.startsWith(`${dist}/`)) throw new Error(`Invalid output path for ${page.id}`);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
  console.log(`Rendered ${page.path} (${Buffer.byteLength(html)} bytes)`);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapPaths.map(path => `  <url><loc>${escapeHtml(siteOrigin + path)}</loc></url>`).join('\n')}\n</urlset>\n`;
await writeFile(resolve(dist, 'assets/sitemap.xml'), sitemap);
await writeFile(resolve(root, '.prerender/cloudfront-legacy-redirects.js'), cloudFrontRedirectFunction());
