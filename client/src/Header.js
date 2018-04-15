import React, { Component } from 'react';
import './css/Header.css'

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      numberParticipants: undefined
    }
  }

  componentWillMount() {
    this.getParticipants()
        .then(participantCount => this.setState({
          numberParticipants: participantCount
        }));
  }

  async getParticipants(){
    try {
      const response = await fetch(
        "/api/meeting/:meetingId/participants",
        {
          method: "GET"
        });
      const json = response.json();
      return json.participants;
    }
    catch (error) {
      console.log(error);
    }
    return 0;
  }

  render() {
    return (
        <div className="header">
            <p className="sessionNumber">Session# {this.props.sessionNumber}</p>
            <p className="participantNumber">{this.state.numberParticipants || 0}</p>
        </div>
    );
  }
}

export default Header;
