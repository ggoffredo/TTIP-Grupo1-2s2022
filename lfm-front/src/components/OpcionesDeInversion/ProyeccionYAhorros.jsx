import Grid from "@mui/material/Grid";
import ViewSubTitle from "../ViewSubTitle";
import ConstitucionPlazosFijosTable from "../CustomTables/ConstitucionPlazosFijosTable";
import CompraDolares from "../CustomTables/CompraDolaresTable";
import {useEffect, useState} from "react";
import {getIngresosForUserId} from "../../services/IngresosService";
import Utils from "../../helpers/Utils";
import {getGastosForUserId, getGastosForUserIdPerMonth} from "../../services/GastosService";
import useUser from "../CustomHooks/UseUser";
import ProyeccionYAhorrosChips from "./ProyeccionYAhorrosChips";

const ProyeccionYAhorros = ({inversiones}) => {
    const [ahorros, setAhorros] = useState(0)
    const [proyeccionMensual, setProyeccionMensual] = useState("0")
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

    useEffect(()=> {
        Promise.all([
            getIngresos(),
            getGastos(),
            getGastosMensualizados()
        ]).then((res) => {
            let [ingresos, gastos, gastosMensualizados] = res;
            calcularAhorros(ingresos, gastos);
            proyectarExcedenteMensual(ingresos, gastos, gastosMensualizados);
        })
    }, []);

    return <Grid container>
        <ProyeccionYAhorrosChips proyeccion={proyeccionMensual} ahorros={ahorros}/>
        <Grid item xs={12} sm={12} lg={6}>
            <ViewSubTitle subTitle={'En base a proyección mensual'}/>
            <ConstitucionPlazosFijosTable monto={proyeccionMensual} inversiones={inversiones}/>
            <CompraDolares monto={proyeccionMensual} inversiones={inversiones}/>
        </Grid>
        <Grid item xs={12} sm={12} lg={6}>
            <ViewSubTitle subTitle={'En base a ahorros'}/>
            <ConstitucionPlazosFijosTable monto={ahorros} inversiones={inversiones}/>
            <CompraDolares monto={ahorros} inversiones={inversiones}/>
        </Grid>
    </Grid>
}

export default ProyeccionYAhorros