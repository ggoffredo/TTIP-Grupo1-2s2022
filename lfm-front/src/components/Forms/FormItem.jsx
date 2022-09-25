import {FormControl, InputLabel} from "@mui/material";
import Grid from "@mui/material/Grid";

const FormItem = ({label, input, hasError = false}) => {
    return <Grid item>
        <FormControl sx={{ width: '200px' }} variant="standard" margin="dense" error={Boolean(hasError)}>
            <InputLabel htmlFor="bank-select">{label}</InputLabel>
            {input}
        </FormControl>
    </Grid>
}

export default FormItem;