import ChartCard from "../Core/Charts/ChartCard";
import Grid from "@mui/material/Grid";
import BarChart from "../Core/Charts/BarChart";
import {useEffect, useRef, useState} from "react";
import ClickableChip from "../ClickableChip";

const InversionesVsIPCChart = ({inversiones, title}) => {
    const [barChartData, setBarChartData] = useState({})
    const [chartChips, setChartChips] = useState([])
    const enabledChips = useRef([])

    const populateBarChartData = () => {
        setBarChartData(filterInversiones())
        initChartChips()
    }

    const filterInversiones = () => {
        return Object.values(inversiones).flat()
            .filter(key => enabledChips.current.includes(key.nombre))
            .reduce((obj, key) => {
                return {
                    ...obj,
                    [key.nombre]: key.tasaDeVariacion
                };
            }, {})
    }

    const handleClick = (chipKey) => {
        enabledChips.current = enabledChips.current.concat(chipKey)
        populateBarChartData()
    }

    const handleDelete = (chipKey) => {
        enabledChips.current = enabledChips.current.filter( key => key !== chipKey)
        populateBarChartData()
    }

    const initChartChips = () => {
        if (!barChartData) return
        let chips = Object.keys(barChartData).map( chartKey => {
            return <ClickableChip key={chartKey} chartLabel={chartKey} onPressClick={handleClick} onPressDelete={handleDelete}/>
        })
        setChartChips(chips)
    }

    const getNamesFromInversiones = () => {
        return Object.values(inversiones).map( arr => arr.map( inv => inv.nombre)).flat()
    }

    useEffect(() => {
        enabledChips.current = getNamesFromInversiones()
        populateBarChartData()
    }, [inversiones])

    return <Grid item xs={12} sm={12} md={12}>
        <ChartCard
            chart={
                <>
                    { chartChips }
                    <BarChart data={barChartData}/>
                </>
            }
            title={title}
        />
    </Grid>
}

export default InversionesVsIPCChart