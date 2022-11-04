import {getFromLFMApi} from '../helpers/AxiosHelper'

const getAhorrosForUserId = (userId, params) => {
    return getFromLFMApi(`users/${userId}/ahorros`, params);
}

export {getAhorrosForUserId}