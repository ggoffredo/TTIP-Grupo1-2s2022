import {useEffect, useState} from 'react';
import ChartCard from "../Core/Charts/ChartCard";
import Grid from "@mui/material/Grid";
import StyledTable from "../Core/StyledTable";
import {getDolarValues} from "../../services/CotizacionService";

const CompraDolaresTable = ({monto, inversiones}) => {
    const [dolares, setDolares] = useState([])

    const getAndSetDolares = () => {getDolarValues().then(res => mapAndSetDolares(res))}

    const mapAndSetDolares = (dolaresApi) => {
        const availableDolars = inversiones["Dolares"]?.map(dolar => dolar.nombre)
        const dolaresMap = dolaresApi.map(dolar => {
            const name = dolar['nombre']
            const value =  dolar['venta']
            return {nombre: name, cotización: value, monto: monto, cantidad: (parseInt(monto) / parseInt(value)).toFixed(2)}
        }).filter(mappedDolar => availableDolars?.includes(mappedDolar.nombre))
        setDolares(dolaresMap)
    }

    useEffect(() => {
        getAndSetDolares()
    }, [monto, inversiones])

    return (
        <Grid item xs={12} sm={12} md={12}>
            <ChartCard
                Chart={StyledTable}
                chartData={dolares}
                headers={['Nombre', 'Cotización', 'Monto', 'Cantidad']}
                title={'Compra de Dólares'}
            />
        </Grid>
    );
}

export default CompraDolaresTable