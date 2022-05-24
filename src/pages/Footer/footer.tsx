import { Box, Container, Typography } from '@mui/material';
import Logo from './img/rs_school_js.svg';
import githubLogo from './img/github-black.png';
import './style.css';

export const Footer = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        bgcolor: '#3f51b5',
        height: '50px',
        marginTop: '25px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <a href="https://rs.school/react/">
          <img src={Logo} alt="12" height="40px" />
        </a>
      </Box>
      <Box sx={{ display: 'flex', width: '40%', justifyContent: 'space-around' }}>
        <a className="footer-author-link" href="https://github.com/Cigaro">
          <img src={githubLogo} alt="" style={{ marginRight: '10px' }} />
          Dzmitry
        </a>
        <a className="footer-author-link" href="https://github.com/KonushevskiArt">
          <img src={githubLogo} alt="" style={{ marginRight: '10px' }} />
          Artem
        </a>
        <a className="footer-author-link" href="https://github.com/Arthur-Ming">
          <img src={githubLogo} alt="" style={{ marginRight: '10px' }} />
          Arthur
        </a>
      </Box>
      <Typography fontSize="32px" fontWeight={700}>
        2022
      </Typography>
    </Container>
  );
};
