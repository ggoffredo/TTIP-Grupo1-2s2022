import Utils from "../../helpers/Utils";
import LineChart from "../Core/Charts/LineChart";
import Grid from "@mui/material/Grid";
import ChartCard from "../Core/Charts/ChartCard";

const CurrentMonthGastos = ({gastosMesEnCurso}) => {
    const getCorrectDate = (stringDate) => {
        let firstDayOfMonth = Utils.firstDayOfMonthStringFormatted();
        return Utils.getDateFromString(stringDate) > Utils.getDateFromString(firstDayOfMonth)
            ? stringDate
            : firstDayOfMonth
    }

    const getLabels = () => {
        let labels = gastosMesEnCurso?.gastos.map(gasto => getCorrectDate(gasto.fecha))
        return [...new Set(labels)]
    }

    const getValues = () => {
        // Muy hackish
        let labels = getLabels()
        let montos = gastosMesEnCurso?.gastos.map(gasto => gasto.monto)
        let splitIndex = montos?.length - labels.length + 1
        let first = montos?.slice(0, splitIndex).reduce((partialSum, e) => partialSum + e, 0)
        let second = montos?.slice(splitIndex, montos.length)
        let values = [first].concat(second)
        return {
            labels: labels,
            values: values
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

    return <Grid item xs={12} sm={12} md={6}>
        <ChartCard Chart={LineChart} chartData={getData()} title={'Gastos mes en curso'}/>
    </Grid>
}

export default CurrentMonthGastos