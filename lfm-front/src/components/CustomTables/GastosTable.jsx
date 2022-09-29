import {useEffect, useState} from 'react';
import ChartCard from "../Core/Charts/ChartCard";
import Grid from "@mui/material/Grid";
import StyledTable from "../Core/StyledTable";
import {getGastosForUserId} from "../../services/GastosService";
import useUser from "../CustomHooks/UseUser";

const getGastosTable = (data) => {
    return <StyledTable data={data} headers={['Descripcion', 'Monto', 'Fecha']}/>
}

const GastosTable = () => {
    const [gastos, setGastos] = useState([])
    const {user} = useUser()

    async function getGastos() {
        let gastosApi = await getGastosForUserId(user.id);
        setGastos(gastosApi);
    }

    useEffect(() => {
        getGastos()
    }, [user]);

    return (
        <Grid item xs={12} sm={12} md={6}>
            <ChartCard chart={getGastosTable(gastos)} title={'Gastos históricos'}/>
        </Grid>
    );
}

export default GastosTable;