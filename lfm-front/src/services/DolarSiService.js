import {get} from '../helpers/AxiosHelper'

const dolares = [
    "Dolar Blue",
    "Dolar Bolsa",
    "Dolar turista"
];

const getDolarValues = async () => {
    let values = await get('https://www.dolarsi.com/api/api.php?type=valoresprincipales');
    return values.filter(value => {
        return dolares.includes(value['casa']['nombre']);
    })
}

export {getDolarValues}