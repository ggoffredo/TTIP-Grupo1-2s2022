import Grid from "@mui/material/Grid";
import HelpTooltip from "../HelpTooltip";
import {Avatar, Card, CardContent, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {getInflacionEsperadaValue} from "../../services/IPCService";
import SavingsIcon from '@mui/icons-material/Savings';
import {green} from "@mui/material/colors";
import PercentIcon from "@mui/icons-material/Percent";

const ProyeccionAhorrosIPCEsperadoCards  = ({proyeccion, ahorros}) => {

    const chipTooltipTextProyeccion = "La proyección se calcula como el promedio del excedente de los ingresos mensuales. Los ahorros son la sumatoria de dichos excedentes."
    const chipTooltipTextInflacion = "La infación esperada oficial, es la inflación esperada para los próximos 12 meses"
    const [inflacionEsperada, setInflacionEsperada] = useState(0)

    useEffect(() => {
        getInflacionEsperadaValue().then(res => setInflacionEsperada(res))
    }, [])

    const getCard = (title, content, icon, tooltipText) => {
        return <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', border: '1px solid #152377'}}>
                <CardContent>
                    <Grid container spacing={3} sx={{ justifyContent: 'space-between' }} alignItems="center">
                        <Grid item>
                            <Grid container item alignItems="center">
                                <Grid item>
                                    <Typography color="textSecondary" gutterBottom variant="overline">
                                        {title}
                                    </Typography>
                                </Grid>
                                {tooltipText && <Grid item>
                                    <HelpTooltip tooltipText={tooltipText}/>
                                </Grid>}
                            </Grid>
                            <Typography color="textPrimary" variant="h4">
                                {content}
                            </Typography>
                        </Grid>
                        <Grid item>
                            {icon}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    }

    const getProyeccionYAhorrosCards = () => {
        const proyeccionIcon = <Avatar sx={{bgcolor: green[500], height: 56, width: 56}}><SavingsIcon/></Avatar>
        const percentIcon = <Avatar sx={{bgcolor: green[500], height: 56, width: 56}}><PercentIcon/></Avatar>
        return <>
            {getCard('Proyección', `$${proyeccion}`, proyeccionIcon, chipTooltipTextProyeccion)}
            {getCard('Ahorros', `$${ahorros}`, proyeccionIcon)}
            {getCard('Inflación Esperada', `${inflacionEsperada}%`, percentIcon, chipTooltipTextInflacion)}
        </>
    }

    return <Grid container item style={{marginTop: '10px'}} spacing={2}>
        {getProyeccionYAhorrosCards()}
    </Grid>
}

export default ProyeccionAhorrosIPCEsperadoCards