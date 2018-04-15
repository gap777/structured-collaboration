import React, { Component } from 'react';
import Header from './Header.js';
import { Redirect } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import ParticipantSocket from './ParticipantSocket';

class ParticipantView extends Component {

  constructor(props) {
    super(props);
    this.state = {
        text: ''
    };
    this.updateParticipantCount = this.updateParticipantCount.bind(this);
    this.state = {};
  }

  componentWillMount() {
    const socket = new ParticipantSocket(this._meetingId());
    socket.handleServerUpdatesTo('participants', this.updateParticipantCount);
  }

  updateParticipantCount(participants) {
    this.setState({
      numberParticipants: participants
    })
  }

  _meetingId() {
    return this.props.match.params.meetingId;
  }

  updateText(event){
      this.setState({
          questionText: event.target.value
      });
  }
  render() {
    const participantIdString = sessionStorage.getItem('participantId');
    if (!participantIdString) {
      return <Redirect to='/'/>
    }

    const participantId = parseInt(participantIdString, 10);
    return (
      <React.Fragment>
        <Header numberParticipants={this.state.numberParticipants}
                meetingId={this._meetingId()}/>

        {/* No Question Present*/}
        <div className="waitingView grey">
            <FeatherIcon className="spin iconSVG" icon="loader" />
            <div className="iconLabel">Hey Participant {participantId}, please wait for a question....</div>   
        </div>

        {/* Question Present*/}
        <div className="card question">
          <div className="questionTitle">
            <h1>What are your biggest pain points related to this project?</h1>
          </div>
          <input
              type='text'
              placeholder="Type your answer"
              onChange={this.updateText}
          />
          <div className="questionActions">
            <button className="btn" >Submit</button>
          </div>
        </div>
        
        {/* Waiting for Facilitator ro share back Responses*/}
        <div className="waitingView grey">
            <FeatherIcon className="spin iconSVG" icon="loader" />
            <div className="iconLabel">Your awesome, the group responses will be here soon....</div>   
        </div>



      </React.Fragment>
    );
  }
}

export default ParticipantView;
