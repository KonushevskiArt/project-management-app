import React from 'react';
import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';

export const WelcomPage = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth={false}
      sx={{
        height: '50px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        marginTop: '10px',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        {!Cookies.get('token') ? (
          <Box>
            <Button
              variant="contained"
              color="inherit"
              size="small"
              sx={{ marginRight: '10px', color: 'black' }}
              onClick={() => {
                navigate('/signin');
              }}
            >
              Sign In
            </Button>
            <Button
              variant="contained"
              color="inherit"
              size="small"
              sx={{ color: 'black' }}
              onClick={() => {
                navigate('/signup');
              }}
            >
              Sign Up
            </Button>
          </Box>
        ) : (
          <Button
            variant="contained"
            color="inherit"
            size="small"
            sx={{ color: 'black' }}
            onClick={() => {
              navigate('/');
            }}
          >
            Go to main page
          </Button>
        )}
      </Box>
    </Container>
  );
};
