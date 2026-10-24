import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import AnalyticsConsent from './AnalyticsConsent.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <AnalyticsConsent />
  </StrictMode>,
);
