import React from 'react';
import ChartCard from "../ChartCard";
import Grid from "@mui/material/Grid";
import StyledTable from "../Core/StyledTable";

const getGastosTable = (data) => {
    return <StyledTable data={data} headers={['Descripcion', 'Monto', 'Fecha']}/>
}

const GastosTable = ({data}) => {
    return (
        <Grid item xs={12} sm={12} md={8}>
            <ChartCard chart={getGastosTable(data)} title={'Gastos históricos'}/>
        </Grid>
    );
}

export default GastosTable;