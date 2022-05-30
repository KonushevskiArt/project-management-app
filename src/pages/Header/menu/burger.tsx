import { Box, Button, Collapse } from '@mui/material';
import { useContext, useState } from 'react';
import './style.css';
import { TEXT_MAIN_PAGE } from '../index';
import { useLanguage } from 'hooks/useLanguage';
import { useNavigate } from 'react-router';
import { AppContext } from 'App/context';

interface Props {
  signOut: () => void;
}

export const BurgerMenu = ({ signOut }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const lang = useLanguage();
  const navigate = useNavigate();
  const appContext = useContext(AppContext);

  const handleCloseOpen = () => {
    return setIsOpen(!isOpen);
  };
  function myFunction(x: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const elem = x.target as HTMLDivElement;
    if (!elem.classList.contains('container')) {
      const tr = elem.parentElement as HTMLDivElement;
      tr.classList.toggle('change');
    }
    elem.classList.toggle('change');
  }

  const icon = (
    <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '6px' }}>
      <Button
        onClick={() => {
          navigate('/update');
        }}
        sx={{
          color: 'white',
          ':hover': { backgroundColor: '#4c94bd' },
          zIndex: '1000',
        }}
      >
        {TEXT_MAIN_PAGE.edit[lang]}
      </Button>
      <Button
        onClick={signOut}
        sx={{ color: 'white', zIndex: '1000', ':hover': { backgroundColor: '#4c94bd' } }}
      >
        {TEXT_MAIN_PAGE.out[lang]}
      </Button>
      <Button
        onClick={() => {
          appContext.setCreatingNewBoard(true);
          navigate('/');
        }}
        sx={{ color: 'white', zIndex: '1000', ':hover': { backgroundColor: '#4c94bd' } }}
      >
        {TEXT_MAIN_PAGE.newBoard[lang]}
      </Button>
    </Box>
  );

  return (
    <Box className="menu">
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginRight: '10px' }}>
        <div
          className="container"
          onClick={(e) => {
            e.stopPropagation();
            myFunction(e);
            handleCloseOpen();
          }}
        >
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
      </Box>
      <Collapse in={isOpen}>{icon}</Collapse>
    </Box>
  );
};
