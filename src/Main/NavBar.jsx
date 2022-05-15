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
const REACT_APP_CLIENT_ID = "6477792390-o5ibvubommbu11vhlglimjc0tor67reb.apps.googleusercontent.com"
const ZOOM_CLIENT_ID='1xEu6h9GT6Sbd8CMUl7qCg'
const REDIRECT_URI='https%3A%2F%2Fa4ae-27-58-74-4.in.ngrok.io'

function handleCredentialResponse(response){
  axios.get('/login', { params: {'Authorization':response.credential}});
}
function oneTapSignIn(){
    google.accounts?.id.initialize({
          client_id: REACT_APP_CLIENT_ID,
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
          <a href={`https://zoom.us/oauth/authorize?response_type=code&client_id=${ZOOM_CLIENT_ID}&redirect_uri=${REDIRECT_URI}`}>Connect to Zoom</a>  
        </Toolbar>
      </AppBar>
    </Box>
  );
}
