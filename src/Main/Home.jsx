import React from "react";
import Transcript from "../Transcripts/Transcripts";
import NotePanel from "../NotePanel/NotePanel";
import axios from 'axios';
import { stripWhiteSpaceAddDash } from "../Transcripts/helpers";

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
      <div>
        <div         
          style={{
            marginTop: "60px" /* excluding the height of the header */
          }}
          className="mainbox"
          >
          <div type="note" id="note">
            <NotePanel
              note={this.state.note}
              setNotes={(e)=>{this.handleTextInputChange(e)}} 
              addNotes={(text)=>{
                // strip white space
                const formattedText = stripWhiteSpaceAddDash(text);
                this.setState({
                  note: `${this.state.note}\n${formattedText}`
                });
              }}
              onClickGenerateButton={async ()=>{
                const result = await axios.get("http://127.0.0.1:5000/todo", {
                  params: {
                    text: this.state.note,
                  },
                })
                this.setState({
                  note: `${this.state.note}\n\nAction items:\n$${result.data}`,
                  copied: false,
                })
                // const result = await axios.get("http://django-tutorial-app.us-west-2.elasticbeanstalk.com")
                console.log(`onClickGenerateButton`, result);
              }}
            ></NotePanel>
          </div>

          <div type="transcript" id="transcript">
            <Transcript
              addNotes={(text)=>{
                // strip white space
                const formattedText = stripWhiteSpaceAddDash(text);
                this.setState({
                  note: `${this.state.note}\n${formattedText}`,
                  copied: false,
                })
              }}
            > 
            </Transcript>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
