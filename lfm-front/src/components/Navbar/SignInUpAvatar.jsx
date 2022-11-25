import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import {useState} from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useUser from "../CustomHooks/UseUser";
import LogInModal from "./LogInModal";
import RegisterModal from "./RegisterModal";

const SignInUpAvatar = () => {
    const [anchorElUser, setAnchorElUser] = useState(null)
    const [logInOpen, setLogInOpen] = useState(false)
    const [registerOpen, setRegisterOpen] = useState(false)
    const {user, setUser} = useUser()

    const handleOpenUserMenu = (event) => {setAnchorElUser(event.currentTarget)}
    const handleCloseUserMenu = () => {setAnchorElUser(null)}
    const handleOpenCloseLogIn = () => {setLogInOpen(!logInOpen)}
    const handleOpenCloseRegister = () => {setRegisterOpen(!registerOpen)}
    const handleLogOut = () => {
        sessionStorage.setItem('user', null)
        setUser(null)
        handleCloseUserMenu()
    }
    const settings = [
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
            color="primary"
            size="large"
            type="submit"
            onClick={handleOpenCloseRegister}
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
        <LogInModal open={logInOpen} handleClose={handleOpenCloseLogIn}/>
        <RegisterModal open={registerOpen} handleClose={handleOpenCloseRegister}/>
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