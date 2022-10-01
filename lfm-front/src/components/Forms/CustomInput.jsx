import Input from "@mui/material/Input";
import FormItem from "./FormItem";
import {FormHelperText} from "@mui/material";

const CustomInput = ({inputLabel, selectedValue, handleSelectedValueCallback, isDisabled, isEndAdornment, adornment, inputType, hasError}) => {
    return <>
        <FormItem
            label={inputLabel}
            hasError={hasError}
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
        {hasError && <FormHelperText id="component-error-text">{hasError}</FormHelperText>}
    </>
}
export default CustomInput;