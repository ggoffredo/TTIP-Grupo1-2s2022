import {getFromLFMApi} from '../helpers/AxiosHelper'

const getIPCValue = async () => {
    return await getFromLFMApi(`ipc`)
}

const getIPCMensuales = async () => {
    return await getFromLFMApi(`ipcMensuales`)
}

export {getIPCValue, getIPCMensuales}