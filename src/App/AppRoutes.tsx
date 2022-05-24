import { LogInForm } from 'pages/LogIn';
import { Routes, Route, Navigate } from 'react-router';
import { ErrorPage } from 'pages/ErrorPage/ErrorPage';
import { Header } from 'pages/Header';
import { WelcomPage } from 'pages/WelcomPage';
import { useContext } from 'react';
import { AppContext } from './context';
import CreatTask from 'pages/Board/components/CreatTask';
import TaskContent from 'pages/Board/components/TaskContent';
import Board from 'pages/Board';
import { routes } from 'utils/routes';
import { pathRoutes } from 'utils/pathRoutes';
import MainPage from 'pages/Main';
import Cookies from 'js-cookie';

const AppRoutes = () => {
  const appContext = useContext(AppContext);
  type ProtectedRouteProps = {
    outlet: JSX.Element;
  };

  function ProtectedRoute({ outlet }: ProtectedRouteProps) {
    if (!Cookies.get('token') || !appContext.state.logInSucsess) return outlet;
    else return <Navigate to="errorPage" replace />;
  }

  function PrivatePath() {
    if (Cookies.get('token') || appContext.state.logInSucsess) return <LogInForm />;
    else return <Navigate to="errorPage" replace />;
  }
  function PrivateHeader() {
    if (Cookies.get('token') || appContext.state.logInSucsess) return <Header />;
    else return <></>;
  }
  console.log('dad2212');
  return (
    <>
      <PrivateHeader />
      <Routes>
        <Route path={'/'} element={<MainPage />} />
        <Route path={`${routes.boards.absolute()}/*`} element={<Board />}>
          <Route path={routes.tasks.creat.absolute()} element={<CreatTask />} />
          <Route path={routes.tasks.content.absolute()} element={<TaskContent />} />
        </Route>
        <Route path="/signin" element={<ProtectedRoute outlet={<LogInForm />} />} />
        <Route path="/signup" element={<ProtectedRoute outlet={<LogInForm />} />} />
        <Route path="/welcome" element={<WelcomPage />} />
        <Route path="/update" element={<PrivatePath />} />
        <Route path="/errorPage/*" element={<ErrorPage />} />
        <Route path="/*" element={<Navigate to="/errorPage" replace />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
