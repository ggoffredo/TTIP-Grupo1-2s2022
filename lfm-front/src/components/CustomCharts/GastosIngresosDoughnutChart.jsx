import ChartCard from "../ChartCard";
import Grid from "@mui/material/Grid";
import DoughnutChart from "../Core/Charts/DoughnutChart";

const getDoughnutChartData = (ingresos, gastos) => {
    return {
        Gastos: gastos,
        Libre: ingresos - gastos
    };
}

const getDoughnutChart = (ingresos, gastos) => {
    return <DoughnutChart
        data={getDoughnutChartData(ingresos, gastos)}
    />
}

const GastosIngresosDoughnutChart = ({ingresos, gastos, title}) => {
    return <Grid item xs={2} sm={4} md={4}>
        <ChartCard
            chart={getDoughnutChart(ingresos, gastos)}
            label={`Ingresos: ${ingresos}`}
            title={title}
        />
    </Grid>
}

export default GastosIngresosDoughnutChart