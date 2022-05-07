import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import AppRoutes from './AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
