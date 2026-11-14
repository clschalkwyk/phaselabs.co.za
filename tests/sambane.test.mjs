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

test('current native XRP flow preserves consent and prototype boundaries', () => {
  for (const term of ['XRPL Testnet', 'fixed XRP pricing', 'two members’ off-chain endorsements', 'farmer and member signatures', 'payment journal', 'does not convert rand', 'No locked guarantee reserve', 'No mainnet funds', 'A payment receipt does not prove that goods were delivered']) assert.ok(page.includes(term), term);
  assert.match(page, /No real goods purchases, real USDT, production lending or verified supplier fulfilment/);
  assert.doesNotMatch(page, /WhatsApp|Connect wallet|Sign transaction|Order now|Apply for a loan|USDT received/);
});

test('current Android build and historical experiments are distinguished', () => {
  assert.match(page, /text-first Android input/);
  assert.match(page, /behind a demo build flag, not enabled in every app build/);
  assert.match(page, /Earlier Sepolia test-token and broker-fee experiments are historical/);
  assert.match(page, /Build review: 14 November 2026/);
  assert.doesNotMatch(page, /R2,408.89|2 XRP Testnet payment|Safe’s two owners/);
});

test('settlement and the separate sandbox booking rehearsal are distinguished', () => {
  assert.match(page, /The supplier invoice is simulated/);
  assert.match(page, /The settlement flow does not book a courier/);
  assert.match(page, /separate, optional sandbox booking rehearsal/);
  assert.match(page, /not part of the current native XRP settlement flow/);
  assert.match(page, /Illustrated workflow/);
  assert.match(page, /It is not a live network view or transaction feed/);
});

test('dated evidence links source proof without claiming independent audit or complete protocol proof', () => {
  assert.ok(page.includes('https://github.com/clschalkwyk/sambane-w3node-2026/blob/d6b84a137e47cfdc6562539fda751438ddf1765e/docs/native-xrp-demo-proof.md'));
  assert.match(page, /not an independent audit/);
  assert.match(page, /four transfers: lender to farmer, farmer to Product Agent/);
  assert.match(page, /do not, by themselves, prove a complete HTTP challenge-response exchange/);
  assert.match(page, /no production guarantee, repayment collection or default recovery is demonstrated/);
});

test('homepage card and metadata reflect native XRP rather than old settlement rails', async () => {
  const app = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8');
  const metadata = await readFile(new URL('../src/pages.js', import.meta.url), 'utf8');
  assert.match(app, /native XRP Testnet funding, deposit and agent settlement/);
  assert.match(metadata, /native XRP Testnet agent settlement/);
  assert.doesNotMatch(app + metadata, /separate Sepolia credit/);
});

test('the aardvark has accessible sizing and the public CTA does not expose the hackathon demo', () => {
  assert.match(page, /class="sambane-mascot"[^>]*alt="Sambane’s waving aardvark mascot with the words Sambane: It takes a village."[^>]*width="1199" height="1312"/);
  assert.match(page, /href="https:\/\/sambanestokvel\.co\.za\/"/);
  assert.match(page, /Waiting lists are open for farmers, suppliers, lenders and Stokvel members/);
  assert.doesNotMatch(page, /href="https:\/\/(?:demo\.sambanestokvel\.co\.za|sambane-demo-demo\.up\.railway\.app)/);
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
