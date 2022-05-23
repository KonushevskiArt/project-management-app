import MyHomePage from 'pages/Main';
import { LogInForm } from 'pages/LogIn';
import { Routes, Route, Navigate } from 'react-router';
import { pathRoutes } from 'utils/pathRoutes';
import { ErrorPage } from 'pages/ErrorPage/ErrorPage';
import CreatTask from 'pages/Board/components/CreatTask';
import TaskContent from 'pages/Board/components/TaskContent';
import Board from 'pages/Board';
import { routes } from 'utils/routes';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={'/'} element={<MyHomePage />} />
      <Route path={`${routes.boards.absolute()}/*`} element={<Board />}>
        <Route path={routes.tasks.creat.absolute()} element={<CreatTask />} />
        <Route path={routes.tasks.content.absolute()} element={<TaskContent />} />
      </Route>
      <Route path={pathRoutes.auth.signup.relative} element={<LogInForm />} />
      <Route path={pathRoutes.auth.signin.relative} element={<LogInForm />} />
      <Route path="/errorPage/*" element={<ErrorPage />} />
      <Route path="/*" element={<Navigate to="/errorPage" replace />} />
    </Routes>
  );
};

export default AppRoutes;
