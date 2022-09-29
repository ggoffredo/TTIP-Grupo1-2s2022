import {useEffect, useState} from "react";
import Grid from '@mui/material/Grid';
import {getIngresosForUserIdPerMonth} from "../../services/IngresosService";
import {getGastosForUserIdPerMonth} from "../../services/GastosService";
import DolarValues from "./DolarValues";
import IPCValue from "./IPCValue";
import ViewTitle from "../ViewTitle";
import GastosVsIngresos from "./Accordions/GastosVsIngresos";
import Gastos from "./Accordions/Gastos";
import PlazosFijos from "./Accordions/PlazosFijos";
import useUser from "../CustomHooks/UseUser";

export default function Dashboard() {
    const [gastos, setGastos] = useState([])
    const [ingresos, setIngresos] = useState([])
    const {user} = useUser()

    async function getIngresos() {
        let ingresosApi = await getIngresosForUserIdPerMonth(user.id);
        setIngresos(ingresosApi)
    }

    async function getGastos() {
        let gastosApi = await getGastosForUserIdPerMonth(user.id);
        setGastos(gastosApi);
    }

    useEffect(() => {
        getIngresos()
        getGastos()
    }, [user]);

    return <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <ViewTitle title={"Dashboard"}/>
        <DolarValues/>
        <IPCValue/>
        <GastosVsIngresos ingresos={ingresos} gastos={gastos}/>
        <Gastos gastosMesEnCurso={gastos.at(-1)}/>
        <PlazosFijos/>
    </Grid>
}