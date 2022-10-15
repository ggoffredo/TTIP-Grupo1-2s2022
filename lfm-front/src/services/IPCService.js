import {getFromLFMApi} from '../helpers/AxiosHelper'

const getIPCValue = async () => {
    return getFromLFMApi(`ipc`)
}

const getIPCMensuales = async () => {
    return getFromLFMApi(`ipcMensuales`)
}

export {getIPCValue, getIPCMensuales}