import React from 'react';
import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router';
import { ITEXT } from 'pages/Main';
import { useLanguage } from 'hooks/useLanguage';

const TEXT_MAIN_PAGE: Readonly<ITEXT> = {
  text: {
    en: 'Page not found!',
    ru: 'Страница не найдена',
  },
};

export const ErrorPage = () => {
  const navigate = useNavigate();
  const lang = useLanguage();

  setTimeout(() => {
    navigate('/welcome');
  }, 1500);

  return (
    <Container
      maxWidth={false}
      sx={{
        bgcolor: '#f8f8d9',
        height: '50vh',
        width: '50vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
    >
      <Container
        className="error-text"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={{ fontSize: '5rem' }}>404</Box>
        <Box>{TEXT_MAIN_PAGE.text[lang]}</Box>
      </Container>
    </Container>
  );
};
