/* import { Link } from 'react-router-dom';
import ProfileComponent from './ProfileComponent';

export default function Navbar() {
    return (
        <nav>
        <Link to="/"> Home </Link>
        <Link to="/register"> Register </Link>
        <Link to="/login"> Login </Link>
        <Link to="/dashboard"> Dashboard </Link>
        <ProfileComponent />
        

        </nav>
    );
} */

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import LogoutButton from './LogoutButton';

const pages = [
  {  
    name: 'Dashboard',
    destination: '/dashboard',
    visibility: ['operator', 'admin']
  },
  {
    name: 'Statistics',
    destination: '/stats',
    visibility: ['operator', 'admin']
  },
  {
    name: 'Control Panel',
    destination: '/admin',
    visibility: ['admin']
  }
];
  
const settings = [
  {
    name: 'Account',
    destination: '/profilesettings'
  }
];

export default function Navbar() {
  
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const {user} = React.useContext(UserContext);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  if (user) {
    return (
        <AppBar position="static" sx={{backgroundColor: 'rgb(21 94 117)'}}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                <Link to="/">Kaizen Audit</Link>
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
                  {pages.map((page) => (
                    page.visibility.includes(user.account.role) && (<Link key={page.name} to={page.destination}>
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">
                          {page.name}
                        </Typography>
                      </MenuItem>
                    </Link>)
                  ))}
                </Menu>
              </Box>
              <Typography
                variant="h5"
                noWrap
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
                <Link to="/">Kaizen Audit</Link>
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  // Check if the page should be visible to the user
                  page.visibility.includes(user.account.role) && (
                    <Link key={page.name} to={page.destination}>
                      <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                        {page.name}
                      </Button>
                    </Link>
                  )
                ))}
              </Box>
            
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user.account.name} src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <Link key={setting.name} to={setting.destination}>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">
                          {setting.name}
                        </Typography>
                      </MenuItem>
                    </Link>
                  ))}
                    <MenuItem onClick={handleCloseUserMenu}>
                      <LogoutButton />
                    </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      );
  }
  else {
    return null;
  }
}