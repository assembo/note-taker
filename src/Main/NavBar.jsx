import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import logo from "../assets/images/assembo-icon-small.png";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import axios from '../axios';
import {useStyles} from './styles';
import Swal from 'sweetalert2';

//Error handling code in the case gscript doesn't load properly. 
const google=window.google;
const REACT_APP_CLIENT_ID = "6477792390-o5ibvubommbu11vhlglimjc0tor67reb.apps.googleusercontent.com"

async function handleCredentialResponse(response){
  try {
    const result = await axios.get('/login', { params: { 'Authorization': response.credential }});
    const user = result.data;

    const userID = user._id.$oid;
    if (userID) {
      localStorage.setItem("ASSEMBO_USER_ID", userID);
    }
    if (user) {
      return user;
    }
  } catch (error) {
    console.error("User could not log in", error);
  }

}
function oneTapSignIn(setUser){
    google.accounts?.id.initialize({
      client_id: REACT_APP_CLIENT_ID,
      auto_select: true,
      callback: async (response) => { 
        const user = await handleCredentialResponse(response); 
        if (user) {
          setUser(user);
        }
      }
    });
    google.accounts?.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }  // customization attributes
    );
    google.accounts?.id.prompt(); // also display the One Tap dialog
};

window.oneTapSignIn = oneTapSignIn;

export default function NavBar({ user, setUser }) {
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
            {
              user && user.profilePicture &&
              <IconButton 
                onClick={ async ()=>{
                  const { value } = await Swal.fire({
                    title: 'Error!',
                    text: 'Do you want signout',
                    icon: 'warning',
                    confirmButtonText: 'Sign out'
                  });
                  if (value) {
                    setUser(null);
                    localStorage.removeItem("ASSEMBO_USER_ID");
                  }
                } }
              >
                <img src={user.profilePicture} className="user-logo" alt="logo"/> 
              </IconButton>
            }
            {
              !user && 
              <Button id="buttonDiv" className={classes.loginButton} onClick={()=>oneTapSignIn(setUser)}>Login</Button>
            }  
          </Toolbar>
      </AppBar>
    </Box>
  );
}
