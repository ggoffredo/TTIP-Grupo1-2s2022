import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const EdicionesJournalEntry = ({entry, index, removeEntryCallback}) => {
    const formatEntry = (e) => {
        return `${e.fecha}: $${e.monto}`
    }

    const handleClick = () => {
        removeEntryCallback(index)
    }

    return <Grid container direction="row" alignItems="center" justifyContent="center">
        <Grid item>
            {formatEntry(entry)}
        </Grid>
        <Grid item>
            <IconButton aria-label="delete" size="small" color="error" onClick={handleClick}>
                <DeleteIcon fontSize="inherit"/>
            </IconButton>
        </Grid>
    </Grid>
}

export default EdicionesJournalEntry