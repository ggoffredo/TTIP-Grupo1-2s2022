import {getFromLFMApi} from '../helpers/AxiosHelper'

const getIPCValue = async () => {
    return await getFromLFMApi(`ipc`)
}

export {getIPCValue}