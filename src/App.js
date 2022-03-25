import logo from "./assets/images/assembo-icon-small.png";
import './App.css';
import Home from "./Main/Home";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" style={ { margin: "10px" } }/>
        <Home />
      </header>
    </div>
  );
}

export default App;
