import ChartCard from "../Core/Charts/ChartCard";
import Grid from "@mui/material/Grid";
import DoughnutChart from "../Core/Charts/DoughnutChart";

const getDoughnutChartData = (ingresos, gastos) => {
    return {
        Gastos: gastos,
        Libre: ingresos - gastos
    };
}

const GastosIngresosDoughnutChart = ({ingresos, gastos, title}) => {
    return <Grid item xs={12} sm={8} md={5} lg={4}>
        <ChartCard
            Chart={DoughnutChart}
            label={`Ingresos: ${ingresos}`}
            title={title}
            chartData={getDoughnutChartData(ingresos, gastos)}
        />
    </Grid>
}

export default GastosIngresosDoughnutChart