import axios from 'axios';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AppContext } from '../App/context';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import { UserData } from 'pages/LogIn/iterfaces';
import { UseFormReset } from 'react-hook-form';

const checkToken = () => {
  if (!Cookies.get('token')) return '';
  return Cookies.get('token');
};

export const Request = (reset: UseFormReset<UserData>) => {
  const baseUrl = 'https://pure-cove-88107.herokuapp.com';
  const appContext = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios({
      method: appContext.state.requestData.method,
      url: `${baseUrl}${appContext.state.requestData.urlProp}`,
      headers: { Authorization: `Bearer ${checkToken()}` },
      data: appContext.state.requestData.data,
    })
      .then(function (response) {
        if (appContext.state.requestData.urlProp === '/signin') {
          const in23Hours = new Date(new Date().getTime() + 23 * 60 * 60 * 1000);
          Cookies.set('token', response.data.token, { expires: in23Hours });
          localStorage.setItem('user', 'y');
          appContext.dispatch({ type: 'setLogInLogOut', payload: false });
          appContext.dispatch({ type: 'setNotFound', payload: false });
        }
        if (appContext.state.requestData.urlProp === '/signup') {
          appContext.dispatch({ type: 'setLogInLogOut', payload: false });
          reset();
          navigate('/signin');
          appContext.dispatch({ type: 'reset' });
        }
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 403) {
            console.log('ssdw');
            appContext.dispatch({ type: 'setNotFound', payload: true });
            appContext.dispatch({ type: 'setLogInLogOut', payload: false });
          }
        }
      });
  }, [appContext.state.logInProces]);
};
