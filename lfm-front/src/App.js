import './App.css';
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import OpcionesSimulator from "./components/OpcionesDeInversion/OpcionesSimulator";
import PlazoFijoSimulator from "./components/PlazoFijoSimulator/PlazoFijoSimulator";
import Container from '@mui/material/Container';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {UserProvider} from "./components/Contexts/UserContext";
import Landing from "./components/Landing";
import PrivateRoute from "./components/Router/PrivateRoute";
import Utils from "./helpers/Utils";

Utils.registerChartJs()

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <UserProvider>
                    <Navbar/>
                    <Routes>
                        <Route path="/" element={<Landing/>}/>
                    </Routes>
                    <Container maxWidth="xl" sx={{marginTop: '20px'}}>
                        <Routes>
                            <Route element={<PrivateRoute/>}>
                                <Route path="/dashboard" element={<Dashboard/>}/>
                                <Route path="/plazosFijos" element={<PlazoFijoSimulator/>}/>
                                <Route path="/opciones" element={<OpcionesSimulator/>}/>
                            </Route>
                        </Routes>
                    </Container>
                </UserProvider>
            </div>
        </BrowserRouter>
    );
}

export default App;
