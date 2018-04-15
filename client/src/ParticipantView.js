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
    this.submitResponse = this.submitResponse.bind(this);
    this.updateText = this.updateText.bind(this);

    this.state = {
      waitingForQuestion: true,
      participantId: undefined,
      activeQuestionText: undefined,
      responding: false,
      waitingForEnd: false,
      responseText: undefined
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
      responding: true
    });
  }

  async submitResponse() {
    const meetingId = this._meetingId();
    const questionId = this.state.activeQuestion._id;

    try {
      const response = await fetch(
        `/api/meeting/${meetingId}/questions/${questionId}/responses/`,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            response: this.state.responseText
          })
        });
      const json = await response.json();
      const responseId = json.responseId;
      console.log(`Response ${responseId} submitted for question ${questionId} in meeting ${meetingId}`);
      this.setState({
        responding: false,
        responseId: responseId,
        waitingForEnd: true
      })

    } catch (err) {
      alert('There is currently an error with the server. We apologize for your inconvenience.');
    }
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
        responseText: event.target.value
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

  renderEditingResponse() {
    return (
      <div className="card question">
        <div className="questionTitle">
          <h1>{this.state.activeQuestion.questionText}</h1>
        </div>
        <input type='text'
               placeholder="Type your answer"
               onChange={this.updateText}/>
        <div className="questionActions">
          <button className="btn" onClick={this.submitResponse}>Submit</button>
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

        {this.state.waitingForQuestion ? this.renderWaitingForQuestion() : null}
        {this.state.responding ? this.renderEditingResponse() : null}
        {this.state.waitingForEnd ? this.renderWaitingForOtherAnswers() : null}

      </React.Fragment>
    );
  }
}

export default ParticipantView;
