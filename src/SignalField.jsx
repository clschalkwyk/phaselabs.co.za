import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

export default function SignalField() {
  const host = useRef(null);
  const controls = useRef(null);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = host.current;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.setClearColor(0x182833, 0);
    element.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x182833, 27, 52);
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 80);
    camera.position.set(15, 16, 22);
    camera.lookAt(0, 0, 0);
    const geometry = new RoundedBoxGeometry(0.3, 1, 0.3, 1, 0.045);
    const material = new THREE.MeshStandardMaterial({ metalness: 0.45, roughness: 0.3 });
    const size = 48;
    const field = new THREE.InstancedMesh(geometry, material, size * size);
    field.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    field.frustumCulled = false;
    const color = new THREE.Color();
    for (let i = 0; i < field.count; i++) {
      const x = i % size - size / 2;
      const z = Math.floor(i / size) - size / 2;
      color.setHSL(0.51 + Math.hypot(x, z) / size * 0.06, 0.65, 0.36 + (x + size / 2) / size * 0.24);
      field.setColorAt(i, color);
    }
    scene.add(field, new THREE.HemisphereLight(0xc9faff, 0x182833, 1.6));
    const light = new THREE.DirectionalLight(0xffffff, 1.6);
    light.position.set(3, 12, 8);
    scene.add(light);
    const rim = new THREE.DirectionalLight(0x00e8f2, 3);
    rim.position.set(-8, 4, -6);
    scene.add(rim);
    const dummy = new THREE.Object3D();
    const pointer = new THREE.Vector2();
    const target = new THREE.Vector2();
    let time = 0;
    let previous = 0;
    let visible = true;
    let stopped = false;

    function render(now = 0) {
      time += previous ? Math.min((now - previous) / 1000, 0.05) : 0;
      previous = now;
      pointer.lerp(target, 0.035);
      field.rotation.y = -0.14 + pointer.x * 0.12;
      field.rotation.x = pointer.y * 0.05;
      for (let i = 0; i < field.count; i++) {
        const x = (i % size - (size - 1) / 2) * 0.42;
        const z = (Math.floor(i / size) - (size - 1) / 2) * 0.42;
        const wave = Math.sin(x * 0.48 + time * 0.85) + Math.cos(z * 0.42 + time * 0.65)
          + Math.sin(Math.hypot(x - pointer.x * 5, z - pointer.y * 5) * 0.65 - time);
        const height = 0.35 + (wave + 3) * 0.6;
        dummy.position.set(x, height * 0.5 - 1.5, z);
        dummy.scale.set(1, height, 1);
        dummy.updateMatrix();
        field.setMatrixAt(i, dummy.matrix);
      }
      field.instanceMatrix.needsUpdate = true;
      renderer.render(scene, camera);
    }

    function sync() {
      previous = 0;
      renderer.setAnimationLoop(!stopped && !preference.matches && visible && !document.hidden ? render : null);
    }
    function resize() {
      const { width, height } = element.getBoundingClientRect();
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      render();
    }
    function move(event) {
      const bounds = element.getBoundingClientRect();
      target.set((event.clientX - bounds.left) / bounds.width * 2 - 1, (event.clientY - bounds.top) / bounds.height * 2 - 1);
    }
    function leave() { target.set(0, 0); }
    function preferenceChanged() { setReduced(preference.matches); sync(); }
    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    resizeObserver.observe(element);
    intersectionObserver.observe(element);
    element.addEventListener('pointermove', move);
    element.addEventListener('pointerleave', leave);
    document.addEventListener('visibilitychange', sync);
    preference.addEventListener('change', preferenceChanged);
    controls.current = value => { stopped = value; sync(); };
    resize();
    sync();
    setReady(true);
    return () => {
      controls.current = null;
      renderer.setAnimationLoop(null);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      element.removeEventListener('pointermove', move);
      element.removeEventListener('pointerleave', leave);
      document.removeEventListener('visibilitychange', sync);
      preference.removeEventListener('change', preferenceChanged);
      field.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  useEffect(() => { controls.current?.(paused); }, [paused]);

  return (
    <figure className="signal-field">
      <div className="signal-canvas" ref={host} aria-hidden="true" />
      <figcaption><span>From signal to structure.</span>
        {ready && !reduced && <button type="button" onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? 'Play motion' : 'Pause motion'}</button>}
        {reduced && <span className="signal-note">Still, by preference</span>}
      </figcaption>
    </figure>
  );
}
