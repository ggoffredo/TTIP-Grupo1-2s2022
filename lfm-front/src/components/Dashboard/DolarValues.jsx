import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import {getDolarValues} from "../../services/CotizacionService";
import {useEffect, useState} from "react";

const DolarValues = () => {
    const [dolares, setDolares] = useState([])

    useEffect(() => {
        getDolares()
    }, [])

    const getDolares = async () => {
        let dolaresApi = await getDolarValues()
        setDolares(dolaresApi)
    }

    const getChips = () => {
        return dolares.map(dolar => {
            let name = dolar['nombre']
            let value = dolar['venta']
            return <Chip label={`${name}: $${value}`} variant="outlined" key={name} sx={{color: '#152377', border: '1px solid #152377'}}/>
        })
    }

    return <Grid item xs={12}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
            {getChips()}
        </Stack>
    </Grid>
}

export default DolarValues