import { Box, Button, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';
import { UserData } from './iterfaces';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './style.css';
import { AppContext } from 'App/context';
import CircularProgress from '@mui/material/CircularProgress';
import { AuthService } from 'utils/services/Auth.service';
import Cookies from 'js-cookie';
import { IUser, IUserResponse, IUserSignIn, IUserUpdate } from 'interfaces';
import { UserService } from 'utils/services/User.service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Delete } from './deleteButton';

export const notify = (name: string) =>
  toast.success(name, {
    position: 'top-left',
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

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
  const navigate = useNavigate();
  const [notFound, setNotFound] = useState(false);
  const [LogInProces, setLogInProces] = useState(false);
  const [userIsExist, setUserIsExist] = useState(false);
  const [height, setHeight] = useState('calc(100vh - 110px)');

  function checkUser(data: IUser | IUserSignIn | IUserUpdate) {
    setLogInProces(true);
    if (location.pathname === '/signin') {
      AuthService.signIn(data as IUserSignIn)
        .then(function (response) {
          const in23Hours = new Date(new Date().getTime() + 23 * 60 * 60 * 1000);
          Cookies.set('token', response.token, { expires: in23Hours });
          localStorage.setItem('user', data.login);
          appContext.dispatch({ type: 'setLogInSucsess', payload: true });
          navigate('/');
        })
        .catch(function (error) {
          if (error.response) {
            if (error.response.status === 403) {
              setLogInProces(false);
              setNotFound(true);
            }
          }
        });
    }
    if (location.pathname === '/signup') {
      AuthService.signUp(data as IUser)
        .then(function () {
          notify('Registration was successful');
          setTimeout(() => {
            reset();
            setLogInProces(false);
            navigate('/signin');
          }, 1000);
        })
        .catch(function (error) {
          if (error.response) {
            if (error.response.status === 409) {
              setLogInProces(false);
              setUserIsExist(true);
            }
          }
        });
    }
    if (location.pathname === '/update') {
      setLogInProces(true);
      UserService.getAll().then(function (response) {
        response.map((item: IUserResponse) => {
          if (item.login === localStorage.getItem('user')) {
            UserService.updateUserById(item.id, data as IUserUpdate).then(function () {
              localStorage.setItem('user', data.login);
              setLogInProces(false);
              notify('Updated successfully');
              reset();
            });
          }
        });
      });
    }
  }

  function checkText() {
    if (location.pathname === '/signin') return 'Sign In ';
    if (location.pathname === '/signup') return 'Sign Up ';
  }
  function chechHeight() {
    if (location.pathname === '/signin') return 'calc(100vh - 75px)';
    if (location.pathname === '/signup') return 'calc(100vh - 75px)';
    if (location.pathname === '/update') return 'calc(100vh - 135px)';
  }
  function showHidePassord() {
    show ? setShow(false) : setShow(true);
  }

  const But = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%',
        }}
      >
        <Button
          variant="contained"
          color="inherit"
          sx={{
            color: 'black',
            marginTop: '10px',
            marginRight: '10px',
          }}
          onClick={() => {
            navigate('/welcome');
          }}
        >
          Welcome Page
        </Button>
      </Box>
    );
  };

  return (
    <Box height={chechHeight()}>
      {location.pathname === '/signin' && <But />}
      {location.pathname === '/signup' && <But />}
      {location.pathname === '/update' && <Delete />}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '20vh',
        }}
      >
        <Typography variant="h4">
          {location.pathname === '/update' ? 'Update User' : checkText() + 'to App'}
        </Typography>
        <form
          onChange={() => {
            setNotFound(false);
            setUserIsExist(false);
          }}
          className="form"
          onSubmit={handleSubmit((data) => {
            checkUser(data);
          })}
        >
          {(location.pathname === '/signup' || location.pathname === '/update') && (
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
              <VisibilityOff className="icon" onClick={showHidePassord} color="action" />
            ) : (
              <Visibility className="icon" onClick={showHidePassord} color="action" />
            )}
            {errors?.password && <p className="error-text">{errors.password.message}</p>}
          </Box>
          {notFound && (
            <Typography color="red" sx={{ marginTop: '-16px' }}>
              Wrong data
            </Typography>
          )}
          {userIsExist && (
            <Typography color="red" sx={{ marginTop: '-16px' }}>
              User exist
            </Typography>
          )}
          <Button variant="contained" color="success" type="submit">
            {LogInProces ? (
              <CircularProgress color="info" size="24px" />
            ) : location.pathname === '/update' ? (
              'Update'
            ) : (
              checkText()
            )}
          </Button>
        </form>
      </Box>
    </Box>
  );
};
