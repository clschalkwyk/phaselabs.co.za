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
  assert.match(page, /Less time chasing quotes/);
  assert.match(page, /This page describes the product direction, not a live ordering service/);
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

test('the page presents a planned sourcing workflow without payment or lending machinery', () => {
  for (const term of ['Agentic procurement', 'AI-powered input sourcing for small-scale farmers', 'supplier outreach and live logistics integrations remain to be validated', 'Source first.', 'Keep payment separate.', 'A quote request is not an order', 'does not need to hold funds']) assert.ok(page.includes(term), term);
  assert.doesNotMatch(page.replace(/<[^>]+>/g, ''), /\b(?:XRP|USDT|XRPL|Sepolia|x402|wallet|blockchain|Stokvel|lender|W3Node|WhatsApp)\b/i);
});

test('sourcing covers supplier liaison, transport responsibility and farmer approval', () => {
  for (const term of ['request quotes', 'clarify stock', 'farmer will collect', 'supplier can deliver', 'courier is needed', 'liaise with logistics providers', 'responsibility for transport explicit', 'approve, amend or decline', 'quote validity', 'A courier quote is not a booking']) assert.ok(page.includes(term), term);
  assert.match(page, /No claim to the cheapest price everywhere/);
  assert.match(page, /permissioned/);
});

test('prototype evidence is distinguished from the intended live service', () => {
  assert.match(page, /Previous supplier invoices were simulated/);
  assert.match(page, /Bob Go Sandbox/);
  assert.match(page, /full workflow described here is a product goal/);
  assert.match(page, /No live ordering, supplier negotiation or delivery service is offered/);
  assert.match(page, /Illustrated workflow/);
  assert.doesNotMatch(page, /Order now|Connect wallet|Sign transaction|Apply for a loan/);
});

test('homepage and metadata reflect procurement without crypto', async () => {
  const app = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8');
  const metadata = await readFile(new URL('../src/pages.js', import.meta.url), 'utf8');
  assert.match(app, /payment is separate from the sourcing engine/);
  assert.match(metadata, /AI-powered input sourcing for small-scale farmers/);
  assert.doesNotMatch(app + metadata, /XRP|USDT|XRPL|Sepolia|x402|Where Agents Do Business/);
});

test('the mascot is accessible and no obsolete demo or financing CTA remains', () => {
  assert.match(page, /class="sambane-mascot"[^>]*alt="Sambane’s waving aardvark mascot with the words Sambane: It takes a village."[^>]*width="1199" height="1312"/);
  assert.match(page, /href="#how-it-works"/);
  assert.doesNotMatch(page, /sambanestokvel|w3node.io|sambane-demo-demo/);
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
