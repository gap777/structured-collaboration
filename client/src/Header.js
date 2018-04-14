import React, { Component } from 'react';
import './css/Header.css'

class Header extends Component {

    async getParticipants(){
        const response = await fetch(
            "/api/meeting/:meetingId/participants",
            {
                method: "GET"
            });
        return response;
    }

    render() {
        return (
            <div className="header">
                <p className="sessionNumber">Session# {this.props.sessionNumber}</p>
                <p className="participantNumber">{this.getParticipants()}</p>
            </div>
        );
    }
}

export default Header;
