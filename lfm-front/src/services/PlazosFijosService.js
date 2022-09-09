import {get} from '../helpers/AxiosHelper'

const getPlazosFijos = () => {
    return get(`plazosFijos`);
}

export {getPlazosFijos}