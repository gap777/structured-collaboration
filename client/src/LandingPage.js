import React, { Component } from 'react';

class LandingPage extends Component {
  constructor(props) {
      super(props);
      this.startMeeting = this.startMeeting.bind(this);
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
      "/create-meeting",
      {
        method: "POST"
      });
    const json = await response.json();
    this.props.history.push(`/${json.meetingId}/facilitate`);
  }

  render() {

    return (
      <div className="launch">
        <div className="launchBlock">
        	<h1>Start a Meeting</h1>
        	<button className="btn" onClick={this.startMeeting}
            >Start</button>
        </div>
        <div className="launchBlock">
        	<h1>Join a Meeting</h1>
        	<input type='text' onChange={event => this.updateInputValue(event)} />
            <br/>
            <br/>
        	<button className="btn"
                onClick={() => {
                this.props.history.push(`/${this.state.inputValue}/participate`)}}to={`/${this.state.inputValue}/participate`}
            >Join Meeting</button>
        </div>
      </div>
    );
  }
}


export default LandingPage;