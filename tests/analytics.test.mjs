import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('../src/analytics.js', import.meta.url), 'utf8').replaceAll('export ', '');

function browser(host = 'phaselabs.co.za', blockedStorage = false) {
  const scripts = [];
  const cookies = [];
  const values = new Map();
  let reloads = 0;
  const document = {
    referrer: 'https://example.com/article?email=private@example.com',
    createElement: () => ({ remove() {} }),
    head: { appendChild: script => scripts.push(script) },
  };
  Object.defineProperty(document, 'cookie', {
    get: () => '_ga=old; _ga_WSSY148FR7=old; essential=keep',
    set: value => cookies.push(value),
  });
  const context = vm.createContext({
    URL, document,
    window: { location: { hostname: host, href: `https://${host}/?guide=cardbuddy&email=private@example.com#private`, reload: () => reloads++ } },
    localStorage: {
      getItem(key) { if (blockedStorage) throw Error('blocked'); return values.get(key); },
      setItem(key, value) { if (blockedStorage) throw Error('blocked'); values.set(key, value); },
    },
  });
  vm.runInContext(source, context);
  return { scripts, cookies, context, run: code => vm.runInContext(code, context), reloads: () => reloads };
}

test('unknown, rejected and malformed consent never load Google', () => {
  const b = browser();
  assert.equal(b.run('readConsent()'), null);
  b.run("applyConsent(null); saveConsent('denied'); applyConsent(readConsent()); saveConsent('invalid'); applyConsent(readConsent())");
  assert.equal(b.scripts.length, 0);
  assert.equal(b.run('readConsent()'), null);
  assert(b.cookies.every(value => value.startsWith('_ga')));
});

test('acceptance loads once, denies advertising and strips private URL values', () => {
  const b = browser();
  b.run("saveConsent('granted'); applyConsent(readConsent()); applyConsent(readConsent())");
  assert.equal(b.scripts.length, 1);
  assert.equal(b.scripts[0].src, 'https://www.googletagmanager.com/gtag/js?id=G-WSSY148FR7');
  const events = Array.from(b.context.window.dataLayer, args => Array.from(args));
  assert.equal(events[0][2].ad_storage, 'denied');
  assert.equal(events[1][2].analytics_storage, 'granted');
  assert(!JSON.stringify(events).includes('private'));
  assert.equal(events.find(event => event[0] === 'set')[1].page_location, 'https://phaselabs.co.za/?guide=cardbuddy');
  assert.equal(events.find(event => event[0] === 'config')[2].allow_google_signals, false);
});

test('withdrawal disables measurement, clears GA cookies only and reloads', () => {
  const b = browser();
  b.run("applyConsent('granted'); saveConsent('denied'); applyConsent('denied')");
  assert.equal(b.context.window['ga-disable-G-WSSY148FR7'], true);
  assert.equal(b.reloads(), 1);
  assert(b.cookies.length > 0 && b.cookies.every(value => value.startsWith('_ga')));
  assert.equal(b.run('readConsent()'), 'denied');
});

test('local preview never sends Analytics and blocked storage remains usable', () => {
  const local = browser('127.0.0.1');
  local.run("applyConsent('granted')");
  assert.equal(local.scripts.length, 0);
  const blocked = browser('phaselabs.co.za', true);
  assert.equal(blocked.run('readConsent()'), null);
  assert.doesNotThrow(() => blocked.run("saveConsent('granted'); applyConsent('granted')"));
});
