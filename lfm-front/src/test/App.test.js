import {render, screen} from '@testing-library/react';
import App from '../App';
import 'jest-canvas-mock';

jest.mock('../helpers/AxiosHelper')

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText('Gastos vs ingresos');
  expect(linkElement).toBeInTheDocument();
});
