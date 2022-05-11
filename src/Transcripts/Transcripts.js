import React from "react";
import { Box, Button, Typography, Popper} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import { ASSEMBO_COLORS, ASSEMBO_NOTE_TAKER_COMMANDS } from "../constants";
import { preprocessText, stripWhiteSpaceAddDash } from "./helpers";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import { TRANSCRIPT_SUMMARIZATION_WORD_COUNT } from "./constants";

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
      anchorEl: null,
      popoverText: "",
      loading: false
    };
    window.axios = axios;
  }

  componentDidMount() {
    this.setupWebkitSpeechRecognition();
  }


  processTranscripts(){
    const newTranscripts = this.state.transcripts.filter(x=>x.isNew===true);
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
      // this.processTranscripts();
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
        if (!this.state.recording) return;
        this.recognition.start();
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
        this.props.addNotes(stripWhiteSpaceAddDash(previousTranscript.text));
        break;
      case ASSEMBO_NOTE_TAKER_COMMANDS.ASSIGN_TO:
        const subject = formattedResult.subject;
        previousTranscript = this.state.transcripts[0];
        const previousTranscriptText = previousTranscript.text;
        const strippedText = previousTranscriptText;
        const assignText = stripWhiteSpaceAddDash(`${subject}:${strippedText}`);
        this.props.addNotes(assignText);
        break;
      case ASSEMBO_NOTE_TAKER_COMMANDS.ADD_TRANSCRIPT:
        const newTranscript = [ { text: rawText, isNew: true, addDirectly: false }, ...this.state.transcripts];
        this.setState({ transcripts: newTranscript });
        break;
      default:
        break;
    }
  }
  //The functions are associated with the popup function for the Transcript.
  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  }
  
  handleClick = (event) => {
    this.setState({ anchorEl:event.currentTarget });
  };
 
  clearTranscripts = () => {
    const newTranscripts = this.state.transcripts.map( ( oldTranscript ) => {
      const newTranscript = { ...oldTranscript, addDirectly: false };
      return newTranscript;
    });
    this.setState({ transcripts: newTranscripts });
  };

  render() {
    //Setting up the elements for the popup element for transcripts
    let openingPopup =Boolean(this.state.anchorEl)
    let id =openingPopup ? 'simple-popover' : undefined
    return (
      <div className="containershadow" 
        style={{
          display: "flex",
          borderRadius: 25, 
          flexGrow: 1,
          marginRight: "80px",
          height: "98%"
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
            height: "520px",
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
                <>
                <div>
                    <Box 
                    key={index} display={"flex"} marginBottom={3} aria-describedby={id} >
                    <Box 
                      flex={1}
                      >
                      <Button onClick={async (event)=>{
                        this.setState({ anchorEl: null });
                        // TODO: change length to 30 words and move into constants
                          if( 
                            message.text.split(" ").length >= TRANSCRIPT_SUMMARIZATION_WORD_COUNT
                          ){
                            // check if message should be added directly
                            if (message.addDirectly) {
                              this.props.addNotes(stripWhiteSpaceAddDash(message.text));
                              this.clearTranscripts();
                              // clear all messages
                            } else {
                              this.setState({
                                anchorEl:event.currentTarget,
                                loading: true
                              });
                              // temporarily comment out
                              let summary;
                              if (message.summary) {
                                summary = message.summary;
                              } else {
                                const result = await axios.get('/generateSummarization',{ params:{ text: message.text }});
                                summary = result.data;
                              }
                              this.setState({
                                popoverText: summary,
                                loading: false
                              });
                              const newTranscripts = this.state.transcripts.map( ( oldTranscript ) => {
                                const newTranscript = oldTranscript.text !== message.text ? oldTranscript :
                                { text: message.text, isNew: message.isNew, summary, addDirectly: true };
                                return newTranscript;
                              });
                              this.setState({ transcripts: newTranscripts });
                            }
                          } else {
                            // if it's shorter than 30 words
                            this.props.addNotes(stripWhiteSpaceAddDash(message.text));
                          }

                        }}>
                      <Typography 
                        style={{ 
                          overflow:"hidden",
                          textAlign: "left"
                        }} >{message.text}</Typography>
                      </Button>
                    </Box>
                  </Box>
                </div>
                </>
                
              )
            })
          }
          </Box>
          <Popper
              id={id}
              open={openingPopup}
              anchorEl={this.state.anchorEl}
              onClose={this.handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                { this.state.loading ? <CircularProgress /> : 
                  <Button
                    onClick={()=>{ 
                      this.props.addNotes(stripWhiteSpaceAddDash(this.state.popoverText));
                      this.setState({
                        anchorEl: null
                      });
                      this.clearTranscripts();
                    }
                    }
                  >
                    <Typography  sx={{ p:2 }}>{this.state.popoverText}</Typography>
                  </Button>
                }
              </Box>
          </Popper>

        </div>
      </div>
    );
  }
}

export default Transcripts;
