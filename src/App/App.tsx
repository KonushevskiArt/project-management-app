import { Navigate, Route, Routes } from 'react-router-dom';
import Board from 'pages/Board';
import NotFound from 'pages/NotFound';
import TaskContent from 'pages/TaskContent';
import Main from 'pages/Main';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import CreatTask from 'components/CreatTask';
import { join } from 'path-browserify';
/* 
const paths = {
  root: '/',
  boards: {
    relative: 'boards',
    id: (boardId = 'boardId') => `${boardId}`,
    getById: (boardId = 'boardId') => ({
      relative: join(paths.boards.relative, paths.boards.id(boardId)),
      absolute: join(paths.root, paths.boards.relative, paths.boards.id(boardId)),
    }),
  },
  columns: {
    relative: 'columns',
    id: (id = 'columnId') => `${id}`,
    getById: (id = 'columnId') => ({
      relative: join(paths.columns.relative, paths.columns.id(id)),
      absolute: join(paths.root, paths.columns.relative, paths.columns.id(id)),
    }),
  },
  columnId: (id = 'columnId') => `${id}`,
  tasks: 'tasks',
  taskId: (id = 'taskId') => `${id}`,
};
 */
//console.log(join(paths.boards.getById().relative, paths.columns, paths.columnId()));
//boards/:boardId/columns/:columnId
const queryClient = new QueryClient();

const App = () => (
  <div className="wrapper wrapper__box">
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="boards/*">
          <Route path=":boardId/*" element={<Board />}>
            <Route path="columns/*">
              <Route path=":columnId/*">
                <Route path="tasks/*">
                  <Route path="creat-task" element={<CreatTask />} />
                  <Route path=":taskId/*">
                    <Route path="content" element={<TaskContent />} />
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
        <Route path="/boards" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </div>
);

export default App;
