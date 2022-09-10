import {FormControl} from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import React from "react";

const CalculateButton = () => {
    return <Grid item>
        <FormControl sx={{ width: '200px' }} variant="standard" margin="dense">
            <Button variant="outlined" size="large" type="submit"> Calcular </Button>
        </FormControl>
    </Grid>
}

export default CalculateButton;