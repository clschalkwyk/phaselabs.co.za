import { useEffect } from 'react';
import logo from './assets/phaselabs-header-lockup.svg';
import SambaneFlow from './sambane/SambaneFlow';
import './sambane/sambane.css';

export default function SambanePage() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Sambane | Where Agents Do Business · PhaseLabs';
    const updates = [
      ['meta[name="description"]', 'content', 'Sambane is an in-development, farmer-first commerce network. Explore the planned voice-to-proposal workflow, specialist AI brokers and separate testnet payment rails.'],
      ['meta[property="og:title"]', 'content', 'Sambane | Where Agents Do Business'],
      ['meta[property="og:description"]', 'content', 'Farmer-first procurement, specialist AI brokers and explicit approvals. A planned W3Node testnet prototype by PhaseLabs.'],
      ['meta[property="og:url"]', 'content', 'https://phaselabs.co.za/?project=sambane'],
      ['link[rel="canonical"]', 'href', 'https://phaselabs.co.za/?project=sambane'],
    ].map(([selector, attribute, value]) => {
      const element = document.querySelector(selector);
      const previous = element?.getAttribute(attribute);
      element?.setAttribute(attribute, value);
      return () => { if (element && previous !== null) element.setAttribute(attribute, previous); };
    });
    return () => { document.title = previousTitle; updates.forEach(restore => restore()); };
  }, []);

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
            <p className="eyebrow">A PhaseLabs project / W3Node prototype</p>
            <h1 id="sambane-title">Sambane<span className="sambane-period">.</span></h1>
            <p className="sambane-tagline">Where Agents Do Business.</p>
            <p className="sambane-intro">A farmer has a need.<br /><span>A network gets to work.</span></p>
            <p className="sambane-lede">We’re developing a commerce network where specialist AI brokers find options, coordinate delivery quotes and pay one another within approved budgets. The farmer stays in control.</p>
            <a className="button" href="#how-it-works">Explore the planned flow <span aria-hidden="true">↓</span></a>
          </div>
          <aside className="sambane-request" aria-labelledby="request-title">
            <div className="sambane-request-top"><span className="eyebrow" id="request-title">It starts with a request</span><span className="sambane-example">Illustrative scenario</span></div>
            <div className="sambane-wave" aria-hidden="true">{[18, 30, 20, 44, 62, 34, 74, 48, 28, 60, 84, 44, 66, 32, 50, 26, 40, 18].map((height, index) => <i key={index} style={{ height }} />)}</div>
            <p className="sambane-quote">“Find 10 bags of chicken feed delivered near Malmesbury.”</p>
            <dl className="sambane-request-fields"><div><dt>The need</dt><dd>10 bags · chicken feed</dd></div><div><dt>The destination</dt><dd>Near Malmesbury</dd></div><div><dt>The next step</dt><dd>Review and confirm</dd></div></dl>
            <p className="sambane-small">Planned voice input with editable text. Typing works too. This page is an illustration, not a live ordering service.</p>
          </aside>
        </section>
        <div className="sambane-principles"><p className="frame"><span>Farmer-led decisions</span><span>Specialist agent coordination</span><span>Verifiable payment evidence</span></p></div>
        <section className="section frame sambane-flow-section" id="how-it-works" aria-labelledby="flow-title">
          <div className="sambane-section-top"><div><p className="eyebrow">From a need to a proposal</p><h2 id="flow-title">Follow the work.<br /><span>Keep the control.</span></h2></div><p>Explore the intended workflow. The diagram shows the design, not a running network or live transactions.</p></div>
          <SambaneFlow />
        </section>
        <section className="section frame" aria-labelledby="rails-title">
          <div className="sambane-section-top"><div><p className="eyebrow">Two rails. Different jobs.</p><h2 id="rails-title">Pay for the work.<br /><span>Test the finance.</span></h2></div><p>The planned prototype keeps broker-service payments and demo lending separate. Neither rail represents a real goods purchase.</p></div>
          <div className="sambane-rails">
            <article className="sambane-rail"><div className="sambane-rail-top"><span className="sambane-rail-mark" aria-hidden="true">01</span><span className="sambane-chip">XRPL Testnet · XRP</span></div><h3>Broker services</h3><p>A capped, farmer-approved service budget would let the Product Broker hire a Logistics Broker, with a separate limit for the delegated job.</p><ol className="sambane-wallet-path"><li>Buyer service wallet</li><li>Product Broker</li><li>Logistics Broker</li></ol><p className="sambane-small">Target: two distinct testnet transfers, independently verified against the amount, recipient and job reference.</p></article>
            <article className="sambane-rail sambane-rail-finance"><div className="sambane-rail-top"><span className="sambane-rail-mark" aria-hidden="true">02</span><span className="sambane-chip">Ethereum Sepolia · test ERC-20</span></div><h3>Demo lending</h3><p>A pre-funded demo lender would send test tokens after the borrower accepts the terms and the lender authorizes disbursement.</p><ol className="sambane-wallet-path"><li>Demo lender</li><li>Demo borrower</li></ol><p className="sambane-small">TEST USD₮ / DEMO-USDT is a test token, not Tether-issued, redeemable or real USDT. No production lending.</p></article>
          </div>
          <p className="sambane-rail-note"><span aria-hidden="true">↔</span> Separate, pre-funded balances. No bridge, swap or foreign-exchange conversion between XRP and the Sepolia test token.</p>
        </section>
        <section className="section frame sambane-evidence" aria-labelledby="evidence-title">
          <div><p className="eyebrow">Honest by design</p><h2 id="evidence-title">Make the evidence<br /><span>easy to read.</span></h2><p className="sambane-lede">The target demo combines live agent work, testnet transactions and synthetic commerce data. Those categories must stay visible.</p><p className="sambane-small">This is an implementation direction, not a claim that the demo is complete.</p></div>
          <dl className="sambane-evidence-list"><div><dt><span className="sambane-dot" />Live agent work <small>Planned</small></dt><dd>Editable voice or text input, actual broker-to-broker calls and quantity-dependent quote calculations.</dd></div><div><dt><span className="sambane-dot sambane-dot-gold" />Onchain evidence <small>Testnet target</small></dt><dd>Independently checked XRPL and Sepolia receipts, with genuine transaction links when the prototype runs.</dd></div><div><dt><span className="sambane-dot sambane-dot-muted" />Commerce data <small>Synthetic</small></dt><dd>Supplier names, prices, stock, invoices, delivery estimates and delivery outcomes are demo fixtures.</dd></div></dl>
        </section>
        <section className="sambane-closing frame" aria-labelledby="next-title"><p className="eyebrow">Building the first proof</p><h2 id="next-title">One useful request.<br /><span>A traceable chain of work.</span></h2><p>The first W3Node prototype focuses on farm-supply sourcing, broker coordination and separately approved testnet payments. Cooperative finance and production commerce remain future work.</p><div className="sambane-closing-links"><a className="button" href="https://w3node.io/node-engine">About W3Node Node Engine <span aria-hidden="true">↗</span></a><a href="/#from-the-lab">Explore more from PhaseLabs <span aria-hidden="true">→</span></a></div><p className="sambane-small">In development. No real goods purchases, real USDT, production lending or verified supplier fulfilment.</p></section>
      </main>
      <footer className="site-footer frame"><a href="/" aria-label="PhaseLabs home"><img src={logo} alt="PhaseLabs" /></a><p>Sambane · Where Agents Do Business.</p><small>© {new Date().getFullYear()} PhaseLabs · Build {import.meta.env.VITE_BUILD_HASH}</small></footer>
    </div>
  );
}
