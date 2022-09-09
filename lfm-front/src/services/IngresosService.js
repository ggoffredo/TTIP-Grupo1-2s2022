import {getFromLFMApi} from '../helpers/AxiosHelper'

const getIngresosForUserId = (userId) => {
    return getFromLFMApi(`users/${userId}/ingresos`);
}

export {getIngresosForUserId}