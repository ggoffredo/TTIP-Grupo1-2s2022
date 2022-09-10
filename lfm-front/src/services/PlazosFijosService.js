import {getFromLFMApi} from '../helpers/AxiosHelper'

const getPlazosFijos = async () => {
    let plazosFijosApi = await getFromLFMApi(`plazosFijos`);
    return plazosFijosApi.map(plazoFijo => {
        return {
            banco: plazoFijo['descripcionEntidad'],
            moneda: plazoFijo['denominacion'],
            monto: plazoFijo['montoMinimo'],
            plazo: plazoFijo['plazoMinimo'],
            tasa: plazoFijo['tasa']
        }
    });
}

export {getPlazosFijos}