import {useEffect, useState} from 'react';
import ChartCard from "../Core/Charts/ChartCard";
import Grid from "@mui/material/Grid";
import StyledTable from "../Core/StyledTable";
import {getPlazosFijos} from "../../services/PlazosFijosService";

const PlazosFijosTable = () => {
    const [plazosFijos, setPlazosFijos] = useState([])

    useEffect(() => {
        getPlazosFijos().then(res => setPlazosFijos(res))
    }, []);

    return (
        <Grid item xs={12} sm={12} md={12}>
            <ChartCard
                Chart={StyledTable}
                chartData={plazosFijos}
                headers={['Banco', 'Moneda', 'Monto', 'Plazo', 'Tasa']}
                title={'Plazos Fijos'}
            />
        </Grid>
    );
}

export default PlazosFijosTable;