import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const AccordionCore = ({title, spacing, children}) => {
    return <Grid item xs={4} sm={12}>
        <Accordion sx={{border: "1px solid #041d7c"}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel1a-content" id="panel1a-header">
                <Typography sx={{color: 'black'}}>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container spacing={spacing}>
                    {children}
                </Grid>
            </AccordionDetails>
        </Accordion>
    </Grid>
}

export default AccordionCore;