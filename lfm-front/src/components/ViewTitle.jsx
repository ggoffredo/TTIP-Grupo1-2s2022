import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

const ViewTitle = ({title}) => {
    return <Grid item xs={12}>
        <p style={{fontFamily: 'Staatliches', fontSize: '70px', marginTop: 0, marginBottom: 0, textAlign: 'left', color: '#243193'}}>{title}</p>
        <Divider sx={{borderColor: '#219DF7'}}/>
    </Grid>
}

export default ViewTitle;