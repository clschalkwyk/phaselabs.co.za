import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createSambaneScene } from '../src/sambane/createSambaneScene.js';

function fixture(reduced = false) {
  let resize;
  let intersection;
  let positions = 0;
  let unavailable = 0;
  let disposed = false;
  const element = new EventTarget();
  element.remove = () => {};
  const renderer = { domElement: element, loop: null, setPixelRatio() {}, setClearColor() {}, setSize() {}, render() {}, setAnimationLoop(value) { this.loop = value; }, dispose() { disposed = true; } };
  globalThis.window = { devicePixelRatio: 3, matchMedia: () => ({ matches: reduced }) };
  globalThis.document = Object.assign(new EventTarget(), { hidden: false });
  globalThis.ResizeObserver = class { constructor(callback) { resize = callback; } observe() {} disconnect() {} };
  globalThis.IntersectionObserver = class { constructor(callback) { intersection = callback; } observe() {} disconnect() {} };
  const host = { appendChild() {}, getBoundingClientRect: () => ({ width: 1000, height: 390 }) };
  const scene = createSambaneScene(host, { onPositions: () => positions++, onUnavailable: () => unavailable++ }, () => renderer);
  return { scene, renderer, resize: () => resize(), visible: value => intersection([{ isIntersecting: value }]), positions: () => positions, unavailable: () => unavailable, disposed: () => disposed,
    cleanup() { scene.dispose(); for (const key of ['window', 'document', 'ResizeObserver', 'IntersectionObserver']) delete globalThis[key]; } };
}

test('scene pauses when hidden, off-screen or explicitly paused and resumes safely', () => {
  const f = fixture();
  try {
    f.visible(true); assert.equal(typeof f.renderer.loop, 'function');
    f.scene.setPaused(true); assert.equal(f.renderer.loop, null);
    f.scene.setStage(2); assert.equal(f.renderer.loop, null);
    f.scene.setPaused(false); assert.equal(typeof f.renderer.loop, 'function');
    f.visible(false); assert.equal(f.renderer.loop, null);
    f.visible(true); document.hidden = true; document.dispatchEvent(new Event('visibilitychange')); assert.equal(f.renderer.loop, null);
    document.hidden = false; document.dispatchEvent(new Event('visibilitychange')); assert.equal(typeof f.renderer.loop, 'function');
  } finally { f.cleanup(); }
  assert.ok(f.disposed()); assert.equal(f.renderer.loop, null);
});

test('reduced-motion scene starts still', () => {
  const f = fixture(true);
  try { f.visible(true); assert.equal(f.renderer.loop, null); } finally { f.cleanup(); }
});

test('context-loss fallback cannot be overwritten by later resize or stage updates', () => {
  const f = fixture();
  try {
    f.visible(true);
    f.renderer.domElement.dispatchEvent(new Event('webglcontextlost', { cancelable: true }));
    const positions = f.positions();
    f.resize(); f.scene.setStage(3); f.scene.setPaused(false); f.visible(true);
    assert.equal(f.positions(), positions);
    assert.equal(f.unavailable(), 1);
    assert.equal(f.renderer.loop, null);
  } finally { f.cleanup(); }
});
