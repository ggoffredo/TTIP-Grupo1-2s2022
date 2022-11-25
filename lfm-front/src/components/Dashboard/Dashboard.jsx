import {useEffect, useState} from "react";
import Grid from '@mui/material/Grid';
import {getIngresosForUserIdPerMonth} from "../../services/IngresosService";
import {getGastosForUserIdPerMonth} from "../../services/GastosService";
import DolarAndIPCValues from "./DolarAndIPCValues";
import ViewTitle from "../ViewTitle";
import useUser from "../CustomHooks/UseUser";
import CurrentMonthGastos from "../CustomCharts/CurrentMonthGastos";
import GastosTable from "../CustomTables/GastosTable";
import GastosIngresosDoughnutChart from "../CustomCharts/GastosIngresosDoughnutChart";
import Utils from "../../helpers/Utils";

export default function Dashboard() {
    const [gastos, setGastos] = useState([])
    const [ingresos, setIngresos] = useState([])
    const {user} = useUser()

    useEffect(() => {
        getIngresosForUserIdPerMonth(user.id).then(res => setIngresos(res))
        getGastosForUserIdPerMonth(user.id).then(res => setGastos(res))
    }, [user]);

    const getMontoTotalFromLastMonth = (data) => {
        return data.at(-1)?.montoTotal
    }

    const getSummarizedMontoTotalFromLastMonth = (data) => {
        return Utils.arraySum(data, 'montoTotal')
    }

    return <Grid container spacing={2}>
        <ViewTitle title={"Dashboard"}/>
        <DolarAndIPCValues/>
        <Grid container item>
            <CurrentMonthGastos gastosMesEnCurso={gastos.at(-1)}/>
            <GastosIngresosDoughnutChart
                gastos={getMontoTotalFromLastMonth(gastos)}
                ingresos={getMontoTotalFromLastMonth(ingresos)}
                title={'Mes en curso'}
            />
            <GastosIngresosDoughnutChart
                gastos={getSummarizedMontoTotalFromLastMonth(gastos)}
                ingresos={getSummarizedMontoTotalFromLastMonth(ingresos)}
                title={'Histórico'}
            />
            <GastosTable/>
        </Grid>
    </Grid>
}