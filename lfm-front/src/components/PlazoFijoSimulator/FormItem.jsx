import {FormControl, InputLabel} from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";

const FormItem = ({label, input}) => {
    return <Grid item>
        <FormControl sx={{ width: '200px' }} variant="standard" margin="dense">
            <InputLabel htmlFor="bank-select">{label}</InputLabel>
            {input}
        </FormControl>
    </Grid>
}

export default FormItem;