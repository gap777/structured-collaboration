import React, { Component } from 'react';
import './css/Header.css'
import FeatherIcon from 'feather-icons-react';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      numberParticipants: this.props.numberParticipants
    }
  }

  componentWillMount() {
    if (!this.state.numberParticipants) {
      this.getParticipants()
          .then(participantCount => this.setState({
            numberParticipants: participantCount
          }));
    }
  }

  componentWillReceiveProps(newProps) {

    if (newProps.numberParticipants !== this.state.numberParticipants) {
      this.setState({
        numberParticipants: newProps.numberParticipants
      });
    }
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
                <FeatherIcon className="iconSVG" icon="zap" />
                Collaboration JAM - {this.props.meetingId}
            </div>

            <div className="participantBlock">
                <button className="btn-secondary">Leave Meeting</button>
                <FeatherIcon className="iconSVG" icon="user" />
                {this.state.numberParticipants || 0}
            </div>

            <div className="participantAction">
                <button className="btn-secondary">Leave Meeting</button>
            </div>
        </div>
    );
  }
}

export default Header;
