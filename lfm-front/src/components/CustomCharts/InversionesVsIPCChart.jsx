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
        let inversionesCopy = {...inversiones}
        const inf = inversionesCopy?.["Inflación"]?.shift()
        const res = Object.values(inversionesCopy).flat().sort((a, b) => {
            return b.tasaDeVariacion - a.tasaDeVariacion
        }).reduce((obj, key) => {
            return {
                ...obj,
                [key.nombre]: key.tasaDeVariacion
            };
        }, {})
        return {
            ...(inf && {["Inflación"]: inf?.tasaDeVariacion}),
            ...res
        }
    }

    useEffect(() => {
        populateBarChartData()
    }, [inversiones])

    return <Grid item xs={12} sm={12} md={12}>
        <ChartCard Chart={BarChart} title={title} chartData={barChartData}/>
    </Grid>
}

export default InversionesVsIPCChart