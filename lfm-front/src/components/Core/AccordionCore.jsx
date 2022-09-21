import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const AccordionCore = ({title, spacing, children}) => {
    return <Grid item xs={12}>
        <Accordion sx={{backgroundColor: '#025c96'}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel1a-content" id="panel1a-header">
                <Typography sx={{color: 'white'}}>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container item spacing={spacing}>
                    {children}
                </Grid>
            </AccordionDetails>
        </Accordion>
    </Grid>
}

export default AccordionCore;