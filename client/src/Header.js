import React, { Component } from 'react';
import './css/Header.css'
import FeatherIcon from 'feather-icons-react';

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
        `/api/meeting/${this.props.meetingId}/participants`,
        {
          method: "GET"
        });
      const json = await response.json();
      return json.participants;
    } catch (error) {
      console.log(error);
    }
    return 0;
  }

  render() {
    return (
        <div className="header">
            
            <div className="sessionBlock">
                <FeatherIcon className="iconSVG" icon="message-circle" />
                Decision JAM - {this.props.sessionNumber}
            </div>
                
            <div className="participantBlock">
                <FeatherIcon className="iconSVG" icon="user" />
                {this.state.numberParticipants || 0}
            </div>

        </div>
    );
  }
}

export default Header;
