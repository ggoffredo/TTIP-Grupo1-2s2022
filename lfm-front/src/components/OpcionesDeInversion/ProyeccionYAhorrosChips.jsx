import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import ChipCore from "../Core/ChipCore";

const ProyeccionYAhorrosChips  = ({proyeccion, ahorros}) => {

    const getChips = () => {
        return (
            <>
                <ChipCore labelContent={`Proyección: $${proyeccion}`} key="proyeccion"/>
                <ChipCore labelContent={`Ahorros: $${ahorros}`} key="ahorros"/>
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