import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LandingPage extends Component {

  render() {

    return (
      <div className="launch">
        <div className="launchBlock">
        	<h1>Start a Meeting</h1>
        	<button className="btn" to="/1234/facilitate">Start</button>
        </div>
        <div className="launchBlock">
        	<h1>Join a Meeting</h1>
        	<input type='text'/>
            <br/>
            <br/>
        	<button className="btn" to="/1234/participate">Join Meeting</button>
        </div>
      </div>
    );
  }
}


export default LandingPage;