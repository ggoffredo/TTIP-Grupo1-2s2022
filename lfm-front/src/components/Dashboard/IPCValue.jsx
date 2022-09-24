import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import {getIPCValue} from "../../services/IPCService";
import {useEffect, useState} from "react";

const IPCValue = () => {
    const [ipc, setIpc] = useState([])

    useEffect(() => {
        getIPC()
    }, [])

    const getIPC = async () => {
        let ipcApi = await getIPCValue()
        setIpc(ipcApi)
    }

    const getChip = () => {
        return <Chip label={`IPC ${ipc.month}: ${ipc.value}%`} color="primary" variant="outlined" key={ipc.month}/>
    }

    return <Grid item xs={12}>
        <Stack direction="row" spacing={1}>
            {getChip()}
        </Stack>
    </Grid>
}

export default IPCValue