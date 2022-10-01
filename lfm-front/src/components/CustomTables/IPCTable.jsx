import {useEffect, useState} from 'react';
import ChartCard from "../Core/Charts/ChartCard";
import Grid from "@mui/material/Grid";
import StyledTable from "../Core/StyledTable";
import {getIPCMensuales} from "../../services/IPCService";
import Utils from "../../helpers/Utils";

const IPCTable = () => {
    const [ipcs, setIpcs] = useState([])

    const getIPCTable = (data) => {
        return <StyledTable data={data} headers={['Mes', 'Valor']}/>
    }

    const getIPCs = () => {getIPCMensuales().then(res => mapAndSetIPCs(res))}

    const mapAndSetIPCs = (ipcs) => {
        let ipcsMap = ipcs.map(ipc => {
            let month = Utils.getMonthStringFormatted(ipc['month'])
            let value =  ipc['value']
            return {mes: month, valor: value}
        })
        setIpcs(ipcsMap)
    }

    useEffect(() => {
        getIPCs()
    }, [])

    return (
        <Grid item xs={12} sm={12} md={12}>
            <ChartCard chart={getIPCTable(ipcs)} title={'Inflación mensual'}/>
        </Grid>
    );
}

export default IPCTable