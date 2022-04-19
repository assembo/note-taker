import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import logo from "../assets/images/assembo-icon-small.png";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

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
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
