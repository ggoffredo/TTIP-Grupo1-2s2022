import {get} from '../helpers/AxiosHelper'

const dolares = [
    "Dolar Blue",
    "Dolar Bolsa",
    "Dolar turista"
];

const getDolarValues = async () => {
    let values = await get(process.env.REACT_APP_DOLAR_SI_API);
    return values.filter(value => {
        return dolares.includes(value['casa']['nombre']);
    })
}

export {getDolarValues}