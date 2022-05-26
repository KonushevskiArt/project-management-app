import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'normalize.css';

import './index.css';
import { LanguageProvider } from 'contexts/language-context';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>
);
