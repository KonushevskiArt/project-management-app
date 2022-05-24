import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { ContextProvider } from './context';
import RequestInterceptor from './RequestInterceptor';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ContextProvider>
          <RequestInterceptor>
            <AppRoutes />
          </RequestInterceptor>
        </ContextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
