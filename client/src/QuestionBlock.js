import React, { Component } from 'react';
import FeatherIcon from 'feather-icons-react';
import ResponseBlock from './ResponseBlock';

class QuestionBlock extends Component {
  
  constructor(props){
      super(props);
      this.submitQuestion = this.submitQuestion.bind(this);
      this.showAnswers = this.showAnswers.bind(this);
      this.onResponseSubmitted = this.onResponseSubmitted.bind(this);
      this.updateInputTextValue = this.updateInputTextValue.bind(this);
      this.state = this.makeStateFromProps(this.props);
      this.props.pushNotifier.registerCallback(this.onResponseSubmitted, 'response');
  }

  componentWillReceiveProps(newProps) {
    this.setState(this.makeStateFromProps(newProps));
  }

  makeStateFromProps(props) {
    let stateObj;
    if (props.question) {
      stateObj = props.question;
      stateObj.responses = props.question.responses || [];
      stateObj.waitingForResponses = false;
    } else {
      stateObj = {
        questionText: '',
        questionId: undefined,
        responses: [],
        waitingForResponses: false
      }
    }
    return stateObj;
  }

  updateInputTextValue(event){
      this.setState({
        questionText: event.target.value
      });
  }

  async _addQuestionToServer() {
    try {
      const response = await fetch(
        `/api/meeting/${this.props.meetingId}/questions`,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            questionText: this.state.questionText
          })
        });
      const json = await response.json();
      return json.questionId;

    } catch (err) {
      alert('There is currently an error with the server. We apologize for your inconvenience.');
      return;
    }
  }

  onResponseSubmitted(response) {
    const numResponsesWithNewOne = this.state.responses.length + 1;
    const numParticipantsExceptForFacilitator = this.props.numberParticipants - 1;
    const waitingForResponses = numResponsesWithNewOne < numParticipantsExceptForFacilitator;
    this.setState({
      waitingForResponses: waitingForResponses,
      responses: [...this.state.responses, response]
    });
  }

  async submitQuestion() {
    const questionId = await this._addQuestionToServer();
    this.setState({
      waitingForResponses: true,
      questionId: questionId
    });
  }

  showAnswers() {

  }

  renderEditableQuestionText() {
    return (
      <div className="card question">
        <input type='text'
               placeholder="Type your question"
               onChange={this.updateInputTextValue}/>
        <div className="questionActions">
          <button className="btn" onClick={this.submitQuestion}>Submit</button>
        </div>
      </div>
    );
  }

  renderQuestionAwaitingResponses() {
    return (
      <div className="card question">
        <h1>{this.state.questionText}</h1>
        <FeatherIcon className="spin iconSVG" icon="loader" />
        <div className="iconLabel">{this.state.responses.length} of {this.props.numberParticipants - 1} participants responded</div>
        <div className="questionActions">
          <button className="btn" onClick={this.showAnswers}>End</button>
        </div>
      </div>
    );
  }

  renderQuestionWithResponses() {
    return (
      <div className="card question">
        <h1>{this.state.questionText}</h1>
        <ResponseBlock responses={this.state.responses} />
        <div className="questionActions">
          <button className="btn">Share</button>
          <button className="btn">Rank</button>
        </div>
      </div>
    );
  }

  renderFixedQuestionText() {
    return this.state.waitingForResponses ?
      this.renderQuestionAwaitingResponses() :
      this.renderQuestionWithResponses();
  }

  render() {
      return this.state.questionId ?
        this.renderFixedQuestionText() :
        this.renderEditableQuestionText();
  }
}

export default QuestionBlock;
