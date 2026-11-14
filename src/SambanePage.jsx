import logo from './assets/phaselabs-header-lockup.svg';
import mascot from './assets/sambane-village.png';
import SambaneFlow from './sambane/SambaneFlow';
import SMWebSystemsLogo from './sambane/SMWebSystemsLogo';
import './sambane/sambane.css';

const proofUrl = 'https://github.com/clschalkwyk/sambane-w3node-2026/blob/d6b84a137e47cfdc6562539fda751438ddf1765e/docs/native-xrp-demo-proof.md';

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
            <p className="sambane-intro">A farmer has a need.<br /><span>And a budget to work with.</span></p>
            <p className="sambane-lede">Sambane is an Android-first commerce prototype for rural farmers. Describe what the farm needs, review a proposal and choose whether to request community-backed funding. The farmer approves a bounded mandate; a Product Agent coordinates supplier and courier payments within those terms.</p>
            <a className="button" href="#prototype-demonstrated">See what the prototype demonstrated <span aria-hidden="true">↓</span></a>
          </div>
          <aside className="sambane-request" aria-labelledby="request-title">
            <div className="sambane-request-top"><span className="eyebrow" id="request-title">It starts with a request</span><span className="sambane-example">Illustrative scenario</span></div>
            <img className="sambane-mascot" src={mascot} alt="Sambane’s waving aardvark mascot with the words Sambane: It takes a village." width="1199" height="1312" fetchPriority="high" />
            <p className="sambane-quote">“10 bags of chicken feed to the farm”</p>
            <dl className="sambane-request-fields"><div><dt>The need</dt><dd>10 bags · chicken feed</dd></div><div><dt>The destination</dt><dd>The farm</dd></div><div><dt>The spending limit</dt><dd>Review the demo XRP total</dd></div><div><dt>The next step</dt><dd>Review the full cost</dd></div></dl>
            <p className="sambane-small">The current native XRP order screen is enabled in selected demo builds. It uses text-first Android input and fixed demo XRP prices, not a fiat-to-XRP conversion. This page is an illustration, not a live ordering service.</p>
          </aside>
        </section>
        <div className="sambane-principles"><p className="frame"><span>Farmer-led decisions</span><span>Community-backed shortfalls</span><span>Verifiable payment evidence</span></p></div>
        <section className="section frame sambane-flow-section" id="how-it-works" aria-labelledby="flow-title">
          <div className="sambane-section-top"><div><p className="eyebrow">From a need to a proposal</p><h2 id="flow-title">Follow the work.<br /><span>Keep the control.</span></h2></div><p>This illustrated sourcing workflow explains the design. It is not a live network view or transaction feed. Funding and payment approvals are separate steps, described below.</p></div>
          <SambaneFlow />
        </section>
        <section className="section frame" id="community-backing" aria-labelledby="backing-title">
          <div className="sambane-section-top"><div><p className="eyebrow">Community backing, explicit consent</p><h2 id="backing-title">Ask first.<br /><span>Approve the terms.</span></h2></div><p>Farmer, Stokvel members and lender have distinct roles. The current native XRP demo records two members’ off-chain endorsements. These are not locked collateral or an enforceable onchain guarantee.</p></div>
          <ol className="sambane-backing-steps">
            <li><span>01</span><h3>The farmer authorizes.</h3><p>The farmer reviews the proposal and signs a mandate defining the approved supplier, courier and payment limits. A request alone never authorizes borrowing or payment.</p></li>
            <li><span>02</span><h3>Two members endorse.</h3><p>Two Stokvel members sign the order’s terms. The service verifies the farmer and member signatures. Endorsements are off-chain and do not lock or debit a Stokvel reserve.</p></li>
            <li><span>03</span><h3>The lender funds.</h3><p>The lender approves Testnet XRP funding to the farmer. The farmer then deposits the approved order funds into the agent wallet. These are distinct transfers, not an unrestricted spending allowance.</p></li>
            <li><span>04</span><h3>The agent settles.</h3><p>The order runner checks supplier and courier payment requirements against the mandate, then signs only those authorized payments. Amount caps and a payment journal guard against blind repeats.</p></li>
          </ol>
          <p className="sambane-rail-note">The native XRP demo uses fixed XRP pricing. It does not convert rand, provide a USDT on-ramp or bridge between networks.</p>
          <p className="sambane-small sambane-scope-note">No locked guarantee reserve or demonstrated repayment collection. Payment evidence does not establish legal enforceability, default recovery or delivery.</p>
        </section>
        <section className="section frame" aria-labelledby="rails-title">
          <div className="sambane-section-top"><div><p className="eyebrow">The current demonstration</p><h2 id="rails-title">A bounded mandate.<br /><span>A traceable payment path.</span></h2></div><p>The 14 November native XRP rehearsal brings community funding and agent settlement onto XRPL Testnet. Earlier Sepolia test-token and broker-fee experiments are historical, not the current order flow.</p></div>
          <div className="sambane-rails">
            <article className="sambane-rail"><div className="sambane-rail-top"><span className="sambane-rail-mark" aria-hidden="true">01</span><span className="sambane-chip">XRPL Testnet · XRP</span></div><h3>From funding to settlement</h3><p>The documented run records four transfers: lender to farmer, farmer to Product Agent, then agent to the supplier and courier demo wallets. All are Testnet payments, not real purchases.</p><ol className="sambane-wallet-path"><li>Lender</li><li>Farmer</li><li>Product Agent</li><li>Supplier + courier demo wallets</li></ol><p className="sambane-small"><a href={proofUrl}>Read the dated demo evidence and transaction references ↗</a>. This is the project’s published rehearsal record, not an independent audit.</p></article>
            <article className="sambane-rail sambane-rail-finance"><div className="sambane-rail-top"><span className="sambane-rail-mark" aria-hidden="true">02</span><span className="sambane-chip">x402 v2 · Testnet</span></div><h3>Permission before payment</h3><p>The implementation checks HTTP 402 payment requirements against the farmer’s mandate before the isolated signer pays approved supplier and courier destinations. Caps and journal checks constrain the agent’s authority.</p><ol className="sambane-wallet-path"><li>Signed mandate</li><li>Requirement checks</li><li>Bounded settlement</li></ol><p className="sambane-small">The published ledger references show payments. They do not, by themselves, prove a complete HTTP challenge-response exchange or physical fulfilment.</p></article>
          </div>
          <p className="sambane-rail-note">No mainnet funds, USDT on-ramp, locked USDT collateral, bridge or live foreign-exchange conversion in this flow.</p>
        </section>
        <section className="section frame sambane-evidence" aria-labelledby="evidence-title">
          <div><p className="eyebrow">Honest by design</p><h2 id="evidence-title">Make the evidence<br /><span>easy to read.</span></h2><p className="sambane-lede">Android requests, signed approvals, Testnet payments and sandbox logistics each have a different scope.</p><p className="sambane-small">Build review: 14 November 2026. A demonstrated prototype is not a production commerce or lending service.</p></div>
          <dl className="sambane-evidence-list">
            <div><dt><span className="sambane-dot" />Android app <small>Text-first prototype</small></dt><dd>The native XRP order interface is behind a demo build flag, not enabled in every app build. It presents fixed demo XRP pricing and supports the farmer’s request, mandate and deposit steps.</dd></div>
            <div><dt><span className="sambane-dot sambane-dot-gold" />Payment evidence <small>Documented Testnet run</small></dt><dd>The latest proof document records lender-to-farmer funding, farmer-to-agent deposit and agent-to-supplier and courier payments. Receipt references establish transfers, not delivery or loan repayment.</dd></div>
            <div><dt><span className="sambane-dot sambane-dot-muted" />Community backing <small>Signed endorsements</small></dt><dd>Two member endorsements are verified off-chain. No collateral is locked and no production guarantee, repayment collection or default recovery is demonstrated.</dd></div>
            <div><dt><span className="sambane-dot sambane-dot-muted" />Commerce <small>Simulated / Sandbox</small></dt><dd>The supplier invoice is simulated and logistics uses Bob Go Sandbox. The settlement flow does not book a courier. A separate, optional sandbox booking rehearsal produced a test waybill; it is not evidence of real delivery.</dd></div>
          </dl>
        </section>
        <section className="sambane-closing frame" id="prototype-demonstrated" aria-labelledby="next-title">
          <p className="eyebrow">From request to receipt</p>
          <h2 id="next-title">What the prototype demonstrated</h2>
          <div className="sambane-proof-grid">
            <article className="sambane-proof"><p className="eyebrow">Implemented · Android</p><h3>The farmer stays in control.</h3><p>The text-first app gives the farmer a proposal to review and a mandate to sign. The native XRP order screen is enabled by a demo build flag. Its XRP prices are fixed for the demonstration, not a rand exchange quote.</p><p className="sambane-small">A request is never permission to borrow or move money.</p></article>
            <article className="sambane-proof" id="prototype-payment"><p className="eyebrow">Documented · XRPL Testnet</p><h3>Four transfers. One bounded order.</h3><p>The 14 November rehearsal follows lender → farmer → Product Agent → supplier and courier demo wallets. Funding, deposit and settlement are separate, traceable steps.</p><a className="sambane-proof-link" href={proofUrl}>Read the native XRP demo proof <span aria-hidden="true">↗</span></a><p className="sambane-small">Test XRP has no monetary value. This record does not prove real supplier fulfilment or repayment.</p></article>
            <article className="sambane-proof"><p className="eyebrow">Implemented · Payment controls</p><h3>Authority with limits.</h3><p>The service verifies the farmer and two member signatures. The runner compares HTTP 402 requirements with the signed mandate, restricts payment destinations and amounts, and journals payment attempts to prevent blind repeats.</p><p className="sambane-small">This is bounded agent settlement, not permission for autonomous, unrestricted wallet spending.</p></article>
            <article className="sambane-proof"><p className="eyebrow">Separate rehearsal · Sandbox</p><h3>Payment is not delivery.</h3><p>Bob Go Sandbox supports logistics testing. An earlier, separately approved booking rehearsal produced a test waybill and exercised QVAC OCR. That booking is not part of the current native XRP settlement flow.</p><p className="sambane-small">The current supplier invoice is simulated. No courier moved real goods in these rehearsals.</p></article>
          </div>
          <div className="sambane-closing-links"><a className="button" href="https://sambanestokvel.co.za/">Visit Sambane &amp; join a waiting list <span aria-hidden="true">↗</span></a><a href="https://w3node.io/node-engine">About W3Node Node Engine <span aria-hidden="true">↗</span></a></div><p className="sambane-small">Waiting lists are open for farmers, suppliers, lenders and Stokvel members. In development. No real goods purchases, real USDT, production lending or verified supplier fulfilment.</p>
        </section>
      </main>
      <footer className="site-footer frame"><a href="/" aria-label="PhaseLabs home"><img src={logo} alt="PhaseLabs" /></a><p>Sambane · Where Agents Do Business.</p><small>© {import.meta.env.VITE_BUILD_YEAR} PhaseLabs · Build {import.meta.env.VITE_BUILD_HASH}</small></footer>
    </div>
  );
}
