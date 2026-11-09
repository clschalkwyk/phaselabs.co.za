import { useEffect, useRef, useState } from 'react';
import { nodes, edges, stages } from './flow.js';

const compactPoints = { farmer: { x: 50, y: 10 }, intent: { x: 50, y: 28 }, product: { x: 50, y: 46 }, suppliers: { x: 23, y: 66 }, logistics: { x: 77, y: 66 }, proposal: { x: 50, y: 88 } };
const flatPoint = (node, compact) => compact ? compactPoints[node.id] : ({ x: 50 + node.x * 8, y: 44 + node.z * 13 });

function FlatFlow({ stage, compact }) {
  return <svg className="sambane-flat-flow" viewBox={compact ? "0 0 400 500" : "0 0 1000 450"} preserveAspectRatio="none" aria-hidden="true">
    {edges.map((edge, index) => {
      const a = flatPoint(nodes.find(node => node.id === edge.from), compact);
      const b = flatPoint(nodes.find(node => node.id === edge.to), compact);
      const sx = compact ? 4 : 10;
      const sy = compact ? 5 : 4.5;
      const path = compact && edge.return ? `M ${a.x * sx} ${a.y * sy} C 20 440, 20 50, ${b.x * sx} ${b.y * sy}` : edge.return ? `M ${a.x * 10} ${a.y * 4.5} C 900 440, 100 440, ${b.x * 10} ${b.y * 4.5}` : `M ${a.x * sx} ${a.y * sy} L ${b.x * sx} ${b.y * sy}`;
      return <path key={index} d={path} className={edge.stages.includes(stage) ? 'is-active' : ''} />;
    })}
    {nodes.map(node => { const point = flatPoint(node, compact); return <circle key={node.id} cx={point.x * (compact ? 4 : 10)} cy={point.y * (compact ? 5 : 4.5)} r={compact ? 5 : 10} className={stages[stage].active.includes(node.id) ? 'is-active' : ''} />; })}
  </svg>;
}

export default function SambaneFlow() {
  const host = useRef(null);
  const controller = useRef(null);
  const [stage, setStage] = useState(0);
  const [compact, setCompact] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [mode, setMode] = useState('flat');
  const [positions, setPositions] = useState(null);
  const [enable3D, setEnable3D] = useState(false);
  const [fallbackReason, setFallbackReason] = useState('Lightweight diagram');
  const activeStage = stages[stage];

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const screen = window.matchMedia('(max-width: 640px)');
    const update = () => { setReduced(preference.matches); setCompact(screen.matches); };
    update();
    preference.addEventListener('change', update);
    screen.addEventListener('change', update);
    return () => { preference.removeEventListener('change', update); screen.removeEventListener('change', update); };
  }, []);

  useEffect(() => {
    const element = host.current;
    const lightweight = window.matchMedia('(max-width: 640px)').matches || navigator.connection?.saveData || (navigator.deviceMemory && navigator.deviceMemory < 4);
    if (lightweight && !enable3D) return;
    let disposed = false;
    let started = false;
    let scene;
    const observer = new IntersectionObserver(async ([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      try {
        const { createSambaneScene } = await import('./createSambaneScene');
        if (disposed) return;
        scene = createSambaneScene(element, {
          onPositions: setPositions,
          onUnavailable: () => { setMode('flat'); setPositions(null); setFallbackReason('3D unavailable. Showing the lightweight diagram.'); },
        });
        controller.current = scene;
        setMode('3d');
      } catch {
        if (disposed) return;
        setMode('flat');
        setPositions(null);
        setFallbackReason('3D unavailable. Showing the lightweight diagram.');
      }
    }, { rootMargin: '120px' });
    observer.observe(element);
    return () => { disposed = true; observer.disconnect(); scene?.dispose(); controller.current = null; };
  }, [enable3D]);

  useEffect(() => { controller.current?.setStage(stage); }, [stage, mode]);
  useEffect(() => { controller.current?.setPaused(paused || reduced); }, [paused, reduced, mode]);

  return (
    <div className="sambane-flow">
      <div className="sambane-flow-controls" aria-label="Explore the illustrated workflow">
        {stages.map((item, index) => <button type="button" key={item.title} onClick={() => setStage(index)} aria-pressed={stage === index} aria-controls="sambane-stage-detail"><span>0{index + 1}</span>{item.title}<span aria-hidden="true">↗</span></button>)}
      </div>
      <figure className="sambane-network" aria-label="Illustrative Sambane data flow">
        <div className="sambane-network-top"><span><i aria-hidden="true" />Illustrated workflow</span><span>Request → coordination → proposal</span></div>
        <div className={`sambane-diagram ${mode === '3d' ? 'is-3d' : ''}`}>
          <div className="sambane-scene" ref={host} aria-hidden="true" />
          {mode !== '3d' && <FlatFlow stage={stage} compact={compact} />}
          <div className="sambane-node-labels" aria-hidden="true">{nodes.map(node => {
            const point = positions?.[node.id] || flatPoint(node, compact);
            return <div key={node.id} className={`sambane-node-label ${activeStage.active.includes(node.id) ? 'is-active' : ''} ${node.id === 'farmer' ? 'is-farmer' : ''}`} style={{ left: `${point.x}%`, top: `${point.y}%` }}><strong>{node.label}</strong><span>{node.detail}</span></div>;
          })}</div>
        </div>
        <figcaption><span>{mode === '3d' ? (reduced ? 'Still view · reduced motion' : '3D data-flow study · illustrative only') : fallbackReason}</span><div>{mode === '3d' && !reduced && <button type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? 'Play motion' : 'Pause motion'}</button>}{mode === 'flat' && !enable3D && <button type="button" onClick={() => setEnable3D(true)}>Enable 3D</button>}</div></figcaption>
      </figure>
      <div className="sambane-stage-detail" id="sambane-stage-detail" aria-live="polite" aria-atomic="true"><span className="sambane-stage-number">0{stage + 1}</span><div><h3>{activeStage.heading}</h3><p>{activeStage.body}</p><p className="sambane-boundary">{activeStage.boundary}</p></div></div>
      <details className="sambane-text-flow"><summary>Read the complete flow in text</summary><ol>{stages.map(item => <li key={item.title}><strong>{item.title}: {item.heading}</strong><p>{item.body}</p><p>{item.boundary}</p></li>)}</ol><p>Information flows from the farmer through a confirmed request to the Product Broker. The broker coordinates supplier options and a Logistics Broker estimate, which return as one proposal for the farmer. Payment rails are described separately below.</p></details>
    </div>
  );
}
