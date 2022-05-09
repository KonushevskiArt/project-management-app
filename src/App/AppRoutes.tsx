import { LogInForm } from 'pages/LogIn';
import { UserData } from 'pages/LogIn/iterfaces';
import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Routes, Route } from 'react-router';
import { ErrorFallback } from 'sharedComponents/ErrorFallBack';
import { pathRoutes } from 'utils/pathRoutes';

const BoardPage = lazy(() => import('pages/Board'));

export const routesPath = {
  board: pathRoutes.root,
  signUp: pathRoutes.auth.signup.relative,
  signIn: pathRoutes.auth.signin.relative,
};

const routes = [
  { path: routesPath.board, element: <BoardPage /> },
  { path: routesPath.signUp, element: <LogInForm /> },
  { path: routesPath.signIn, element: <LogInForm /> },
];

const AppRoutes = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path + Date.now()}
          path={route.path}
          element={
            <Suspense fallback={<h2>Loading...</h2>}>
              <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => {
                  // reset the state of your app so the error doesn't happen again
                }}
              >
                {route.element}
              </ErrorBoundary>
            </Suspense>
          }
        />
      ))}
    </Routes>
  );
};

export default AppRoutes;
