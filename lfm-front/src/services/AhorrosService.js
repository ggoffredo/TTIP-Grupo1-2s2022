import {getFromLFMApi} from '../helpers/AxiosHelper'

const getAhorrosForUserId = (userId, params) => {
    return getFromLFMApi(`users/${userId}/ahorros`, params);
}

const getAhorrosInvertidosForUserId = (userId, params) => {
    return getFromLFMApi(`users/${userId}/ahorrosInvertidos`, params);
}

export {getAhorrosForUserId, getAhorrosInvertidosForUserId}