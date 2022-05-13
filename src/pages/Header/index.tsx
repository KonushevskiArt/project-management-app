import React from 'react';
import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth={false}
      sx={{
        bgcolor: '#3f51b5',
        height: '50px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
    >
      {!Cookies.get('token') ? (
        <Box>
          <Button
            variant="contained"
            color="inherit"
            size="small"
            sx={{ marginRight: '10px' }}
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
          onClick={() => {
            navigate('/');
          }}
        >
          Go to main page
        </Button>
      )}
    </Container>
  );
};
