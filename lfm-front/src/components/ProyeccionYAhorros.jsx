import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";

const ProyeccionYAhorro  = ({proyeccion, ahorros}) => {

    const getChips = () => {
        return (
            <>
                <Chip label={`Proyección: $${proyeccion}`} color="#152377" variant="outlined" key="proyeccion"/>
                <Chip label={`Ahorros: $${ahorros}`} color="#152377" variant="outlined" key="ahorros"/>
            </>
        )
    }

    return <Grid item xs={12}>
        <Stack direction="row" spacing={1}>
            {getChips()}
        </Stack>
    </Grid>
}

export default ProyeccionYAhorro