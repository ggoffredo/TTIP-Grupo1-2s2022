import {useEffect, useState} from "react";
import {InputAdornment} from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import './PlazoFijoSimulator.css';
import {getPlazosFijos} from "../../services/PlazosFijosService";
import BankSelect from "./BankSelect";
import CustomInput from "../Forms/CustomInput";
import SubmitButton from "../Forms/SubmitButton";
import ViewTitle from "../ViewTitle";
import Utils from "../../helpers/Utils";

const PlazoFijoSimulator = () => {
    const [amountOfMoney, setAmountOfMoney] = useState(0);
    const [selectedBank, setSelectedBank] = useState('');
    const [selectedRate, setSelectedRate] = useState(0);
    const [plazosFijos, setPlazosFijos] = useState([]);
    const [interest, setInterest] = useState("");
    const [toDate, setToDate] = useState(Utils.todayStringFormatted());

    useEffect(() => {
        getPlazosFijos().then(res => setPlazosFijos(res))
    }, []);

    const handleBankSelect = (event) => {
        setSelectedBank(event.target.value);
        let rate = plazosFijos.filter(plazoFijo => {return plazoFijo.banco === event.target.value})[0].tasa
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
        <ViewTitle title={"Simulador de plazo fijo"}/>
        <Grid item xs={8} sm={6} md={4}>
            <Card sx={{border: "1px solid #025c96"}}>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Grid container direction="column">
                            <BankSelect banksDatasource={plazosFijos} selectedValue={selectedBank} handleSelectCallback={handleBankSelect}/>
                            <CustomInput
                                inputLabel="Tasa"
                                selectedValue={selectedRate}
                                isDisabled={true}
                                isEndAdornment={true}
                                adornment={<InputAdornment position="start">%</InputAdornment>}
                            />
                            <CustomInput
                                inputLabel="Ingrese la cantidad de dinero"
                                selectedValue={amountOfMoney}
                                handleSelectedValueCallback={handleMoneyInput}
                                isEndAdornment={false}
                                adornment={<InputAdornment position="start">$</InputAdornment>}
                            />
                            <CustomInput
                                inputLabel="Ingrese la cantidad de días"
                                selectedValue={toDate}
                                handleSelectedValueCallback={handleDaysInput}
                                inputType={"date"}
                            />
                            <SubmitButton label={"Calcular"}/>
                            <Grid item> {interest && <p className="interestResult">{interest}</p>} </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Grid>
    </Grid>
}

export default PlazoFijoSimulator;