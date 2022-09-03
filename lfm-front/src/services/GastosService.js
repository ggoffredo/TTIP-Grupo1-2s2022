import {get} from '../helpers/AxiosHelper'

const getGastosForUserId = (userId) => {
    return get(`users/${userId}/gastos`);
}

export {getGastosForUserId}