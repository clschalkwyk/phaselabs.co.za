import * as THREE from 'three';
import { nodes, edges, stages } from './flow.js';

// Decorative WebGL enhancement. All meaning and controls remain in HTML.
export function createSambaneScene(host, { onPositions, onUnavailable }, createRenderer = options => new THREE.WebGLRenderer(options)) {
  const renderer = createRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setClearColor(0x10232e, 0);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-7, 7, 4, -4, 0.1, 50);
  camera.position.set(0, 8, 12);
  camera.lookAt(0, 0, 0);
  const group = new THREE.Group();
  scene.add(group);
  scene.add(new THREE.HemisphereLight(0xc0ffff, 0x142835, 2.5));
  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(-4, 9, 4);
  scene.add(light);
  const objects = [];
  const cyan = 0x40e3df;
  const gold = 0xf0cb80;
  const grid = new THREE.GridHelper(16, 32, 0x2d5968, 0x24424f);
  grid.position.y = -0.13;
  grid.material.transparent = true;
  grid.material.opacity = 0.32;
  group.add(grid);
  nodes.forEach(node => {
    const container = new THREE.Group();
    container.position.set(node.x, 0, node.z);
    const color = node.id === 'farmer' ? gold : cyan;
    const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.49, 0.59, 0.24, 6), new THREE.MeshStandardMaterial({ color: 0x234353, metalness: 0.6, roughness: 0.4 }));
    pedestal.position.y = 0.02;
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(node.id === 'farmer' ? 0.28 : 0.22, 0), new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.3, metalness: 0.45, roughness: 0.25 }));
    core.position.y = 0.55;
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.47, 0.015, 5, 40), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.65 }));
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.18;
    container.add(pedestal, core, ring);
    group.add(container);
    objects.push({ id: node.id, core, ring });
  });
  const paths = edges.map(edge => {
    const from = nodes.find(node => node.id === edge.from);
    const to = nodes.find(node => node.id === edge.to);
    const a = new THREE.Vector3(from.x, 0.35, from.z);
    const b = new THREE.Vector3(to.x, 0.35, to.z);
    const curve = edge.return
      ? new THREE.CubicBezierCurve3(a, new THREE.Vector3(5.1, 0.7, 4.6), new THREE.Vector3(-5.1, 0.7, 4.6), b)
      : new THREE.QuadraticBezierCurve3(a, new THREE.Vector3((from.x + to.x) / 2, 0.9, (from.z + to.z) / 2), b);
    const material = new THREE.LineBasicMaterial({ color: edge.return ? gold : cyan, transparent: true, opacity: 0.35 });
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(50)), material);
    const packet = new THREE.Mesh(new THREE.SphereGeometry(0.055, 8, 6), new THREE.MeshBasicMaterial({ color: edge.return ? gold : 0xd4ffff }));
    group.add(line, packet);
    return { ...edge, curve, line, packet };
  });
  let stage = 0;
  let paused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let visible = false;
  let lost = false;
  let disposed = false;
  let previous = 0;
  let clock = 0;
  let frameCount = 0;
  let slowFrames = 0;
  let staticPerformance = false;

  function paint(now = 0) {
    if (disposed || lost) return;
    // Cap animation at 30 fps; render only on demand for still views.
    if (now && previous && now - previous < 32) return;
    if (now && previous) {
      const delta = now - previous;
      clock += Math.min(delta / 1000, 0.1);
      frameCount++;
      if (delta > 90) slowFrames++;
      if (frameCount === 90 && slowFrames > 45) { staticPerformance = true; sync(); }
    }
    previous = now;
    objects.forEach(({ core }, index) => { core.rotation.y = clock * 0.24 + index; });
    paths.forEach(({ curve, packet }, index) => { packet.position.copy(curve.getPoint((clock * 0.17 + index * 0.14) % 1)); });
    renderer.render(scene, camera);
  }
  function sync() {
    previous = 0;
    renderer.setAnimationLoop(!disposed && !lost && !paused && !staticPerformance && visible && !document.hidden ? paint : null);
  }
  function resize() {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height || disposed || lost) return;
    const aspect = width / height;
    const halfWidth = 6.7;
    camera.left = -halfWidth;
    camera.right = halfWidth;
    camera.top = halfWidth / aspect;
    camera.bottom = -halfWidth / aspect;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    const positions = Object.fromEntries(nodes.map(node => {
      const point = new THREE.Vector3(node.x, 1.1, node.z).project(camera);
      return [node.id, { x: (point.x + 1) * 50, y: (1 - point.y) * 50 }];
    }));
    onPositions(positions);
    paint();
  }
  function setStage(value) {
    stage = value;
    objects.forEach(({ id, core, ring }) => {
      const active = stages[stage].active.includes(id);
      core.material.emissiveIntensity = active ? 0.85 : 0.08;
      ring.material.opacity = active ? 1 : 0.28;
    });
    paths.forEach(path => {
      const active = path.stages.includes(stage);
      path.line.material.opacity = active ? 0.9 : 0.16;
      path.packet.visible = active;
    });
    paint();
  }
  function contextLost(event) {
    event.preventDefault();
    lost = true;
    sync();
    onUnavailable();
  }
  const resizeObserver = new ResizeObserver(resize);
  const intersectionObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
  host.appendChild(renderer.domElement);
  renderer.domElement.addEventListener('webglcontextlost', contextLost);
  resizeObserver.observe(host);
  intersectionObserver.observe(host);
  document.addEventListener('visibilitychange', sync);
  setStage(0);
  resize();
  return {
    setStage,
    setPaused(value) { paused = value; sync(); paint(); },
    dispose() {
      disposed = true;
      renderer.setAnimationLoop(null);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', sync);
      renderer.domElement.removeEventListener('webglcontextlost', contextLost);
      group.traverse(object => {
        object.geometry?.dispose();
        if (Array.isArray(object.material)) object.material.forEach(material => material.dispose());
        else object.material?.dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
