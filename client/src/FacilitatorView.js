import React, { Component } from 'react';
import Header from './Header.js'

class FacilitatorView extends Component {
  render() {
    return (
      <React.Fragment>
          <Header sessionNumber={this.props.match.params.meetingId}/>
          <p>Do you have a question</p>
      </React.Fragment>
    );
  }
}

export default FacilitatorView;
