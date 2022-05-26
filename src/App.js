import './App.css';
import * as React from 'react';
import Home from "./Main/Home";
import NavBar from "./Main/NavBar";
import axios from './axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  async componentDidMount() {
    try {
      const userID = localStorage.getItem("ASSEMBO_USER_ID");
      const result = await axios.get("/user", { params: { '_id': userID }} );
      const user = result.data;
      this.setState({user});
    } catch (error) {
      console.error("User does not exist", error);
    }
  }

  render() {
    return (
      <div className="App">
        <NavBar
          user={this.state.user}
          setUser={ (user)=>{this.setState({ user });}}
        ></NavBar>
        <Home
          user={this.state.user}
          setUser={ (user)=>{this.setState({ user });}}
        ></Home>
      </div>
    );
  }
}

export default App;
