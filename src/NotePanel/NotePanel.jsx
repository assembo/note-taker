import React from "react";
import { Button, TextField } from '@mui/material';
import { ASSEMBO_COLORS, SLACK_APP_TOKEN_ENDPOINT } from "../constants";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Swal from 'sweetalert2';
import axios from '../axios';
import './NotePanel.css';

class NotePanel extends React.Component {
  constructor(props) {
    super(props);
    window.notePad = this;
    this.state = {  }
  }

  render() {
    const slackIntegration = this.props.user && this.props.user.slack_integration ?
      this.props.user.slack_integration :
      null;
    return (
      <div className="containershadow">
        <TextField
          className="note-panel__textarea"
          value={this.props.note}
          multiline
          rows={20}
          onChange={this.props.setNotes}
        />
        
        <div style={{display:"flex"}}>
        <CopyToClipboard text={this.props.note}
            onCopy={() => this.setState({copied: true})}>
            <Button
              className="NotePanel__copy-button"
              variant="contained"
              fullWidth
              style={{
                borderRadius: '20px',
                fontWeight: 'bolder',
                padding: '10px',
                marginRight: '5px',
                marginLeft: '5px',
                marginTop: '20px',
                marginBottom: '5px',
                color: '#45d8d8',
                background: 'white',
                boxShadow: '1 1 1 1',
              }}
            >
              {this.state.copied ? "Copied!" : "Copy to clipboard"}
            </Button>
        </CopyToClipboard>
        <Button
            className="notePanel__send-email-button notePanel__button"
            variant="contained"
            fullWidth
            onClick={ async()=>{
              const { value: email } = await Swal.fire({
                title: 'Send notes to email',
                input: 'email',
                inputPlaceholder: 'Enter your email address',
                inputAttributes: {
                  name: "email",
                  autocomplete: "email"
                },
                confirmButtonColor: ASSEMBO_COLORS.primary,
                confirmButtonText: "SEND",
                borderRadius: "25px"
              });
              
              if (email) {
                Swal.fire({
                  title:`Assembo's notes sent to: ${email}`,
                  confirmButtonColor: ASSEMBO_COLORS.primary}
                );
                await axios.get("send_email", 
                  {
                    params: {
                    toEmail: email,
                    notes: this.props.note
                  }
                });                
              }
            }}
        >Send to email</Button>
        {
          this.props.user &&
          <Button
            className="notePanel__add_to_slack notePanel__button"
            variant="contained"
            fullWidth
            onClick={ () => {
              window.location = SLACK_APP_TOKEN_ENDPOINT;
            }}
          >
            Add to Slack
          </Button>
        }
        {
          slackIntegration && 
          <Button
            className="notePanel__add_to_slack notePanel__button"
            variant="contained"
            fullWidth
            onClick={ async () => {
              await axios.get("send_message",
              {
                params: {
                  notes: this.props.note,
                  slackBotToken: slackIntegration.bot_access_token,
                  channel_id: slackIntegration.channel_id
                }
              });
              Swal.fire({
                title:`Assembo's notes sent to Slack`,
                confirmButtonColor: ASSEMBO_COLORS.primary}
              );
            }}
            >
            Send to Slack
          </Button>
        }
        </div>
      </div>
    );
  }
}
export default NotePanel;