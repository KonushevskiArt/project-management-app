import React from 'react';
import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router';

export const ErrorPage = () => {
  const navigate = useNavigate();
  setTimeout(() => {
    navigate('/');
  }, 3000);
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
        <Box>Page not found!</Box>
      </Container>
    </Container>
  );
};
