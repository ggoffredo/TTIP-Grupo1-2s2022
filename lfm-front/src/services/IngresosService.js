import {getFromLFMApi} from '../helpers/AxiosHelper'

const getIngresosForUserId = (userId) => {
    return getFromLFMApi(`users/${userId}/ingresos`);
}

const getIngresosForUserIdPerMonth = (userId) => {
    return getFromLFMApi(`users/${userId}/ingresosMensualizados`);
}

export {getIngresosForUserId, getIngresosForUserIdPerMonth}