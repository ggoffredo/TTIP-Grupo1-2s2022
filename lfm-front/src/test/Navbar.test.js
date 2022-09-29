import {render} from '@testing-library/react';
import Navbar from "../components/Navbar/Navbar";
import useUser from "../components/CustomHooks/UseUser";
import {BrowserRouter} from "react-router-dom";

jest.mock('../components/CustomHooks/UseUser')

test('Given there is no user, when the navbar is rendered, then there is no dashboard button', () => {
    useUser.mockImplementation(() => ({user: null}));
    const { queryByTestId } = render(<Navbar/>, {wrapper: BrowserRouter});
    const dashboardButton = queryByTestId('/dashboard-max');
    const pfijosButton = queryByTestId('/plazosFijos-max');
    const opcionesButton = queryByTestId('/opciones-max');
    expect(dashboardButton).toBeNull()
    expect(pfijosButton).toBeNull()
    expect(opcionesButton).toBeNull()
});

test('Given there is user, when the navbar is rendered, then there is a dashboard button', () => {
    useUser.mockImplementation(() => ({user: {id: 1}}));
    const { getByTestId } = render(<Navbar/>, {wrapper: BrowserRouter});
    const dashboardButton = getByTestId('/dashboard-max');
    const pfijosButton = getByTestId('/plazosFijos-max');
    const opcionesButton = getByTestId('/opciones-max');
    expect(dashboardButton).toBeInTheDocument();
    expect(pfijosButton).toBeInTheDocument()
    expect(opcionesButton).toBeInTheDocument()
});