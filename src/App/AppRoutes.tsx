import MyHomePage from 'pages/MyHome';
import { LogInForm } from 'pages/LogIn';
import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { pathRoutes } from 'utils/pathRoutes';
import Cookies from 'js-cookie';
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
      <Route path={routesPath.board} element={<BoardPage />} />
      {!Cookies.get('token') && (
        <>
          <Route path={routesPath.signIn} element={<LogInForm />} />
          <Route path={routesPath.signUp} element={<LogInForm />} />
        </>
      )}
      <Route path="errorPage" element={<ErrorPage />} />
      <Route path="*" element={<Navigate to="errorPage" replace />} />
    </Routes>
  );
};

export default AppRoutes;
