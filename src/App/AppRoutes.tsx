import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Routes, Route } from 'react-router';
import { ErrorFallback } from 'sharedComponents/ErrorFallBack';
import { pathRoutes } from 'utils/pathRoutes';
import { ContextProvider } from './context';

const BoardPage = lazy(() => import('pages/Board'));

export const routesPath = {
  board: pathRoutes.root,
};

const routes = [{ path: routesPath.board, element: <BoardPage /> }];

const AppRoutes = () => {
  return (
    <ContextProvider>
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
    </ContextProvider>
  );
};

export default AppRoutes;
