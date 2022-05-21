import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { ReactNode } from 'react';
import { Navigate } from 'react-router';

export default function (WrappedComponent: React.ComponentType) {
  return (): ReactNode => {
    const token = Cookies.get('token') || null;
    console.log('RequestInterceptor');
    if (!token) {
      return <Navigate to="/signin" />;
    }
    const setHeaders = (config: AxiosRequestConfig<unknown>) => {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };

      return config;
    };

    axios.interceptors.request.use(setHeaders);
    console.log('ReactNode');
    return <WrappedComponent />;
  };
}
