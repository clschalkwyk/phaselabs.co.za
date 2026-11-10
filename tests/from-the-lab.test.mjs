import { after, before, test } from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

let server;
let home;
let lab;

before(async () => {
  server = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    optimizeDeps: { noDiscovery: true, include: [] },
  });
  const { default: App } = await server.ssrLoadModule('/src/App.jsx');
  globalThis.window = { location: { search: '' } };
  try {
    home = renderToStaticMarkup(createElement(App));
  } finally {
    delete globalThis.window;
  }
  lab = home.match(/<section[^>]+id="from-the-lab"[^>]*>([\s\S]*?)<\/section>/)?.[1];
});

after(async () => { await server?.close(); });

test('the lab overview presents all three projects with clear development status', () => {
  assert.ok(lab, 'The homepage includes a From the lab section');
  assert.match(lab, /<h2 id="lab-title">From the lab<\/h2>/);
  assert.equal((lab.match(/<article /g) || []).length, 3);
  assert.match(lab, /Closed testing[\s\S]*<h3 id="lab-cardbuddy-title">CardBuddy<\/h3>/);
  assert.match(lab, /In development[\s\S]*<h3 id="lab-stat60-title">STAT-60<\/h3>/);
  assert.match(lab, /Exploring clearer handoffs from antimicrobial prescribing through pharmacy to bedside administration\. STAT-60 focuses on task ownership, workflow visibility and traceable records\./);
  assert.match(lab, /Not approved for clinical use\./);
});

test('the overview reuses CardBuddy details without duplicate signup or invented project links', () => {
  assert.deepEqual([...lab.matchAll(/href="([^"]+)"/g)].map(match => match[1]), [
    '#cardbuddy',
    '/assets/sambane.html',
  ]);
  assert.equal((home.match(/id="cardbuddy"/g) || []).length, 1);
  assert.equal((home.match(/>Request tester access /g) || []).length, 1);
  assert.match(home, /id="cardbuddy-documentation"/);
  assert.match(home, /href="\/assets\/cardbuddy-guide\.html"/);
  assert.match(home, /href="\/assets\/cardbuddy-privacy\.html"/);
  assert.ok(home.indexOf('id="from-the-lab"') < home.indexOf('id="cardbuddy"'));
});

test('Sambane replaces the old project with the current commerce-network direction', () => {
  const sambane = lab.match(/<article[^>]+aria-labelledby="lab-sambane-title"[^>]*>([\s\S]*?)<\/article>/)?.[1];
  assert.ok(sambane, 'Sambane has its own labelled project card');
  assert.match(sambane, /In development/);
  assert.match(sambane, /<h3 id="lab-sambane-title">Sambane<\/h3>/);
  assert.match(sambane, /Where Agents Do Business\./);
  assert.match(sambane, /rural farmers compare farm-input and delivery costs within a budget they set/);
  assert.match(sambane, /Product and Logistics brokers coordinating the options/);
  assert.match(sambane, /farmer can request Stokvel backing/);
  assert.match(sambane, /Two designated members endorse the terms; a separate lender funds the shortfall/);
  assert.match(sambane, /Payment approvals stay in the wallet/);
  assert.match(sambane, /Rehearsed: XRP Testnet broker payments and separate Sepolia credit settlement/);
  assert.match(sambane, /Selectable supplier offers are synthetic; courier bookings are Sandbox/);
  assert.doesNotMatch(sambane, /Planned demo|discover, subcontract/);
  assert.match(sambane, /No real goods purchases, real USDT or production lending\./);
  assert.match(sambane, /href="\/assets\/sambane\.html"/);
  assert.doesNotMatch(sambane, /<img\b|<svg\b/, 'No concept or third-party brand assets are presented as finalized artwork');
  assert.doesNotMatch(home, /Agent[ -]K|lab-agent-k-title|discover raw data, model outputs and research/i);
});
