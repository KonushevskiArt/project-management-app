import { Box, Button, Container, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router';
import { UserData } from '../LogIn/iterfaces';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import '../LogIn/style.css';
import { AppContext } from 'App/context';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface UpdateUser {
  id: string;
  login: string;
  password: string;
}

export const UpdateUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>({
    mode: 'all',
  });
  const [show, setShow] = useState(false);
  const location = useLocation();
  const appContext = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const notify = () =>
    toast.success('Success', {
      position: 'top-left',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  function checkUser(data: UserData) {
    const baseUrl = 'https://pure-cove-88107.herokuapp.com';
    axios({
      method: 'get',
      url: `${baseUrl}/users`,
      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
    }).then(function (response) {
      console.log(response);
      response.data.map((item: UpdateUser) => {
        if (item.login === localStorage.getItem('user')) {
          axios({
            method: 'put',
            url: `${baseUrl}/users/${item.id}`,
            headers: { Authorization: `Bearer ${Cookies.get('token')}` },
            data: data,
          }).then(function (response) {
            localStorage.setItem('user', data.login);
            setLoading(false);
            notify();
            console.log(response);
          });
        }
      });
    });
    setLoading(true);
  }

  function showHidePassord() {
    show ? setShow(false) : setShow(true);
  }

  return (
    <Container>
      <ToastContainer />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Typography variant="h4">Update User Data</Typography>
        <form
          className="form"
          onSubmit={handleSubmit((data) => {
            checkUser(data);
          })}
        >
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
          <Button variant="contained" color="success" type="submit">
            {appContext.state.logInProces ? <CircularProgress color="info" /> : 'Update'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};
