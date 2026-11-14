export const siteOrigin = 'https://phaselabs.co.za';

// Explicit object URLs work with the existing S3/CloudFront deployment permissions.
// Register each future page here and add its loader in page-components.js.
export const pages = [
  {
    id: 'home', path: '/', entry: 'src/App.jsx',
    title: 'PhaseLabs | Coming soon for technical founders',
    description: 'Building got faster. Founding didn’t. PhaseLabs is developing a venture desk to help technical founders challenge assumptions and decide what to test next. Coming soon.',
    ogTitle: 'PhaseLabs — Building got faster. Founding didn’t.',
    ogDescription: 'A venture desk for technical founders. Clearer questions, explicit assumptions and a practical next step. In development.',
  },
  {
    id: 'cardbuddyGuide', path: '/assets/cardbuddy-guide.html', entry: 'src/CardBuddyGuide.jsx',
    title: 'CardBuddy user guide | PhaseLabs',
    description: 'Learn how to create and style CardBuddy cards, share contact QR codes, images and PDFs, use Android home-screen widgets, and back up or restore your cards.',
  },
  {
    id: 'sambane', path: '/assets/sambane.html', entry: 'src/SambanePage.jsx',
    title: 'Sambane | Where Agents Do Business · PhaseLabs',
    description: 'Sambane is an Android-first rural-farmer commerce prototype with Stokvel endorsements, farmer-approved agent settlement and native XRP Testnet payment evidence.',
    ogTitle: 'Sambane | Where Agents Do Business',
    ogDescription: 'A W3Node prototype by PhaseLabs: farmer-approved mandates, community endorsements and native XRP Testnet agent settlement. Simulated commerce. In development.',
  },
];

export const pagePaths = Object.fromEntries(pages.map(page => [page.id, page.path]));

// Preserve the old selector precedence if a historical URL contains both selectors.
export const legacyRoutes = [
  { key: 'project', value: 'sambane', path: pagePaths.sambane },
  { key: 'guide', value: 'cardbuddy', path: pagePaths.cardbuddyGuide },
];

export function findPage(pathname) {
  return pages.find(page => page.path === pathname) || pages[0];
}

export function legacyRedirect(url) {
  if (!['/', '/index.html'].includes(url.pathname)) return null;
  const route = legacyRoutes.find(item => url.searchParams.get(item.key) === item.value);
  if (!route) return null;
  const params = new URLSearchParams(url.search);
  legacyRoutes.forEach(item => params.delete(item.key));
  const query = params.toString();
  return `${route.path}${query ? `?${query}` : ''}${url.hash}`;
}

// A sitemap at /assets/sitemap.xml is scoped to /assets/. The homepage is linked
// throughout the site and self-canonical, but cannot be listed in that scoped file.
export const sitemapPaths = [...pages.filter(page => page.path.startsWith('/assets/')).map(page => page.path), '/assets/cardbuddy-privacy.html'];
