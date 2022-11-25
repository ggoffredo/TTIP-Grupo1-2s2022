import {useEffect, useState} from 'react';
import ChartCard from "../Core/Charts/ChartCard";
import Grid from "@mui/material/Grid";
import {getGastosForUserId} from "../../services/GastosService";
import useUser from "../CustomHooks/UseUser";
import PaginatedStyledTable from "../Core/PaginatedStyledTable";

const GastosTable = () => {
    const [gastos, setGastos] = useState([])
    const {user} = useUser()

    useEffect(() => {
        getGastosForUserId(user.id).then(res => setGastos(mapGastos(res)))
    }, [user]);

    const mapGastos = (gastos) => {
        return gastos.map(gasto => {
            gasto.duracion === 0
                ? gasto.tipo = "Fijo"
                : gasto.tipo = "Ocasional"
            gasto.duracion === 0
                ? gasto.cuotas = 1
                : gasto.cuotas = gasto.duracion
            return gasto
        })
    }

    return (
        <Grid item xs={12} sm={12} md={8}>
            <ChartCard
                Chart={PaginatedStyledTable}
                chartData={gastos}
                headers={['Descripcion', 'Monto', 'Fecha', 'Tipo', 'Cuotas']}
                title={'Gastos históricos'}
            />
        </Grid>
    );
}

export default GastosTable;