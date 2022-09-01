import './App.css';
import Navbar from "./components/Navbar";
import Chart from "./components/Chart";

function App() {
  return (
    <div className="App">
      <Navbar
        main={Chart}
      />
    </div>
  );
}

export default App;
