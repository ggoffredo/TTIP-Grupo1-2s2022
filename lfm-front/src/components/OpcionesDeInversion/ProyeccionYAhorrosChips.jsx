import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import ChipCore from "../Core/ChipCore";
import {Tooltip} from "@material-ui/core";
import Interrogate from "../../resources/interrogate.png";

const ProyeccionYAhorrosChips  = ({proyeccion, ahorros}) => {

    const chipTooltipText = "La proyección se calcula como el promedio del excedente de los ingresos mensuales. Los ahorros son la sumatoria de dichos excedentes."

    const getChips = () => {
        return (
            <>
                <ChipCore labelContent={`Proyección: $${proyeccion}`} key="proyeccion"/>
                <ChipCore labelContent={`Ahorros: $${ahorros}`} key="ahorros"/>

                <Tooltip title= {chipTooltipText} placement="right-start">
                    <img src={Interrogate} alt="Ayuda" style={{height: '18px', margin: '0.5%' }}/>
                </Tooltip>
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