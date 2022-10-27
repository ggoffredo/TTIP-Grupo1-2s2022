import LineChart from "../Core/Charts/LineChart";
import Grid from "@mui/material/Grid";
import ChartCard from "../Core/Charts/ChartCard";

const AhorroYProyeccionChart = () => {

    const getLabels = () => {
        //TODO: Obtener desde el back
        return ['Septiembre', 'Octubre']
    }

    function getMontos() {
        //TODO: Obtener desde el back
        return [100,200];
    }

    const getValues = () => {
        let labels = getLabels()
        let values = getMontos()
        return {
            labels: labels,
            values: values
        }
    }

    const getData = () => {
        let chartData = getValues()
        return {
            type: 'line',
            labels: chartData.labels,
            values: chartData.values,
            title: "Liquidéz"
        }
    }

    return <Grid item xs={12} sm={12} md={12}>
        <ChartCard Chart={LineChart} chartData={getData()} title={"Liquidéz y proyección de inversiones"} />
    </Grid>
}

export default AhorroYProyeccionChart