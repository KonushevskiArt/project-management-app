import MyHomePage from 'pages/MyHome';
import { LogInForm } from 'pages/LogIn';
import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { pathRoutes } from 'utils/pathRoutes';
import { ErrorPage } from 'pages/ErrorPage/ErrorPage';
import CreatTask from 'pages/Board/components/CreatTask';
import TaskContent from 'pages/TaskContent';

const BoardPage = lazy(() => import('pages/Board'));

export const routesPath = {
  board: pathRoutes.root,
  signUp: pathRoutes.auth.signup.relative,
  signIn: pathRoutes.auth.signin.relative,
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MyHomePage />} />
      <Route path="boards/*">
        <Route path=":boardId/*" element={<BoardPage />}>
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
      {/* <Route path="/boards" element={<Navigate to="/" replace />} /> */}
      <Route path={pathRoutes.auth.signup.relative} element={<LogInForm />} />
      <Route path={pathRoutes.auth.signin.relative} element={<LogInForm />} />
      <Route path="/errorPage/*" element={<ErrorPage />} />
      <Route path="/*" element={<Navigate to="/errorPage" replace />} />
    </Routes>
  );
};

export default AppRoutes;
