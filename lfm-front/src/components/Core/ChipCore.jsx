import Chip from "@mui/material/Chip";

const ChipCore = ({labelContent, keyName}) => {
    return <Chip label={labelContent} sx={{color: '#152377', border: '1px solid #152377'}} variant="outlined" key={keyName}/>
}

export default ChipCore