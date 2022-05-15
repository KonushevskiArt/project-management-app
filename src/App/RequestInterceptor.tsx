import axios from 'axios';
import Cookies from 'js-cookie';
import React from 'react';
import { useNavigate } from 'react-router';
import { pathRoutes } from 'utils/pathRoutes';

type Props = {
  children: JSX.Element;
};

const RequestInterceptor = ({ children }: Props) => {
  const navigate = useNavigate();
  axios.interceptors.request.use((config) => {
    const url = config.url as string;
    const innerPath = url.split(pathRoutes.root);

    const token = Cookies.get('token') || null;

    if (token === null) {
      console.log('navitage', token);
      navigate(pathRoutes.auth.signin.relative);
      // How can I stop request ?
    } else if (!(innerPath[1] === 'signin' || innerPath[1] === 'signin')) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${Cookies.get('token')}`,
      };
    }
    return config;
  });

  return <>{children}</>;
};

export default RequestInterceptor;
