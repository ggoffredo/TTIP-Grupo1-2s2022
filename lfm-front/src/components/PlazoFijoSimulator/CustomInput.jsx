import Input from "@mui/material/Input";
import FormItem from "./FormItem";

const CustomInput = ({inputLabel, selectedValue, handleSelectedValueCallback, isDisabled, isEndAdornment, adornment, inputType}) => {
    return <FormItem
        label={inputLabel}
        input={
            <Input
                id="rate-disabled-input"
                value={selectedValue}
                {...(handleSelectedValueCallback && {onChange: handleSelectedValueCallback})}
                disabled={isDisabled}
                {...(isEndAdornment ? {endAdornment: adornment} : {startAdornment: adornment})}
                type={inputType ?? "text"}
            />
        }
    />
}
export default CustomInput;