import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LandingPage extends Component {

  render() {

    return (
      <div>
        <Link to="/1234/facilitate">Start Meeting</Link>
        <input type='text'/>
        <Link to="/1234/participate">Join Meeting</Link>
      </div>
    );
  }
}


export default LandingPage;