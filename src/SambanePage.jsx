import logo from './assets/phaselabs-header-lockup.svg';
import mascot from './assets/sambane-village.png';
import SambaneFlow from './sambane/SambaneFlow';
import SMWebSystemsLogo from './sambane/SMWebSystemsLogo';
import './sambane/sambane.css';

const receipts = {
  broker: 'https://testnet.xrpl.org/transactions/C20EDC1A094367536A873A6105C9A09E3F283A2DC84BCF9133F0F05C7A9DA429/detailed',
  loan: 'https://sepolia.etherscan.io/tx/0x2fe7d6cdbea00ff7c0c002529c796900e84c33122fc9ba92c68b75b5c60cb944',
  supplier: 'https://sepolia.etherscan.io/tx/0x2d9fe6da5b8a88184e3054253ee55bbadd4797c8ea332dcc1592d8ece1076367',
  courier: 'https://sepolia.etherscan.io/tx/0xf56258582dabf1e7ddd518e282f12b8d8adcdd911075b13d12b6ddd7502e957e',
};

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
            <p className="sambane-lede">Sambane helps rural farmers compare farm-input and delivery costs, then ask for community backing if their chosen quote exceeds their budget. Product and Logistics brokers coordinate the options. The farmer decides whether to seek funding and separately approves payments.</p>
            <a className="button" href="#prototype-demonstrated">See what the prototype demonstrated <span aria-hidden="true">↓</span></a>
          </div>
          <aside className="sambane-request" aria-labelledby="request-title">
            <div className="sambane-request-top"><span className="eyebrow" id="request-title">It starts with a request</span><span className="sambane-example">Illustrative scenario</span></div>
            <img className="sambane-mascot" src={mascot} alt="Sambane’s waving aardvark mascot with the words Sambane: It takes a village." width="1199" height="1312" fetchPriority="high" />
            <p className="sambane-quote">“10 bags of chicken feed to the farm”</p>
            <dl className="sambane-request-fields"><div><dt>The need</dt><dd>10 bags · chicken feed</dd></div><div><dt>The destination</dt><dd>The farm</dd></div><div><dt>The spending limit</dt><dd>Confirm a maximum in rand</dd></div><div><dt>The next step</dt><dd>Review the full cost</dd></div></dl>
            <p className="sambane-small">Android sourcing has been rehearsed with a rand limit. WhatsApp text intake is demonstrated; its budget prompts and notifications are still being validated. This page is an illustration, not a live ordering service.</p>
          </aside>
        </section>
        <div className="sambane-principles"><p className="frame"><span>Farmer-led decisions</span><span>Community-backed shortfalls</span><span>Verifiable payment evidence</span></p></div>
        <section className="section frame sambane-flow-section" id="how-it-works" aria-labelledby="flow-title">
          <div className="sambane-section-top"><div><p className="eyebrow">From a need to a proposal</p><h2 id="flow-title">Follow the work.<br /><span>Keep the control.</span></h2></div><p>This illustrated sourcing workflow explains the design. It is not a live network view or transaction feed. Funding and payment approvals are separate steps, described below.</p></div>
          <SambaneFlow />
        </section>
        <section className="section frame" id="community-backing" aria-labelledby="backing-title">
          <div className="sambane-section-top"><div><p className="eyebrow">When the quote exceeds the limit</p><h2 id="backing-title">Ask first.<br /><span>Back the shortfall.</span></h2></div><p>The Stokvel acts as a community guarantor in the rehearsal. Two designated members, the Safe’s two owners, endorse the same terms on separate phones. A separate lender supplies the principal.</p></div>
          <ol className="sambane-backing-steps">
            <li><span>01</span><h3>The farmer chooses.</h3><p>The wallet shows the exact shortfall. Request funding, decline and edit the request, or return to the quotes. Being over budget never automatically starts a loan.</p></li>
            <li><span>02</span><h3>Two members endorse.</h3><p>Both Stokvel members review and sign the quote-specific guarantee using WDK. One signature leaves it pending. Signing does not debit the Stokvel Safe.</p></li>
            <li><span>03</span><h3>The lender funds.</h3><p>The independent lender separately authorizes the shortfall transfer to the borrower in test USD₮ on Sepolia. Sambane verifies it against the agreed terms.</p></li>
            <li><span>04</span><h3>The borrower pays.</h3><p>The borrower separately approves the supplier and courier transfers from the wallet. The gateway verifies each receipt before advancing.</p></li>
          </ol>
          <p className="sambane-rail-note">Rehearsed example: R2,408.89 including delivery against a R1,600 limit leaves R808.89 to fund. The conversion uses a fixed demo rate, not a live exchange rate.</p>
          <p className="sambane-small sambane-scope-note">This prototype records a signed endorsement. It does not implement a locked guarantee reserve, an enforceable default claim, repayment scheduling or loss allocation.</p>
        </section>
        <section className="section frame" aria-labelledby="rails-title">
          <div className="sambane-section-top"><div><p className="eyebrow">Two rails. Different jobs.</p><h2 id="rails-title">Pay for the work.<br /><span>Test the finance.</span></h2></div><p>The XRP broker-payment and Sepolia credit rehearsals are separate examples. They do not mean the farmer pays twice for the same goods. Neither is a real goods purchase.</p></div>
          <div className="sambane-rails">
            <article className="sambane-rail"><div className="sambane-rail-top"><span className="sambane-rail-mark" aria-hidden="true">01</span><span className="sambane-chip">XRPL Testnet · XRP</span></div><h3>Bounded broker payments</h3><p>The buyer reviews a 2 XRP Testnet payment and a separate capped mandate on Android. An isolated Railway signer handles the XRP signing. After the buyer payment verifies, the Product Broker pays the authorized 0.01 XRP x402 fee to Logistics.</p><ol className="sambane-wallet-path"><li>Buyer service wallet</li><li>Product Broker</li><li>Logistics Broker</li></ol><p className="sambane-small">The broker payment was independently verified on the ledger and appears in the wallet and dashboard. <a href="#prototype-payment">View the payment evidence below.</a></p></article>
            <article className="sambane-rail sambane-rail-finance"><div className="sambane-rail-top"><span className="sambane-rail-mark" aria-hidden="true">02</span><span className="sambane-chip">Ethereum Sepolia · test ERC-20</span></div><h3>Community-backed credit</h3><p>Two Stokvel members signed the same guarantee. A separate lender funded the shortfall, and the borrower separately approved supplier and courier payments. All three transfers were verified in the Sepolia rehearsal.</p><ol className="sambane-wallet-path"><li>Lender</li><li>Borrower</li><li>Supplier + courier</li></ol><p className="sambane-small">TEST USD₮ / DEMO-USDT is a test token, not Tether-issued, redeemable or real USDT. No production lending. Repayment and default handling are not demonstrated.</p></article>
          </div>
          <p className="sambane-rail-note"><span aria-hidden="true">↔</span> Separate test networks. No bridge, swap or foreign-exchange conversion between XRP and the Sepolia test token.</p>
        </section>
        <section className="section frame sambane-evidence" aria-labelledby="evidence-title">
          <div><p className="eyebrow">Honest by design</p><h2 id="evidence-title">Make the evidence<br /><span>easy to read.</span></h2><p className="sambane-lede">The build combines Android sourcing, community approvals, verified Testnet receipts and sandbox logistics. Each has a different scope.</p><p className="sambane-small">Build review: 10 November 2026. A demonstrated prototype is not a production commerce or lending service.</p></div>
          <dl className="sambane-evidence-list">
            <div><dt><span className="sambane-dot" />Android sourcing <small>Rehearsed</small></dt><dd>QVAC extracted the request and rand budget on a compatible Android phone. The wallet returned landed quotes and tested both declining and requesting shortfall funding. Text, dictation and manual entry are supported; not every voice or location scenario has been rehearsed.</dd></div>
            <div><dt><span className="sambane-dot sambane-dot-gold" />Onchain evidence <small>Verified receipts</small></dt><dd>A 0.01 XRP broker-service payment, plus a separate Sepolia lender-to-borrower, borrower-to-supplier and borrower-to-courier rehearsal. Wallet Judge view exposes the receipts.</dd></div>
            <div><dt><span className="sambane-dot sambane-dot-muted" />WhatsApp <small>Intake demonstrated</small></dt><dd>Text requests, saved addresses, broker replies and quote selection are supported. Budget clarification, funding choices and notification delivery are being validated. Financial approvals require wallet review. WhatsApp never signs or moves funds.</dd></div>
            <div><dt><span className="sambane-dot sambane-dot-muted" />Commerce <small>Synthetic / Sandbox</small></dt><dd>Selectable supplier offers remain synthetic. Bob Go Sandbox rates, separately approved bookings and test waybills have been exercised. QVAC OCR read a sandbox waybill. Real catalogue discovery is separate from executable quotes; no physical fulfilment is verified.</dd></div>
          </dl>
        </section>
        <section className="sambane-closing frame" id="prototype-demonstrated" aria-labelledby="next-title">
          <p className="eyebrow">From request to receipt</p>
          <h2 id="next-title">What the prototype demonstrated</h2>
          <div className="sambane-proof-grid">
            <article className="sambane-proof"><p className="eyebrow">Rehearsed · Android</p><h3>A budget and a genuine choice.</h3><ol><li>A 20-bag chicken-feed request resolved “the farm” with a R1,600 limit.</li><li>The R2,408.89 landed quote showed the R808.89 shortfall.</li><li>Declining opened an editable request. Opting in moved a fresh order to Awaiting Stokvel guarantee.</li></ol><p className="sambane-small">This funding-choice rehearsal stopped before signatures or payments. The settled credit example below used an earlier order.</p></article>
            <article className="sambane-proof"><p className="eyebrow">Verified · Ethereum Sepolia</p><h3>Three transfers. Separate approvals.</h3><p>Two Stokvel signatures preceded the separate lender’s 44.938334 test USD₮ transfer. The borrower then paid 127.777778 to the supplier and 6.049445 to the courier. Both phones displayed the verified receipts.</p><div className="sambane-receipt-links"><a href={receipts.loan}>Lender → borrower ↗</a><a href={receipts.supplier}>Borrower → supplier ↗</a><a href={receipts.courier}>Borrower → courier ↗</a></div><p className="sambane-small">Explorer receipts prove transfers, not the legal enforceability of a guarantee, repayment or delivery of goods.</p></article>
            <article className="sambane-proof" id="prototype-payment"><p className="eyebrow">Verified · XRP Testnet</p><h3>0.01 XRP from Product to Logistics.</h3><p>The broker fee followed the verified buyer payment under the approved mandate. The current build uses hosted signing, and the wallet’s archived Judge view shows this existing receipt.</p><a className="sambane-proof-link" href={receipts.broker}>View the 0.01 XRP Testnet transaction <span aria-hidden="true">↗</span></a><p className="sambane-small">The ledger records the payment. It does not prove the approval interface or delivery of goods.</p></article>
            <article className="sambane-proof"><p className="eyebrow">Demonstrated · WhatsApp + Sandbox</p><h3>From a request to broker evidence.</h3><p>A chicken-feed request on WhatsApp resolved “the farm” to a saved address. Product and Logistics brokers used OpenRouter, a synthetic supplier catalogue and Bob Go Sandbox quotes. The brokers replied on WhatsApp.</p><p className="sambane-small">A separate Android approval exercised a sandbox courier booking and test waybill; QVAC OCR read its reference and date. No courier moved real goods.</p></article>
          </div>
          <div className="sambane-closing-links"><a className="button" href="https://sambanestokvel.co.za/">Visit Sambane &amp; join a waiting list <span aria-hidden="true">↗</span></a><a href="https://w3node.io/node-engine">About W3Node Node Engine <span aria-hidden="true">↗</span></a></div><p className="sambane-small">Waiting lists are open for farmers, suppliers, lenders and Stokvel members. In development. No real goods purchases, real USDT, production lending or verified supplier fulfilment.</p>
        </section>
      </main>
      <footer className="site-footer frame"><a href="/" aria-label="PhaseLabs home"><img src={logo} alt="PhaseLabs" /></a><p>Sambane · Where Agents Do Business.</p><small>© {import.meta.env.VITE_BUILD_YEAR} PhaseLabs · Build {import.meta.env.VITE_BUILD_HASH}</small></footer>
    </div>
  );
}
