import Grid from "@mui/material/Grid";
import ChartCard from "../Core/Charts/ChartCard";
import MultiChart from "../Core/Charts/MultiChart";

const AhorroYProyeccionChart = () => {

    const getLabels = () => {
        //TODO: Obtener desde el back
        return ['Septiembre', 'Octubre']
    }

    const getAhorrosValues = () => {
        let labels = getLabels()
        let values = [100,200]
        return {
            labels: labels,
            values: values
        }
    }

    const getProyeccionValues = () => {
        let labels = getLabels()
        let values = [90,200]
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