import PlazosFijosTable from "../../CustomTables/PlazosFijosTable";
import AccordionCore from "../../Core/AccordionCore";

const PlazosFijos = () => {
    return <AccordionCore
        title={'Plazos fijos'}
        spacing={1}
        children={<PlazosFijosTable/>}
    />
}

export default PlazosFijos