import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Logo from '../../resources/named-logo.png'
import {Link} from "react-router-dom";
import SignInUpAvatar from "./SignInUpAvatar";
import useUser from "../CustomHooks/UseUser";

const pages = [
    {button: 'Dashboard', link: '/dashboard'},
    {button: 'Simular Plazo Fijo', link: '/plazosFijos'},
    {button: 'Opciones de inversión', link: '/opciones'}
];

const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const {user} = useUser()

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static" sx={{backgroundColor: '#5086c1'}}>
            <Container maxWidth="xxl">
                <Toolbar disableGutters>
                    <Link to='/'>
                        <img src={Logo} alt="Llegar a fin de mes logo" style={{height: '50px'}}/>
                    </Link>
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
                            anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                            keepMounted
                            transformOrigin={{vertical: 'top', horizontal: 'left'}}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{display: { xs: 'block', md: 'none' }}}
                        >
                            {user && pages.map((page) => (
                                <Link to={page.link} key={page.link} data-testid={`${page.link}-min`}>
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page.button}</Typography>
                                    </MenuItem>
                                </Link>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, marginLeft: 5 }}>
                        {user && pages.map((page) => (
                            <Link to={page.link} key={page.link} data-testid={`${page.link}-max`}>
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page.button}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    <SignInUpAvatar/>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Navbar;