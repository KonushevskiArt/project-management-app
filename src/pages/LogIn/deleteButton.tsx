import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { IUserResponse } from 'interfaces';
import Cookies from 'js-cookie';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { UserService } from 'utils/services/User.service';
import { notify } from '.';
import { AppContext } from 'App/context';
import './style.css';
import { useLanguage } from 'hooks/useLanguage';
import { ITEXT } from 'pages/Main';

const TEXT_MAIN_PAGE: Readonly<ITEXT> = {
  text: {
    en: 'Are you sure you want to delete the user?',
    ru: 'Вы уверены что хотите удалить пользователя?',
  },
  button: {
    en: 'Delete User',
    ru: 'Удалить пользователя',
  },
};

export const Delete = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const appContext = useContext(AppContext);
  const [progress, setProgress] = useState(false);
  const lang = useLanguage();

  const deleteUser = () => {
    setProgress(true);
    UserService.getAll().then(function (response) {
      response.map((item: IUserResponse) => {
        if (item.login === localStorage.getItem('user')) {
          UserService.deleteUserById(item.id).then(function () {
            setTimeout(() => {
              Cookies.remove('token', { path: '' });
              localStorage.removeItem('user');
              appContext.dispatch({ type: 'setLogInSucsess', payload: false });
              navigate('/welcome');
            }, 1500);
            setProgress(false);
            notify('User deleted');
          });
        }
      });
    });
  };

  return (
    <>
      <Box
        sx={{ display: 'flex', justifyContent: 'flex-end', marginRight: '10px', marginTop: '10px' }}
      >
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          {TEXT_MAIN_PAGE.button[lang]}
        </Button>
      </Box>
      {isOpen && (
        <div
          className="modalOverlay"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <div className="modalWindow">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 1000 1000"
              enableBackground="new 0 0 1000 1000"
              xmlSpace="preserve"
              className="close-modal-window"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
              <g>
                <path d="M500,990C229.8,990,10,770.2,10,500S229.8,10,500,10s490,219.8,490,490S770.2,990,500,990z M500,80.3C268.6,80.3,80.3,268.6,80.3,500c0,231.4,188.3,419.7,419.7,419.7c231.4,0,419.7-188.3,419.7-419.7C919.7,268.6,731.4,80.3,500,80.3z" />
                <path d="M549.3,501.5l151.3-149.7c13.8-13.6,13.9-35.7,0.3-49.5c-13.6-13.8-35.8-13.9-49.5-0.3L499.9,451.9L350.6,302.2c-13.7-13.7-35.8-13.8-49.5-0.1c-13.7,13.6-13.7,35.8-0.1,49.5l149,149.5L299.8,649.8c-13.8,13.6-13.9,35.7-0.3,49.5c6.9,6.9,15.9,10.4,24.9,10.4c8.9,0,17.8-3.4,24.6-10.1l150.5-148.8l151.7,152.2c6.8,6.9,15.8,10.3,24.8,10.3c9,0,17.9-3.4,24.7-10.2c13.7-13.7,13.7-35.8,0.1-49.5L549.3,501.5z" />
              </g>
            </svg>
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="modal-content"
              style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography
                  variant="h6"
                  color="#364765"
                  textAlign="center"
                  sx={{ marginBottom: '10px', maxWidth: '75%' }}
                >
                  {TEXT_MAIN_PAGE.text[lang]}
                </Typography>
                <Button variant="contained" color="error" onClick={deleteUser}>
                  {progress ? (
                    <CircularProgress color="info" />
                  ) : (
                    TEXT_MAIN_PAGE.button[lang].split(' ')[0]
                  )}
                </Button>
              </Box>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
