import {useEffect, useState} from "react";
import Grid from '@mui/material/Grid';
import Divider from "@mui/material/Divider";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from "@mui/material/Typography";
import GastosTable from "./CustomTables/GastosTable";
import GastosIngresosDoughnutChart from "./CustomCharts/GastosIngresosDoughnutChart";
import {arraySum} from '../helpers/Utils';
import {getIngresosForUserId} from "../services/IngresosService";
import {getGastosForUserId} from "../services/GastosService";

export default function Dashboard() {
    const [gastos, setGastos] = useState([])
    const [gastosAmount, setGastosAmount] = useState([])
    const [ingresosAmount, setIngresosAmount] = useState([])

    async function getIngresos() {
        let ingresosApi = await getIngresosForUserId(1);
        setIngresosAmount(arraySum(ingresosApi, 'monto'));
    }

    async function getGastos() {
        let gastosApi = await getGastosForUserId(1);
        setGastos(gastosApi);
        setGastosAmount(arraySum(gastosApi, 'monto'));
    }

    useEffect(() => {
        getIngresos()
        getGastos()
    }, []);

    return <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={12}>
            <p style={{fontFamily: 'Staatliches', fontSize: '70px', marginTop: 0, marginBottom: 0, textAlign: 'left'}}>Dashboard</p>
            <Divider/>
        </Grid>
        <Grid item xs={12}>
            {/*
                TODO: Encapsular accordion como componente core. Deberia ser configurable el titulo, el spacing y deberia pasarse el array de componentes
                a renderizar en los detalles
            */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>Gastos vs Ingresos</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container item spacing={2}>
                        <GastosIngresosDoughnutChart gastos={gastosAmount} ingresos={ingresosAmount}/>
                        <GastosTable data={gastos}/>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </Grid>
    </Grid>
}