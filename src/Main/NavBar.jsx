import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import logo from "../assets/images/assembo-icon-small.png";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import axios from '../axios';
import {useStyles} from './styles';

//Error handling code in the case gscript doesn't load properly. 
const google=window.google;

function handleCredentialResponse(response){
  axios.get('/login',{'Authorization':response.credential})
}
function oneTapSignIn(){
    google.accounts?.id.initialize({
          client_id: process.env.REACT_APP_CLIENT_ID,
          callback: handleCredentialResponse
          });
    google.accounts?.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }  // customization attributes
      );
       google.accounts?.id.prompt(); // also display the One Tap dialog
  }

export default function NavBar() {
  const classes=useStyles()
  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar 
        sx={{bgcolor: "white"}}
        className={classes.appBar}
        >
        <Toolbar className={classes.toolBar}>
          <IconButton>
            <img src={logo} className={classes.AppLogo} alt="logo"/> 
          </IconButton>
          <Button id="buttonDiv" className={classes.loginButton} onClick={()=>oneTapSignIn()}>Login</Button>  
        </Toolbar>
      </AppBar>
    </Box>
  );
}
