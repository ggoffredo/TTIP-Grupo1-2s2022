import {render} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import useUser from "../components/CustomHooks/UseUser";
import RegisterModal from "../components/Navbar/RegisterModal";

jest.mock('../components/CustomHooks/UseUser')

beforeEach(() => {
    useUser.mockImplementation(() => ({setUser: jest.fn()}));
});

test('Dado un usuario, cuando abre el register, entonces visualiza nombre, apellido, email, password, y el boton ingresar', () => {
    const {getByTestId} = render(<RegisterModal open={true}/>)
    const nameInput = getByTestId("Register-name")
    const lastnameInput = getByTestId("Register-lastname")
    const emailInput = getByTestId("Register-email")
    const passwordInput = getByTestId("Register-password")
    const loginButton = getByTestId("Register-button")
    expect(nameInput).toBeInTheDocument();
    expect(lastnameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
});

test('Dado un usuario, cuando no ingresa datos en ningun input, entonces el mismo error aparece debajo de todos los inputs', () => {
    const {getByTestId} = render(<RegisterModal open={true}/>)
    const loginButton = getByTestId("Register-button")
    userEvent.click(loginButton)
    const nameErrorText = getByTestId("Register-name-helper-text")
    const lastnameErrorText = getByTestId("Register-lastname-helper-text")
    const emailErrorText = getByTestId("Register-email-helper-text")
    const passwordErrorText = getByTestId("Register-password-helper-text")
    expect(nameErrorText.textContent).toBe("El campo no puede estar vacío")
    expect(lastnameErrorText.textContent).toBe("El campo no puede estar vacío")
    expect(emailErrorText.textContent).toBe("El campo no puede estar vacío")
    expect(passwordErrorText.textContent).toBe("El campo no puede estar vacío")
});

test('Dado un usuario, cuando ingresa un email con formato incorrecto, entonces dicho error aparece debajo del input', () => {
    const {getByTestId} = render(<RegisterModal open={true}/>)
    const emailInput = getByTestId("Register-email")
    const registerButton = getByTestId("Register-button")
    userEvent.type(emailInput, 'someEmail')
    userEvent.click(registerButton)
    let emailErrorText = getByTestId("Register-email-helper-text")
    expect(emailErrorText.textContent).toBe("El formato del email es incorrecto")
});

test('Dado un usuario, cuando ingresa todo correctamente y apreta ingresar, no aparecen errores', () => {
    const {getByTestId, queryByTestId} = render(<RegisterModal open={true}/>)
    const nameInput = getByTestId("Register-name")
    const lastnameInput = getByTestId("Register-lastname")
    const emailInput = getByTestId("Register-email")
    const passwordInput = getByTestId("Register-password")
    const loginButton = getByTestId("Register-button")
    userEvent.type(nameInput, 'Pepe')
    userEvent.type(lastnameInput, 'Rodriguez')
    userEvent.type(emailInput, 'some@email.com')
    userEvent.type(passwordInput, 'somePassword')
    userEvent.click(loginButton)
    expect(queryByTestId("Register-name-helper-text")).toBeNull()
    expect(queryByTestId("Register-lastname-helper-text")).toBeNull()
    expect(queryByTestId('Register-email-helper-text')).toBeNull()
    expect(queryByTestId('Register-password-helper-text')).toBeNull()
});