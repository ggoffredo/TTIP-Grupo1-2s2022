import {render} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import useUser from "../components/CustomHooks/UseUser";
import RegisterModal from "../components/Navbar/RegisterModal";
import ClickableChip from "../components/ClickableChip";

jest.mock('../components/CustomHooks/UseUser')

beforeEach(() => {
    useUser.mockImplementation(() => ({setUser: jest.fn()}));
});

test('Cuando un usuario clickea el chip, si el chip ya está clickeado, no debe llamarse al método', () => {
    const props = {
        onPressClick: jest.fn(),
        chartLabel: 'someText'
    };
    const {getByTestId} = render(<ClickableChip {...props}/>)
    const chip = getByTestId("clickable-chip-someText")
    expect(chip.classList.contains("MuiChip-filled")).toBe(true)
    userEvent.click(chip)
    expect(props.onPressClick).toBeCalledTimes(0)
});

test('Cuando un usuario clickea para borrar un chip clickeado, si el chip ya está borrado, solo se llama una vez al método', () => {
    const props = {
        onPressDelete: jest.fn(),
        chartLabel: 'someText'
    };
    const {getByTestId} = render(<ClickableChip {...props}/>)
    let chipCancel = getByTestId("CancelIcon")
    userEvent.click(chipCancel)
    userEvent.click(chipCancel)
    expect(props.onPressDelete).toBeCalledTimes(1)
});

test('Cuando un usuario clickea en borrar y luego en agregar, ambas callbacks son ejecutadas una vez', () => {
    const props = {
        onPressClick: jest.fn(),
        onPressDelete: jest.fn(),
        chartLabel: 'someText'
    };
    const {getByTestId} = render(<ClickableChip {...props}/>)
    const chip = getByTestId("clickable-chip-someText")
    const chipCancel = getByTestId("CancelIcon")
    userEvent.click(chipCancel)
    userEvent.click(chip)
    expect(props.onPressDelete).toBeCalledTimes(1)
    expect(props.onPressClick).toBeCalledTimes(1)
});