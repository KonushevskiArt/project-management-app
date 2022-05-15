import MyHomePage from 'pages/MyHome';
import { LogInForm } from 'pages/LogIn';
import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { pathRoutes } from 'utils/pathRoutes';
import { ErrorPage } from 'pages/ErrorPage/ErrorPage';

const BoardPage = lazy(() => import('pages/Board'));

export const routesPath = {
  board: pathRoutes.root,
  signUp: pathRoutes.auth.signup.relative,
  signIn: pathRoutes.auth.signin.relative,
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<MyHomePage />} />
      <Route path={`${pathRoutes.board.relative}/:id`} element={<BoardPage />} />
      {/* <Route path={pathRoutes.auth.signup.relative} element={<LogInForm />} />
      <Route path={pathRoutes.auth.signin.relative} element={<LogInForm />} /> */}
      <Route path="/errorPage/*" element={<ErrorPage />} />
      <Route path="/*" element={<Navigate to="/errorPage" replace />} />
    </Routes>
  );
};

export default AppRoutes;
