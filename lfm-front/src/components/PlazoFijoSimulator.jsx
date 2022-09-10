import React, {useEffect, useState} from "react";
import {FormControl, Input, InputAdornment, InputLabel, Select} from "@mui/material";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MenuItem from "@mui/material/MenuItem";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Button from "@mui/material/Button";
import './PlazoFijoSimulator.css';
import StyledTable from "./Core/StyledTable";
import {getPlazosFijos} from "../services/PlazosFijosService";

const PlazoFijoSimulator = () => {
    const [selectedBank, setSelectedBank] = useState('Banco Galicia');
    const [selectedRate, setSelectedRate] = useState(69.5);
    const [amountOfMoney, setAmountOfMoney] = useState(0);
    const [toDate, setToDate] = useState("2022-09-09");
    const [interest, setInterest] = useState("");
    const [bancos, setBancos] = useState([])


    const getPlazosFijosData = async () => {
        let plazosFijosApi = await getPlazosFijos();
        console.log(plazosFijosApi)
        setBancos(plazosFijosApi);
    }

    useEffect(() => {
        getPlazosFijosData()
    }, []);

    const handleBankSelect = (event) => {
        setSelectedBank(event.target.value);
        let rate = bancos.filter(banco => {return banco.banco === event.target.value})[0].tasa
        setSelectedRate(rate)
    };
    const handleMoneyInput = (event) => {
        setAmountOfMoney(event.target.value);
    };
    const handleDaysInput = (event) => {
        setToDate(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        let fromDate = Date.now();
        let toDateFormated = Date.parse(toDate);
        let diffTime = Math.abs(toDateFormated - fromDate);
        let diffInDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        let calculatedInterest = (((selectedRate / 365) * diffInDays) / 100 * amountOfMoney).toFixed(2);
        setInterest(`Intereses: $${calculatedInterest}`);
    };

    return <Grid container rowSpacing={4} justifyContent="center">
        <Grid item xs={12}>
            <p style={{fontFamily: 'Staatliches', fontSize: '70px', marginTop: 0, marginBottom: 0, textAlign: 'left'}}>Simulador de plazo fijo</p>
            <Divider/>
        </Grid>
        <Grid item xs={8} sm={6} md={4}>
            <Card>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Grid container direction="column">
                            <Grid item>
                                <FormControl sx={{ width: '200px' }} variant="standard" margin="dense">
                                    <InputLabel htmlFor="bank-select">Seleccione el banco</InputLabel>
                                    <Select
                                        id="bank-select"
                                        value={selectedBank}
                                        onChange={handleBankSelect}
                                        children={
                                            bancos.map((banco) => (
                                                <MenuItem key={banco.banco} value={banco.banco}>{banco.banco}</MenuItem>
                                            ))
                                        }
                                        startAdornment={<InputAdornment position="start"><AccountBalanceIcon/></InputAdornment>}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl sx={{ width: '200px' }} variant="standard" margin="dense">
                                    <InputLabel htmlFor="rate-disabled-input">Tasa</InputLabel>
                                    <Input
                                        disabled
                                        id="rate-disabled-input"
                                        value={selectedRate}
                                        endAdornment={<InputAdornment position="start">%</InputAdornment>}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl sx={{ width: '200px' }} variant="standard" margin="dense">
                                    <InputLabel htmlFor="amount-of-money-input">Ingrese la cantidad de dinero</InputLabel>
                                    <Input
                                        id="amount-of-money-input"
                                        value={amountOfMoney}
                                        onChange={handleMoneyInput}
                                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl sx={{ width: '200px' }} variant="standard" margin="dense">
                                    <InputLabel htmlFor="amount-of-days-input">Ingrese la cantidad de días</InputLabel>
                                    <Input
                                        id="amount-of-days-input"
                                        value={toDate}
                                        onChange={handleDaysInput}
                                        type="date"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl sx={{ width: '200px' }} variant="standard" margin="dense">
                                    <Button variant="outlined" size="large" type="submit"> Calcular </Button>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                {interest && <p className="interestResult">{interest}</p>}
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Grid>
    </Grid>
}

export default PlazoFijoSimulator;