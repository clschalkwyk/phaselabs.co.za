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
  for (const term of ['XRPL Testnet', 'Ethereum Sepolia', 'TEST USD₮ / DEMO-USDT', 'not Tether-issued, redeemable or real USDT', 'No production lending', 'No bridge, swap or foreign-exchange conversion', 'Synthetic / Sandbox', 'independently verified on the ledger', 'A payment receipt does not prove that goods were delivered']) {
    assert.ok(page.includes(term), term);
  }
  assert.match(page, /No real goods purchases, real USDT, production lending or verified supplier fulfilment/);
  assert.doesNotMatch(page, /Connect wallet|Sign transaction|Order now|Apply for a loan|USDT received/);
});

test('the funding journey requires opt-in, independent lending and separate borrower approvals', () => {
  for (const term of ['Being over budget never automatically starts a loan', 'One signature leaves it pending', 'Signing does not debit the Stokvel Safe', 'independent lender separately authorizes', 'borrower separately approves', 'locked guarantee reserve', 'enforceable default claim', 'repayment scheduling or loss allocation']) {
    assert.ok(page.includes(term), term);
  }
  assert.match(page, /R2,408.89 including delivery against a R1,600 limit leaves R808.89/);
  assert.match(page, /fixed demo rate, not a live exchange rate/);
  assert.match(page, /do not mean the farmer pays twice/);
});

test('the current Android build and ongoing WhatsApp validation are distinguished', () => {
  assert.match(page, /QVAC extracted the request and rand budget on a compatible Android phone/);
  assert.match(page, /not every voice or location scenario has been rehearsed/);
  assert.match(page, /Budget clarification, funding choices and notification delivery are being validated/);
  assert.match(page, /Financial approvals require wallet review/);
  assert.match(page, /funding-choice rehearsal stopped before signatures or payments/);
  assert.match(page, /settled credit example below used an earlier order/);
  assert.doesNotMatch(page, /Voice is a separate Android proof of concept|Lending disbursement and repayment remain undemonstrated|Balance reads, lending next|signed on the Mac/);
});

test('demonstrated broker work is distinct from the illustrated workflow and sandbox fulfilment', () => {
  assert.match(page, /<h2 id="next-title">What the prototype demonstrated<\/h2>/);
  assert.match(page, /href="#prototype-demonstrated"/);
  assert.match(page, /A chicken-feed request on WhatsApp resolved “the farm” to a saved address/);
  assert.match(page, /Product and Logistics brokers used OpenRouter, a synthetic supplier catalogue and Bob Go Sandbox quotes/);
  assert.match(page, /The brokers replied on WhatsApp/);
  assert.match(page, /separately approved bookings and test waybills have been exercised/);
  assert.match(page, /Real catalogue discovery is separate from executable quotes/);
  assert.match(page, /no physical fulfilment is verified/);
  assert.match(page, /Illustrated workflow/);
  assert.match(page, /It is not a live network view or transaction feed/);
});

test('XRP evidence links the current public receipt and describes bounded hosted signing', () => {
  const receipt = 'https://testnet.xrpl.org/transactions/C20EDC1A094367536A873A6105C9A09E3F283A2DC84BCF9133F0F05C7A9DA429/detailed';
  assert.ok(page.includes(`href="${receipt}"`));
  assert.match(page, /View the 0\.01 XRP Testnet transaction/);
  assert.match(page, /isolated Railway signer handles the XRP signing/);
  assert.match(page, /After the buyer payment verifies/);
  assert.match(page, /It does not prove the approval interface or delivery of goods/);
});

test('Sepolia evidence links all three existing transfers without implying repayment', () => {
  for (const hash of [
    '0x2fe7d6cdbea00ff7c0c002529c796900e84c33122fc9ba92c68b75b5c60cb944',
    '0x2d9fe6da5b8a88184e3054253ee55bbadd4797c8ea332dcc1592d8ece1076367',
    '0xf56258582dabf1e7ddd518e282f12b8d8adcdd911075b13d12b6ddd7502e957e',
  ]) assert.ok(page.includes(`href="https://sepolia.etherscan.io/tx/${hash}"`));
  assert.match(page, /44\.938334 test USD₮/);
  assert.match(page, /127\.777778 to the supplier and 6\.049445 to the courier/);
  assert.match(page, /Repayment and default handling are not demonstrated/);
});

test('the aardvark has accessible sizing and the public CTA does not expose the hackathon demo', () => {
  assert.match(page, /class="sambane-mascot"[^>]*alt="Sambane’s friendly aardvark mascot wearing a green scarf"[^>]*width="1312" height="1199"/);
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
