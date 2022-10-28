import {getFromLFMApi} from '../helpers/AxiosHelper'

const getAhorrosForUserId = (userId) => {
    return getFromLFMApi(`users/${userId}/ahorros?meses=2`);
}

export {getAhorrosForUserId}