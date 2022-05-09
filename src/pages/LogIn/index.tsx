import { Box, Button, Container, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router';
import { Request } from 'utils/axios';
import { UserData } from './iterfaces';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './style.css';

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

  function checkUser(data: UserData) {
    Request('post', location.pathname, reset, data);
    console.log(data);
  }

  function checkText() {
    if (location.pathname === '/signin') return 'Sign In ';
    if (location.pathname === '/signup') return 'Sign Up ';
  }

  function showHidePassord() {
    show ? setShow(false) : setShow(true);
  }

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
        <Typography variant="h4">{checkText() + 'to ...'}</Typography>
        <form
          className="form"
          onSubmit={handleSubmit((data) => {
            checkUser(data);
          })}
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
                  value: /^.{8,}$/i,
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
          <Button variant="contained" color="success" type="submit">
            {checkText()}
          </Button>
        </form>
      </Box>
    </Container>
  );
};
