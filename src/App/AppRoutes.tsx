import MyHomePage from 'pages/Main';
import { LogInForm } from 'pages/LogIn';
import { Routes, Route, Navigate } from 'react-router';
import { pathRoutes } from 'utils/pathRoutes';
import { ErrorPage } from 'pages/ErrorPage/ErrorPage';
import { Header } from 'pages/Header';
import { WelcomPage } from 'pages/WelcomPage';
import { useContext } from 'react';
import { AppContext } from './context';
import CreatTask from 'pages/Board/components/CreatTask';
import TaskContent from 'pages/TaskContent';
import BoardPage from 'pages/Board';
import Cookies from 'js-cookie';

export const routesPath = {
  board: pathRoutes.root,
  signUp: pathRoutes.auth.signup.relative,
  signIn: pathRoutes.auth.signin.relative,
};

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
  function TestHead() {
    if (Cookies.get('token') || appContext.state.logInSucsess) return <Header />;
    else return <></>;
  }
  //{Cookies.get('token') && <Header />}
  return (
    <>
      <TestHead />
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
