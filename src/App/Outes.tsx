import MyHomePage from 'pages/Main';
import { LogInForm } from 'pages/LogIn';
import { Routes, Route, Navigate } from 'react-router';
import { pathRoutes } from 'utils/pathRoutes';
import { ErrorPage } from 'pages/ErrorPage/ErrorPage';
import CreatTask from 'pages/Board/components/CreatTask';
import TaskContent from 'pages/TaskContent';
import Board from 'pages/Board';
import { routes } from 'utils/routes';
import RequestInterceptor from '../utils/RequestInterceptor';
import connectSortBarContext from 'hocs/connectSortBarContext';
import ProtectedRoute from './ProtectedRoute';

const Outes = () => {
  return (
    <Routes>
      <Route path={pathRoutes.auth.signup.relative} element={<LogInForm />} />
      <Route path={pathRoutes.auth.signin.relative} element={<LogInForm />} />
      <Route path="/errorPage/*" element={<ErrorPage />} />
      <Route path="/*" element={<Navigate to="/errorPage" replace />} />
    </Routes>
  );
};

export default Outes;
