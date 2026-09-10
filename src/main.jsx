import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import lockup from './assets/phaselabs-header-lockup.svg';
import mark from './assets/phaselabs-icon.svg';
import './styles.css';

function App() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-header">
        <img className="brand-lockup" src={lockup} alt="PhaseLabs" />
        <div className="company-status" aria-label="Company status: active development">
          <span aria-hidden="true" />
          <div>
            <small>Company status</small>
            <strong>Active development</strong>
          </div>
        </div>
      </header>

      <main id="main" className="hero">
        <section className="hero-copy" aria-labelledby="hero-title">
          <p className="eyebrow">Coming soon</p>
          <h1 id="hero-title">Building what survives.</h1>
          <p className="lede">
            PhaseLabs pressure-tests uncertain ideas, then turns the viable ones into evidence-backed ventures and executable Playbooks.
          </p>
        </section>

        <figure className="mark-stage">
          <img src={mark} alt="PhaseLabs pixel-to-stream mark" />
        </figure>
      </main>

      <footer className="site-footer">
        <p>Venture engineering</p>
        <p>© {new Date().getFullYear()} PhaseLabs</p>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
