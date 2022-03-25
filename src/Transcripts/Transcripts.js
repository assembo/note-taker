import React from "react";
import { Box, Button, Typography } from '@mui/material';
import { ASSEMBO_COLORS } from "../constants";

class Transcripts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transcripts: [
        { name: "Lan", text: "hi" },
        { name: "Lan", text: "yumo" },
        { name: "Lan", text: "how's life" }
      ]
    };
    window.transcripts = this;
  }

  componentDidMount() {

  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "rgb(229, 229, 229)"
        }}
      >
        <Box sx={{ padding: "10px 20px" }}>
          <h3>Transcripts</h3>
        </Box>
        <Box style={{
          padding: "10px 20px",
          height: "20vh",
          overflowY: "scroll",
        }}>
          {this.state.transcripts.map((message, index) => {
            const timeStamp = message.timeStamp;
            const offsetTime = timeStamp ? new Date(timeStamp.time + timeStamp.offset * 60 * 1000) : new Date();
            return (
              <Box display={"flex"} marginBottom={3}>
                <Box flex={1}>
                  <Box display={"flex"} alignItems={"center"} marginBottom={1}>
                    <Typography variant="subtitle2">{message.name}</Typography>
                    <Typography fontSize={13} marginLeft={3} marginTop={1}>
                      {offsetTime.toLocaleTimeString()}
                    </Typography>
                  </Box>
                  <Typography>{message.text}</Typography>
                </Box>
              </Box>
            )
          })}
        </Box>
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
            Start
          </Button>
        </Box>
      </div>
    );
  }
}

export default Transcripts;
