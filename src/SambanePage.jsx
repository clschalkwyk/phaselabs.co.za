import logo from './assets/phaselabs-header-lockup.svg';
import mascot from './assets/sambane-village.png';
import SambaneFlow from './sambane/SambaneFlow';
import SMWebSystemsLogo from './sambane/SMWebSystemsLogo';
import './sambane/sambane.css';

export default function SambanePage() {
  return (
    <div className="site-shell sambane-page">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header frame sambane-header">
        <a href="/" aria-label="PhaseLabs home"><img className="brand-logo" src={logo} alt="PhaseLabs" /></a>
        <a className="header-link" href="/#from-the-lab"><span aria-hidden="true">←</span> From the lab</a>
        <span className="status"><span aria-hidden="true" />In development</span>
      </header>
      <main id="main">
        <section className="sambane-hero frame" aria-labelledby="sambane-title">
          <div>
            <p className="eyebrow">A PhaseLabs project / Agentic procurement</p>
            <h1 id="sambane-title">Sambane<span className="sambane-period">.</span></h1>
            <p className="sambane-tagline">AI-powered input sourcing for small-scale farmers.</p>
            <div className="sambane-partnership">
              <SMWebSystemsLogo />
              <div><p>In partnership with <a href="https://smwebsystems.com/">SM Web Systems <span aria-hidden="true">↗</span></a>.</p><p className="sambane-partner-role">Advisory support for Sambane’s development.</p></div>
            </div>
            <p className="sambane-intro">Less time chasing quotes.<br /><span>More time on the farm.</span></p>
            <p className="sambane-lede">We’re building a procurement assistant that turns a farmer’s request into a clear, comparable buying proposal. Sambane is designed to research suitable inputs, follow up with suppliers and work out collection or delivery, bringing the full picture back to the farmer before any commitment.</p>
            <a className="button" href="#how-it-works">Explore the sourcing journey <span aria-hidden="true">↓</span></a>
          </div>
          <aside className="sambane-request" aria-labelledby="request-title">
            <div className="sambane-request-top"><span className="eyebrow" id="request-title">It starts with a request</span><span className="sambane-example">Illustrative scenario</span></div>
            <img className="sambane-mascot" src={mascot} alt="Sambane’s waving aardvark mascot with the words Sambane: It takes a village." width="1199" height="1312" fetchPriority="high" />
            <p className="sambane-quote">“10 bags of chicken feed to the farm”</p>
            <dl className="sambane-request-fields"><div><dt>The need</dt><dd>Feed type, bag size &amp; quantity</dd></div><div><dt>The destination</dt><dd>The farm</dd></div><div><dt>The constraints</dt><dd>Budget, timing &amp; transport</dd></div><div><dt>The next step</dt><dd>Compare the complete offer</dd></div></dl>
            <p className="sambane-small">Sambane would clarify the details before sourcing. This page describes the product direction, not a live ordering service.</p>
          </aside>
        </section>
        <div className="sambane-principles"><p className="frame"><span>Suitable inputs</span><span>Transparent total costs</span><span>Farmer-led decisions</span></p></div>
        <section className="section frame sambane-flow-section" id="how-it-works" aria-labelledby="flow-title">
          <div className="sambane-section-top"><div><p className="eyebrow">From a request to an informed decision</p><h2 id="flow-title">Sambane does the legwork.<br /><span>The farmer makes the call.</span></h2></div><p>Agentic procurement means an assistant working through the sourcing task, not just returning search results. This is the intended workflow; supplier outreach and live logistics integrations remain to be validated.</p></div>
          <SambaneFlow />
        </section>
        <section className="section frame" id="proposal" aria-labelledby="proposal-title">
          <div className="sambane-section-top"><div><p className="eyebrow">Compare the whole offer</p><h2 id="proposal-title">The right inputs.<br /><span>The real cost to get them.</span></h2></div><p>The lowest shelf price is not always the best deal. A useful proposal weighs product suitability, availability, timing and transport against the farmer’s requirements.</p></div>
          <ol className="sambane-backing-steps">
            <li><span>01</span><h3>What you’re buying.</h3><p>Product specification, pack size, quantity, supplier and confirmed availability. Substitutions are clearly marked, never silently accepted.</p></li>
            <li><span>02</span><h3>What it costs.</h3><p>Item prices, applicable taxes, transport and disclosed fees, with an itemised total. Quote dates, expiry and anything still unconfirmed stay visible.</p></li>
            <li><span>03</span><h3>How you’ll get it.</h3><p>Farmer collection, supplier delivery or a courier quote. Show who arranges transport, pickup and drop-off details, lead times and any access requirements.</p></li>
            <li><span>04</span><h3>What needs your decision.</h3><p>A recommended option alongside relevant alternatives, the reasons for each trade-off and a clear choice to approve, amend or decline.</p></li>
          </ol>
          <p className="sambane-rail-note">No claim to the cheapest price everywhere. The goal is the best-fit option among the suppliers and transport choices checked, with the evidence and gaps made clear.</p>
        </section>
        <section className="section frame" id="engine-boundary" aria-labelledby="engine-title">
          <div className="sambane-section-top"><div><p className="eyebrow">One focused engine</p><h2 id="engine-title">Source first.<br /><span>Keep payment separate.</span></h2></div><p>The sourcing engine ends with a proposal for farmer approval. Paying, placing an order and booking transport are separate downstream actions, not automatic consequences of asking for a quote.</p></div>
          <div className="sambane-rails">
            <article className="sambane-rail"><div className="sambane-rail-top"><span className="sambane-rail-mark" aria-hidden="true">01</span><span className="sambane-chip">Core sourcing engine</span></div><h3>Understand. Research. Coordinate.</h3><p>Turn a request into structured requirements. Gather and compare supplier responses. Resolve collection or delivery and obtain the relevant transport quotes. Return one traceable proposal.</p><p className="sambane-small">Designed around reusable request processing, data acquisition and quote comparison, with farming-specific requirements layered on top.</p></article>
            <article className="sambane-rail sambane-rail-finance"><div className="sambane-rail-top"><span className="sambane-rail-mark" aria-hidden="true">02</span><span className="sambane-chip">Separate execution layer</span></div><h3>Approval is a handoff.</h3><p>An approved proposal can be handed to a separate ordering or payment process. The sourcing assistant does not need to hold funds or control how the farmer pays.</p><p className="sambane-small">A quote request is not an order. Changed prices, substitutions or delivery terms must come back for review before a commitment is made.</p></article>
          </div>
        </section>
        <section className="section frame" id="future-options" aria-labelledby="options-title">
          <div className="sambane-section-top"><div><p className="eyebrow">Ideas to validate, not live services</p><h2 id="options-title">Source for one farm.<br /><span>Explore what works together.</span></h2></div><p>Helping farmers source suitable goods is the core mission. Collective buying and optional support services could build on that foundation, without becoming requirements for using Sambane.</p></div>
          <div className="sambane-rails">
            <article className="sambane-rail"><div className="sambane-rail-top"><span className="sambane-rail-mark" aria-hidden="true">01</span><span className="sambane-chip">Virtual co-op · concept</span></div><h3>Nearby farms. Combined demand.</h3><p>Farmers in the same area could choose to pool similar procurement needs. Sambane would bring compatible requests together and ask suppliers for a larger combined quote, with the potential to qualify for volume discounts.</p><p className="sambane-small">An unvalidated idea, not an operating co-op or a promise of savings. Product specifications, timing, minimum quantities, each farmer’s share and transport would need to align. Each farmer would review their own costs and terms before committing.</p></article>
            <article className="sambane-rail sambane-rail-finance"><div className="sambane-rail-top"><span className="sambane-rail-mark" aria-hidden="true">02</span><span className="sambane-chip">Optional bolt-on services</span></div><h3>Extra support, only if needed.</h3><p>Access to financing could be explored as an optional bolt-on alongside other future support services. It would sit outside the sourcing engine: a farmer should be able to find and compare goods without applying for finance.</p><p className="sambane-small">No financing service or provider arrangement is offered today. Any future option would need separate provider assessment, clear costs and terms, and the farmer’s explicit consent. Availability and approval would not be guaranteed.</p></article>
          </div>
        </section>
        <section className="section frame sambane-evidence" id="development-status" aria-labelledby="evidence-title">
          <div><p className="eyebrow">In development</p><h2 id="evidence-title">A focused direction.<br /><span>Honest about what’s next.</span></h2><p className="sambane-lede">Sambane is being refocused from its earlier prototype into a practical procurement assistant. The full workflow described here is a product goal, not a claim of a live service.</p></div>
          <dl className="sambane-evidence-list">
            <div><dt><span className="sambane-dot" />Existing foundation <small>Prototype</small></dt><dd>Earlier work explored a text-first Android request interface, proposal review and coordination between product and logistics components.</dd></div>
            <div><dt><span className="sambane-dot sambane-dot-gold" />Data and quotes <small>Test conditions</small></dt><dd>Previous supplier invoices were simulated and logistics used Bob Go Sandbox. These do not establish live supplier availability, executable prices or real delivery.</dd></div>
            <div><dt><span className="sambane-dot sambane-dot-muted" />Next to validate <small>Real-world pilot</small></dt><dd>Reliable input matching, permissioned supplier follow-up, comparable quotes and practical collection or delivery options with real farmers and providers.</dd></div>
            <div><dt><span className="sambane-dot sambane-dot-muted" />Decision boundary <small>Farmer approval</small></dt><dd>Keep sources, assumptions and missing answers visible. Ask when requirements are unclear, and return the final order and logistics details for the farmer’s decision.</dd></div>
          </dl>
        </section>
        <section className="sambane-closing frame" aria-labelledby="next-title">
          <p className="eyebrow">Built around the farmer’s task</p>
          <h2 id="next-title">Tell us what the farm needs.<br /><span>Know your options before you commit.</span></h2>
          <p>Feed, seed and other farm inputs: a clearer route from a need to a buying decision, without chasing every supplier and transport quote yourself.</p>
          <div className="sambane-closing-links"><a className="button" href="#how-it-works">Review the planned workflow <span aria-hidden="true">↑</span></a><a href="/#from-the-lab">More from PhaseLabs <span aria-hidden="true">↗</span></a></div>
          <p className="sambane-small">In development. No live ordering, supplier negotiation, delivery, collective-buying or financing service is offered through this page.</p>
        </section>
      </main>
      <footer className="site-footer frame"><a href="/" aria-label="PhaseLabs home"><img src={logo} alt="PhaseLabs" /></a><p>Sambane · AI-powered input sourcing.</p><small>© {import.meta.env.VITE_BUILD_YEAR} PhaseLabs · Build {import.meta.env.VITE_BUILD_HASH}</small></footer>
    </div>
  );
}
