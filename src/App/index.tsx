import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import AppRoutes from './AppRoutes';
import { ContextProvider } from './context';

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <AppRoutes />
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
