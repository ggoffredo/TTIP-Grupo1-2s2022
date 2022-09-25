import {ingresos} from "./IngresosMockResponse";
import {gastos} from "./GastosMockResponse";
import {dolares} from "./DolarSiMockResponse";

const get = (fullPath) => {
    switch (fullPath) {
        case `${process.env.REACT_APP_BACKEND_API}users/1/ingresos`:
            return ingresos
        case `${process.env.REACT_APP_BACKEND_API}users/1/gastos`:
            return gastos
        case process.env.REACT_APP_DOLAR_SI_API:
            return dolares
        default:
            return Promise.reject(new Error('Not Found'))
    }
}

export {get}