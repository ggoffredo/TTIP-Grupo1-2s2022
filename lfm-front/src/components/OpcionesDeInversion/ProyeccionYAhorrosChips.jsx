import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import ChipCore from "../Core/ChipCore";
import HelpTooltip from "../HelpTooltip";

const ProyeccionYAhorrosChips  = ({proyeccion, ahorros}) => {

    const chipTooltipText = "La proyección se calcula como el promedio del excedente de los ingresos mensuales. Los ahorros son la sumatoria de dichos excedentes."

    const getChips = () => {
        return (
            <>
                <ChipCore labelContent={`Proyección: $${proyeccion}`} key="proyeccion"/>
                <ChipCore labelContent={`Ahorros: $${ahorros}`} key="ahorros"/>

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

export default ProyeccionYAhorrosChips