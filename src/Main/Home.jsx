import React from "react";
import { Box, Button } from '@mui/material';
import Transcript from "../Transcripts/Transcripts";
import { ASSEMBO_COLORS } from "../constants";

class Home extends React.Component {
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
            Share
          </Button>
        </Box>
          <Transcript />
      </div>
    );
  }
}

export default Home;
