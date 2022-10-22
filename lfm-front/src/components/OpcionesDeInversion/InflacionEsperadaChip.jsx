import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import ChipCore from "../Core/ChipCore";
import {useEffect, useState} from "react";
import {getInflacionEsperadaValue} from "../../services/IPCService";
import HelpTooltip from "../HelpTooltip";

const InflacionEsperadaChip = () => {

    const chipTooltipText = "La infación esperada oficial, es la inflación total anual que se espera para el 31/12."
    const [inflacionEsperada, setInflacionEsperada] = useState(0)

    useEffect(() => {
        getInflacionEsperada()
    }, [])

    const getInflacionEsperada = async () => {
        let inflacionEsperadaApi = await getInflacionEsperadaValue()
        setInflacionEsperada(inflacionEsperadaApi)
    }

    const getChips = () => {
        return (
            <>
                <ChipCore labelContent={`Inflación Esperada: %${inflacionEsperada}`} key="inflacionEsperada"/>

                <HelpTooltip tooltipText={chipTooltipText}/>
            </>
        )
    }

    return <Grid item xs={12} style={{marginTop: '10px'}}>
        <Stack direction="row" spacing={1}>
            {getChips()}
        </Stack>
    </Grid>
}

export default InflacionEsperadaChip