import React, { Component } from 'react';
import './Header.css'

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
