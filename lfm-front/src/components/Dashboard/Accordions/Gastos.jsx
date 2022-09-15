import GastosTable from "../../CustomTables/GastosTable";
import AccordionCore from "../../Core/AccordionCore";
import CurrentMonthGastos from "../../CustomCharts/CurrentMonthGastos";

const Gastos = ({gastosMesEnCurso}) => {
    return <AccordionCore
        title={'Gastos'}
        spacing={2}
        children={
            <>
                <CurrentMonthGastos gastosMesEnCurso={gastosMesEnCurso}/>
                <GastosTable/>
            </>
        }
    />
}

export default Gastos