import Grid from "@mui/material/Grid";
import ChartCard from "../Core/Charts/ChartCard";
import MultiChart from "../Core/Charts/MultiChart";
import {useEffect, useState} from "react";
import {getAhorrosForUserId} from "../../services/AhorrosService";
import useUser from "../CustomHooks/UseUser";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";

const AhorroYProyeccionChart = () => {
    const periodosDisponibles = [
        { label: '1 mes', value: 1 },
        { label: '3 meses', value: 3 },
        { label: '6 meses', value: 6 },
        { label: '12 meses', value: 12 }
    ]
    const [ahorros, setAhorros] = useState([])
    const [periodoSeleccionado, setPeriodoSeleccionado] = useState(1)
    const {user} = useUser()


    function getAhorros() {
        getAhorrosForUserId(user.id, {meses: periodoSeleccionado}).then(res => setAhorros(res))
    }

    useEffect(() => {
        getAhorros()
    }, [periodoSeleccionado]);

    const getLabels = () => {
        return ahorros.map((a) => a.fecha)
    }

    const getAhorrosValues = () => {
        let labels = getLabels()
        let values = ahorros.filter((a)=> (Date.parse(a.fecha) <= Date.now())).map((a)=> a.actual)
        return {
            labels: labels,
            values: values
        }
    }

    const getAhorrosProyectadosValues = () => {
        let ahorrosProyectados = ahorros
        let labels = ahorrosProyectados.map((a) => a.fecha)
        let values = ahorrosProyectados.map((a)=> a.actual)
        return {
            labels: labels,
            values: values
        }
    }

    const getAhorrosAcumuladosValues = () => {
        let labels = getLabels()
        let values = ahorros.filter((a)=> (Date.parse(a.fecha) <= Date.now())).map((a) => a.acumulado)
        return {
            labels: labels,
            values: values
        }
    }

    const getAhorrosAcumuladosProyectadosValues = () => {
        let labels = getLabels()
        let values = ahorros.map((a) => a.acumulado)
        return {
            labels: labels,
            values: values
        }
    }

    const getData = () => {
        let ahorrosData = getAhorrosValues()
        let ahorrosProyectadosData = getAhorrosProyectadosValues()
        let ahorrosAcumuladosData = getAhorrosAcumuladosValues()
        let ahorrosAcumuladosProyectadosData = getAhorrosAcumuladosProyectadosValues()
        return [{
                type: 'line',
                fill: false,
                labels: ahorrosData.labels,
                values: ahorrosData.values,
                title: "Ahorros mensuales",
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgb(255, 99, 132)'
            },{
                type: 'line',
                fill: false,
                labels: ahorrosProyectadosData.labels,
                values: ahorrosProyectadosData.values,
                title: "Ahorros mensuales proyectados",
                borderColor: 'rgb(255,193,99)',
                backgroundColor: 'rgb(255,193,99)'
            },
            {
                type: 'line',
                fill: true,
                labels: ahorrosAcumuladosData.labels,
                values: ahorrosAcumuladosData.values,
                title: "Ahorros acumulados",
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgb(53, 162, 235)'
            },
            {
                type: 'line',
                fill: true,
                labels: ahorrosAcumuladosProyectadosData.labels,
                values: ahorrosAcumuladosProyectadosData.values,
                title: "Ahorros acumulados proyectados",
                borderColor: 'rgb(53,235,180)',
                backgroundColor: 'rgb(53,235,180)'
            }]
    }

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }

    function handleClick(event) {
        console.log(event.target.value)
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

    return <Grid item xs={12} sm={12} md={12}>
        { getPeriodosRadioButtons() }
        <ChartCard options={options} Chart={MultiChart} chartData={getData()} title={"Ahorros y proyección de inversiones"} />
    </Grid>
}

export default AhorroYProyeccionChart