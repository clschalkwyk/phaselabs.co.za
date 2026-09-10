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
        <span className="status"><span aria-hidden="true" />Coming soon</span>
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

        <section className="section frame founder-section" aria-labelledby="founder-title">
          <p className="eyebrow">Why PhaseLabs exists</p>
          <div>
            <h2 id="founder-title">Built from the other side<br /><span>of the project graveyard.</span></h2>
            <p className="founder-story">After 24 years building software, I know the pull of a new idea — and how much work can happen before you ask the uncomfortable business questions. PhaseLabs comes from wanting to bring those questions forward.</p>
            <p className="founder-name">Wikus Schalkwyk <span>Founder, PhaseLabs</span></p>
          </div>
        </section>

        <section className="closing frame" aria-labelledby="closing-title">
          <p className="eyebrow">Coming soon</p>
          <h2 id="closing-title">Your next venture deserves<br /><span>more than a head start.</span></h2>
          <p>We’re building the first version around technical founders working through one software venture. The goal: clearer decisions before more time gets committed.</p>
          <a className="button secondary" href="https://github.com/clschalkwyk/phaselabs.co.za">Follow development on GitHub <span aria-hidden="true">↗</span></a>
          <p className="availability">No launch date announced. This site will be updated when the first version is ready.</p>
        </section>
      </main>

      <footer className="site-footer frame">
        <img src={logo} alt="PhaseLabs" />
        <p>Expose hard truths. Build what survives.</p>
        <small>© {new Date().getFullYear()} PhaseLabs</small>
      </footer>
    </div>
  );
}
