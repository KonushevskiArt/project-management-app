import MyHomePage from 'pages/Main';
import { LogInForm } from 'pages/LogIn';
import { Routes, Route, Navigate } from 'react-router';
import { pathRoutes } from 'utils/pathRoutes';
import { ErrorPage } from 'pages/ErrorPage/ErrorPage';
import CreatTask from 'pages/Board/components/CreatTask';
import TaskContent from 'pages/TaskContent';
import Board from 'pages/Board';
import { routes } from 'utils/routes';
import RequestInterceptor from './RequestInterceptor';
import connectSortBarContext from 'hocs/connectSortBarContext';
import ProtectedRoute from './ProtectedRoute';

export const routesPath = {
  board: pathRoutes.root,
  signUp: pathRoutes.auth.signup.relative,
  signIn: pathRoutes.auth.signin.relative,
};
/* 
const AppRoutes = () => {
  return (
    <Routes>
      <Route path={routes.root} element={<MyHomePage />} />
      <Route path={`${routes.boards.relative}/*`}>
        <Route path={`${routes.boards.id()}/*`} element={<Board />}>
          <Route path={`${routes.columns.relative}/*`}>
            <Route path={`${routes.columns.id()}/*`}>
              <Route path={`${routes.tasks.relative}/*`}>
                <Route path={routes.tasks.creat.relative} element={<CreatTask />} />
                <Route path={`${routes.tasks.id()}/*`}>
                  <Route path={routes.tasks.content.relative} element={<TaskContent />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
      <Route path={pathRoutes.auth.signup.relative} element={<LogInForm />} />
      <Route path={pathRoutes.auth.signin.relative} element={<LogInForm />} />
      <Route path="/errorPage/*" element={<ErrorPage />} />
      <Route path="/*" element={<Navigate to="/errorPage" replace />} />
    </Routes>
  );
};
 */

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path={'/'} element={<MyHomePage />} />
        <Route path={`boards/:boardId/*`} element={<Board />}>
          <Route path={`columns/:columnId/tasks/creat-task`} element={<CreatTask />} />
          <Route path={`columns/:columnId/tasks/:taskId/task-content`} element={<TaskContent />} />
        </Route>
      </Route>
      <Route path={pathRoutes.auth.signup.relative} element={<LogInForm />} />
      <Route path={pathRoutes.auth.signin.relative} element={<LogInForm />} />
      <Route path="/errorPage/*" element={<ErrorPage />} />
      <Route path="/*" element={<Navigate to="/errorPage" replace />} />
    </Routes>
  );
};

export default AppRoutes;
