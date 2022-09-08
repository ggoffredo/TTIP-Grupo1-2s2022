import {render, waitFor} from '@testing-library/react';
import DolarValues from "../components/DolarValues";

jest.mock('../helpers/AxiosHelper')

test('Renders the dolar values in a chip format', async () => {
    const { getByText } = render(<DolarValues/>);
    await waitFor(() => {
        const dolarBlueChip = getByText('Dolar Blue: $270,00');
        const dolarTuristaChip = getByText('Dolar Turista: $257,64');
        const dolarMepChip = getByText('Dolar Bolsa: $272,25');
        expect(dolarBlueChip).toBeInTheDocument();
        expect(dolarMepChip).toBeInTheDocument();
        expect(dolarTuristaChip).toBeInTheDocument();
    });
});