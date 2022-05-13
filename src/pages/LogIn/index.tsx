import { Box, Button, Container, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useLocation } from 'react-router';
import { UserData } from './iterfaces';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './style.css';
import { Request } from '../../utils/axios';
import { AppContext } from 'App/context';
import CircularProgress from '@mui/material/CircularProgress';

export const LogInForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserData>({
    mode: 'all',
  });
  const [show, setShow] = useState(false);
  const location = useLocation();
  const appContext = useContext(AppContext);

  Request(reset);

  function checkUser(data: UserData) {
    const requestData = {
      method: 'post',
      urlProp: location.pathname,
      data: data,
    };
    appContext.dispatch({ type: 'setRequestData', payload: requestData });
    appContext.dispatch({ type: 'setLogInLogOut', payload: true });
    console.log(requestData);
  }

  function checkText() {
    if (location.pathname === '/signin') return 'Sign In ';
    if (location.pathname === '/signup') return 'Sign Up ';
  }

  function showHidePassord() {
    show ? setShow(false) : setShow(true);
  }

  if (localStorage.getItem('user')) return <Navigate to="/" />;
  if (appContext.state.signUp) return <Navigate to="/signin" />;

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Typography variant="h4">{checkText() + 'to App'}</Typography>
        <form
          className="form"
          onSubmit={handleSubmit((data) => {
            checkUser(data);
          })}
          onChange={() => {
            appContext.dispatch({ type: 'setNotFound', payload: false });
          }}
        >
          {location.pathname === '/signup' && (
            <Box sx={{ position: 'relative', width: '100%' }}>
              <input
                role="inputName"
                {...register('name', {
                  required: true,
                })}
                placeholder="Enter name"
                className={`text-input ${errors?.name ? 'error-border' : ''}`}
              />
              {errors?.name && <p className="error-text">Field must be filled</p>}
            </Box>
          )}
          <Box sx={{ position: 'relative', width: '100%' }}>
            <input
              role="inputEmail"
              {...register('login', {
                required: true,
                pattern: {
                  value: /^.{4,}$/i,
                  message: 'Min length 4',
                },
              })}
              placeholder="Enter login"
              className={`text-input ${errors?.login ? 'error-border' : ''}`}
            />
            {errors?.login && <p className="error-text">{errors.login.message}</p>}
          </Box>
          <Box sx={{ position: 'relative', width: '100%' }}>
            <input
              role="inputPassword"
              {...register('password', {
                required: true,
                pattern: {
                  value: /^.{6,}$/i,
                  message: 'Min length 6',
                },
              })}
              placeholder="Enter password"
              className={`text-input ${errors?.password ? 'error-border' : ''}`}
              type={`${show ? 'text' : 'password'}`}
            />
            {show ? (
              <VisibilityOff className="icon" onClick={showHidePassord} />
            ) : (
              <Visibility className="icon" onClick={showHidePassord} />
            )}
            {errors?.password && <p className="error-text">{errors.password.message}</p>}
          </Box>
          {appContext.state.notFound && (
            <Typography color="red" sx={{ marginTop: '-16px' }}>
              Не верные данные
            </Typography>
          )}
          <Button variant="contained" color="success" type="submit">
            {appContext.state.logInProces ? <CircularProgress color="info" /> : checkText()}
          </Button>
        </form>
      </Box>
    </Container>
  );
};
