import MenuItem from "@mui/material/MenuItem";
import {InputAdornment, Select} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import FormItem from "../Forms/FormItem";

const BankSelect = ({banksDatasource, selectedValue, handleSelectCallback}) => {
    return <FormItem
        label="Seleccione el banco"
        input={
            <Select
                id="bank-select"
                value={selectedValue}
                onChange={handleSelectCallback}
                children={
                    banksDatasource.map((plazoFijo) => (
                        <MenuItem key={plazoFijo.banco} value={plazoFijo.banco}>{plazoFijo.banco}</MenuItem>
                    ))
                }
                startAdornment={<InputAdornment position="start"><AccountBalanceIcon/></InputAdornment>}
            />
        }
    />
}

export default BankSelect;