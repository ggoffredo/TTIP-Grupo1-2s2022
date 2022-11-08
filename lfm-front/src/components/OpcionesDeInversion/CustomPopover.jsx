import Grid from "@mui/material/Grid";
import FormItem from "../Forms/FormItem";
import {InputAdornment, Popover, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import CustomInput from "../Forms/CustomInput";
import SubmitButton from "../Forms/SubmitButton";
import {useEffect, useRef, useState} from "react";
import {on} from "../../helpers/Events";

const CustomPopover = ({ingresosYGastos, setIngresosYGastosCallback}) => {
    const [tipo, setTipo] = useState('ingreso')
    const [open, setOpen] = useState(false)
    const [monto, setMonto] = useState(0)
    const selectedMonth = useRef('')
    const mouseX = useRef()
    const mouseY = useRef()
    const id = open ? 'simple-popover' : undefined

    useEffect( () => {
        on('chartClick', e => handleChartClick(e))
    }, [])

    const handleChartClick = ({detail}) => {
        selectedMonth.current = detail.label
        mouseX.current = detail.clientX
        mouseY.current = detail.clientY
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        selectedMonth.current = ''
        setTipo('ingreso')
        setMonto(0)
    }

    const handleAgregar = (e) => {
        e.preventDefault()
        const nuevoMonto = tipo === 'ingreso' ? monto : -monto
        const currentMonto = ingresosYGastos?.[selectedMonth.current] ?? 0
        const ingresosYGastosEditados = {
            ...ingresosYGastos,
            [selectedMonth.current]: (currentMonto + Number(nuevoMonto))
        }
        setIngresosYGastosCallback(ingresosYGastosEditados)
    }

    return <Popover
        id={id}
        open={open}
        onClose={handleClose}
        anchorPosition={{ top: mouseY.current, left: mouseX.current }}
        anchorReference="anchorPosition"
    >
        <form onSubmit={handleAgregar}>
            <Grid container direction="column" style={{margin: '10px'}}>
                <FormItem
                    label="Agregar"
                    input={
                        <Select
                            id="gasto-ingreso-select"
                            value={tipo}
                            onChange={e => setTipo(e.target.value)}
                            children={
                                [
                                    <MenuItem key={'Ingreso'} value={'ingreso'}>{'Ingreso'}</MenuItem>,
                                    <MenuItem key={'Gasto'} value={'gasto'}>{'Gasto'}</MenuItem>
                                ]
                            }
                        />
                    }
                />
                <CustomInput
                    inputLabel="Monto"
                    selectedValue={monto}
                    handleSelectedValueCallback={e => setMonto(e.target.value)}
                    isEndAdornment={false}
                    adornment={<InputAdornment position="start">$</InputAdornment>}
                    inputType={'number'}
                />
                <SubmitButton label={"Agregar"}/>
            </Grid>
        </form>
    </Popover>
}

export default CustomPopover