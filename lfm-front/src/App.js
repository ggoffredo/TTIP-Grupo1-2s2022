import './App.css';
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import OpcionesSimulator from "./components/OpcionesSimulator";
import PlazoFijoSimulator from "./components/PlazoFijoSimulator/PlazoFijoSimulator";
import Container from '@mui/material/Container';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Navbar/>
                <Container maxWidth="xl" sx={{marginTop: '20px'}}>
                    <Routes>
                        <Route path="/" element={<Dashboard/>}/>
                        <Route path="/plazosFijos" element={<PlazoFijoSimulator/>}/>
                        <Route path="/opciones" element={<OpcionesSimulator/>}/>
                    </Routes>
                </Container>
            </div>
        </BrowserRouter>
    );
}

export default App;
