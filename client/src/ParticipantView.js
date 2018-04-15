import React, { Component } from 'react';
import Header from './Header.js';
import { Redirect } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import ParticipantSocket from './ParticipantSocket';

class ParticipantView extends Component {

  constructor(props) {
    super(props);
    this.state = {
        text: ''
    };
    this.updateParticipantCount = this.updateParticipantCount.bind(this);
    this.setActiveQuestion = this.setActiveQuestion.bind(this);
    this.state = {
      waitingForQuestion: true,
      participantId: undefined,
      activeQuestionText: undefined,
      answeringQuestion: false,
      waitingForAnswers: false
    };
    this.pushNotifier = new ParticipantSocket(this._meetingId());
    this.pushNotifier.registerCallback(this.updateParticipantCount, 'participants');
    this.pushNotifier.registerCallback(this.setActiveQuestion, 'activeQuestion');
  }

  componentWillMount() {
    const participantIdString = sessionStorage.getItem('participantId');
    if (participantIdString) {
      this.setState({
        participantId: parseInt(participantIdString, 10)
      })
    }
  }

  setActiveQuestion(question) {
    this.setState({
      activeQuestion: question,
      waitingForQuestion: false,
      answeringQuestion: true
    });
  }

  updateParticipantCount(participants) {
    this.setState({
      numberParticipants: participants
    })
  }

  _meetingId() {
    return this.props.match.params.meetingId;
  }

  updateText(event){
      this.setState({
          questionText: event.target.value
      });
  }

  renderWaitingForQuestion() {
    return (
      <div className="waitingView grey">
        <FeatherIcon className="spin iconSVG" icon="loader" />
        <div className="iconLabel">Hey Participant {this.state.participantId}, please wait for a question....</div>
      </div>
    );
  }

  renderBeingAnswered() {
    return (
      <div className="card question">
        <div className="questionTitle">
          <h1>{this.state.activeQuestion.questionText}</h1>
        </div>
        <input type='text' placeholder="Type your answer" />
        <div className="questionActions">
          <button className="btn" >Submit</button>
        </div>
      </div>
    );
  }

  renderWaitingForOtherAnswers() {
    return (
      <div className="waitingView grey">
        <FeatherIcon className="spin iconSVG" icon="loader" />
        <div className="iconLabel">Your awesome, the group responses will be here soon....</div>
      </div>
    );
  }

  render() {
    if (!this.state.participantId) {
      return <Redirect to='/'/>
    }

    return (
      <React.Fragment>
        <Header numberParticipants={this.state.numberParticipants}
                meetingId={this._meetingId()}/>
        <div className="waitingView grey">
            <FeatherIcon className="spin iconSVG" icon="loader" />
            <div className="iconLabel">Hey Participant {participantId}, please wait for a question....</div>   
        </div>

        {/* Question Present*/}
        <div className="card question">
          <div className="questionTitle">
            <h1>What are your biggest pain points related to this project?</h1>
          </div>
          <input
              type='text'
              placeholder="Type your answer"
              onChange={this.updateText}
          />
          <div className="questionActions">
            <button className="btn" >Submit</button>
          </div>
        </div>
        
        {/* Waiting for Facilitator ro share back Responses*/}
        <div className="waitingView grey">
            <FeatherIcon className="spin iconSVG" icon="loader" />
            <div className="iconLabel">You're awesome, the group responses will be here soon....</div>
        </div>

        {this.state.waitingForQuestion ? this.renderWaitingForQuestion() : null}
        {this.state.answeringQuestion ? this.renderBeingAnswered() : null}
        {this.state.waitingForAnswers ? this.renderWaitingForOtherAnswers() : null}

      </React.Fragment>
    );
  }
}

export default ParticipantView;
