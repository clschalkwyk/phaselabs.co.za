import logo from './assets/phaselabs-header-lockup.svg';
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
            <p className="eyebrow">A PhaseLabs project / W3Node prototype</p>
            <h1 id="sambane-title">Sambane<span className="sambane-period">.</span></h1>
            <p className="sambane-tagline">Where Agents Do Business.</p>
            <div className="sambane-partnership">
              <SMWebSystemsLogo />
              <div>
                <p>In partnership with <a href="https://smwebsystems.com/">SM Web Systems <span aria-hidden="true">↗</span></a>.</p>
                <p className="sambane-partner-role">Advisory support for Sambane’s development.</p>
              </div>
            </div>
            <p className="sambane-intro">A farmer has a need.<br /><span>A network gets to work.</span></p>
            <p className="sambane-lede">We’re developing a commerce network where specialist AI brokers find options, coordinate delivery quotes and pay one another within approved budgets. The farmer stays in control.</p>
            <a className="button" href="#prototype-demonstrated">See what the prototype demonstrated <span aria-hidden="true">↓</span></a>
          </div>
          <aside className="sambane-request" aria-labelledby="request-title">
            <div className="sambane-request-top"><span className="eyebrow" id="request-title">It starts with a request</span><span className="sambane-example">Illustrative scenario</span></div>
            <div className="sambane-wave" aria-hidden="true">{[18, 30, 20, 44, 62, 34, 74, 48, 28, 60, 84, 44, 66, 32, 50, 26, 40, 18].map((height, index) => <i key={index} style={{ height }} />)}</div>
            <p className="sambane-quote">“10 bags of chicken feed to the farm”</p>
            <dl className="sambane-request-fields"><div><dt>The need</dt><dd>10 bags · chicken feed</dd></div><div><dt>The destination</dt><dd>The farm</dd></div><div><dt>The next step</dt><dd>Review and confirm</dd></div></dl>
            <p className="sambane-small">Text requests have been demonstrated on WhatsApp. Voice is a separate Android proof of concept. This page is an illustration, not a live ordering service.</p>
          </aside>
        </section>
        <div className="sambane-principles"><p className="frame"><span>Farmer-led decisions</span><span>Specialist agent coordination</span><span>Verifiable payment evidence</span></p></div>
        <section className="section frame sambane-flow-section" id="how-it-works" aria-labelledby="flow-title">
          <div className="sambane-section-top"><div><p className="eyebrow">From a need to a proposal</p><h2 id="flow-title">Follow the work.<br /><span>Keep the control.</span></h2></div><p>This illustrated workflow explains the design. It is not a live network view or transaction feed. Demonstrated capabilities and remaining prototype work are distinguished below.</p></div>
          <SambaneFlow />
        </section>
        <section className="section frame" aria-labelledby="rails-title">
          <div className="sambane-section-top"><div><p className="eyebrow">Two rails. Different jobs.</p><h2 id="rails-title">Pay for the work.<br /><span>Test the finance.</span></h2></div><p>Broker-service payments have been demonstrated on XRP Testnet. The separate Sepolia integration reads test-token balances. Neither represents a real goods purchase.</p></div>
          <div className="sambane-rails">
            <article className="sambane-rail"><div className="sambane-rail-top"><span className="sambane-rail-mark" aria-hidden="true">01</span><span className="sambane-chip">XRPL Testnet · XRP</span></div><h3>Broker services</h3><p>Both testnet transfers landed. The 0.01 XRP Product-to-Logistics payment was approved on Android, signed on the Mac and independently verified on the ledger.</p><ol className="sambane-wallet-path"><li>Buyer service wallet</li><li>Product Broker</li><li>Logistics Broker</li></ol><p className="sambane-small">Demonstrated: testnet broker payments. The Railway dashboard showed the receipt. <a href="#prototype-payment">View the payment evidence below.</a></p></article>
            <article className="sambane-rail sambane-rail-finance"><div className="sambane-rail-top"><span className="sambane-rail-mark" aria-hidden="true">02</span><span className="sambane-chip">Ethereum Sepolia · test ERC-20</span></div><h3>Balance reads, lending next</h3><p>The WDK integration reads Sepolia test-token balances. Lending disbursement and repayment remain undemonstrated.</p><p>Planned lending would require the borrower to accept the terms and the lender to authorize a test disbursement.</p><p className="sambane-small">TEST USD₮ / DEMO-USDT is a test token, not Tether-issued, redeemable or real USDT. No production lending.</p></article>
          </div>
          <p className="sambane-rail-note"><span aria-hidden="true">↔</span> Separate test networks. No bridge, swap or foreign-exchange conversion between XRP and the Sepolia test token.</p>
        </section>
        <section className="section frame sambane-evidence" aria-labelledby="evidence-title">
          <div><p className="eyebrow">Honest by design</p><h2 id="evidence-title">Make the evidence<br /><span>easy to read.</span></h2><p className="sambane-lede">The prototype combines demonstrated broker activity, a verified XRP Testnet payment and synthetic commerce data. Each has a different scope.</p><p className="sambane-small">A demonstrated prototype is not a production commerce or lending service.</p></div>
          <dl className="sambane-evidence-list">
            <div><dt><span className="sambane-dot" />Broker activity <small>Demonstrated</small></dt><dd>A WhatsApp text request, saved-address resolution, Product and Logistics brokers using OpenRouter, and a WhatsApp reply.</dd></div>
            <div><dt><span className="sambane-dot sambane-dot-gold" />Onchain evidence <small>Verified receipt</small></dt><dd>The linked 0.01 XRP Product-to-Logistics payment is independently verified on XRP Testnet. Sepolia work currently covers test-token balance reads.</dd></div>
            <div><dt><span className="sambane-dot sambane-dot-muted" />Voice and lending <small>Prototype scope</small></dt><dd>Voice is a separate Android proof of concept. Lending disbursement and repayment remain undemonstrated.</dd></div>
            <div><dt><span className="sambane-dot sambane-dot-muted" />Commerce <small>Synthetic / simulated</small></dt><dd>A synthetic supplier catalogue and Bob Go Sandbox delivery quotes. Courier booking and fulfilment are simulated.</dd></div>
          </dl>
        </section>
        <section className="sambane-closing frame" id="prototype-demonstrated" aria-labelledby="next-title">
          <p className="eyebrow">From request to receipt</p>
          <h2 id="next-title">What the prototype demonstrated</h2>
          <div className="sambane-proof-grid">
            <article className="sambane-proof"><p className="eyebrow">Demonstrated · WhatsApp</p><h3>From a text request to a broker reply.</h3><ol><li>A chicken-feed request on WhatsApp resolved “the farm” to a saved address.</li><li>The Product and Logistics brokers used OpenRouter, a synthetic supplier catalogue and Bob Go Sandbox quotes.</li><li>The brokers replied on WhatsApp.</li></ol><p className="sambane-small">This demonstrated the broker flow. Courier booking and fulfilment were simulated.</p></article>
            <article className="sambane-proof" id="prototype-payment"><p className="eyebrow">Verified · XRP Testnet</p><h3>0.01 XRP from Product to Logistics.</h3><p>The payment was approved on Android, signed on the Mac and independently verified on the ledger. Its receipt appeared in the Railway dashboard.</p><a className="sambane-proof-link" href="https://testnet.xrpl.org/transactions/C9B90FC07A87093DF4E7C3D567D0EB099956455D2E01C4B58FFAE9C95A82C69F/detailed">View the 0.01 XRP Testnet transaction <span aria-hidden="true">↗</span></a><p className="sambane-small">The ledger records the payment. It does not prove the Android approval, Mac signing workflow or delivery of goods.</p></article>
          </div>
          <p>Voice remains a separate Android proof of concept. WDK reads Sepolia test-token balances; lending disbursement and repayment remain undemonstrated.</p>
          <div className="sambane-closing-links"><a className="button" href="https://w3node.io/node-engine">About W3Node Node Engine <span aria-hidden="true">↗</span></a><a href="/#from-the-lab">Explore more from PhaseLabs <span aria-hidden="true">→</span></a></div><p className="sambane-small">In development. No real goods purchases, real USDT, production lending or verified supplier fulfilment.</p>
        </section>
      </main>
      <footer className="site-footer frame"><a href="/" aria-label="PhaseLabs home"><img src={logo} alt="PhaseLabs" /></a><p>Sambane · Where Agents Do Business.</p><small>© {import.meta.env.VITE_BUILD_YEAR} PhaseLabs · Build {import.meta.env.VITE_BUILD_HASH}</small></footer>
    </div>
  );
}
