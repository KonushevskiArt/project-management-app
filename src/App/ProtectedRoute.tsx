import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { useCallback, useEffect } from 'react';
import { Navigate, Outlet, useLocation, useMatch, useNavigate } from 'react-router';
import { pathRoutes } from 'utils/pathRoutes';

type Props = {
  children?: JSX.Element;
};

const ProtectedRoute = ({ children }: Props) => {
  const navigate = useNavigate();

  const token = Cookies.get('token') || null;
  console.log(children);
  console.log('ProtectedRoute');
  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  const setHeaders = (config: AxiosRequestConfig<unknown>) => {
    console.log('setHeaders');
    const token = Cookies.get('token') || null;

    if (token === null) navigate(pathRoutes.auth.signin.relative);

    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };

    return config;
  };

  axios.interceptors.request.use(setHeaders);

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
