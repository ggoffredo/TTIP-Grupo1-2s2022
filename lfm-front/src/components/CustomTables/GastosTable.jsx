import {useEffect, useState} from 'react';
import ChartCard from "../Core/Charts/ChartCard";
import Grid from "@mui/material/Grid";
import StyledTable from "../Core/StyledTable";
import {getGastosForUserId} from "../../services/GastosService";
import useUser from "../CustomHooks/UseUser";

const GastosTable = () => {
    const [gastos, setGastos] = useState([])
    const {user} = useUser()

    useEffect(() => {
        getGastosForUserId(user.id).then(res => setGastos(res))
    }, [user]);

    return (
        <Grid item xs={12} sm={12} md={6}>
            <ChartCard
                Chart={StyledTable}
                chartData={gastos}
                headers={['Descripcion', 'Monto', 'Fecha']}
                title={'Gastos históricos'}
            />
        </Grid>
    );
}

export default GastosTable;