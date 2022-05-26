import React, { useContext, useState } from 'react';
import { Box, Switch, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import { AppContext } from 'App/context';
import s from './style.module.scss';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import LanguageSwitcher from 'components/LanguageSwitcher';

export const Header = () => {
  const navigate = useNavigate();
  const [scroll, setScroll] = useState(false);
  const [checked, setChecked] = useState(true);
  const appContext = useContext(AppContext);

  window.onscroll = function () {
    if (window.pageYOffset > 0) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  const style = () => {
    const scrollStyle: React.CSSProperties = {
      boxShadow: '0px 5px 10px 2px rgba(34, 60, 80, 0.5)',
      transitionProperty: 'box-shadow',
      transition: 'ease-in-out',
      transitionDuration: '0.3s',
      opacity: '0.9',
      zIndex: '10',
      position: 'fixed',
    };
    const fixStyle: React.CSSProperties = {
      boxShadow: 'none',
    };
    if (scroll) return scrollStyle;
    return fixStyle;
  };

  const handleChange = () => {
    setChecked(!checked);
  };

  const signOut = () => {
    Cookies.remove('token', { path: '' });
    localStorage.removeItem('user');
    appContext.dispatch({ type: 'setLogInSucsess', payload: false });
    navigate('/welcome');
  };

  const switchColor = (lang: string) => {
    if (checked && lang === 'en') return 'white';
    if (!checked && lang === 'ru') return 'white';
    return 'black';
  };

  return (
    <>
      <Container
        maxWidth={false}
        style={style()}
        sx={{
          bgcolor: '#3f51b5',
          height: '50px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          top: 0,
        }}
      >
        <LanguageSwitcher />
        {Cookies.get('token') && (
          <Box sx={{ display: 'flex' }}>
            <Button
              variant="contained"
              color="inherit"
              size="small"
              sx={{ marginRight: '10px', color: 'black' }}
              onClick={() => {
                navigate('/update');
              }}
            >
              Edit profile
            </Button>
            <Button
              variant="contained"
              color="inherit"
              size="small"
              sx={{ marginRight: '10px', color: 'black' }}
              onClick={signOut}
            >
              Sign Out
            </Button>
            <Button
              variant="contained"
              color="inherit"
              size="small"
              sx={{ marginRight: '10px', color: 'black' }}
              onClick={() => {
                navigate('/');
              }}
            >
              Create new board
            </Button>
            <Link to="/">
              <button className={s.toHome}>
                <HomeIcon fontSize="large" />
              </button>
            </Link>
            {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography color={switchColor('ru')}>Ru</Typography>
              <Switch checked={checked} onChange={handleChange} name="lang" color="default" />
              <Typography color={switchColor('en')}>En</Typography>
            </Box> */}
          </Box>
        )}
      </Container>
    </>
  );
};
