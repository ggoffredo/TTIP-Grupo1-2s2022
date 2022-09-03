import {useEffect, useState} from "react";
import Grid from '@mui/material/Grid';
import ChartCard from "./ChartCard";
import axios from "axios";
import DoughnutChart from "./Charts/DoughnutChart";
import Divider from "@mui/material/Divider";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from "@mui/material/Typography";

export default function Dashboard() {
    const [ingresos, setIngresos] = useState([])
    const [gastos, setGastos] = useState([])

    async function getIngresos() {
        let response = await axios({
            method: 'get',
            url: 'http://localhost:8080/users/1/ingresos',
            responseType: 'stream',
        });
        let ingresosApi = response.data;
        setIngresos(ingresosApi.reduce((partialSum, ingreso) => partialSum + ingreso.monto, 0));
    }

    async function getGastos() {
        let response = await axios({
            method: 'get',
            url: 'http://localhost:8080/users/1/gastos',
            responseType: 'stream',
        });
        let gastosApi = response.data;
        setGastos(gastosApi.reduce((partialSum, gasto) => partialSum + gasto.monto, 0));
    }

    useEffect(() => {
        getIngresos()
        getGastos()
    }, []);

    function getDoughnutChartData() {
        return {
            Gastos: gastos,
            Libre: ingresos - gastos
        };
    }

    function getDoughnutChart() {
        return <DoughnutChart
            data={getDoughnutChartData()}
        />
    }

    return <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={12}>
            <p style={{fontFamily: 'Staatliches', fontSize: '70px', marginTop: 0, marginBottom: 0, textAlign: 'left'}}>Dashboard</p>
            <Divider/>
        </Grid>
        <Grid item xs={12}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Gastos vs Ingresos</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid item xs={2} sm={4} md={4}>
                        <ChartCard
                            chart={getDoughnutChart()}
                            label={`Ingresos: ${ingresos}`}
                            title={'Gastos vs ingresos'}
                        />
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </Grid>
    </Grid>
}