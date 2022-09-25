import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import {getIPCValue} from "../../services/IPCService";
import {useEffect, useState} from "react";
import ChipCore from "../Core/ChipCore";

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
        return <ChipCore labelContent={`IPC ${ipc.month}: ${ipc.value}%`} key={ipc.month}/>
    }

    return <Grid item xs={12}>
        <Stack direction="row" spacing={1}>
            {ipc.value && getChip()}
        </Stack>
    </Grid>
}

export default IPCValue