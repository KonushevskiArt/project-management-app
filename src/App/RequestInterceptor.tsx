import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { Navigate, useLocation, useNavigate } from 'react-router';
import { pathRoutes } from 'utils/pathRoutes';

type Props = {
  children: JSX.Element;
};

const RequestInterceptor = ({ children }: Props) => {
  const navigate = useNavigate();
  const token = Cookies.get('token') || null;
  // console.log(children);
  // console.log('ProtectedRoute');
  // if (!token) {
  //   return <Navigate to="/signin" />;
  // }

  const setHeaders = (config: AxiosRequestConfig<unknown>) => {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };

    return config;
  };

  // axios.interceptors.request.use(setHeaders);

  axios.interceptors.request.use((config) => {
    const url = config.url as string;
    const innerPath = url.split(pathRoutes.root);

    const token = Cookies.get('token') || null;

    if (token === null) {
      if (location.pathname != '/signup' && location.pathname != '/signin') {
        if (location.pathname != '/update') {
          navigate('/welcome');
        }
      }
    } else if (!(innerPath[1] === 'signin' || innerPath[1] === 'signin')) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${Cookies.get('token')}`,
      };
    }
    return config;
  });

  return children;
};

export default RequestInterceptor;
