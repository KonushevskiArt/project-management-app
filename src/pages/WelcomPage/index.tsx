import React from 'react';
import { Box, CardMedia, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import avatar from './img/f52741fb62bf1d821948a49204406bdc.jpg';
import { Webpack, Rest, Git, Ts, Js, Css, Chdev } from './img/index';

interface ParticipantI {
  name: string;
  type: string;
}

interface myListItemDataI {
  img: string;
  text: string;
}

const Participant = (data: ParticipantI) => {
  return (
    <Box sx={{ width: '23%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CardMedia
        component="img"
        image={avatar}
        alt="avater"
        height="150px"
        sx={{ borderRadius: '50%' }}
      />
      <Typography>{data.name}</Typography>
      <Typography color="#b3b6bd">[{data.type}]</Typography>
    </Box>
  );
};

const MyListItem = (data: myListItemDataI) => {
  return (
    <ListItem>
      <ListItemIcon sx={{ width: '25px', height: '25px' }}>
        <img src={data.img} alt="i" />
      </ListItemIcon>
      <ListItemText primary={data.text} />
    </ListItem>
  );
};

const myListItemData: Array<myListItemDataI> = [
  { img: Webpack, text: 'NPM, Webpack' },
  { img: Js, text: 'JavaScript' },
  { img: Ts, text: 'TypeScript' },
  { img: Rest, text: 'REST API' },
  { img: Css, text: 'CSS' },
  { img: Chdev, text: 'Chrome DevTools' },
  {
    img: Git,
    text: 'Git, GitHub (clone, add, commit, push, pull, merge, rebase, работа с Pull Request)',
  },
];

const participantData: Array<ParticipantI> = [
  { name: 'Yura', type: 'mentor' },
  { name: 'Artem', type: 'student' },
  { name: 'Dima', type: 'student' },
  { name: 'Arthur', type: 'student' },
];

export const WelcomPage = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth={false}
      sx={{
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {participantData.map((item: ParticipantI) => {
          return <Participant name={item.name} type={item.type} key={item.name} />;
        })}
      </Box>
      <Box
        sx={{
          maxWidth: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '40px',
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: '10px' }}>
          Система управления проектами
        </Typography>
        <Box>
          <Typography color="black" display="inline">
            Система управления проектами{' '}
          </Typography>
          <Typography display="inline">
            – приложение помогающее достичь поставленные задачи отдельному человеку в команде или
            группе разработчиков.
          </Typography>
        </Box>
        <Typography variant="h4" sx={{ marginTop: '30px', marginBottom: '10px' }}>
          RS School 2022Q1
        </Typography>
        <Typography>
          Курс предназначен для студентов RS School набора 2021Q3 , которые прошли RS School stage
          #2, а также для новых студентов, которые имеют знания и практический опыт использования
          следующих технологий и инструментов:
        </Typography>
        <Box sx={{ marginTop: '15px' }}>
          {myListItemData.map((item: myListItemDataI) => {
            return <MyListItem img={item.img} text={item.text} key={item.text} />;
          })}
        </Box>
      </Box>
    </Container>
  );
};
