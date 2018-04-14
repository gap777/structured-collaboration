import React, { Component } from 'react';
import Header from './Header.js'

class ParticipantView extends Component {
  render() {
    return (
      <React.Fragment>
        <Header sessionNumber={6832}/>
        <p>Please wait for a question</p>
      </React.Fragment>
    );
  }
}

export default ParticipantView;
