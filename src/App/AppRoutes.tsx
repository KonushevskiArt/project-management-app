import MyHomePage from 'pages/MyHome';
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router';
import { pathAPIRoutes } from 'utils/pathAPIRoutes';

const BoardPage = lazy(() => import('pages/Board'));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<MyHomePage />} />
      <Route
        path={`/${pathAPIRoutes.board.relative}/:id`}
        element={
          <Suspense fallback={<h2>Loading...</h2>}>
            <BoardPage />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
