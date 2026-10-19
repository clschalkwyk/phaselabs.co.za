import logo from './assets/phaselabs-header-lockup.svg';

const questions = [
  { number: '01', title: 'Does the problem matter?', copy: 'Who feels the pain, what do they do today, and is it important enough to change?' },
  { number: '02', title: 'Could the business work?', copy: 'Who would pay, how would you reach them, and what would it cost to deliver?' },
  { number: '03', title: 'What should you test next?', copy: 'Which assumption could undo the venture, and what evidence would change your mind?' },
];

export default function App() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header frame">
        <a href="/" aria-label="PhaseLabs home"><img className="brand-logo" src={logo} alt="PhaseLabs" /></a>
        <a className="header-link" href="#what-is-coming">The idea behind it <span aria-hidden="true">↗</span></a>
        <a className="status cardbuddy-nav" href="#cardbuddy">CardBuddy for Android</a>
      </header>

      <main id="main">
        <section className="hero frame" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">For technical founders</p>
            <h1 id="hero-title">Building got faster.<br /><span>Founding didn’t.</span></h1>
            <p className="hero-question">You can build it. The question is whether anyone needs it.</p>
            <p className="lede">We’re building PhaseLabs to help you challenge a software venture before it becomes another six months of your life. Understand the customer problem, question the business assumptions, and decide what deserves your next move.</p>
            <a className="button" href="#what-is-coming">See what’s coming <span aria-hidden="true">↓</span></a>
            <p className="availability">In development. Venture submissions are not open yet.</p>
          </div>

          <aside className="review-card" aria-labelledby="review-title">
            <div className="card-bar"><span>The venture desk</span><span>Illustrative example</span></div>
            <div className="review-body">
              <p className="eyebrow">Before the next build</p>
              <h2 id="review-title">“I could automate this.”</h2>
              <p className="review-intro">A useful starting point. A few questions still stand between that and a business.</p>
              <dl className="review-notes">
                <div><dt>The assumption</dt><dd>Small teams will pay to automate their weekly reporting.</dd></div>
                <div><dt>The missing evidence</dt><dd>How much time does it cost them now, and who owns the budget?</dd></div>
                <div><dt>The next test</dt><dd>Talk to five team leads about their last reporting cycle. Ask what they tried and what they paid for.</dd></div>
              </dl>
              <p className="review-footnote">An example of the thinking we’re building for. No live assessment has been run.</p>
            </div>
          </aside>
        </section>

        <div className="statement-strip"><p className="frame">Expose hard truths. <span>Build what survives.</span></p></div>

        <section className="section frame" id="what-is-coming" aria-labelledby="purpose-title">
          <div className="section-heading">
            <p className="eyebrow">The problem</p>
            <h2 id="purpose-title">Shipping code is familiar.<br /><span>Founding asks different questions.</span></h2>
            <p>Faster tools make it easier to build. They don’t tell you whether the problem matters, whether the numbers work, or which assumption you’ve mistaken for a fact.</p>
          </div>
          <div className="question-grid">
            {questions.map(({ number, title, copy }) => (
              <article className="question-card" key={number}>
                <span className="number">{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section frame desk-section" aria-labelledby="desk-title">
          <div className="desk-copy">
            <p className="eyebrow">What we’re building</p>
            <h2 id="desk-title">A disciplined<br /><span>venture desk.</span></h2>
            <p>PhaseBrain is the system behind PhaseLabs. We’re developing it to keep your research, assumptions and decisions together as your venture takes shape.</p>
            <p>The planned output is a working <strong>venture playbook</strong>: a clear account of what you know, what remains uncertain, and what to do next.</p>
            <p className="honest-note">Research can challenge an idea. Real customer conversations and experiments still have to test it.</p>
          </div>
          <div className="playbook" aria-label="Planned venture playbook contents">
            <div className="playbook-heading"><span>Your venture playbook</span><small>Planned output</small></div>
            <ol>
              <li><strong>The customer and the problem</strong><span>Who you’re helping and why the problem matters.</span></li>
              <li><strong>The evidence and the unknowns</strong><span>What supports the idea and what still needs checking.</span></li>
              <li><strong>The decisions and trade-offs</strong><span>What you’ve chosen, why, and what could change it.</span></li>
              <li><strong>The next practical steps</strong><span>What to test, resolve or build next.</span></li>
            </ol>
          </div>
        </section>

        <section className="section frame evolution-section" aria-labelledby="evolution-title">
          <p className="eyebrow">AS YOUR VENTURE EVOLVES</p>
          <div>
            <h2 id="evolution-title">Keep the reasoning.<br /><span>Revisit the decision.</span></h2>
            <p className="evolution-example">A customer conversation challenges your pricing. A technical constraint changes the plan. An experiment shows the problem lies elsewhere.</p>
            <p className="evolution-story">We’re developing the venture playbook to connect new evidence with earlier decisions—preserving why you made them and helping you see what needs another look. As you learn, you can revise the plan without losing the reasoning behind it.</p>
          </div>
        </section>

        <section className="section frame cardbuddy-section" id="cardbuddy" aria-labelledby="cardbuddy-title">
          <div className="cardbuddy-copy">
            <h2 id="cardbuddy-title">CardBuddy.<br /><span>Make the introduction count.</span></h2>
            <p>Your business card, ready when the conversation starts. Create cards for different roles, make them your own with custom backgrounds, and share your details with a scannable QR code.</p>
            <ul className="cardbuddy-features">
              <li>Choose a layout and position your text and QR code.</li>
              <li>Open your card instantly from a home-screen widget.</li>
              <li>Share a card as an image or PDF, including through WhatsApp.</li>
            </ul>
            <a className="button" href="/assets/cardbuddy-1.9-10.apk" download="cardbuddy-1.9-10.apk">Download CardBuddy for Android</a>
            <p className="availability">Version 1.9 · Android 7.0 or later · 11.3 MB APK</p>
            <a className="checksum-link" href="/assets/cardbuddy-1.9-10.apk.sha256" download>Download SHA-256 checksum</a>
          </div>
          <aside className="cardbuddy-install" aria-labelledby="cardbuddy-install-title">
            <h3 id="cardbuddy-install-title">From download to introduction.</h3>
            <ol>
              <li><strong>Install on your Android phone.</strong><span>Download the APK and open it. If Android asks, allow installation from your browser, then follow the installation prompts.</span></li>
              <li><strong>Add your details.</strong><span>Start with a blank card. Add your contact details, links, and a background that fits your business.</span></li>
              <li><strong>Keep it within reach.</strong><span>Add the CardBuddy widget to your home screen, then tap it whenever you need to share your card.</span></li>
            </ol>
            <p className="availability">Direct Android download. To update later, download and install the newer version from this website.</p>
          </aside>
        </section>

        <section className="closing frame" aria-labelledby="closing-title">
          <p className="eyebrow">Coming soon</p>
          <h2 id="closing-title">Your next venture deserves<br /><span>more than a head start.</span></h2>
          <p>We’re building the first version around technical founders working through one software venture. The goal: clearer decisions before more time gets committed.</p>
          <p className="availability">No launch date announced. This site will be updated when the first version is ready.</p>
        </section>
      </main>

      <footer className="site-footer frame">
        <img src={logo} alt="PhaseLabs" />
        <p>Expose hard truths. Build what survives.</p>
        <small>© {new Date().getFullYear()} PhaseLabs · Build {import.meta.env.VITE_BUILD_HASH}</small>
      </footer>
    </div>
  );
}
