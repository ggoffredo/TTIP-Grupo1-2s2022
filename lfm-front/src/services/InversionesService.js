import {getFromLFMApi} from '../helpers/AxiosHelper'
import {getIPCValue} from "./IPCService";

const getInversionesAndIpc = async () => {
    const ipc = await getIPCValue().then(res => Number(res.value.replace(",", ".")))
    let inversiones = await getFromLFMApi("inversiones")
    inversiones['Inflación'] = [{
        "nombre": "Inflación",
        "tasaDeVariacion": ipc,
        "periodo": "MENSUAL",
        "cantidadDePeriodos": 1,
        "tipoDeInversion": "Inflación"
    }]
    return inversiones
}

export {getInversionesAndIpc}