import { Navigate, Route, Routes } from 'react-router-dom';
import Board from 'pages/Board';
import NotFound from 'components/not-found';
import CardContent from 'pages/CardContent';
import Main from 'pages/Main';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

const App = () => (
  <div className="wrapper wrapper__box">
    <QueryClientProvider client={queryClient}>
      <Routes>
        {/* <Route path="/" element={<Main />} /> */}
        <Route path="/board/*" element={<Board />}>
          <Route path=":taskId" element={<CardContent />} />
        </Route>
        <Route path="/" element={<Navigate to="board" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </div>
);

export default App;
