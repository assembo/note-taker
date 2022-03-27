import React from "react";
import { Box, Button, TextField } from '@mui/material';
import { ASSEMBO_COLORS } from "../constants";
import {CopyToClipboard} from 'react-copy-to-clipboard';


class NotePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    window.mc = this;
  }

  render() {
    return (
      <div 
      className="containershadow"
        style={{
          padding: "5px 20px",
          borderRadius: 25,
          flexGrow: 1,
          marginLeft: "80px"
        }}
      >
        <TextField
          style={{textAlign: 'left',
          width:"100%",
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
          hintText="Message Field"
          floatingLabelText="Notes"
          value={this.props.note}
          multiline
          rows={19}
          onChange={this.props.setNotes}
        />
        <CopyToClipboard text={this.state.note}
            onCopy={() => this.setState({copied: true})}>
            <Button
              variant="contained"
              style={{
                borderRadius: 20,
                fontWeight: "bold",
                padding: 10,
                marginBottom: 20,
                marginTop:"10px",
                background: ASSEMBO_COLORS.primary,
                boxShadow:"none",
              }}
              fullWidth
            >
              {this.state.copied ? "Copied!" : "Copy"}
            </Button>
        </CopyToClipboard>
      </div>
    );
  }
}

export default NotePanel;
