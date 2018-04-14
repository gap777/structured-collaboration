import React, { Component } from 'react';
import Header from './Header.js';
import { Redirect } from 'react-router-dom';

class ParticipantView extends Component {

  render() {
    const participantIdString = sessionStorage.getItem('participantId');
    if (!participantIdString) {
      return <Redirect to='/'/>
    }

    const participantId = parseInt(participantIdString, 10);
    return (
      <React.Fragment>
        <Header sessionNumber={this.props.match.params.meetingId}/>
        <p>Participant {participantId}, please wait for a question....</p>
      </React.Fragment>
    );
  }
}

export default ParticipantView;
