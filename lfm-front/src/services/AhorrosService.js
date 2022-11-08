import {getFromLFMApi} from '../helpers/AxiosHelper'

const getAhorrosForUserId = (userId, params, body) => {
    return getFromLFMApi(`users/${userId}/ahorros`, params, body);
}

const getAhorrosInvertidosForUserId = (userId, params, body) => {
    return getFromLFMApi(`users/${userId}/ahorrosInvertidos`, params, body);
}

export {getAhorrosForUserId, getAhorrosInvertidosForUserId}