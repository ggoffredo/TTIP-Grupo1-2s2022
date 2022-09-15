import GastosIngresosDoughnutChart from "../../CustomCharts/GastosIngresosDoughnutChart";
import AccordionCore from "../../Core/AccordionCore";
import {arraySum} from "../../../helpers/Utils";

const GastosVsIngresos = ({gastos, ingresos}) => {
    const getMontoTotalFromLastMonth = (data) => {
        return data.at(-1)?.montoTotal
    }

    const getSummarizedMontoTotalFromLastMonth = (data) => {
        return arraySum(data, 'montoTotal')
    }

    return <AccordionCore
        title={'Gastos vs Ingresos'}
        spacing={10}
        children={
            <>
                <GastosIngresosDoughnutChart
                    gastos={getMontoTotalFromLastMonth(gastos)}
                    ingresos={getMontoTotalFromLastMonth(ingresos)}
                    title={'Mes en curso'}
                />
                <GastosIngresosDoughnutChart
                    gastos={getSummarizedMontoTotalFromLastMonth(gastos)}
                    ingresos={getSummarizedMontoTotalFromLastMonth(ingresos)}
                    title={'Histórico'}
                />
            </>
        }
    />
}

export default GastosVsIngresos