import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './normalize.scss';
import './global-styles.scss';
import './animation.scss';
import AppRoutes from './AppRoutes';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

import { ContextProvider } from './context';
import RequestInterceptor from './RequestInterceptor';

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ContextProvider>
          <RequestInterceptor>
            <AppRoutes />
          </RequestInterceptor>
        </ContextProvider>
      </QueryClientProvider>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
