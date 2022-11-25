import Utils from "../../helpers/Utils";
import LineChart from "../Core/Charts/LineChart";
import Grid from "@mui/material/Grid";
import ChartCard from "../Core/Charts/ChartCard";

const CurrentMonthGastos = ({gastosMesEnCurso}) => {

    const getValues = () => {
        const gastos = Utils.formatToCurrentMonth(gastosMesEnCurso?.gastos ?? [])
        const labels = Object.keys(gastos)
        const montos = Object.values(gastos)
        return {
            labels: labels,
            values: montos
        }
    }

    const getData = () => {
        let chartData = getValues()
        return {
            labels: chartData.labels,
            values: chartData.values,
            title: "Gastos mes en curso"
        }
    }

    return <Grid item xs={12} sm={12} md={8}>
        <ChartCard Chart={LineChart} chartData={getData()} title={'Gastos mes en curso'}/>
    </Grid>
}

export default CurrentMonthGastos