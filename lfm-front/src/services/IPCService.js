import {getFromLFMApi} from '../helpers/AxiosHelper'

const getIPCValue = async () => {
    return getFromLFMApi(`ipc`)
}

const getIPCMensuales = async () => {
    return getFromLFMApi(`ipcMensuales`)
}

const getInflacionEsperadaValue = async () => {
    return getFromLFMApi(`inflacionEsperada`)
}

export {getIPCValue, getIPCMensuales, getInflacionEsperadaValue}