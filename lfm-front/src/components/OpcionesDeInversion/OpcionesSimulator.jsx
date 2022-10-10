import Grid from '@mui/material/Grid';
import ViewTitle from "../ViewTitle";
import ProyeccionYAhorros from "./ProyeccionYAhorros";
import {useEffect, useRef, useState} from "react";
import InversionesVsIPCChart from "../CustomCharts/InversionesVsIPCChart";
import IPCTable from "../CustomTables/IPCTable";
import {getIPCValue} from "../../services/IPCService";
import Divider from "@mui/material/Divider";
import {getFromLFMApi} from "../../helpers/AxiosHelper";
import ClickableChip from "../ClickableChip";

export default function OpcionesSimulator() {
    const [chartChips, setChartChips] = useState([])
    const [filteredInversiones, setFilteredInversiones] = useState({})
    const inversionesAndIpc= useRef({})
    const enabledChips = useRef([])

    const getNamesFromInversiones = () => {
        return Object.values(inversionesAndIpc.current).flat().map(inv => inv.nombre)
    }

    const updateFilteredInversiones = () => {
        setFilteredInversiones(filterInversiones())
        initChartChips()
    }

    const filterInversiones = () => {
        return Object.keys(inversionesAndIpc.current)
            .reduce((obj, key) => {
                return {
                    ...obj,
                    [key]: inversionesAndIpc.current[key].filter(inv => enabledChips.current.includes(inv.nombre))
                }
            }, {})
    }

    const handleClick = (chipKey) => {
        enabledChips.current = enabledChips.current.concat(chipKey)
        updateFilteredInversiones()
    }

    const handleDelete = (chipKey) => {
        enabledChips.current = enabledChips.current.filter(key => key !== chipKey)
        updateFilteredInversiones()
    }

    const initChartChips = () => {
        if (!inversionesAndIpc.current) return
        let chips = Object.values(inversionesAndIpc.current).flat().map(
            inv => <ClickableChip key={inv.nombre} chartLabel={inv.nombre} onPressClick={handleClick} onPressDelete={handleDelete}/>
        )
        setChartChips(chips)
    }

    useEffect(()=> {
        Promise.all([
            getIPCValue().then(res => Number(res.value.replace(",", "."))),
            getFromLFMApi("inversiones")
        ]).then(res => {
            let [ipc, inversiones] = res;
            inversiones['Inflación'] = [{
                "nombre": "Inflación",
                "tasaDeVariacion": ipc,
                "periodo": "MENSUAL",
                "cantidadDePeriodos": 1,
                "tipoDeInversion": "Inflación"
            }]
            inversionesAndIpc.current = inversiones
            enabledChips.current = getNamesFromInversiones()
            updateFilteredInversiones()
        })
    }, []);

    return <Grid container spacing={{ xs: 2 }}>
        <ViewTitle title={"Opciones de Inversión"}/>
        <Grid container justifyContent="center"> { chartChips } </Grid>
        <Grid container justifyContent="center">
            <Grid item xs={12} sm={12} lg={6}>
                <InversionesVsIPCChart
                    inversiones={filteredInversiones}
                    title={'Inflación VS Inversiones (últimos 30 días)'}
                />
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
                <IPCTable/>
            </Grid>
        </Grid>
        <Grid item xs={12}> <Divider sx={{borderColor: '#0FC2C0'}}/> </Grid>
        <ProyeccionYAhorros inversiones={filteredInversiones}/>
    </Grid>
}