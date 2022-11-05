import Grid from "@mui/material/Grid";
import ChartCard from "../Core/Charts/ChartCard";
import MultiChart from "../Core/Charts/MultiChart";
import {useEffect, useRef, useState} from "react";
import {getAhorrosForUserId, getAhorrosInvertidosForUserId} from "../../services/AhorrosService";
import useUser from "../CustomHooks/UseUser";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import Utils from "../../helpers/Utils";
import {CircularProgress} from "@material-ui/core";

const AhorroYProyeccionChart = ({inversiones}) => {
    const periodosDisponibles = [
        { label: '1 mes', value: 1 },
        { label: '3 meses', value: 3 },
        { label: '6 meses', value: 6 },
        { label: '12 meses', value: 12 }
    ]
    const [ahorros, setAhorros] = useState([])
    const [ahorrosInvertidos, setAhorrosInvertidos] = useState([])
    const [periodoSeleccionado, setPeriodoSeleccionado] = useState(1)
    const isLoading = useRef(true)
    const {user} = useUser()

    useEffect(() => {
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
    }, [periodoSeleccionado]);

    const getAhorros = () => {
        return getAhorrosForUserId(user.id, {meses: periodoSeleccionado})
    }

    const getAhorrosInvertidos = (tipo = "Plazos Fijos", nombre = "Banco Galicia") => {
        return getAhorrosInvertidosForUserId(
            user.id,
            {
                meses: periodoSeleccionado,
                tipo: tipo,
                nombre: nombre
            }
        )
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
        return doGetMappedFormatedData(ahorrosInvertidos, "acumulado")
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
        const ahorrosInvertidosData = getAhorrosInvertidosValues()
        return [
            doGetData(ahorrosData, "Ahorros mensuales", 'rgb(255, 99, 132)'),
            doGetData(ahorrosProyectadosData, "Ahorros mensuales proyectados", 'rgb(255, 193, 99)'),
            doGetData(ahorrosAcumuladosData, "Ahorros acumulados", 'rgb(53, 162, 235)', true),
            doGetData(ahorrosAcumuladosProyectadosData, "Ahorros acumulados proyectados", 'rgb(53, 235, 180)', true),
            doGetData(ahorrosInvertidosData, "Ahorros acumulados invertidos proyectados", 'rgb(6, 51, 241)', true),
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

    const getPeriodosRadioButtons = () => {
        return <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Período</FormLabel>
            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" defaultValue={periodoSeleccionado} onChange={handleClick}>
                { periodosDisponibles.map(periodo => <FormControlLabel value={periodo.value} control={<Radio/>} label={periodo.label} />)}
            </RadioGroup>
        </FormControl>
    }

    return <Grid container>
        <Grid item xs={12} sm={12} md={12}>
            { getPeriodosRadioButtons() }
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
            { isLoading.current ? <CircularProgress/> : <ChartCard options={options} Chart={MultiChart} chartData={getData()} title={"Ahorros y proyección de inversiones"} />}
        </Grid>
    </Grid>
}

export default AhorroYProyeccionChart