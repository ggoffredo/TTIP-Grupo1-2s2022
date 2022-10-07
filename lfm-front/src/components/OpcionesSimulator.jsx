import Grid from '@mui/material/Grid';
import ConstitucionPlazosFijosTable from "./CustomTables/ConstitucionPlazosFijosTable";
import ViewSubTitle from "./ViewSubTitle";
import ViewTitle from "./ViewTitle";
import ProyeccionYAhorros from "./ProyeccionYAhorros";
import {useEffect, useState} from "react";
import {getIngresosForUserId} from "../services/IngresosService";
import Utils from "../helpers/Utils";
import {getGastosForUserId, getGastosForUserIdPerMonth} from "../services/GastosService";
import CompraDolares from "./CustomTables/CompraDolaresTable";
import InversionesVsIPCChart from "./CustomCharts/InversionesVsIPCChart";
import IPCTable from "./CustomTables/IPCTable";
import {getIPCValue} from "../services/IPCService";
import useUser from "./CustomHooks/UseUser";
import Divider from "@mui/material/Divider";
import {getFromLFMApi} from "../helpers/AxiosHelper";

export default function OpcionesSimulator() {
    const [ahorros, setAhorros] = useState(0)
    const [inversionesAndIpc, setInversionesAndIpc] = useState({})
    const [proyeccionMensual, setProyeccionMensual] = useState(0)
    const {user} = useUser()

    function getIngresos() {
        return getIngresosForUserId(user.id).then(res => Utils.arraySum(res, 'monto'))
    }

    function getGastos() {
        return getGastosForUserId(user.id).then(res => Utils.arraySum(res, 'monto'))
    }

    function getGastosMensualizados() {
        return getGastosForUserIdPerMonth(user.id).then(res => res.length)
    }

    function calcularAhorros(ingresos, gastos) {
        let ahorrosNetos = ingresos - gastos
        setAhorros(ahorrosNetos);
    }

    function proyectarExcedenteMensual(ingresos, gastos, cantidadDeMeses) {
        let promedioExcedenteMensual = ((ingresos - gastos) / cantidadDeMeses).toFixed()
        setProyeccionMensual(promedioExcedenteMensual);
    }

    const getAndSetInversionesAndIpc = async () => {
        let ipcApi = await getIPCValue()
        let inversiones = await getFromLFMApi("inversiones")
        inversiones['Inflación'] = [{
            "nombre": "Inflación",
            "tasaDeVariacion": Number(ipcApi.value.replace(",", ".")),
            "periodo": "MENSUAL",
            "cantidadDePeriodos": 1,
            "tipoDeInversion": "Inflación"
        }]
        setInversionesAndIpc(inversiones)
    }

    useEffect(()=> {
        Promise.all([
            getIngresos(),
            getGastos(),
            getGastosMensualizados(),
            getAndSetInversionesAndIpc()
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
                    inversiones={inversionesAndIpc}
                    title={'Inflación VS Inversiones (últimos 30 días)'}
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