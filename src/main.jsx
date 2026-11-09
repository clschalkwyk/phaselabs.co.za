import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { findPage, legacyRedirect } from './pages.js';
import { pageLoaders } from './page-components.js';
import AnalyticsConsent from './AnalyticsConsent.jsx';
import './styles.css';

async function start() {
  const redirect = legacyRedirect(new URL(window.location.href));
  if (redirect) { window.location.replace(redirect); return; }
  const page = findPage(window.location.pathname);
  const { default: Page } = await pageLoaders[page.id]();
  const root = document.getElementById('root');
  const content = <StrictMode><Page /></StrictMode>;
  // The production HTML is useful before JavaScript; hydrate rather than replace it.
  if (root.querySelector('.site-shell')) hydrateRoot(root, content);
  else createRoot(root).render(content);
  // Consent is browser-specific and never part of the server-rendered tree.
  createRoot(document.getElementById('analytics-root')).render(<StrictMode><AnalyticsConsent /></StrictMode>);
}

start().catch(error => {
  // Keep the rendered guide/content available when an interactive chunk cannot load.
  console.error('Interactive page features could not load.', error);
});
