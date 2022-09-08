import {ingresos} from "./IngresosMockResponse";
import {gastos} from "./GastosMockResponse";
import {dolares} from "./DolarSiMockResponse";

const get = (fullPath) => {
    switch (fullPath) {
        case 'http://localhost:8080/users/1/ingresos':
            return ingresos
        case 'http://localhost:8080/users/1/gastos':
            return gastos
        case 'https://www.dolarsi.com/api/api.php?type=valoresprincipales':
            return dolares
        default:
            return Promise.reject(new Error('Not Found'))
    }
}

export {get}