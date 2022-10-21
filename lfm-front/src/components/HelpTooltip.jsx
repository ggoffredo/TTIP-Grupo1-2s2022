import {Tooltip} from "@material-ui/core";
import HelpOutlineTwoToneIcon from '@mui/icons-material/HelpOutlineTwoTone';

const HelpTooltip = ({tooltipText}) => {
    return <Tooltip title= {tooltipText} placement="right-start">
        <HelpOutlineTwoToneIcon color="primary" alt="Ayuda" style={{ height: "100%" }}/>
    </Tooltip>
}

export default HelpTooltip