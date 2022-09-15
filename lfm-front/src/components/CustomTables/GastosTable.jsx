import React, {useEffect, useState} from 'react';
import ChartCard from "../ChartCard";
import Grid from "@mui/material/Grid";
import StyledTable from "../Core/StyledTable";
import {getGastosForUserId} from "../../services/GastosService";

const getGastosTable = (data) => {
    return <StyledTable data={data} headers={['Descripcion', 'Monto', 'Fecha']}/>
}

const GastosTable = () => {
    const [gastos, setGastos] = useState([])

    async function getGastos() {
        let gastosApi = await getGastosForUserId(1);
        setGastos(gastosApi);
    }

    useEffect(() => {
        getGastos()
    }, []);

    return (
        <Grid item xs={12} sm={12} md={6}>
            <ChartCard chart={getGastosTable(gastos)} title={'Gastos históricos'}/>
        </Grid>
    );
}

export default GastosTable;