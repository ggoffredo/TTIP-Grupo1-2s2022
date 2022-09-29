import ChartCard from "../Core/Charts/ChartCard";
import Grid from "@mui/material/Grid";
import BarChart from "../Core/Charts/BarChart";

const getBarChartData = (ipc, pfIntereses) => {
    return {
        'Inflación': ipc,
        'Interés Plazo Fijo': pfIntereses
    }
}

const getBarChart = (ipc, pfIntereses) => {
    return <BarChart
        data={getBarChartData(ipc, pfIntereses)}
    />
}

const InversionesVsIPCChart = ({ipc, pfIntereses, title}) => {
    return <Grid item xs={8} sm={8} md={8}>
        <ChartCard
            chart={getBarChart(ipc, pfIntereses)}
            title={title}
        />
    </Grid>
}

export default InversionesVsIPCChart