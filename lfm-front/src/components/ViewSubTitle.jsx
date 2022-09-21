import Grid from "@mui/material/Grid";

const ViewSubTitle = ({subTitle}) => {
    return <Grid item xs={12}>
        <p style={{fontFamily: 'Staatliches', fontSize: '40px', marginTop: '15px', marginBottom: '5px', textAlign: 'center', color: '#243193'}}>{subTitle}</p>
    </Grid>
}

export default ViewSubTitle;