import React from "react";
import { Button, TextField } from '@mui/material';
import { ASSEMBO_COLORS } from "../constants";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Swal from 'sweetalert2';
import axios from 'axios';

class NotePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    window.notes = this;
  }
  render() {
    return (
      <div
      className="containershadow"
        style={{
          padding: "5px 20px",
          borderRadius: 25,
          flexGrow: 1,
          marginLeft: "80px",
          height: "98.5%"
        }}
      >
        <TextField
          style={{textAlign: 'left',
          width:"100%"
        }}
        sx={{
          width: { sm: 0, md: 0 },
          "& .MuiOutlinedInput-root:hover": {
            "& > fieldset": {
              borderColor: "white"
            }
          }
        }}
        variant="outlined"
          value={this.props.note}
          multiline
          rows={19}
          onChange={this.props.setNotes}
        />
        <CopyToClipboard text={this.props.note}
            onCopy={() => this.setState({copied: true})}>
            <Button
              variant="contained"
              style={{
                borderRadius: 20,
                fontWeight: "bolder",
                padding: 10,
                marginBottom: 10,
                marginTop:"30px",
                color: ASSEMBO_COLORS.primary,
                background: "white",
                boxShadow:"1 1 1 1"
              }}
              fullWidth
            >
              {this.state.copied ? "Copied!" : "Copy"}
            </Button>
        </CopyToClipboard>
        <Button
            onClick={ async()=>{
              // Swal.fire({
              //   title: 'Error!',
              //   text: 'Do you want to continue',
              //   icon: 'error',
              //   confirmButtonText: 'Cool'
              // })
              const { value: email } = await Swal.fire({
                title: 'Input email address',
                input: 'email',
                inputLabel: 'Your email address',
                inputPlaceholder: 'Enter your email address',
                confirmButtonColor: ASSEMBO_COLORS.primary,
              })
              
              if (email) {
                Swal.fire(`Entered email: ${email}`);
                const result = await axios.get("http://127.0.0.1:5000/send_email", 
                  {
                    params: {
                    toEmail: email,
                    notes: this.props.note
                  }
                });                
              }
            }}
        >Open Me</Button>
            {/* <Button
              onClick={this.props.onClickGenerateButton}
              variant="contained"
              style={{
                borderRadius: 20,
                fontWeight: "bold",
                padding: 10,
                marginBottom: 20,
                marginTop:"0px",
                color: ASSEMBO_COLORS.primary,
                background: "white",
                boxShadow:"1 1 1 1"
              }}
              fullWidth
            >
              {"Generate action items"}
            </Button> */}
      </div>
    );
  }
}
export default NotePanel;