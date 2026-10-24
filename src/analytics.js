export const measurementId = 'G-WSSY148FR7';
const preferenceKey = 'phaselabs-analytics-consent';
let loaded = false;

export function readConsent() {
  try {
    const value = localStorage.getItem(preferenceKey);
    return ['granted', 'denied'].includes(value) ? value : null;
  } catch {
    return null;
  }
}

export function saveConsent(value) {
  try { localStorage.setItem(preferenceKey, value); } catch { /* Choice still applies to this visit. */ }
}

export function applyConsent(value) {
  const disabledKey = `ga-disable-${measurementId}`;
  if (value !== 'granted') {
    window[disabledKey] = true;
    for (const cookie of document.cookie.split(';')) {
      const name = cookie.trim().split('=')[0];
      if (!/^_ga(?:_|$)/.test(name)) continue;
      for (const domain of ['', '; Domain=phaselabs.co.za', '; Domain=www.phaselabs.co.za']) {
        document.cookie = `${name}=; Max-Age=0; Path=/${domain}; SameSite=Lax; Secure`;
      }
    }
    // Remove the loaded library and its listeners after withdrawing consent.
    if (loaded) window.location.reload();
    return;
  }
  if (loaded || !['phaselabs.co.za', 'www.phaselabs.co.za'].includes(window.location.hostname)) return;
  loaded = true;
  window[disabledKey] = false;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('consent', 'default', {
    analytics_storage: 'denied', ad_storage: 'denied',
    ad_user_data: 'denied', ad_personalization: 'denied',
  });
  window.gtag('consent', 'update', { analytics_storage: 'granted' });
  window.gtag('js', new Date());
  const page = new URL(window.location.href);
  const guide = page.searchParams.get('guide') === 'cardbuddy' ? '?guide=cardbuddy' : '';
  window.gtag('set', {
    page_location: `${page.origin}${page.pathname}${guide}`,
    page_referrer: document.referrer ? document.referrer.split(/[?#]/)[0] : '',
  });
  window.gtag('config', measurementId, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    cookie_expires: 60 * 24 * 60 * 60,
    cookie_update: false,
  });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.onerror = () => { script.remove(); loaded = false; window[disabledKey] = true; };
  document.head.appendChild(script);
}
