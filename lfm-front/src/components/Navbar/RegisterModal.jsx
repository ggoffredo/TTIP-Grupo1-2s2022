import "./NavbarModal.css"
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import CustomInput from "../Forms/CustomInput";
import InputAdornment from "@mui/material/InputAdornment";
import SubmitButton from "../Forms/SubmitButton";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import {useState} from "react";
import EmailIcon from '@mui/icons-material/Email';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import Divider from "@mui/material/Divider";
import {registerToLFM} from "../../helpers/AxiosHelper";
import Utils from "../../helpers/Utils";

const RegisterModal = ({open, handleClose}) => {
    const [showPassword, setShowPassword] = useState(false)
    const [registerSuccessful, setRegisterSuccessful] = useState(false)
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [userName, setUserName] = useState("")
    const [userLastName, setUserLastName] = useState("")
    const [userNameError, setUserNameError] = useState("")
    const [userLastNameError, setUserLastNameError] = useState("")
    const handleClickShowPassword = () => {setShowPassword(!showPassword)}
    const handleMouseDownPassword = (event) => {event.preventDefault()}

    const register = () => {
        registerToLFM(userName, userLastName, userEmail, userPassword)
        .then(() => setRegisterSuccessful(true))
        .catch(
            error => {
                if (error.response.status === 403) {
                    setEmailError("Ya existe un usuario con este email")
                }
            }
        )
    }

    const areInputsValid = () => {
        const isEmailValid = Utils.validateEmail(userEmail, setEmailError)
        const isPasswordValid = Utils.validateNotEmpty(userPassword, setPasswordError)
        const isUserNameValid = Utils.validateNotEmpty(userName, setUserNameError)
        const isUserLastnameValid = Utils.validateNotEmpty(userLastName, setUserLastNameError)
        return isEmailValid && isPasswordValid && isUserNameValid && isUserLastnameValid
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        areInputsValid() && register()
    }

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
                            <p className="FormTitle">Ingresá tus datos</p>
                            <Divider/>
                        </Grid>
                        <CustomInput
                            inputLabel="Ingrese su nombre"
                            selectedValue={userName}
                            handleSelectedValueCallback={e => setUserName(e.target.value)}
                            isEndAdornment={true}
                            adornment={<InputAdornment position="end"><PermIdentityIcon/></InputAdornment>}
                            hasError={userNameError}
                            dataTestId={"Register-name"}
                        />
                        <CustomInput
                            inputLabel="Ingrese su apellido"
                            selectedValue={userLastName}
                            handleSelectedValueCallback={e => setUserLastName(e.target.value)}
                            isEndAdornment={true}
                            adornment={<InputAdornment position="end"><PermIdentityIcon/></InputAdornment>}
                            hasError={userLastNameError}
                            dataTestId={"Register-lastname"}
                        />
                        <CustomInput
                            inputLabel="Ingrese su email"
                            selectedValue={userEmail}
                            handleSelectedValueCallback={e => setUserEmail(e.target.value)}
                            isEndAdornment={true}
                            adornment={<InputAdornment position="end"><EmailIcon/></InputAdornment>}
                            hasError={emailError}
                            dataTestId={"Register-email"}
                        />
                        <CustomInput
                            inputLabel="Ingrese su contraseña"
                            selectedValue={userPassword}
                            handleSelectedValueCallback={e => setUserPassword(e.target.value)}
                            isEndAdornment={true}
                            adornment={passwordAdornment}
                            inputType={showPassword ? 'text' : 'password'}
                            hasError={passwordError}
                            dataTestId={"Register-password"}
                        />
                        {
                            registerSuccessful
                                ? <SubmitButton color="success" variantType="contained" label="Registro Exitoso" dataTestId={"Register-button"}/>
                                : <SubmitButton label="Registrar" dataTestId={"Register-button"}/>
                        }
                    </Grid>
                </form>
            </CardContent>
        </Card>
    </Modal>
}

export default RegisterModal