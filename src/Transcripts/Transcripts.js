import React from "react";
import { Box, Button, Typography } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';

import { ASSEMBO_COLORS } from "../constants";

class Transcripts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transcripts: [
        { text: "hi" },
        { text: "yumo" },
        { text: "how's life" }
      ],
      recording: false,
      interimBox: null,
      finalTranscript: null,
      ignoreOnend: null,
      voiceRecognitionAvailable: false
    };
    window.transcripts = this;
  }

  componentDidMount() {
    this.setupWebkitSpeechRecognition();
  }

  /**
   * function to start voice transcription
  */
  startButton = async () => {
    if (this.state.recording === true) {
      this.setState({
        recording: false
      });
      this.recognition.stop();
      return;
    }
    await this.setState({
      finalTranscript: "",
      ignoreOnend: false,
      startToRecord: true,
    });
    this.recognition.lang = "en-US";
    this.recognition.start();
  }
  
   setupWebkitSpeechRecognition = () => {
    if ("webkitSpeechRecognition" in window) {
      this.recognition = new window.webkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.setState({
        voiceRecognitionAvailable: true
      })
  
      this.recognition.onstart = () => {
        this.setState({
          recording: true,
          startToRecord: false,
        })
      };
  
      this.recognition.onerror = (event) => {
        if (event.error == "no-speech") {
          this.setState({ignoreOnend: true});
        }
        if (event.error == "audio-capture") {
          this.setState({ignoreOnend: true});
          console.warn("audio capture error")
        }
        if (event.error == "not-allowed") {
          this.setState({ignoreOnend: true});
          console.error("recognition not allowed")
        }
      };
  
      this.recognition.onend = () => {
        this.setState({recording: false});
        if (this.state.ignoreOnend) {
          return;
        }
        if (!this.state.finalTranscript) {
          return;
        }
      };
  
      this.recognition.onresult = async (event) => {
        this.setState({
          interim_transcript: ""
        });
        if (typeof event.results == "undefined") {
          this.recognition.onend = null;
          this.recognition.stop();
          return;
        }
        for (var i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            this.setState({
              finalTranscript: this.state.finalTranscript + event.results[i][0].transcript,
              interimBox: null
            });
            const text = event.results[i][0].transcript;
            const newTranscript = [ { text }, ...this.state.transcripts];
            this.setState({ transcripts: newTranscript });
  
          } else {
            this.setState({
              interim_transcript: this.state.interim_transcript + event.results[i][0].transcript,
              interimBox: this.state.interim_transcript + event.results[i][0].transcript
            })
          }
        }
      };
    }
  }

  render() {
    return (
      <div className="containershadow" 
        style={{
          borderRadius: 25, 
          marginRight: "80px",
          height: "93%"
        }}>
        <Box sx={{ padding: "10px 20px" }}>
          <h3 style={{ color: ASSEMBO_COLORS.dark }} >Transcripts</h3>
        </Box>
        <Box style={{
          padding: "10px 20px",
          height: "50vh",
          overflowY: "scroll",
        }}>
          {this.state.transcripts.map((message, index) => {
            return (
              <Box display={"flex"} marginBottom={3}>
                <Box flex={1}>
                  <Button onClick={()=>{this.props.addNotes(message.text)}}>
                  <Typography style={{ inlineSize: "150px",
                    overflow: "hidden",
                    textAlign: "center"
                    }} >{message.text}</Typography>
                  </Button>
                </Box>
              </Box>
            )
          })}
        </Box>
        <Box 
          sx={{ padding: "10px 20px" }}
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}>
        <Button
          variant="contained"
          style={{
            borderRadius: 20,
            fontWeight: "bold",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            boxShadow: "none",
            padding: 10,
            background: ASSEMBO_COLORS.primary
          }}
          startIcon={<MicIcon style={{color:"#FF7272"}}/>}
          onClick={()=>{
            this.startButton();
          }}
        >
          {this.state.startToRecord ? "Loading..." : (this.state.recording ? "Recording..." : "Start Recording")}
        </Button>
        </Box>
      </div>
    );
  }
}

export default Transcripts;
