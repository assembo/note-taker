import React from "react";
import { Box, Button, Typography } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import { ASSEMBO_COLORS, ASSEMBO_NOTE_TAKER_COMMANDS } from "../constants";
import { preprocessText, stripWhiteSpaceAddDash } from "./helpers";

class Transcripts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transcripts: [
        { text: "← Press the Mic Button", isNew: false },
        { text: "Then say something :D", isNew: false}
      ],
      recording: false,
      interimBox: null,
      finalTranscript: null,
      ignoreOnend: null,
      voiceRecognitionAvailable: false,
    };
    window.transcript = this;
  }

  componentDidMount() {
    this.setupWebkitSpeechRecognition();
  }


  processTranscripts(){
    const newTranscripts = this.state.transcripts.filter(x=>x.isNew===true);
    console.log(`hahaha`);
    if (newTranscripts && newTranscripts.length > 0){
      this.props.processTranscripts(newTranscripts);
    }
    const transcripts = this.state.transcripts.map(x=>{
      return {
        text: x.text,
        isNew: false,
      }
    })
    this.setState({
      transcripts: transcripts
    })
  }

  /**
   * function to start voice transcription
  */
  toggleRecording = async () => {
    if (this.state.recording === true) {
      this.setState({
        recording: false
      });
      this.recognition.stop();
      // process the transcript
      this.processTranscripts();
      return;
    }
    await this.setState({
      finalTranscript: "",
      ignoreOnend: false,
      startToRecord: true,
    });
    this.recognition.lang = 'en-US';
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
        if (event.error === "no-speech") {
          this.setState({ignoreOnend: true});
        }
        if (event.error === "audio-capture") {
          this.setState({ignoreOnend: true});
          console.warn("audio capture error")
        }
        if (event.error === "not-allowed") {
          this.setState({ignoreOnend: true});
          console.error("recognition not allowed")
        }
      };
  
      this.recognition.onend = () => {
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
            const rawText = event.results[i][0].transcript;
            this.processText(rawText);
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

  /**
   * method to process rawText for clientend
   * @param {string} rawText string from final transcript
   */
  processText = (rawText) => {
    const formattedResult = preprocessText(rawText);
    const nextStep = formattedResult.action;
    let previousTranscript;
    switch (nextStep) {
      case ASSEMBO_NOTE_TAKER_COMMANDS.WRITE_IT_DOWN:
        previousTranscript = this.state.transcripts[0];
        this.props.addNotes(previousTranscript.text);
        break;
      case ASSEMBO_NOTE_TAKER_COMMANDS.ASSIGN_TO:
        const subject = formattedResult.subject;
        previousTranscript = this.state.transcripts[0];
        const previousTranscriptText = previousTranscript.text;
        const strippedText = stripWhiteSpaceAddDash(previousTranscriptText);
        const assignText = `${subject}: ${strippedText}`;
        this.props.addNotes(assignText);
        break;
      case ASSEMBO_NOTE_TAKER_COMMANDS.ADD_TRANSCRIPT:
        const newTranscript = [ { text: rawText, isNew: true }, ...this.state.transcripts];
        this.setState({ transcripts: newTranscript });
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div className="containershadow" 
        style={{
          display: "flex",
          borderRadius: 25, 
          marginRight: "80px",
          height: "92%"
        }}>
      <div
        style={{
          padding: "15px 15px"
        }}
      >
        <Button
          variant="contained"
          style={{
            borderRadius: 45,
            fontWeight: "bold",
            boxShadow: "none",
            width: "64px", height: "64px",
            background: this.state.recording ? ASSEMBO_COLORS.OFF : ASSEMBO_COLORS.primary
          }}
          startIcon={this.state.startToRecord ? <MicIcon style={{ width: "30px", height: "30px", margin: "0 0 0 12px"}}/> :this.state.recording ? <MicIcon style={{ width: "30px", height: "30px", margin: "0 0 0 12px"}}/> : <MicOffIcon style={{ width: "30px", height: "30px", margin: "0 0 0 12px", color:"#ffffff"}}/> }
          onClick={this.toggleRecording}
        >
        </Button>
      </div>

      <div 
        style={{
          padding: "0px 0px",
          width:"100%",
          textAlign: "left"
        }}>
        <Box sx={{ padding: "10px 15px" }}>
        </Box>
        <Box style={{
          padding: "10px 0px",
          height: "540px",
          overflowY: "scroll"
        }}>
        {
          this.state.interimBox &&
          <Box display={"flex"} marginBottom={3}>
            <Box flex={1}>
              <Button onClick={()=>{}}>
              <Typography style={{
                overflow: "hidden",
                textAlign: "left"
                }} >{this.state.interimBox}</Typography>
              </Button>
            </Box>
          </Box>
        }
        {
          this.state.transcripts.map((message, index) => {
            return (
              <Box 
                key={index} display={"flex"} marginBottom={3}>
                <Box 
                  flex={1}
                  >
                  <Button onClick={()=>{this.props.addNotes(message.text)}}>
                  <Typography 
                    style={{ 
                      overflow:"hidden",
                      textAlign: "left"
                    }} >{message.text}</Typography>
                  </Button>
                </Box>
              </Box>
            )
          })
        }
        </Box>
      </div>
      </div>
    );
  }
}

export default Transcripts;
