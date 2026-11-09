import { createElement } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { PassThrough } from 'node:stream';
import { pageLoaders } from './page-components.js';

export async function renderPage(id) {
  if (!pageLoaders[id]) throw new Error(`No component registered for ${id}`);
  const { default: Page } = await pageLoaders[id]();
  return new Promise((resolve, reject) => {
    let html = '';
    const output = new PassThrough();
    output.setEncoding('utf8');
    output.on('data', chunk => { html += chunk; });
    output.on('end', () => resolve(html));
    output.on('error', reject);
    const stream = renderToPipeableStream(createElement(Page), {
      onAllReady() { stream.pipe(output); },
      onError(error) { reject(error); },
    });
  });
}
