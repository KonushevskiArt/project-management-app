import { LogInForm } from 'pages/LogIn';
import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { pathRoutes } from 'utils/pathRoutes';
import Cookies from 'js-cookie';

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
      <Route
        path={routesPath.signIn}
        element={Cookies.get('token') ? <Navigate to="/" /> : <LogInForm />}
      />
      <Route
        path={routesPath.signUp}
        element={Cookies.get('token') ? <Navigate to="/" /> : <LogInForm />}
      />
    </Routes>
  );
};

export default AppRoutes;
