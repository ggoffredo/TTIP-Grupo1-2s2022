import {FormControl} from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const SubmitButton = ({label}) => {
    return <Grid item>
        <FormControl sx={{ width: '200px' }} variant="standard" margin="dense">
            <Button variant="outlined" size="large" type="submit"> {label} </Button>
        </FormControl>
    </Grid>
}

export default SubmitButton;