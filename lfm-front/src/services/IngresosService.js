import {get} from '../helpers/AxiosHelper'

const getIngresosForUserId = (userId) => {
    return get(`users/${userId}/ingresos`);
}

export {getIngresosForUserId}