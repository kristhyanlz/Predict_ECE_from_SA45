import {useState, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { DarkModeOutlined as DarkModeIcon, LightMode as LightModeIcon } from '@mui/icons-material';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useColorScheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate, useLocation } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "@fontsource/roboto"

const BRAND_NAME = ''//'WisBrain';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});


const pages = [
  {text: 'Formulario', link:'/'},
  {text: 'CSV', link: '/csv'},
  {text: 'Resultados', link:'/Resultados'},
  
];

function Barra( {children}) {
  const location = useLocation();
  //Cambiar tema predeterminado light/dark
  const [currentTheme, setCurrentTheme] = useState('light');

  const [testEnable, setTestEnable] = useState(localStorage.getItem('testEnable'));

  useEffect(() => {
    console.log(`Test enable: ${testEnable}`)
  }, [])

  useEffect(() => {
    setTestEnable(localStorage.getItem('testEnable'))
    if (testEnable == null) {
      localStorage.setItem('testEnable', 'false')
      setTestEnable('false')
    }
  }, [location.pathname])

  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleClickPages = (link) => {
    handleCloseNavMenu()
    navigate(link)
  }

  //<ThemeProvider theme={darkTheme}>
  return (
    <ThemeProvider theme={ (currentTheme == 'dark') ? darkTheme: lightTheme
      }>
      <CssBaseline enableColorScheme/>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display:{xs: 'none', md:'flex'} }}>
            <VpnKeyIcon/>
          </Box>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 0,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {
              BRAND_NAME
              //Modo grande
            }
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {//Estrecho, flotante
                pages.map((ele) => {
                  const isActive = ele.link == location.pathname;
                let habilitar = true
                if (ele.link == '/Test' && testEnable == 'false')
                  habilitar = false
                else if (ele.link == '/FichaSociodemografica' && testEnable != 'false')
                  habilitar = false
                return habilitar ? (
                      <MenuItem key={ele.text} onClick={() => { handleClickPages(ele.link)}}>
                        <Typography textAlign="center" fontWeight={isActive?"bold":"regular"} fontSize={isActive?18:"default"}>{ele.text}</Typography>
                      </MenuItem>
                  ) : null
                })
              }
            </Menu>
          </Box>
          <Box sx={{ display: {xs:'flex', md:'none'} }}>
            <VpnKeyIcon/>
          </Box>
          <Typography
            variant="h5"
            noWrap
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {
              BRAND_NAME
              //Modo pequeño
            }
          </Typography>
          <Grid container justifyContent="center" alignItems="center" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {//Fullscreen
              pages.map((ele) => {
                const isActive = ele.link == location.pathname;
                let habilitar = true
                if (ele.link == '/Test' && testEnable == 'false')
                  habilitar = false
                else if (ele.link == '/FichaSociodemografica' && testEnable != 'false')
                  habilitar = false
                return habilitar ? (
                <Grid item key={ele.text} style={{textAlign: 'center'}}>
                  <Button
                    onClick={() => { handleClickPages(ele.link)}}
                    sx={{ my: 2, color: 'white', display: 'block', fontWeight:isActive?"bold":"regular", fontSize:isActive?18:'default'}}
                  >
                    {ele.text}
                  </Button>
                </Grid>
                ):null
              })
            }
          </Grid>
            
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Cambiar tema " >
              <IconButton sx={{ my: 2, marginLeft:5, color: 'white', display: 'block' }} onClick={ (event) => {
                if(currentTheme == 'dark'){
                  setCurrentTheme('light');
                }else{
                  setCurrentTheme('dark');
                }
              }}>
              {
                (currentTheme == 'dark') ? <LightModeIcon /> : <DarkModeIcon />
              }
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    {children}
    <ToastContainer />
    </ThemeProvider>
  );
}
export default Barra;