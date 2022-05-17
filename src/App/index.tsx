import React from 'react';
import { BrowserRouter } from 'react-router-dom';
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
import { ReactQueryDevtools } from 'react-query/devtools';

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ContextProvider>
          <RequestInterceptor>
            <div className="wrapper">
              <div className="wrapper__box">
                <AppRoutes />
              </div>
            </div>
          </RequestInterceptor>
        </ContextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
