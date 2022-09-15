import {getFromLFMApi} from '../helpers/AxiosHelper'

const getGastosForUserId = (userId) => {
    return getFromLFMApi(`users/${userId}/gastos`);
}

const getGastosForUserIdPerMonth = (userId) => {
    return getFromLFMApi(`users/${userId}/gastosMensualizados`);
}

export {getGastosForUserId, getGastosForUserIdPerMonth}