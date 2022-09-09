import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import {getDolarValues} from "../services/DolarSiService";
import {useEffect, useState} from "react";
import {capitalize} from "../helpers/Utils";

const DolarValues = () => {
    const [dolares, setDolares] = useState([])

    useEffect(() => {
        getDolares()
    }, [])

    const getDolares = async () => {
        let dolaresApi = await getDolarValues()
        setDolares(dolaresApi)
    }

    const normalizeName = (name) => {
        return name.split(" ").map(namePart => {return capitalize(namePart)}).join(" ")
    }

    const normalizeValue = (value) => {
        return Number(value.replace(",", ".")).toFixed(2).replace(".", ",")
    }

    const getChips = () => {
        return dolares.map(dolar => {
            let name = normalizeName(dolar['casa']['nombre'])
            let value = normalizeValue(dolar['casa']['venta'])
            return <Chip label={`${name}: $${value}`} color="success" variant="outlined" key={name}/>
        })
    }

    return <Grid item xs={12}>
        <Stack direction="row" spacing={1}>
            {getChips()}
        </Stack>
    </Grid>
}

export default DolarValues