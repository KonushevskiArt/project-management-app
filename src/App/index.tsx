import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './normalize.scss';
import './global-styles.scss';
import AppRoutes from './AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
