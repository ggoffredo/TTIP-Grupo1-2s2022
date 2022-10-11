import {useEffect, useState} from 'react';
import ChartCard from "../Core/Charts/ChartCard";
import Grid from "@mui/material/Grid";
import StyledTable from "../Core/StyledTable";
import {getDolarValues} from "../../services/CotizacionService";
import Utils from "../../helpers/Utils";

const CompraDolaresTable = ({monto, inversiones}) => {
    const [dolares, setDolares] = useState([])

    const getCompraDolaresTable = (data) => {
        return <StyledTable data={data} headers={['Nombre', 'Cotización', 'Monto', 'Cantidad']}/>
    }

    const getAndSetDolares = () => {getDolarValues().then(res => mapAndSetDolares(res))}

    const normalizeName = (name) => {
        return name.split(" ").map(namePart => {return Utils.capitalize(namePart)}).join(" ")
    }

    const normalizeValue = (value) => {
        return Number(value).toFixed(2).replace(".", ",")
    }

    const mapAndSetDolares = (dolaresApi) => {
        let availableDolars = inversiones["Dolares"].map(dolar => dolar.nombre)
        let dolaresMap = dolaresApi.map(dolar => {
            let name = normalizeName(dolar['nombre'])
            let value =  normalizeValue(dolar['venta'])
            return {nombre: name, cotización: value, monto: monto, cantidad: (parseInt(monto) / parseInt(value)).toFixed(2)}
        }).filter(mappedDolar => availableDolars.includes(mappedDolar.nombre))
        setDolares(dolaresMap)
    }

    useEffect(() => {
        getAndSetDolares()
    }, [monto, inversiones])

    return (
        <Grid item xs={12} sm={12} md={12}>
            <ChartCard chart={getCompraDolaresTable(dolares)} title={'Compra de Dólares'}/>
        </Grid>
    );
}

export default CompraDolaresTable