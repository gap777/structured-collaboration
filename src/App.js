import React, { Component } from 'react';

import './App.css';
import MeetingView from './MeetingView';
import Header from './Header.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header sessionNumber={6832}/>
        <MeetingView/>
      </div>
    );
  }
}

export default App;
