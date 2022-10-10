import ChartCard from "../Core/Charts/ChartCard";
import Grid from "@mui/material/Grid";
import BarChart from "../Core/Charts/BarChart";
import {useEffect, useState} from "react";

const InversionesVsIPCChart = ({inversiones, title}) => {
    const [barChartData, setBarChartData] = useState({})

    const populateBarChartData = () => {
        setBarChartData(getBarChartData())
    }

    const getBarChartData = () => {
        return Object.values(inversiones).flat()
            .reduce((obj, key) => {
                return {
                    ...obj,
                    [key.nombre]: key.tasaDeVariacion
                };
            }, {})
    }

    useEffect(() => {
        populateBarChartData()
    }, [inversiones])

    return <Grid item xs={12} sm={12} md={12}>
        <ChartCard
            chart={<BarChart data={barChartData}/>}
            title={title}
        />
    </Grid>
}

export default InversionesVsIPCChart