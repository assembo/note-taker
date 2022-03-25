import React from "react";
import { Box, Button, TextField } from '@mui/material';
import { ASSEMBO_COLORS } from "../constants";

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
        style={{
          display: "flex",
        }}
      >
        <Box sx={{ padding: "10px 20px" }}>
        <TextField
          style={{textAlign: 'left', backgroundColor: 'white'}}
          hintText="Message Field"
          floatingLabelText="Notes"
          value={this.props.note}
          multiline
          rows={20}
          onChange={this.props.setNotes}
        />
        </Box>
      </div>
    );
  }
}

export default NotePanel;
