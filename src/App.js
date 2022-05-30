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
    const userID = localStorage.getItem("ASSEMBO_USER_ID");
    try {
      const result = await axios.get("/user", { params: { '_id': userID }} );
      const user = result.data;
      this.setState({user});
    } catch (error) {
      console.error("User does not exist", error);
    }
    try {
      const code = window.location.search.slice(1).split("&")[0].split("=")[1];
      if (code && userID) {
        await axios.get("slack_user_token", { params: { code, userID } });
        // force refresh should set dev vs app url programmatically
        window.location = "https://app.assembo.ai/";
      }
    } catch (error) {
      console.error(`Unable to acquire token for user, ${userID}`, error);
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
