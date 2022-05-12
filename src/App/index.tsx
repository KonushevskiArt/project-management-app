import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './normalize.scss';
import './global-styles.scss';
import AppRoutes from './AppRoutes';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
