import { Navigate, Route, Routes } from 'react-router-dom';
import Board from 'pages/Board';
import NotFound from 'pages/NotFound';
import TaskContent from 'pages/TaskContent';
import Main from 'pages/Main';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import CreatCard from 'components/CreatTask';
import { pathRoutes } from 'utils/pathRoutes';

const queryClient = new QueryClient();

const App = () => (
  <div className="wrapper wrapper__box">
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/boards/*">
          <Route path=":boardId/*" element={<Board />}>
            <Route path="columns/*">
              <Route path=":columnId/*" element={<CreatCard />}>
                <Route path="tasks/*">
                  <Route path=":taskId" element={<TaskContent />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
        {/*   <Route path="/" element={<Navigate to="board" replace />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </div>
);

export default App;
