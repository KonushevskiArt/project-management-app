import { Box, Container, Typography } from '@mui/material';
import Logo from './img/rs_school_js.svg';
import githubLogo from './img/github-black.png';
import './style.css';

export const Footer = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        height: '25px',
        marginTop: '25px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <a href="https://rs.school/react/">
          <img src={Logo} alt="12" height="25px" />
        </a>
      </Box>
      <Box sx={{ display: 'flex', width: '40%', justifyContent: 'space-around' }}>
        <a className="footer-author-link" href="https://github.com/Cigaro">
          <img src={githubLogo} alt="" className="footer-author-img" />
          Dzmitry
        </a>
        <a className="footer-author-link" href="https://github.com/KonushevskiArt">
          <img src={githubLogo} alt="" className="footer-author-img" />
          Artem
        </a>
        <a className="footer-author-link" href="https://github.com/Arthur-Ming">
          <img src={githubLogo} alt="" className="footer-author-img" />
          Arthur
        </a>
      </Box>
      <Typography fontSize="16px" fontWeight={400}>
        2022
      </Typography>
    </Container>
  );
};
