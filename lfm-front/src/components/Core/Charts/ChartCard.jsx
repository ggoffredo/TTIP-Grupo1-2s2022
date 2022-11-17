import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box'
import Divider from "@mui/material/Divider";
import {CircularProgress} from "@material-ui/core";
import Grid from "@mui/material/Grid";

export default function ChartCard({options, Chart, title, label, chartData, headers, children}) {

    const labelComponent = () => {
        return label
            ? <Box sx={{width: 'fit-content', margin: 'auto'}}>
                <Paper elevation={1} sx={{padding: '5px'}}>
                    {label}
                </Paper>
            </Box>
            : null;
    }

    return <>
        <Card sx={{border: "1px solid #025c96", margin: '5px'}}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {title}
                </Typography>
                <div style={{margin: 5}}> <Divider/> </div>
                <Grid container direction="row">
                    <Grid item xs={12} md={children ? 9 : 12} lg={children ? 10 : 12}>
                        {labelComponent()}
                        {
                            chartData && Object.keys(chartData).length !== 0
                                ? <Chart customOptions={options} data={chartData} {...(headers && {headers: headers})}/>
                                : <CircularProgress/>
                        }
                    </Grid>
                    {children && <Grid item xs={12} md={3} lg={2}>
                        {children}
                    </Grid>}
                </Grid>
            </CardContent>
        </Card>
    </>
}