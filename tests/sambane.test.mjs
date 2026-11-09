import { after, before, test } from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';
import { nodes, edges, stages } from '../src/sambane/flow.js';
import { readFile } from 'node:fs/promises';

let server;
let page;
before(async () => {
  server = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom', optimizeDeps: { noDiscovery: true, include: [] } });
  const { default: SambanePage } = await server.ssrLoadModule('/src/SambanePage.jsx');
  page = renderToStaticMarkup(createElement(SambanePage));
});
after(async () => { await server?.close(); });

test('Sambane page is renderable without browser globals and keeps the farmer first', () => {
  assert.match(page, /<h1 id="sambane-title">Sambane/);
  assert.match(page, /A farmer has a need/);
  assert.match(page, /This page is an illustration, not a live ordering service/);
  assert.match(page, /href="\/#from-the-lab"/);
  assert.match(page, /In development/);
});

test('the hero credits SM Web Systems with the official logo and advisory role', () => {
  const credit = page.match(/<div class="sambane-partnership">([\s\S]*?)<\/div><\/div>/)?.[1];
  assert.ok(credit, 'A visible partnership credit is present in the hero');
  assert.match(credit, /In partnership with <a href="https:\/\/smwebsystems\.com\/">SM Web Systems/);
  assert.match(credit, /Advisory support for Sambane’s development\./);
  assert.match(credit, /viewBox="0 0 960\.01 641"/);
  assert.match(credit, /aria-hidden="true" focusable="false"/);
  assert.equal((credit.match(/<rect /g) || []).length, 8);
  assert.doesNotMatch(credit, /sponsor|funded|certified|endorsed/i);
  assert.ok(page.indexOf('sambane-partnership') < page.indexOf('sambane-intro'));
});

test('the illustrative request matches the requested wording and destination', () => {
  assert.match(page, /<p class="sambane-quote">“10 bags of chicken feed to the farm”<\/p>/);
  assert.match(page, /<dt>The destination<\/dt><dd>The farm<\/dd>/);
  assert.doesNotMatch(page, /Malmesbury/);
});

test('every workflow stage has a keyboard-operable button and complete textual equivalent', () => {
  assert.equal((page.match(/aria-controls="sambane-stage-detail"/g) || []).length, 4);
  assert.equal((page.match(/aria-pressed="true"/g) || []).length, 1);
  assert.match(page, /id="sambane-stage-detail" aria-live="polite" aria-atomic="true"/);
  assert.match(page, /Read the complete flow in text/);
  stages.forEach(stage => { assert.ok(page.includes(stage.heading)); assert.ok(page.includes(stage.boundary)); });
  assert.match(page, /Enable 3D/);
});

test('testnet rails, consent and synthetic commerce are explicit', () => {
  for (const term of ['XRPL Testnet', 'Ethereum Sepolia', 'TEST USD₮ / DEMO-USDT', 'not Tether-issued, redeemable or real USDT', 'No production lending', 'No bridge, swap or foreign-exchange conversion', 'Synthetic', 'independently verified on the ledger', 'A payment receipt does not prove that goods were delivered']) {
    assert.ok(page.includes(term), term);
  }
  assert.match(page, /lender must also authorize a test disbursement/);
  assert.match(page, /No real goods purchases, real USDT, production lending or verified supplier fulfilment/);
  assert.doesNotMatch(page, /Connect wallet|Sign transaction|Order now|Apply for a loan|USDT received/);
});

test('demonstrated WhatsApp broker work is distinct from the illustrated workflow', () => {
  assert.match(page, /<h2 id="next-title">What the prototype demonstrated<\/h2>/);
  assert.match(page, /href="#prototype-demonstrated"/);
  assert.match(page, /id="prototype-demonstrated" aria-labelledby="next-title"/);
  assert.match(page, /A chicken-feed request on WhatsApp resolved “the farm” to a saved address/);
  assert.match(page, /Product and Logistics brokers used OpenRouter, a synthetic supplier catalogue and Bob Go Sandbox quotes/);
  assert.match(page, /The brokers replied on WhatsApp/);
  assert.match(page, /Broker activity <small>Demonstrated<\/small>/);
  assert.match(page, /Illustrated workflow/);
  assert.match(page, /aria-label="Explore the illustrated workflow"/);
  assert.match(page, /It is not a live network view or transaction feed/);
});

test('verified XRP evidence links the exact public receipt without claiming it proves the workflow', () => {
  const receipt = 'https://testnet.xrpl.org/transactions/C9B90FC07A87093DF4E7C3D567D0EB099956455D2E01C4B58FFAE9C95A82C69F/detailed';
  assert.ok(page.includes(`href="${receipt}"`));
  assert.match(page, /View the 0\.01 XRP Testnet transaction/);
  assert.match(page, /0\.01 XRP from Product to Logistics/);
  assert.match(page, /approved on Android, signed on the Mac and independently verified on the ledger/);
  assert.match(page, /receipt appeared in the Railway dashboard/);
  assert.match(page, /It does not prove the Android approval, Mac signing workflow or delivery of goods/);
  assert.match(page, /Onchain evidence <small>Verified receipt<\/small>/);
  assert.match(page, /a verified XRP Testnet payment/);
  assert.doesNotMatch(page, /verified XRP Testnet payments/);
});

test('voice, balance reads and simulated commerce do not imply demonstrated lending or fulfilment', () => {
  assert.match(page, /Voice is a separate Android proof of concept/);
  assert.match(page, /WDK integration reads Sepolia test-token balances/);
  assert.match(page, /Lending disbursement and repayment remain undemonstrated/);
  assert.match(page, /Courier booking and fulfilment are simulated/);
  assert.match(page, /Synthetic \/ simulated/);
  assert.doesNotMatch(page, /Building the first proof|Testnet target|Live agent work <small>Planned|planned prototype|Planned voice input|XRPL and Sepolia receipts/);
});

test('all diagram edges and highlighted stages resolve to meaningful actors', () => {
  const ids = new Set(nodes.map(node => node.id));
  assert.equal(ids.size, nodes.length);
  edges.forEach(edge => { assert.ok(ids.has(edge.from)); assert.ok(ids.has(edge.to)); edge.stages.forEach(stage => assert.ok(stages[stage])); });
  stages.forEach(stage => stage.active.forEach(id => assert.ok(ids.has(id))));
  assert.ok(edges.some(edge => edge.from === 'proposal' && edge.to === 'farmer'));
});

test('heavy rendering stays lazy with motion, visibility and context-loss safeguards', async () => {
  const flow = await readFile(new URL('../src/sambane/SambaneFlow.jsx', import.meta.url), 'utf8');
  const scene = await readFile(new URL('../src/sambane/createSambaneScene.js', import.meta.url), 'utf8');
  assert.match(flow, /await import\('\.\/createSambaneScene'\)/);
  assert.match(flow, /navigator\.connection\?\.saveData/);
  assert.match(flow, /prefers-reduced-motion: reduce/);
  assert.match(scene, /!width \|\| !height \|\| disposed \|\| lost/);
  assert.match(scene, /!document\.hidden/);
  assert.match(scene, /renderer\.dispose\(\)/);
  assert.match(scene, /intersectionObserver\.disconnect\(\)/);
});
