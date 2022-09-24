import "./NavbarModal.css"
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import CustomInput from "../Forms/CustomInput";
import {FormHelperText, InputAdornment} from "@mui/material";
import SubmitButton from "../Forms/SubmitButton";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import {useState} from "react";
import AccountCircle from '@mui/icons-material/AccountCircle';
import Divider from "@mui/material/Divider";
import useUser from "../CustomHooks/UseUser";
import {logInToLFM} from "../../helpers/AxiosHelper";

const NavbarModal = ({open, handleClose}) => {
    const [showPassword, setShowPassword] = useState(false)
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const {setUser} = useUser()
    const handleClickShowPassword = () => {setShowPassword(!showPassword)}
    const handleMouseDownPassword = (event) => {event.preventDefault()}
    const handleUserEmailInput = (event) => {setUserEmail(event.target.value)}
    const handleUserPasswordInput = (event) => {setUserPassword(event.target.value)}

    const validateEmail = () => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!userEmail || userEmail.length === 0) {
            setEmailError("El campo no puede estar vacío")
            return false
        }
        if (!re.test(String(userEmail).toLowerCase())) {
            setEmailError("El formato del email es incorrecto")
            return false
        }
        setEmailError("")
        return true
    }

    const validatePassword = () => {
        if (!userPassword || userPassword.length === 0) {
            setPasswordError("El campo no puede estar vacío")
            return false
        }
        return true
    }

    const logInIfValid = (isEmailValid, isPasswordValid) => {
        if (!isEmailValid || !isPasswordValid) return
        logInToLFM(userEmail, userPassword)
        .then(
            response => {
                setUser(response.data)
                sessionStorage.setItem('user', JSON.stringify(response.data))
                handleClose()
            }
        ).catch(
            error => {
                if (error.response.status === 404) {
                    setEmailError("Credencial inválida")
                    setPasswordError("Credencial inválida")
                }
            }
        )
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const isEmailValid = validateEmail()
        const isPasswordValid = validatePassword()
        logInIfValid(isEmailValid, isPasswordValid)
    };

    const passwordAdornment = <InputAdornment position="end">
        <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            edge="end"
        >
            {showPassword ? <VisibilityOff/> : <Visibility/>}
        </IconButton>
    </InputAdornment>

    return <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Card className="FormCard">
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Grid container direction="column" alignItems="center">
                        <Grid item>
                            <p className="FormTitle">Ingresá tus credenciales</p>
                            <Divider/>
                        </Grid>
                        <CustomInput
                            inputLabel="Usuario"
                            selectedValue={userEmail}
                            handleSelectedValueCallback={handleUserEmailInput}
                            isEndAdornment={true}
                            adornment={<InputAdornment position="end"><AccountCircle/></InputAdornment>}
                            hasError={emailError}
                        />
                        {emailError && <FormHelperText id="component-error-text">{emailError}</FormHelperText>}
                        <CustomInput
                            inputLabel="Contraseña"
                            selectedValue={userPassword}
                            handleSelectedValueCallback={handleUserPasswordInput}
                            isEndAdornment={true}
                            adornment={passwordAdornment}
                            inputType={showPassword ? 'text' : 'password'}
                            hasError={passwordError}
                        />
                        {passwordError && <FormHelperText id="component-error-text">{passwordError}</FormHelperText>}
                        <SubmitButton label={"Ingresar"}/>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    </Modal>
}

export default NavbarModal