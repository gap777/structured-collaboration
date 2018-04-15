import React, { Component } from 'react';
import './css/App.css';
import LandingPage from './LandingPage';
import FacilitatorView from './FacilitatorView';
import ParticipantView from './ParticipantView';
import ResponseView from './ResponseView';
import RankingView from './RankingView';
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <React.Fragment>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/:meetingId/facilitate" component={FacilitatorView} />
            <Route exact path="/:meetingId/participate" component={ParticipantView} />
            <Route exact path="/:meetingId/responses" component={ResponseView} />
            <Route exact path="/:meetingId/ranking" component={RankingView} />
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
