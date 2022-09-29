import {useEffect, useState} from 'react';
import ChartCard from "../Core/Charts/ChartCard";
import Grid from "@mui/material/Grid";
import StyledTable from "../Core/StyledTable";
import {getPlazosFijos} from "../../services/PlazosFijosService";

const ConstitucionPlazosFijosTable = ({monto}) => {
    const [plazosFijos, setPlazosFijos] = useState([])

    const getPlazosFijosTable = (data) => {
        return <StyledTable data={data} headers={['Banco', 'Moneda', 'Monto', 'Plazo', 'Tasa', 'Intereses']}/>
    }

    const getPlazosFijosData = async () => {
        let plazosFijosApi = await getPlazosFijos();
        plazosFijosApi.map(pf => {
            return doGetPFData(pf);
        })
        setPlazosFijos(plazosFijosApi);
    }

    function doGetPFData(pf) {
        pf.monto = monto;
        // TODO: Cambiar plazo
        pf['intereses'] = ((pf.tasa * 30 / 365) * monto / 100).toFixed(2);
        return pf
    }

    useEffect(() => {
        getPlazosFijosData()
    }, [monto]);

    return (
        <Grid item xs={12} sm={12} md={12}>
            <ChartCard chart={getPlazosFijosTable(plazosFijos)} title={'Constitución de Plazos Fijos'}/>
        </Grid>
    );
}

export default ConstitucionPlazosFijosTable;