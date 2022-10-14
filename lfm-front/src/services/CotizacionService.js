import {getFromLFMApi} from '../helpers/AxiosHelper'


const getDolarValues = async () => {
    return await getFromLFMApi(`cotizacionDolares`)
}

export {getDolarValues}