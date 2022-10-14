import {useEffect, useState} from 'react';
import ChartCard from "../Core/Charts/ChartCard";
import Grid from "@mui/material/Grid";
import StyledTable from "../Core/StyledTable";
import {getPlazosFijos} from "../../services/PlazosFijosService";

const ConstitucionPlazosFijosTable = ({monto, inversiones}) => {
    const [plazosFijos, setPlazosFijos] = useState([])

    function doGetPFData(pf) {
        pf.monto = monto;
        // TODO: Cambiar plazo
        pf['intereses'] = ((pf.tasa * 30 / 365) * monto / 100).toFixed(2);
        return pf
    }

    useEffect(() => {
        getPlazosFijos().then(res => {
            let availablePFs = inversiones["Plazos Fijos"].map(pf => pf.nombre)
            let pfs = res.filter(pf => availablePFs.includes(pf.banco)).map(pf => doGetPFData(pf))
            setPlazosFijos(pfs);
        })
    }, [monto, inversiones]);

    return (
        <Grid item xs={12} sm={12} md={12}>
            <ChartCard
                Chart={StyledTable}
                chartData={plazosFijos}
                headers={['Banco', 'Moneda', 'Monto', 'Plazo', 'Tasa', 'Intereses']}
                title={'Constitución de Plazos Fijos'}
            />
        </Grid>
    );
}

export default ConstitucionPlazosFijosTable;