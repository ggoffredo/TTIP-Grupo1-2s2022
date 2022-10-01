import {FormControl} from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const SubmitButton = ({label, color, variantType, dataTestId}) => {
    return <Grid item>
        <FormControl sx={{ width: '200px' }} variant="standard" margin="dense">
            <Button color={color || "primary"} variant={variantType || "outlined"} size="large" type="submit" data-testid={dataTestId}> {label} </Button>
        </FormControl>
    </Grid>
}

export default SubmitButton;