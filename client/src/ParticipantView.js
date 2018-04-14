import React, { Component } from 'react';
import Header from './Header.js'

class ParticipantView extends Component {
  render() {
    const participantId = parseInt(sessionStorage.getItem('participantId'), 10);
    return (
      <React.Fragment>
        <Header sessionNumber={this.props.match.params.meetingId}/>
        <p>Participant {participantId}, please wait for a question....</p>
      </React.Fragment>
    );
  }
}

export default ParticipantView;
