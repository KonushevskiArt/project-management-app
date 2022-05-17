import React, { useState } from 'react';
import { Box, Switch, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';

export const Header = () => {
  const navigate = useNavigate();
  const [scroll, setScroll] = useState(false);
  const [checked, setChecked] = useState(true);

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
          position: 'fixed',
          top: 0,
        }}
      >
        {Cookies.get('token') && (
          <Box sx={{ display: 'flex' }}>
            <Button
              variant="contained"
              color="inherit"
              size="small"
              sx={{ marginRight: '10px' }}
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
              sx={{ marginRight: '10px' }}
              onClick={signOut}
            >
              Sign Out
            </Button>
            <Button variant="contained" color="inherit" size="small" sx={{ marginRight: '10px' }}>
              Create new board
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography color={switchColor('ru')}>Ru</Typography>
              <Switch checked={checked} onChange={handleChange} name="lang" color="default" />
              <Typography color={switchColor('en')}>En</Typography>
            </Box>
          </Box>
        )}
      </Container>
    </>
  );
};
