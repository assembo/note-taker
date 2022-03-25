import React from "react";
import { Box, Button } from '@mui/material';
import Transcript from "../Transcripts/Transcripts";
import NotePanel from "../Transcripts/NotePanel";
import { ASSEMBO_COLORS } from "../constants";
import {CopyToClipboard} from 'react-copy-to-clipboard';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: "Add notes..."
    };
    window.mc = this;
  }

  handleTextInputChange = event => {
    this.setState({
      note: event.target.value, 
      copied: false,
    })
  };
  render() {
    return (
      <div
        style={{
          display: "flex",
        }}
      >
        <Box sx={{ padding: "10px 20px" }}>

          <CopyToClipboard text={this.state.note}
          onCopy={() => this.setState({copied: true})}>
          <Button
            variant="contained"
            style={{
              borderRadius: 10,
              fontWeight: "bold",
              padding: 10,
              marginBottom: 20,
              background: ASSEMBO_COLORS.primary
            }}
            fullWidth
          >
            {this.state.copied ? "Copied!" : "Copy"}
          </Button>
        </CopyToClipboard>
        </Box>
        <NotePanel
          note={this.state.note}
          setNotes={(e)=>{this.handleTextInputChange(e)}} 
          addNotes={(text)=>{
            this.setState({
              note: `${this.state.note}\n${text}`
            })
          }}
        ></NotePanel>
        <Transcript
        addNotes={(text)=>{
          this.setState({
            note: `${this.state.note}\n${text}`,
            copied: false,
          })
        }}> 
        </Transcript>
      </div>
    );
  }
}

export default Home;
