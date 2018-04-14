import React, { Component } from 'react';

class LandingPage extends Component {
  constructor(props) {
      super(props);
      this.startMeeting = this.startMeeting.bind(this);
      this.joinMeeting = this.joinMeeting.bind(this);
      this.state = {
          inputValue: ''
      };
  }

  updateInputValue(event){
      this.setState({
         inputValue: event.target.value
      });
  }

  async startMeeting() {
    const response = await fetch(
      "/api/meeting",
      {
        method: "POST"
      });
    const json = await response.json();
    this.props.history.push(`/${json.meetingId}/facilitate`);
  }

  async joinMeeting() {
    const meetingId = this.state.inputValue;
    const response = await fetch(
      `/api/meeting/${meetingId}/participants`,
      {
        method: "POST"
      });
      try {
          await response.json();
      }  catch(err){
          alert("There is currently an error with the server. We're sorry for your inconvenience.");
          return;
      }
    const json = await response.json();
    console.log(`Participant ${json.participantId} joined the meeting!`);

    sessionStorage.setItem('participantId', json.participantId.toString());

    this.props.history.push(`/${meetingId}/participate`);
  }

  render() {

    return (
      <div className="launch">
        <div className="launchBlock">
        	<h1>Start a Meeting</h1>
        	<button className="btn" onClick={this.startMeeting}>Start</button>
        </div>
        <div className="launchBlock">
        	<h1>Join a Meeting</h1>
        	<input type='text' onChange={event => this.updateInputValue(event)} />
            <br/>
            <br/>
        	<button className="btn" onClick={this.joinMeeting}>Join Meeting</button>
        </div>
      </div>
    );
  }
}


export default LandingPage;