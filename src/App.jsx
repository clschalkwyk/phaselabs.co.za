import { useEffect, useRef, useState } from 'react';
import logo from './assets/phaselabs-header-lockup.svg';

const navItems = [
  { label: 'PhaseLabs', href: '/', route: 'home' },
  { label: 'PhaseBrain', href: '/phasebrain/', route: 'phasebrain' },
  { label: 'Watchtower', href: '/watchtower/', route: 'watchtower' },
];

function useRoute() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const update = () => setPath(window.location.pathname);
    window.addEventListener('popstate', update);
    return () => window.removeEventListener('popstate', update);
  }, []);

  if (path.startsWith('/phasebrain')) return 'phasebrain';
  if (path.startsWith('/watchtower')) return 'watchtower';
  return 'home';
}

function SiteHeader({ active }) {
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [active]);

  return (
    <header className="site-header">
      <div className="nav-wrap frame">
        <a href="/" aria-label="PhaseLabs home">
          <img className="brand-logo" src={logo} alt="PhaseLabs" />
        </a>
        <nav className={`main-nav${open ? ' open' : ''}`} aria-label="Main navigation">
          {navItems.map((item) => (
            <a className={active === item.route ? 'active' : ''} href={item.href} key={item.label}>
              {item.label}
            </a>
          ))}
          {active === 'home' && <a href="#ventures">Ventures</a>}
          {active === 'phasebrain' && <a href="#outputs">Outputs</a>}
          {active === 'watchtower' && <a href="#system">System</a>}
        </nav>
        <a className="nav-cta" href="/#contact">Enter the lab <span aria-hidden="true">↗</span></a>
        <button className="nav-toggle" type="button" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          <span aria-hidden="true">☰</span>
        </button>
      </div>
    </header>
  );
}

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`reveal ${visible ? 'visible' : ''} ${className}`} data-delay={delay || undefined}>{children}</div>;
}

function PhaseField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const context = canvas.getContext('2d');
    let frameId;
    let width = 0;
    let height = 0;
    let dots = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = Array.from({ length: Math.max(45, Math.min(100, Math.floor(width / 15))) }, () => ({
        x: width * (0.52 + Math.random() * 0.5),
        y: height * (0.06 + Math.random() * 0.88),
        radius: 0.5 + Math.random() * 1.35,
        alpha: 0.07 + Math.random() * 0.28,
        phase: Math.random() * Math.PI * 2,
        speed: 0.0012 + Math.random() * 0.0022,
        hue: Math.random() > 0.83 ? 270 : 190 + Math.random() * 22,
      }));
    };

    const draw = (time) => {
      context.clearRect(0, 0, width, height);
      const focusX = width * 0.82;
      const focusY = height * 0.39;
      dots.forEach((dot, index) => {
        const x = dot.x + Math.sin(time * dot.speed + dot.phase + index) * 9;
        const y = dot.y + Math.cos(time * dot.speed * 0.7 + dot.phase) * 7;
        context.beginPath();
        context.fillStyle = `hsla(${dot.hue}, 100%, 68%, ${dot.alpha})`;
        context.shadowColor = `hsla(${dot.hue}, 100%, 60%, .26)`;
        context.shadowBlur = 9;
        context.arc(x, y, dot.radius, 0, Math.PI * 2);
        context.fill();
      });
      context.shadowBlur = 0;
      const gradient = context.createLinearGradient(width * 0.6, focusY, focusX, focusY);
      gradient.addColorStop(0, 'rgba(139,61,255,0)');
      gradient.addColorStop(0.55, 'rgba(46,123,255,.11)');
      gradient.addColorStop(1, 'rgba(0,232,242,.19)');
      for (let index = 0; index < 5; index += 1) {
        const offset = (index - 2) * 21;
        context.beginPath();
        context.moveTo(width * 0.61, focusY + offset * 2.3);
        context.bezierCurveTo(width * 0.69, focusY + offset * 2, width * 0.76, focusY + offset * 0.42, focusX, focusY);
        context.strokeStyle = gradient;
        context.lineWidth = 1.2;
        context.stroke();
      }
      frameId = requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    frameId = requestAnimationFrame(draw);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="phase-canvas" aria-hidden="true" />;
}

function Marquee({ items }) {
  return <div className="ticker" aria-hidden="true"><div className="ticker-track">{[...items, ...items].map((item, index) => <span key={`${item}-${index}`}>{item}{index < items.length * 2 - 1 && <i>◆</i>}</span>)}</div></div>;
}

function SectionHead({ title, muted, children }) {
  return <div className="section-head"><h2>{title}<br /><span>{muted}</span></h2><p>{children}</p></div>;
}

function Button({ href, children, primary = false }) {
  return <a className={`btn ${primary ? 'primary' : 'ghost'}`} href={href}>{children} <span aria-hidden="true">↗</span></a>;
}

function Footer({ label }) {
  return <footer className="site-footer"><div className="footer-wrap frame"><div className="footer-brand"><img className="footer-logo" src={logo} alt="PhaseLabs" /><p>{label}</p></div><div className="footer-status"><span className="footer-status-marker" aria-hidden="true" /><div><span>Company status</span><strong>In active development</strong></div></div><p className="footer-right">© {new Date().getFullYear()} PHASELABS</p></div></footer>;
}

function HomePage() {
  return <>
    <SiteHeader active="home" />
    <main id="main">
      <section className="hero home-hero">
        <PhaseField />
        <div className="hero-grid" />
        <div className="hero-layout frame">
          <div>
            <Reveal className="eyebrow">Venture engineering studio</Reveal>
            <Reveal delay={1}><h1>Expose <span className="cyan">hard truths.</span><br />Build what <strong>survives.</strong></h1></Reveal>
            <Reveal delay={2}><p className="hero-lede">PhaseLabs tests uncertain ideas against <strong>evidence, constraints, economics and technical reality</strong>, then engineers the viable ones into an executable Playbook.</p></Reveal>
            <Reveal delay={3}><div className="actions"><Button href="/phasebrain/" primary>Meet PhaseBrain</Button><a className="btn ghost" href="#method">See the venture path <span aria-hidden="true">↓</span></a></div><p className="hero-micro">PhaseLabs is under active development. The company and its venture systems are being built in public.</p></Reveal>
          </div>
          <Reveal delay={2} className="system-window">
            <div className="window-head"><span>PHASEBRAIN / VENTURE REVIEW</span><span className="window-status"><i /> ACTIVE REVIEW</span></div>
            <div className="window-body"><span className="window-title">Founder brief</span><h2 className="window-main">Turn a raw opportunity into a venture that can survive contact with reality.</h2>
              <div className="metric-stack">{[
                ['M', 'Market reality', 'Demand, substitutes, buyers and timing.', 'Evidence reviewed'],
                ['T', 'Technical reality', 'Architecture, dependencies and build path.', 'Constraints mapped'],
                ['O', 'Operating reality', 'People, providers, policy and execution.', 'Workflow resolved'],
                ['$', 'Economics', 'Price, cost, margin, acquisition and scale.', 'Viability challenged'],
              ].map(([icon, title, copy, status]) => <div className="metric" key={title}><span className="metric-icon">{icon}</span><div><h3>{title}</h3><p>{copy}</p></div><small>{status}</small></div>)}</div>
              <div className="window-loop"><span>Finding</span><b>→</b><span>Problem area</span><b>→</b><span>Decision</span><b>→</b><span>Playbook</span></div>
            </div>
          </Reveal>
        </div>
      </section>
      <Marquee items={['VENTURES', 'RESEARCH', 'PRODUCT', 'ENGINEERING', 'COMMERCE', 'AUTOMATION', 'DATA', 'EXECUTION']} />
      <section className="section rule" id="method"><div className="frame"><SectionHead title="Reality does not care" muted="about the pitch.">We reduce uncertainty in layers. The original idea can change, narrow, expand or die before unnecessary time and capital get burned.</SectionHead>
        <div className="path">{[
          ['START', 'Idea', 'A problem, opportunity, constraint or half-formed hypothesis.'],
          ['PRESSURE', 'Evidence + constraints', 'Research, assumptions, market reality, regulation, technical limits and economics.'],
          ['ENGINEER', 'Decisions', 'Product, architecture, commercial model, operating model, risks and trade-offs.'],
          ['EXECUTE', 'Playbook', 'A buildable plan with context, evidence, owners and next actions.'],
          ['REALITY', 'Venture', 'Build, launch, measure and learn. Real outcomes strengthen what comes next.'],
        ].map(([label, title, copy], index) => <Reveal className="path-node" delay={index % 4} key={title}><small>{label}</small><span className="phase-dot" /><h3>{title}</h3><p>{copy}</p></Reveal>)}</div>
      </div></section>
      <section className="section rule" id="phasebrain"><div className="frame"><Reveal className="feature-shell"><div className="feature-copy"><div className="section-kicker">PHASEBRAIN</div><h2>Context that survives the build.</h2><p>PhaseBrain keeps evidence, findings, decisions, architecture, risks, tasks and the Playbook connected as the venture evolves.</p><a className="text-link" href="/phasebrain/">Explore PhaseBrain <span aria-hidden="true">↗</span></a></div><div className="feature-interface"><RecordGrid items={['Findings', 'Assumptions', 'Decisions', 'Risks', 'Sources', 'Architecture', 'Tasks', 'Playbook']} /><div className="subsystems"><a className="subsystem" href="/phasebrain/#brain-factory"><span className="sub-kicker">SUBSYSTEM</span><h3>Brain Factory</h3><p>Focused specialist brains for market, legal, technical, product, finance and operations.</p><span className="sub-link">Open subsystem ↗</span></a><a className="subsystem" href="/watchtower/"><span className="sub-kicker">SUBSYSTEM</span><h3>Watchtower</h3><p>Active ventures stay attached to external reality after the original analysis is complete.</p><span className="sub-link">Open Watchtower ↗</span></a></div></div></Reveal></div></section>
      <section className="section rule" id="ventures"><div className="frame"><SectionHead title="Real projects." muted="Real consequences.">PhaseLabs dogfoods its own system. Each venture tests the process, exposes weak assumptions and adds reusable knowledge to the next project.</SectionHead><div className="ventures-grid">{[
        ['OPEN PAYMENTS / COMMERCE', 'Rooikat', 'Merchant tooling and open-payment infrastructure for South African spaza shops.', 'ACTIVE VENTURE'],
      ].map(([label, title, copy, status], index) => <Reveal className="venture-card" delay={index} key={title}><span className="venture-label">{label}</span><h3>{title}</h3><p>{copy}</p><footer><span>{status}</span><span>VIEW ↗</span></footer></Reveal>)}</div></div></section>
      <Contact href="/phasebrain/" title="Bring the messy idea." copy="We bring evidence, engineering discipline and a healthy disrespect for assumptions that have not earned their place." cta="Start with the idea" />
    </main>
    <Footer label="VENTURE ENGINEERING STUDIO" />
  </>;
}

function RecordGrid({ items, prefix = 'RECORD' }) {
  return <div className="record-grid">{items.map((item) => <div className="record" key={item}><span>{item === 'Playbook' ? 'OUTPUT' : prefix}</span><strong>{item}</strong><em>{recordCopy[item] || 'Current venture context'}</em></div>)}</div>;
}

const recordCopy = {
  Findings: 'What we found', Assumptions: 'What we believe', Decisions: 'What we chose', Risks: 'What could break', Sources: 'Where it comes from', Architecture: 'How it should work', Tasks: 'What needs doing', Playbook: 'What gets executed',
};

function Contact({ href, title, copy, cta }) {
  return <section className="contact" id="contact"><div className="frame"><div className="section-kicker">ENTER THE LAB</div><h2>{title}</h2><p>{copy}</p><div className="actions"><Button href={href} primary>{cta}</Button></div></div></section>;
}

function PhaseBrainPage() {
  const records = ['Playbook', 'Assumptions', 'Decisions', 'Risks', 'Dependencies', 'Tasks', 'Sources', 'Venture state'];
  return <><SiteHeader active="phasebrain" /><main id="main"><section className="hero pb-hero"><div className="hero-grid" /><div className="hero-layout frame"><div><Reveal className="eyebrow">Venture engineering system</Reveal><Reveal delay={1}><h1>PHASE<span className="cyan">BRAIN</span></h1></Reveal><Reveal delay={2}><p className="hero-lede">A structured system for turning uncertain ideas into <strong>evidence-backed decisions, executable Playbooks and better ventures.</strong></p></Reveal><Reveal delay={3}><div className="actions"><a className="btn primary" href="#core">See the core <span aria-hidden="true">↓</span></a><Button href="/watchtower/">Meet Watchtower</Button></div></Reveal></div><Reveal className="pb-core"><div className="core-orbit"><div className="core-center"><div><strong>PhaseBrain</strong><span>VENTURE STATE</span></div></div>{['Evidence', 'Decisions', 'Architecture', 'Economics', 'Risks', 'Execution'].map((item) => <span className="orbit-tag" key={item}>{item}</span>)}</div></Reveal></div></section><Marquee items={['FINDINGS', 'ASSUMPTIONS', 'DECISIONS', 'RISKS', 'SOURCES', 'TASKS', 'PLAYBOOK']} />
    <section className="section rule" id="core"><div className="frame"><SectionHead title="From uncertainty" muted="to execution.">The model can change. The system around the work stays: evidence, venture state, explicit decisions, traceability and a Playbook that can actually be built.</SectionHead><div className="core-pipeline">{[
      ['FRAME', 'Frame problem', 'Clarify opportunity, scope and success criteria.'], ['PRESSURE', 'Test assumptions', 'Challenge key beliefs with evidence and analysis.'], ['MAP', 'Map constraints', 'Identify real-world limits and dependencies.'], ['DESIGN', 'Engineer solution', 'Develop and compare viable options.'], ['ECONOMICS', 'Evaluate viability', 'Assess value, costs, pricing and resource demands.'], ['COMMIT', 'Record decisions', 'Capture rationale, alternatives and review conditions.'], ['EXECUTE', 'Build Playbook', 'Turn decisions into an executable venture plan.'],
    ].map(([label, title, copy], index) => <Reveal className="core-stage" delay={index % 4} key={title}><small>{label}</small><h3>{title}</h3><p>{copy}</p></Reveal>)}</div></div></section>
    <section className="section rule"><div className="frame"><SectionHead title="One venture." muted="One current state.">Chat is temporary. These records are not. PhaseBrain keeps the venture's working truth explicit and traceable.</SectionHead><div className="canonical-grid">{records.map((item, index) => <Reveal className="canonical" delay={index % 4} key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong><p>{recordCopy[item] || 'Where the venture stands now'}</p></Reveal>)}</div></div></section>
    <section className="section rule" id="brain-factory"><div className="frame"><Reveal className="feature-shell"><div className="feature-copy"><div className="section-kicker">BRAIN FACTORY</div><h2>Specialist brains. Built to repeat.</h2><p>A repeatable recipe for focused domain brains with their own sources, review rules, methods and output contracts.</p></div><div className="feature-interface"><RecordGrid prefix="DOMAIN" items={['Market', 'Legal', 'Product', 'Technical', 'Finance', 'Operations', 'People', 'More']} /></div></Reveal></div></section>
    <section className="section rule" id="outputs"><div className="frame"><SectionHead title="Decisions," muted="not decoration.">The output should be credible enough to build, review, fund, sell or kill. Anything else is well-formatted procrastination.</SectionHead><div className="output-list">{[
      ['Venture assessment', 'Opportunities, contradictions, readiness and unresolved work.'], ['Execution-ready Playbook', 'Current venture context, decisions and next actions.'], ['Architecture direction', 'System boundaries, dependencies and technical choices.'], ['Build guidance', 'Prioritised work for founders, engineers and specialists.'],
    ].map(([title, copy], index) => <Reveal className="output-item" delay={index} key={title}><h3>{title}</h3><p>{copy}</p></Reveal>)}</div></div></section>
    <Contact href="/watchtower/" title={<>Better context.<br />Better decisions.</>} copy="PhaseBrain is designed to make excellent humans and frontier models better at sustained venture work." cta="Explore Watchtower" />
  </main><Footer label="PHASEBRAIN | VENTURE ENGINEERING SYSTEM" /></>;
}

function WatchtowerPage() {
  return <><SiteHeader active="watchtower" /><main id="main"><section className="hero wt-hero"><div className="hero-grid" /><div className="hero-layout frame"><div><Reveal className="eyebrow">External change watch</Reveal><Reveal delay={1}><h1>WATCH<span className="cyan">TOWER</span></h1></Reveal><Reveal delay={2}><p className="hero-lede">Watchtower monitors material external changes, verifies what matters and keeps <strong>active ventures attached to reality.</strong></p></Reveal><Reveal delay={3}><div className="actions"><a className="btn primary" href="#system">See the system <span aria-hidden="true">↓</span></a><Button href="/phasebrain/">Back to PhaseBrain</Button></div></Reveal></div><Reveal className="radar"><span className="blip b1" /><span className="blip b2" /><span className="blip b3" /></Reveal></div></section><Marquee items={['REGULATORS', 'GAZETTES', 'PRICING', 'API CHANGES', 'COMPETITORS', 'NEWSLETTERS', 'GITHUB RELEASES']} />
    <section className="section rule" id="system"><div className="frame"><SectionHead title="Do not tell me" muted="what happened.">Tell me what changed for the venture. Watchtower suppresses irrelevant information and surfaces changes that affect an assumption, decision, risk, dependency, architecture choice or next action.</SectionHead><div className="source-flow"><aside className="source-panel"><div className="section-kicker">EXTERNAL WORLD</div><div className="source-list">{[['Regulators & gazettes', 'Rules, notices, policy changes.'], ['Provider docs & pricing', 'Terms, limits, deprecations.'], ['Newsletters / MyBroadband', 'Discovery and local context.'], ['GitHub releases', 'Product and dependency changes.'], ['Competitors', 'Moves, pricing and positioning.'], ['Founder input', 'Manual URLs and watch requests.']].map(([title, copy]) => <div className="source-item" key={title}><strong>{title}</strong><span>{copy}</span></div>)}</div></aside><section className="pipeline-panel"><div className="section-kicker">WATCHTOWER</div><div className="watch-pipeline">{[['Ingest', 'Collect approved external material.'], ['Normalize', 'Extract source, entities and facts.'], ['Deduplicate', 'Collapse repeats and mirrors.'], ['Classify', 'Match ventures and dependencies.'], ['Verify', 'Follow material claims to authority.'], ['Evaluate', 'Determine what actually changed.'], ['Revalidate', 'Reopen affected venture records.'], ['Brief', 'Notify only when action is justified.']].map(([title, copy], index) => <article className="watch-stage" key={title}><b>{String(index + 1).padStart(2, '0')}</b><h3>{title}</h3><p>{copy}</p></article>)}</div></section><aside className="destination-panel"><div className="section-kicker">PHASEBRAIN</div><div className="dest-list">{[['Playbook', 'Execution guidance.'], ['Assumptions', 'What we believe.'], ['Decisions', 'Choices and rationale.'], ['Risks', 'Known exposure.'], ['Dependencies', 'What we rely on.'], ['Tasks', 'What needs action.']].map(([title, copy]) => <div className="dest-item" key={title}><strong>{title}</strong><span>{copy}</span></div>)}</div></aside></div></div></section>
    <section className="section rule"><div className="frame"><SectionHead title="Discovery is cheap." muted="Impact is the work.">A publication can point Watchtower somewhere useful. Material changes still resolve to the best available primary authority before venture state changes.</SectionHead><div className="impact-demo"><article className="demo-change"><small>EXTERNAL CHANGE</small><h3>Provider updates settlement terms.</h3><p>A payments provider changes settlement timing and pricing for the merchant profile Rooikat depends on.</p></article><article className="demo-impact"><small>VENTURE IMPACT</small><h3>Review the decision, not the article.</h3><p>Watchtower maps the change to the venture records that depend on those terms.</p><div className="impact-chain">{[['Decision', 'Payment provider selection'], ['Assumption', 'Settlement timing'], ['Economics', 'Merchant cost model'], ['Action', 'Revalidate provider choice']].map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div></article></div></div></section>
    <section className="section rule"><div className="frame"><Reveal className="feature-shell"><div className="feature-copy"><div className="section-kicker">VENTURE WATCH PROFILE</div><h2>Watch what the venture actually depends on.</h2><p>Every active venture gets an explicit watch profile: jurisdictions, regulators, providers, competitors, APIs, pricing assumptions, policies and platform constraints.</p></div><div className="feature-interface"><RecordGrid prefix="WATCH" items={['Jurisdictions', 'Providers', 'Competitors', 'APIs', 'Pricing', 'Policy', 'Standards', 'Platforms']} /></div></Reveal></div></section>
    <Contact href="/phasebrain/" title={<>Same venture.<br />Current reality.</>} copy="Watchtower keeps assumptions and decisions attached to the outside world after the original analysis is complete." cta="Explore PhaseBrain" />
  </main><Footer label="WATCHTOWER | EXTERNAL CHANGE WATCH" /></>;
}

export default function App() {
  const route = useRoute();
  if (route === 'phasebrain') return <PhaseBrainPage />;
  if (route === 'watchtower') return <WatchtowerPage />;
  return <HomePage />;
}
