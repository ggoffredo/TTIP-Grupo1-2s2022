import {render} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import LogInModal from "../components/Navbar/LogInModal";
import useUser from "../components/CustomHooks/UseUser";

jest.mock('../components/CustomHooks/UseUser')

beforeEach(() => {
    useUser.mockImplementation(() => ({setUser: jest.fn()}));
});

test('Dado un usuario, cuando abre el log in, entonces visualiza email, password y el boton ingresar', () => {
    const {getByTestId} = render(<LogInModal open={true}/>)
    const emailInput = getByTestId("Log-in-email")
    const passwordInput = getByTestId("Log-in-password")
    const loginButton = getByTestId("Log-in-button")
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
});

test('Dado un usuario, cuando ingresa un mail con formato incorrecto, entonces dicho error aparece debajo del input', () => {
    const {getByTestId} = render(<LogInModal open={true}/>)
    const emailInput = getByTestId("Log-in-email")
    const loginButton = getByTestId("Log-in-button")
    userEvent.type(emailInput, 'someText')
    userEvent.click(loginButton)
    let emailErrorText = getByTestId("Log-in-email-helper-text")
    expect(emailErrorText.textContent).toBe("El formato del email es incorrecto")
});

test('Dado un usuario, cuando no ingresa email, entonces dicho error aparece debajo del input', () => {
    const {getByTestId} = render(<LogInModal open={true}/>)
    const passwordInput = getByTestId("Log-in-password")
    const loginButton = getByTestId("Log-in-button")
    userEvent.type(passwordInput, 'somePassword')
    userEvent.click(loginButton)
    let emailErrorText = getByTestId("Log-in-email-helper-text")
    expect(emailErrorText.textContent).toBe("El campo no puede estar vacío")
});

test('Dado un usuario, cuando ingresa mail correcto y no ingresa contraseña, entonces dicho error aparece debajo del input', () => {
    const {getByTestId, queryByTestId} = render(<LogInModal open={true}/>)
    const emailInput = getByTestId("Log-in-email")
    const loginButton = getByTestId("Log-in-button")
    userEvent.type(emailInput, 'some@email.com')
    userEvent.click(loginButton)
    let passwordErrorText = getByTestId("Log-in-password-helper-text")
    expect(passwordErrorText.textContent).toBe("El campo no puede estar vacío")
    expect(queryByTestId('Log-in-email-helper-text')).toBeNull()
});

test('Dado un usuario, cuando ingresa mail y contraseña correcto, entonces no aparecen errores', () => {
    const {getByTestId, queryByTestId} = render(<LogInModal open={true}/>)
    const emailInput = getByTestId("Log-in-email")
    const loginButton = getByTestId("Log-in-button")
    const passwordInput = getByTestId("Log-in-password")
    userEvent.type(emailInput, 'some@email.com')
    userEvent.type(passwordInput, 'somePassword')
    userEvent.click(loginButton)
    expect(queryByTestId('Log-in-email-helper-text')).toBeNull()
    expect(queryByTestId('Log-in-password-helper-text')).toBeNull()
});