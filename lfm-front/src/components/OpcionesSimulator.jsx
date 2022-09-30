import Grid from '@mui/material/Grid';
import ConstitucionPlazosFijosTable from "./CustomTables/ConstitucionPlazosFijosTable";
import ViewSubTitle from "./ViewSubTitle";
import ViewTitle from "./ViewTitle";
import ProyeccionYAhorros from "./ProyeccionYAhorros";
import {useEffect, useState} from "react";
import {getIngresosForUserId} from "../services/IngresosService";
import {arraySum} from "../helpers/Utils";
import {getGastosForUserId, getGastosForUserIdPerMonth} from "../services/GastosService";
import CompraDolares from "./CustomTables/CompraDolaresTable";
import InversionesVsIPCChart from "./CustomCharts/InversionesVsIPCChart";
import IPCTable from "./CustomTables/IPCTable";
import {getIPCValue} from "../services/IPCService";
import {getPlazosFijos} from "../services/PlazosFijosService";
import useUser from "./CustomHooks/UseUser";
import Divider from "@mui/material/Divider";

export default function OpcionesSimulator() {
    const [ahorros, setAhorros] = useState(0)
    const [ipc, setIpc] = useState(0)
    const [pfInteresPromedio, setPfInteresPromedio] = useState(0)
    const [proyeccionMensual, setProyeccionMensual] = useState(0)
    const {user} = useUser()

    function getIngresos() {
        return getIngresosForUserId(user.id).then(res => arraySum(res, 'monto'))
    }

    function getGastos() {
        return getGastosForUserId(user.id).then(res => arraySum(res, 'monto'))
    }

    function getGastosMensualizados() {
        return getGastosForUserIdPerMonth(user.id).then(res => res.length)
    }

    function calcularAhorros(ingresos, gastos) {
        let ahorrosNetos = ingresos - gastos
        setAhorros(ahorrosNetos);
    }

    function proyectarExcedenteMensual(ingresos, gastos, cantidadDeMeses) {
        //TODO: Por ser POC se utiliza un promedio en base a la cantidad de meses en los que se registraron gastos
        let promedioExcedenteMensual = ((ingresos - gastos) / cantidadDeMeses).toFixed()
        setProyeccionMensual(promedioExcedenteMensual);
    }

    const getIPC = async () => {
        let ipcApi = await getIPCValue()
        setIpc(Number(ipcApi.value.replace(",", ".")))
    }

    const getPFInteresesPromedio = async () => {
        let plazosFijosApi = await getPlazosFijos();
        let promedio = Number((plazosFijosApi.reduce(getSumPFintereses,0)) / plazosFijosApi.length);
        setPfInteresPromedio(promedio)
    }

    function getSumPFintereses(total, pf) {
        return total + (pf.tasa * 30 / 365);
    }

    useEffect(()=> {
        Promise.all([
            getIngresos(),
            getGastos(),
            getGastosMensualizados(),
            getIPC(),
            getPFInteresesPromedio()
        ]).then((res) => {
            let [ingresos, gastos, gastosMensualizados] = res;
            calcularAhorros(ingresos, gastos);
            proyectarExcedenteMensual(ingresos, gastos, gastosMensualizados);
        })
    }, []);

    return <Grid container spacing={{ xs: 2 }}>
        <ViewTitle title={"Opciones de Inversión"}/>
        <ProyeccionYAhorros proyeccion={proyeccionMensual} ahorros={ahorros}/>
        <Grid container justifyContent="center">
            <Grid item xs={12} sm={12} lg={6}>
                <InversionesVsIPCChart
                    ipc={ipc}
                    pfIntereses={pfInteresPromedio}
                    title={'Inversiones VS Inflación'}
                />
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
                <IPCTable/>
            </Grid>
        </Grid>
        <Grid item xs={12}>
            <Divider sx={{borderColor: '#0FC2C0'}}/>
        </Grid>
        <Grid container>
            <Grid item xs={12} sm={12} lg={6}>
                <ViewSubTitle subTitle={'En base a proyección mensual'}/>
                <ConstitucionPlazosFijosTable monto={proyeccionMensual}/>
                <CompraDolares monto={proyeccionMensual}/>
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
                <ViewSubTitle subTitle={'En base a ahorros'}/>
                <ConstitucionPlazosFijosTable monto={ahorros}/>
                <CompraDolares monto={ahorros}/>
            </Grid>
        </Grid>
    </Grid>
}