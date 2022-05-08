import React from "react";
import { Button, TextField } from '@mui/material';
import { ASSEMBO_COLORS } from "../constants";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Swal from 'sweetalert2';
import axios from '../axios';
import './NotePanel.css';

class NotePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="containershadow">
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
          rows={20}
          onChange={this.props.setNotes}
        />
        
        <div style={{display:"flex"}}>
        <CopyToClipboard text={this.props.note}
            onCopy={() => this.setState({copied: true})}>
            <Button
              className="NotePanel__copy-button"
              variant="contained"
              fullWidth
              style={{
                borderRadius: '20px',
                fontWeight: 'bolder',
                padding: '10px',
                marginRight: '5px',
                marginLeft: '5px',
                marginTop: '20px',
                marginBottom: '5px',
                color: '#45d8d8',
                background: 'white',
                boxShadow: '1 1 1 1',
              }}
            >
              {this.state.copied ? "Copied!" : "Copy to clipboard"}
            </Button>
        </CopyToClipboard>
        <Button
            className="NotePanel__send-email-button"
            variant="contained"
            fullWidth
            style={{
              borderRadius: '20px',
              fontWeight: 'bolder',
              padding: '10px',
              marginRight: '5px',
              marginLeft: '5px',
              marginTop: '20px',
              marginBottom: '5px',
              color: '#45d8d8',
              background: 'white',
              boxShadow: '1 1 1 1',
            }}
            onClick={ async()=>{
              const { value: email } = await Swal.fire({
                title: 'Send notes to email',
                html: `<input name="email" class="swal2-input" placeholder="Enter your email address" type="email" style="display: flex;">`,
                confirmButtonColor: ASSEMBO_COLORS.primary,
                confirmButtonText: "SEND",
              });
              
              if (email) {
                Swal.fire({
                  title:`Assembo's notes sent to: ${email}`,
                  confirmButtonColor: ASSEMBO_COLORS.primary}
                );
                await axios.get("send_email", 
                  {
                    params: {
                    toEmail: email,
                    notes: this.props.note
                  }
                  
                });                
              }
            }}
        >Send to email</Button>
        </div>
      </div>
    );
  }
}
export default NotePanel;