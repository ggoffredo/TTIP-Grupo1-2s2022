import Grid from "@mui/material/Grid";
import { Avatar, Card, CardContent, Typography } from '@mui/material';
import MoneyIcon from '@mui/icons-material/AttachMoney';
import PercentIcon from '@mui/icons-material/Percent';
import {getDolarValues} from "../../services/CotizacionService";
import {useEffect, useState} from "react";
import { green } from '@mui/material/colors';
import {getIPCValue} from "../../services/IPCService";

const DolarAndIPCValues = () => {
    const [dolares, setDolares] = useState([])
    const [ipc, setIpc] = useState({})

    useEffect(() => {
        getDolarValues().then(res => setDolares(res))
        getIPCValue().then(res => setIpc(res))
    }, [])

    const getChips = () => {
        const icon = <Avatar sx={{bgcolor: green[500], height: 56, width: 56}}><MoneyIcon/></Avatar>
        return dolares.map(dolar => {
            let name = dolar['nombre']
            let value = dolar['venta']
            return getCard(name, `$${value}`, icon)
        })
    }

    const getIpc = () => {
        const icon = <Avatar sx={{bgcolor: green[500], height: 56, width: 56}}><PercentIcon/></Avatar>
        return getCard(`IPC ${ipc.month}`, `${ipc.value}%`, icon)
    }

    const getCard = (title, content, icon) => {
        return <Grid item xs={12} md={3}>
            <Card sx={{ height: '100%', border: '1px solid #152377'}}>
                <CardContent>
                    <Grid container spacing={3} sx={{ justifyContent: 'space-between' }} alignItems="center">
                        <Grid item>
                            <Typography color="textSecondary" gutterBottom variant="overline">
                                {title}
                            </Typography>
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

    return <Grid container item spacing={1}>
        {getChips()}
        {ipc.value && getIpc()}
    </Grid>
}

export default DolarAndIPCValues