import {useEffect, useState} from "react";
import Grid from '@mui/material/Grid';
import ChartCard from "./ChartCard";
import axios from "axios";
import DoughnutChart from "./Charts/DoughnutChart";

export default function Dashboard() {
    const [ingresos, setIngresos] = useState([])
    const [gastos, setGastos] = useState([])

    async function getIngresos() {
        let response = await axios({
            method: 'get',
            url: 'http://localhost:8080/users/1/ingresos',
            responseType: 'stream',
        });
        let ingresosApi = await response.data;
        setIngresos(ingresosApi.reduce((partialSum, ingreso) => partialSum + ingreso.monto, 0));
    }

    async function getGastos() {
        let response = await axios({
            method: 'get',
            url: 'http://localhost:8080/users/1/gastos',
            responseType: 'stream',
        });
        let gastosApi = await response.data;
        setGastos(gastosApi.reduce((partialSum, gasto) => partialSum + gasto.monto, 0));
    }

    useEffect(() => {
        getIngresos()
        getGastos()
    }, []);

    const chart = <DoughnutChart
        data={{
            Gastos: gastos,
            Libre: ingresos - gastos
        }}
    />

    return <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={2} sm={4} md={4}>
            <ChartCard
                chart={chart}
                label={`Ingresos: ${ingresos}`}
                title={'Gastos vs ingresos'}
            />
        </Grid>
    </Grid>
}