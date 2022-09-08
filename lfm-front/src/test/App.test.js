import {render} from '@testing-library/react';
import App from '../App';
import 'jest-canvas-mock';

jest.mock('../helpers/AxiosHelper')

test('renders learn react link', () => {
  const { getByText } = render(<App/>);
  const linkElement = getByText('Gastos vs ingresos');
  expect(linkElement).toBeInTheDocument();
});
