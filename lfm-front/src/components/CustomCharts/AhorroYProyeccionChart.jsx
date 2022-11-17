import Grid from "@mui/material/Grid";
import ChartCard from "../Core/Charts/ChartCard";
import MultiChart from "../Core/Charts/MultiChart";
import {useEffect, useRef, useState} from "react";
import {getAhorrosForUserId, getAhorrosInvertidosForUserId} from "../../services/AhorrosService";
import useUser from "../CustomHooks/UseUser";
import {FormControl, FormControlLabel, FormLabel, Hidden, Radio, RadioGroup, Switch} from "@mui/material";
import Utils from "../../helpers/Utils";
import {CircularProgress, FormGroup} from "@material-ui/core";
import CustomPopover from "../OpcionesDeInversion/CustomPopover";
import HelpTooltip from "../HelpTooltip";
import ClickableChip from "../ClickableChip";
import {getFromLFMApi} from '../../helpers/AxiosHelper'
import EdicionesJournal from "./EdicionesJournal";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const AhorroYProyeccionChart = () => {
    const periodosDisponibles = [
        { label: '1 mes', value: 1 },
        { label: '3 meses', value: 3 },
        { label: '6 meses', value: 6 },
        { label: '12 meses', value: 12 }
    ]
    const [ahorros, setAhorros] = useState([])
    const [invertirMesesPasados, setInvertirMesesPasados] = useState(true)
    const [ahorrosInvertidos, setAhorrosInvertidos] = useState([])
    const [periodoSeleccionado, setPeriodoSeleccionado] = useState(1)
    const inversionesForChips= useRef({})
    const [chartChips, setChartChips] = useState([])
    const enabledChips = useRef([])
    const isLoading = useRef(true)
    const [ingresosYGastos, setIngresosYGastos] = useState([])
    const {user} = useUser()
    const chipTooltipText = "Para la proyección de las inversiones se emplea la taza correspondiente a los últimos 30 días."


    useEffect(() => {
        isLoading.current = true
        Promise.all([
            getAhorros(),
            getAhorrosInvertidos()
        ]).then( res => {
            const [ahorrosApi, ahorrosInvertidosApi] = res
            setAhorros(ahorrosApi)
            setAhorrosInvertidos(ahorrosInvertidosApi)
        }).finally(() => {
            isLoading.current = false
        })
    }, [periodoSeleccionado, ingresosYGastos, invertirMesesPasados, enabledChips.current]);

    const getInversionesForChips = async () => {
        inversionesForChips.current = await getFromLFMApi("inversiones")
        updateFilteredInversiones()
    }

    const getAhorros = () => {
        return getAhorrosForUserId(user.id, {meses: periodoSeleccionado}, {'ediciones': formatIngresosYGastos()})
    }

    const formatIngresosYGastos = () => {
        return ingresosYGastos.reduce((previous, current) => {
            const currentMonto = previous?.[current.fecha] ?? 0
            return {
                ...previous,
                [current.fecha]: (currentMonto + Number(current.monto))
            }
        }, {})
    }

    const getAhorrosInvertidos = async () => {
        await getInversionesForChips()
        const nombres = enabledChips.current
        let ahorrosInv = []
        for (let nombre of nombres) {
            const ahorroInvertido = await getAhorrosInvertidosForUserId(
                user.id,
                {
                    meses: periodoSeleccionado,
                    nombre: nombre,
                	proyecciones: invertirMesesPasados
                },
                {
                	'ediciones': formatIngresosYGastos()
            	}
            )
            ahorrosInv.push({values: ahorroInvertido, nombre: nombre})
        }

        return ahorrosInv
    }

    const getLabels = () => {
        return ahorros.map((a) => a.fecha)
    }

    const getAhorrosValues = () => {
        return doGetFilteredMappedAhorros("actual")
    }

    const getAhorrosAcumuladosValues = () => {
        return doGetFilteredMappedAhorros("acumulado")
    }

    const getAhorrosInvertidosValues = () => {
        let ahorrosInvertidosValues = []
        for (let ahorroInvertido of ahorrosInvertidos) {
            const data = doGetMappedFormatedData(ahorroInvertido.values, "acumulado")
            ahorrosInvertidosValues.push({
                values: data,
                nombre: ahorroInvertido.nombre
            })
        }
        return ahorrosInvertidosValues
    }

    const getAhorrosAcumuladosProyectadosValues = () => {
        return doGetMappedFormatedData(ahorros, "acumulado")
    }

    const getAhorrosProyectadosValues = () => {
        const ahorrosProyectados = ahorros
        const labels = ahorrosProyectados.map((a) => a.fecha)
        const values = ahorrosProyectados.map((a) => a.actual)
        return { labels: labels, values: values }
    }

    const doGetFilteredMappedAhorros = (key) => {
        const values = Utils.removeFutureValues(ahorros)
        return doGetMappedFormatedData(values, key)
    }

    const doGetMappedFormatedData = (arr, key) => {
        const labels = getLabels()
        const values = arr.map((a) => a[key])
        return { labels: labels, values: values }
    }

    const getData = () => {
        const ahorrosData = getAhorrosValues()
        const ahorrosProyectadosData = getAhorrosProyectadosValues()
        const ahorrosAcumuladosData = getAhorrosAcumuladosValues()
        const ahorrosAcumuladosProyectadosData = getAhorrosAcumuladosProyectadosValues()
        const ahorrosInvertidosData = getAhorrosInvertidosValues().map(ahorroInvertidoValue => doGetData(ahorroInvertidoValue.values, `Ahorros acumulados proyectados invertidos ${ahorroInvertidoValue.nombre}`, 'rgb(6, 51, 241)', true))
        return [
            doGetData(ahorrosData, "Ahorros mensuales", 'rgb(255,161,99)'),
            doGetData(ahorrosProyectadosData, "Ahorros mensuales proyectados", 'rgb(255, 193, 99)'),
            doGetData(ahorrosAcumuladosData, "Ahorros acumulados", 'rgb(53, 162, 235)', true),
            doGetData(ahorrosAcumuladosProyectadosData, "Ahorros acumulados proyectados", 'rgb(53, 235, 180)', true),
            ...ahorrosInvertidosData
        ]
    }

    const doGetData = (data, title, color, fill = false, type = 'line') => {
        return {
            type: type,
            fill: fill,
            labels: data.labels,
            values: data.values,
            title: title,
            borderColor: color,
            backgroundColor: color.replace(')', ', 0.5)')
        }
    }

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }

    const handleClick = (event) => {
        setPeriodoSeleccionado(event.target.value)
    }

    const handleChange = (event) => {
        setInvertirMesesPasados(!event.target.checked);
    };

    const updateFilteredInversiones = () => {
        initChartChips()
    }

    function getMultiChart() {
        return <ChartCard options={options} Chart={MultiChart} chartData={getData()} title={"Ahorros y proyección de inversiones"}>
            <EdicionesJournal ingresosYGastos={ingresosYGastos} setIngresosYGastosCallback={setIngresosYGastos}/>
        </ChartCard>
    }

    const handleChipClick = (chipKey) => {
        enabledChips.current = enabledChips.current.concat(chipKey)
        updateFilteredInversiones()
    }

    const handleChipDelete = (chipKey) => {
        enabledChips.current = enabledChips.current.filter(key => key !== chipKey)
        updateFilteredInversiones()
    }

    const initChartChips = () => {
        if (!inversionesForChips.current) return
        let chips = Object.values(inversionesForChips.current).flat().map(
            inv => <ClickableChip key={inv.nombre} chartLabel={inv.nombre} onPressClick={handleChipClick} onPressDelete={handleChipDelete} initialState={false}/>
        )
        setChartChips(chips)
    }

    const getPeriodosRadioButtons = () => {
        return <Grid container sx={{marginTop: '10px', marginBottom: '10px'}} justifyContent="space-evenly">
            <Grid item xs={12} sm={12} md={12} sx={{marginBottom: '10px'}}>
                <Typography textAlign="center" variant="h5" component="div">Filtros disponibles</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={6} sx={{border: "1px solid #025c96", margin: '5px', borderRadius: '5px', padding: '5px'}}>
                <FormControl>
                    <Grid container>
                        <Grid item>
                            <FormLabel id="period-label">Período</FormLabel>
                            <RadioGroup row aria-labelledby="period-label" defaultValue={periodoSeleccionado} onChange={handleClick}>
                                { periodosDisponibles.map(periodo => <FormControlLabel key={periodo.label} value={periodo.value} control={<Radio/>} label={periodo.label}/>) }
                            </RadioGroup>
                        </Grid>
                        <Hidden xlDown>
                            <Divider orientation="vertical" flexItem />
                        </Hidden>
                        <Grid item>
                            <FormGroup style={{margin: 25}}>
                                <FormControlLabel control={<Switch onChange={handleChange}/>} label="Invertir meses pasados" />
                            </FormGroup>
                        </Grid>
                    </Grid>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={7} xl={5} sx={{border: "1px solid #025c96", margin: '5px', borderRadius: '5px', padding: '5px'}}>
                <Grid container justifyContent="flex-start" alignItems="center">
                    {  chartChips }
                    { chartChips.length !== 0 && <HelpTooltip tooltipText={chipTooltipText}/> }
                </Grid>
            </Grid>
        </Grid>
    }

    return <Grid container>
        <Grid item xs={12} sm={12} md={12}>
            { getPeriodosRadioButtons() }
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
            { isLoading.current ? <CircularProgress/> :  getMultiChart() }
            <CustomPopover ingresosYGastos={ingresosYGastos} setIngresosYGastosCallback={setIngresosYGastos}/>
        </Grid>
    </Grid>
}

export default AhorroYProyeccionChart