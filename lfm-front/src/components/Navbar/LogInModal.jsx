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
import Divider from "@mui/material/Divider";
import useUser from "../CustomHooks/UseUser";
import {logInToLFM} from "../../helpers/AxiosHelper";
import Utils from "../../helpers/Utils";

const LogInModal = ({open, handleClose}) => {
    const [showPassword, setShowPassword] = useState(false)
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const {setUser} = useUser()
    const handleClickShowPassword = () => {setShowPassword(!showPassword)}
    const handleMouseDownPassword = (event) => {event.preventDefault()}

    const logIn = () => {
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
        const isEmailValid = Utils.validateEmail(userEmail, setEmailError)
        const isPasswordValid = Utils.validateNotEmpty(userPassword, setPasswordError)
        isEmailValid && isPasswordValid && logIn()
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
                            inputLabel="Ingrese su email"
                            selectedValue={userEmail}
                            handleSelectedValueCallback={e => setUserEmail(e.target.value)}
                            isEndAdornment={true}
                            adornment={<InputAdornment position="end"><EmailIcon/></InputAdornment>}
                            hasError={emailError}
                            dataTestId={"Log-in-email"}
                        />
                        <CustomInput
                            inputLabel="Ingrese su contraseña"
                            selectedValue={userPassword}
                            handleSelectedValueCallback={e => setUserPassword(e.target.value)}
                            isEndAdornment={true}
                            adornment={passwordAdornment}
                            inputType={showPassword ? 'text' : 'password'}
                            hasError={passwordError}
                            dataTestId={"Log-in-password"}
                        />
                        <SubmitButton label={"Ingresar"} dataTestId={"Log-in-button"}/>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    </Modal>
}

export default LogInModal