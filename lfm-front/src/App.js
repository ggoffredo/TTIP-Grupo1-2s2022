import './App.css';
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Container from '@mui/material/Container';

function App() {
    return (
        <div className="App">
            <Navbar/>
            <Container maxWidth="xl" sx={{marginTop: '20px'}}>
                <Dashboard/>
            </Container>
        </div>
    );
}

export default App;
