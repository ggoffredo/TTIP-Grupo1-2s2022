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
        return Object.keys(inversiones)
            .filter(key => enabledChips.current.includes(key))
            .reduce((obj, key) => {
                return {
                    ...obj,
                    [key]: inversiones[key]
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

    useEffect(() => {
        enabledChips.current = Object.keys(inversiones)
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