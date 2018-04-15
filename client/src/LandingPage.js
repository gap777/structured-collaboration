import React, { Component } from 'react';
import FeatherIcon from 'feather-icons-react';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.startMeeting = this.startMeeting.bind(this);
    this.joinMeeting = this.joinMeeting.bind(this);
    this.state = {
      inputValue: ''
    };
  }

  updateInputValue(event) {
    this.setState({
      inputValue: event.target.value
    });
  }

  async startMeeting() {
    try {
      const response = await fetch(
        '/api/meeting',
        {
          method: 'POST'
        });
      const json = await response.json();
      const meetingId = json.meetingId;
      this.props.history.push(`/${meetingId}/facilitate`);
    } catch (err) {
      alert('There is currently an error with the server. We apologize for your inconvenience.');
      return;
    }
  }

  async joinMeeting() {
    const meetingId = this.state.inputValue;
    const response = await fetch(
      `/api/meeting/${meetingId}/participants`,
      {
        method: 'POST'
      });

    try {
      const json = await response.json();
      console.log(`Participant ${json.participantId} joined the meeting!`);
      sessionStorage.setItem('participantId', json.participantId.toString());
      this.props.history.push(`/${meetingId}/participate`);
    } catch (err) {
      alert('There is currently an error with the server. We apologize for your inconvenience.');
    }
  }

  render() {

    return (
        <div className="launch">
            <div className="logoArea">
                <FeatherIcon className="iconSVG" icon="message-circle" />
                <h1>Decision JAM</h1>
            </div>
            <div className="card">
                <h1>Start a Meeting</h1>
                <button className="btn" onClick={this.startMeeting}>Start</button>
            </div>
            <div className="card">
                <h1>Join a Meeting</h1>
                <input type='text'
                       placeholder="Enter a meeting id"
                       onChange={event => this.updateInputValue(event)} />
                <button className="btn" onClick={this.joinMeeting}>Join</button>
            </div>
        </div>
    );
  }
}


export default LandingPage;