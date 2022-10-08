import {useState} from "react";
import Chip from "@mui/material/Chip";

const ClickableChip = ({chartLabel, onPressClick, onPressDelete}) => {
    const [isClicked, setIsClicked] = useState(true)

    const handleClick = () => {
        !isClicked && onPressClick(chartLabel)
        setIsClicked(true)
    }

    const handleDelete = () => {
        isClicked && onPressDelete(chartLabel)
        setIsClicked(false)
    }

    return <Chip key={chartLabel} sx={{margin: '5px'}} variant={isClicked ? "filled" : "outlined" } label={chartLabel} onClick={handleClick} onDelete={handleDelete}/>
}

export default ClickableChip