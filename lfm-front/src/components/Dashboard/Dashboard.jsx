import {useContext, useEffect, useState} from "react";
import Grid from '@mui/material/Grid';
import {getIngresosForUserIdPerMonth} from "../../services/IngresosService";
import {getGastosForUserIdPerMonth} from "../../services/GastosService";
import DolarValues from "./DolarValues";
import ViewTitle from "../ViewTitle";
import GastosVsIngresos from "./Accordions/GastosVsIngresos";
import Gastos from "./Accordions/Gastos";
import PlazosFijos from "./Accordions/PlazosFijos";
import {GastosContext} from "../Contexts";

export default function Dashboard() {
    const {gastos, setGastos} = useContext(GastosContext)
    const [ingresos, setIngresos] = useState([])

    async function getIngresos() {
        let ingresosApi = await getIngresosForUserIdPerMonth(1);
        setIngresos(ingresosApi)
    }

    async function getGastos() {
        let gastosApi = await getGastosForUserIdPerMonth(1);
        setGastos(gastosApi);
    }

    useEffect(() => {
        getIngresos()
        getGastos()
    }, []);

    return <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <ViewTitle title={"Dashboard"}/>
        <DolarValues/>
        <GastosVsIngresos ingresos={ingresos} gastos={gastos}/>
        <Gastos gastosMesEnCurso={gastos.at(-1)}/>
        <PlazosFijos/>
    </Grid>
}