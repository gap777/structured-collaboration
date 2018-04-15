import React, { Component } from 'react';
import Header from './Header.js';
import { Redirect } from 'react-router-dom';

class ParticipantView extends Component {

  render() {
    const participantIdString = sessionStorage.getItem('participantId');
    if (!participantIdString) {
      // return <Redirect to='/'/>
    }

    const participantId = parseInt(participantIdString, 10);
    return (
      <React.Fragment>
        <Header sessionNumber={this.props.match.params.meetingId}/>
        {/* No Question Present*/}
        <p>Participant {participantId}, please wait for a question....</p>

        {/* Question Present*/}
        <div className="card question">
          <div className="questionTitle">
            <h1>What are your biggest pain points related to this project?</h1>
          </div>
          <input type='text' placeholder="Type your answer" />
          <div className="questionActions">
            <button className="btn" >Submit</button>
          </div>
        </div>



      </React.Fragment>
    );
  }
}

export default ParticipantView;
