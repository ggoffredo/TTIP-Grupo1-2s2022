import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import EdicionesJournalEntry from "./EdicionesJournalEntry";

const EdicionesJournal = ({ingresosYGastos, setIngresosYGastosCallback}) => {

    const handleRemove = (indexToRemove) => {
        const temp = [...ingresosYGastos]
        temp.splice(indexToRemove, 1)
        setIngresosYGastosCallback(temp)
    }

    const getEntries = () => {
        return ingresosYGastos.length === 0
            ? <Typography variant="h7" component="div" sx={{color: 'darkgrey'}}>Sin ediciones</Typography>
            : ingresosYGastos.map((entry, index) => <EdicionesJournalEntry key={index} entry={entry} index={index} removeEntryCallback={handleRemove}/>)
    }

    return <Grid container direction="column">
        <Typography variant="h5" component="div">Ediciones</Typography>
        {getEntries()}
    </Grid>
}

export default EdicionesJournal