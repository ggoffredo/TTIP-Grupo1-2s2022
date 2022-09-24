import './App.css';
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import OpcionesSimulator from "./components/OpcionesSimulator";
import PlazoFijoSimulator from "./components/PlazoFijoSimulator/PlazoFijoSimulator";
import Container from '@mui/material/Container';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {UserProvider} from "./components/Contexts/UserContext";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <UserProvider>
                    <Navbar/>
                    <Container maxWidth="xl" sx={{marginTop: '20px'}}>
                        <Routes>
                            <Route path="/" element={<Dashboard/>}/>
                            <Route path="/plazosFijos" element={<PlazoFijoSimulator/>}/>
                            <Route path="/opciones" element={<OpcionesSimulator/>}/>
                        </Routes>
                    </Container>
                </UserProvider>
            </div>
        </BrowserRouter>
    );
}

export default App;
