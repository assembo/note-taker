import React from "react";
import { Button, TextField } from '@mui/material';
import { ASSEMBO_COLORS } from "../constants";
import {CopyToClipboard} from 'react-copy-to-clipboard';


class NotePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
          height: "91%"
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
                marginBottom: 10,
                marginTop:"10px",
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
            </Button>
      </div>
    );
  }
}

export default NotePanel;
