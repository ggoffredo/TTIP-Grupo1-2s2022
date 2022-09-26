import ChartCard from "../ChartCard";
import Grid from "@mui/material/Grid";
import BarChart from "../Core/Charts/BarChart";

const getBarChartData = (ipc, pfIntereses) => {
    return {
        Inlfacion: ipc,
        InteresesPlazoFijo: pfIntereses
    };
}

const getBarChart = (ipc, pfIntereses) => {
    return <BarChart
        data={getBarChartData(ipc, pfIntereses)}
    />
}

const InversionesVsIPCChart = ({ipc, pfIntereses, title}) => {
    return <Grid item xs={2} sm={4} md={4}>
        <ChartCard
            chart={getBarChart(ipc, pfIntereses)}
            title={title}
        />
    </Grid>
}

export default InversionesVsIPCChart