import Grid from "@mui/material/Grid";
import ChartCard from "../Core/Charts/ChartCard";
import MultiChart from "../Core/Charts/MultiChart";
import {useEffect, useState} from "react";

const AhorroYProyeccionChart = () => {
    const [ahorros, setAhorros] = useState([])


    async function getAhorros() {
        //TODO: Deshardcodear
        setAhorros( [{
            fecha: "2022-09-01",
            actual: 82500,
            acumulado: 430000
            },{
            fecha: "2022-10-01",
            actual: 103000,
            acumulado: 533000
            }]
        )
    }

    useEffect(() => {
        getAhorros()
    }, []);

    const getLabels = () => {
        return ahorros.map((a) => a.fecha)
    }

    const getAhorrosValues = () => {
        let labels = getLabels()
        let values = ahorros.map((a)=> a.actual)
        return {
            labels: labels,
            values: values
        }
    }

    const getProyeccionValues = () => {
        let labels = getLabels()
        let values = ahorros.map((a) => a.acumulado)
        return {
            labels: labels,
            values: values
        }
    }

    const getData = () => {
        let ahorrosData = getAhorrosValues()
        let proyeccionData = getProyeccionValues()
        return [{
                type: 'line',
                fill: false,
                labels: ahorrosData.labels,
                values: ahorrosData.values,
                title: "Ahorros",
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)'
            },
            {
                type: 'line',
                fill: true,
                labels: proyeccionData.labels,
                values: proyeccionData.values,
                title: "Proyección de ahorros",
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)'
            }]
    }

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }

    return <Grid item xs={12} sm={12} md={12}>
        <ChartCard options={options} Chart={MultiChart} chartData={getData()} title={"Liquidéz y proyección de inversiones"} />
    </Grid>
}

export default AhorroYProyeccionChart