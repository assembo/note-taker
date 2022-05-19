import * as React from 'react';
import './App.css';
import Home from "./Main/Home";
import NavBar from "./Main/NavBar";

function App() {
  return (
    <div 
      className="App"
    >
        <NavBar></NavBar>
        <Home></Home>
    </div>
  );
}

export default App;
