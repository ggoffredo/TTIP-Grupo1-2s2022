import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import React, {useState} from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useUser from "../CustomHooks/UseUser";
import NavbarModal from "./NavbarModal";

const SignInUpAvatar = () => {
    const [anchorElUser, setAnchorElUser] = useState(null)
    const [logInOpen, setLogInOpen] = useState(false)
    const {user, setUser} = useUser()

    const handleOpenUserMenu = (event) => {setAnchorElUser(event.currentTarget)}
    const handleCloseUserMenu = () => {setAnchorElUser(null)}
    const handleOpenCloseLogIn = () => {setLogInOpen(!logInOpen)}
    const handleLogOut = () => {
        sessionStorage.setItem('user', null)
        setUser(null)
        handleCloseUserMenu()
    }
    const settings = [
        {
            name: 'Opción 1',
            action: handleCloseUserMenu
        },
        {
            name: 'Opción 2',
            action: handleCloseUserMenu
        },
        {
            name: 'Cerrar Sesión',
            action: handleLogOut
        },
    ];

    const buttons = <>
        <Button
            variant="contained"
            color="info"
            size="large"
            type="submit"
            onClick={handleOpenCloseLogIn}
        > Ingresar </Button>
        <Button
            variant="contained"
            color="secondary"
            size="large"
            type="submit"
            disabled
        > Registrarse </Button>
    </>
    return <Box sx={{ flexGrow: 0 }}>
        {user
            ? <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user.nombre} src="/static/images/avatar/2.jpg" />
                </IconButton>
            </Tooltip>
            : buttons
        }
        <NavbarModal open={logInOpen} handleClose={handleOpenCloseLogIn}/>
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
                <MenuItem key={setting.name} onClick={setting.action}>
                    <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
            ))}
        </Menu>
    </Box>
}

export default SignInUpAvatar