import React, { Component } from 'react';
import './css/Header.css'

class Header extends Component {
    render() {
        return (
            <div className="header">
                <p className="sessionNumber">Session# {this.props.sessionNumber}</p>
            </div>
        );
    }
}

export default Header;
