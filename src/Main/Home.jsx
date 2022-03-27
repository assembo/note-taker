import React from "react";
import Transcript from "../Transcripts/Transcripts";
import NotePanel from "../NotePanel/NotePanel";

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
                this.setState({
                  note: `${this.state.note}\n${text}`
                })
              }}
            ></NotePanel>
          </div>

          <div type="transcript" id="transcript">
            <Transcript
            addNotes={(text)=>{
              this.setState({
                note: `${this.state.note}\n${text}`,
                copied: false,
              })
            }}> 
            </Transcript>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
