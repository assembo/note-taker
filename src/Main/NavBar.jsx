import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import logo from "../assets/images/assembo-icon-small.png";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

const google=window.google;

function handleCredentialResponse(response) {
  console.log("Encoded JWT ID token: " + response.credential);
    }
function oneTapSignIn(){
    google.accounts.id.initialize({
          client_id: "6477792390-o5ibvubommbu11vhlglimjc0tor67reb.apps.googleusercontent.com",
          callback: handleCredentialResponse
          });
    google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }  // customization attributes
      );
       google.accounts.id.prompt(); // also display the One Tap dialog
  }

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar 
        sx={{bgcolor: "white"}}
        style={ { boxShadow: "none", height:"30px"}}
        >
        <Toolbar>
          <IconButton>
            <img src={logo} className="App-logo" alt="logo" style={ { height:"50px",margin: "0px" } }/> 
          </IconButton>
          <Button id="buttonDiv" onClick={()=>oneTapSignIn()} style={{marginLeft:"85%"}}>Login</Button>  
        </Toolbar>
      </AppBar>
    </Box>
  );
}
