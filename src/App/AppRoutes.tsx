import { LogInForm } from 'pages/LogIn';
import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { pathRoutes } from 'utils/pathRoutes';

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
        element={localStorage.getItem('user') ? <Navigate to="/" /> : <LogInForm />}
      />
      <Route
        path={routesPath.signUp}
        element={localStorage.getItem('user') ? <Navigate to="/" /> : <LogInForm />}
      />
    </Routes>
  );
};

export default AppRoutes;
