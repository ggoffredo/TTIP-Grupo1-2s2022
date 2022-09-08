import {getFromLFMApi} from '../helpers/AxiosHelper'

const getGastosForUserId = (userId) => {
    return getFromLFMApi(`users/${userId}/gastos`);
}

export {getGastosForUserId}