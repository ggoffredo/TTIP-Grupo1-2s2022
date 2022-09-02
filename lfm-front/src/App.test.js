import { render, screen } from '@testing-library/react';
import App from './App';
import axios from "axios";
import 'jest-canvas-mock';

jest.mock('axios')

test('renders learn react link', () => {
  let ingresos = [
    {
      "id": 1,
      "descripcion": "Sueldo",
      "monto": 100000,
      "periodicidad": "MENSUAL",
      "duracion": 0,
      "fecha": "2022-09-01"
    },
    {
      "id": 2,
      "descripcion": "Alquiler",
      "monto": 50000,
      "periodicidad": "MENSUAL",
      "duracion": 0,
      "fecha": "2022-09-01"
    },
    {
      "id": 6,
      "descripcion": "Freelo",
      "monto": 10000,
      "periodicidad": "MENSUAL",
      "duracion": 1,
      "fecha": "2022-09-01"
    },
    {
      "id": 7,
      "descripcion": "Otro freelo",
      "monto": 15000,
      "periodicidad": "MENSUAL",
      "duracion": 1,
      "fecha": "2022-09-01"
    }
  ];
  let gastos = [
    {
      "id": 1,
      "descripcion": "Alquiler",
      "monto": 30000,
      "periodicidad": "MENSUAL",
      "duracion": 0,
      "fecha": "2022-09-01",
      "medioDePago": {
        "id": 1,
        "nombre": "Efectivo"
      }
    },
    {
      "id": 2,
      "descripcion": "Expensas",
      "monto": 5000,
      "periodicidad": "MENSUAL",
      "duracion": 0,
      "fecha": "2022-09-01",
      "medioDePago": {
        "id": 1,
        "nombre": "Efectivo"
      }
    },
    {
      "id": 3,
      "descripcion": "Telecentro",
      "monto": 4000,
      "periodicidad": "MENSUAL",
      "duracion": 0,
      "fecha": "2022-09-01",
      "medioDePago": {
        "id": 2,
        "nombre": "Visa"
      }
    },
    {
      "id": 4,
      "descripcion": "Gimnasio",
      "monto": 4000,
      "periodicidad": "MENSUAL",
      "duracion": 0,
      "fecha": "2022-09-01",
      "medioDePago": {
        "id": 2,
        "nombre": "Visa"
      }
    },
    {
      "id": 13,
      "descripcion": "Rappi",
      "monto": 2500,
      "periodicidad": "MENSUAL",
      "duracion": 1,
      "fecha": "2022-09-01",
      "medioDePago": {
        "id": 1,
        "nombre": "Efectivo"
      }
    },
    {
      "id": 14,
      "descripcion": "Pava Electrica",
      "monto": 4000,
      "periodicidad": "MENSUAL",
      "duracion": 12,
      "fecha": "2022-09-01",
      "medioDePago": {
        "id": 2,
        "nombre": "Visa"
      }
    }
  ];
  axios.get.mockImplementation((url) => {
    switch (url) {
      case 'http://localhost:8080/users/1/ingresos':
        return Promise.resolve({data: ingresos})
      case 'http://localhost:8080/users/1/gastos':
        return Promise.resolve({data: gastos})
      default:
        return Promise.reject(new Error('Not Found'))
    }
  });
  render(<App />);
  const linkElement = screen.getByText('Gastos vs ingresos');
  expect(linkElement).toBeInTheDocument();
});
