import { useEffect, useRef, useState } from 'react';
import { applyConsent, readConsent, saveConsent } from './analytics';

export default function AnalyticsConsent() {
  const [choice, setChoice] = useState(readConsent);
  const [open, setOpen] = useState(() => readConsent() === null);
  const preferences = useRef(null);
  const settings = useRef(null);
  useEffect(() => { applyConsent(choice); }, [choice]);

  function choose(value) {
    saveConsent(value);
    setChoice(value);
    setOpen(false);
    settings.current.close();
    requestAnimationFrame(() => preferences.current?.focus());
  }

  const options = <>
        <div>
          <h2>Help us understand what’s useful.</h2>
          <p>Allow Google Analytics cookies to measure visits and interactions? Analytics stays off unless you accept. No advertising tracking.</p>
          <details><summary>What we measure</summary><p>Page views, device and browser information, scrolls, outbound links and downloads are sent to Google after you accept. Analytics cookies expire after 60 days. Your choice is stored in this browser. You can withdraw consent at any time using Analytics preferences. <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noreferrer">How Google uses this data ↗</a></p></details>
        </div>
        <div className="analytics-actions">
          <button type="button" onClick={() => choose('denied')}>Reject analytics</button>
          <button type="button" onClick={() => choose('granted')}>Accept analytics</button>
        </div>
      </>;

  return (
    <>
      {open && <aside className="analytics-consent" aria-label="Website analytics preferences">{options}</aside>}
      <dialog ref={settings} className="analytics-settings" aria-label="Analytics preferences">
        {options}
        <button type="button" className="analytics-settings-close" onClick={() => settings.current.close()}>Close</button>
      </dialog>
      <button ref={preferences} type="button" className="analytics-preferences" aria-haspopup="dialog" onClick={() => { setOpen(false); settings.current.showModal(); }}>Analytics preferences</button>
    </>
  );
}
