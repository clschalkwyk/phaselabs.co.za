import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const read = path => readFile(new URL(path, import.meta.url), 'utf8');
test('TruckTime is discoverable and clearly separates current and planned capability', async () => {
 const html = await read('../dist/assets/trucktime.html');
 const home = await read('../dist/index.html');
 assert.match(home, /href="\/assets\/trucktime.html"/);
 for (const text of ['Vendor waitlist open', 'Demo uses sample data', 'planned MVP', 'not live features', 'Native mobile apps come later', 'Next to validate', 'Stock the next service.']) assert.ok(html.includes(text), text);
 for (const url of ['https://trucktime.co.za/', 'https://demo.trucktime.co.za/', '/#from-the-lab']) assert.ok(html.includes(`href="${url}"`), url);
 assert.match(html, /rel="stylesheet"[^>]+href="\/assets\/TruckTimePage-[^"]+\.css"/);
 assert.ok((await read('../dist/assets/sitemap.xml')).includes('https://phaselabs.co.za/assets/trucktime.html'));
});
