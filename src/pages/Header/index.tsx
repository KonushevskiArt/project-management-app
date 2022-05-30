import React, { useContext, useState } from 'react';
import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import { AppContext } from 'App/context';
import s from './style.module.scss';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import LanguageSwitcher from 'components/LanguageSwitcher';
import { useLanguage } from 'hooks/useLanguage';
import { ITEXT } from 'pages/Main';
import languageContext from 'contexts/language-context';
import { BurgerMenu } from './menu/burger';
import useMediaQuery from '@mui/material/useMediaQuery';

export const TEXT_MAIN_PAGE: Readonly<ITEXT> = {
  edit: {
    en: 'Edit profile',
    ru: 'Редактировать профиль',
  },
  out: {
    en: 'Sign Out',
    ru: 'Выйти',
  },
  newBoard: {
    en: 'Create new board',
    ru: 'Создать новую доску',
  },
};

export const Header = () => {
  const navigate = useNavigate();
  const [scroll, setScroll] = useState(false);
  const appContext = useContext(AppContext);
  const lang = useLanguage();
  const { setLang } = useContext(languageContext);
  const matches = useMediaQuery('(min-width:700px)');

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

  const signOut = () => {
    setLang('en');
    Cookies.remove('token', { path: '' });
    localStorage.removeItem('user');
    appContext.dispatch({ type: 'setLogInSucsess', payload: false });
    navigate('/welcome');
  };

  const checkDisplay = () => {
    if (matches) return 'flex';
    return 'none';
  };
  if (location.pathname === '/welcome') return <></>;
  return (
    <>
      <Container
        maxWidth={false}
        style={style()}
        sx={{
          bgcolor: '#3f51b5',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          top: 0,
        }}
      >
        <LanguageSwitcher />
        <BurgerMenu signOut={signOut} />
        <Box display={checkDisplay}>
          <Button
            variant="contained"
            color="inherit"
            size="small"
            sx={{ marginRight: '10px', color: 'black' }}
            onClick={() => {
              navigate('/update');
            }}
          >
            {TEXT_MAIN_PAGE.edit[lang]}
          </Button>
          <Button
            variant="contained"
            color="inherit"
            size="small"
            sx={{ marginRight: '10px', color: 'black' }}
            onClick={signOut}
          >
            {TEXT_MAIN_PAGE.out[lang]}
          </Button>
          <Button
            variant="contained"
            color="inherit"
            size="small"
            sx={{ marginRight: '10px', color: 'black' }}
            onClick={() => {
              appContext.setCreatingNewBoard(true);
              navigate('/');
            }}
          >
            {TEXT_MAIN_PAGE.newBoard[lang]}
          </Button>
          <Link to="/welcome">
            <button className={s.toHome}>
              <HomeIcon fontSize="large" />
            </button>
          </Link>
        </Box>
      </Container>
    </>
  );
};
