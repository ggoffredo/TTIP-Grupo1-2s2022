import './App.css';
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import OpcionesSimulator from "./components/OpcionesSimulator";
import PlazoFijoSimulator from "./components/PlazoFijoSimulator/PlazoFijoSimulator";
import Container from '@mui/material/Container';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useState} from "react";
import {GastosContext, IngresosContext, DolarSiContext, PlazosFijosContext} from "./components/Contexts";

function App() {
    const [gastos, setGastos] = useState([]);
    const [ingresos, setIngresos] = useState([]);
    const [plazosFijos, setPlazosFijos] = useState([]);
    const [dolar, setDolar] = useState([]);

    return (
        <BrowserRouter>
            <div className="App">
                <Navbar/>
                <GastosContext.Provider value={{gastos, setGastos}}>
                    <IngresosContext.Provider value={{ingresos, setIngresos}}>
                        <PlazosFijosContext.Provider value={{plazosFijos, setPlazosFijos}}>
                            <DolarSiContext.Provider value={{dolar, setDolar}}>
                                <Container maxWidth="xl" sx={{marginTop: '20px'}}>
                                    <Routes>
                                        <Route path="/" element={<Dashboard/>}/>
                                        <Route path="/plazosFijos" element={<PlazoFijoSimulator/>}/>
                                        <Route path="/opciones" element={<OpcionesSimulator/>}/>
                                    </Routes>
                                </Container>
                            </DolarSiContext.Provider>
                        </PlazosFijosContext.Provider>
                    </IngresosContext.Provider>
                </GastosContext.Provider>
            </div>
        </BrowserRouter>
    );
}

export default App;
