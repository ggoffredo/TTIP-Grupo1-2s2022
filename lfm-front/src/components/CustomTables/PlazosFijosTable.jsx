import {useEffect, useState} from 'react';
import ChartCard from "../Core/Charts/ChartCard";
import Grid from "@mui/material/Grid";
import StyledTable from "../Core/StyledTable";
import {getPlazosFijos} from "../../services/PlazosFijosService";

const PlazosFijosTable = () => {
    const [plazosFijos, setPlazosFijos] = useState([])

    const getPlazosFijosTable = (data) => {
        return <StyledTable data={data} headers={['Banco', 'Moneda', 'Monto', 'Plazo', 'Tasa']}/>
    }

    const getPlazosFijosData = async () => {
        let plazosFijosApi = await getPlazosFijos();
        setPlazosFijos(plazosFijosApi);
    }

    useEffect(() => {
        getPlazosFijosData()
    }, []);

    return (
        <Grid item xs={12} sm={12} md={12}>
            <ChartCard chart={getPlazosFijosTable(plazosFijos)} title={'Plazos Fijos'}/>
        </Grid>
    );
}

export default PlazosFijosTable;