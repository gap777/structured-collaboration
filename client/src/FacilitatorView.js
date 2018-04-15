import React, { Component } from 'react';
import Header from './Header.js'
import FeatherIcon from 'feather-icons-react';
import ParticipantSocket from './ParticipantSocket';
import QuestionBlock from "./QuestionBlock";

class FacilitatorView extends Component {

  constructor(props){
    super(props);
    this.state = ({
      questions: [],
      numberParticipants: 1
    });
    this.addQuestion = this.addQuestion.bind(this);
    this.updateParticipantCount = this.updateParticipantCount.bind(this);
    this.pushNotifier = new ParticipantSocket(this._meetingId());
    this.pushNotifier.registerCallback(this.updateParticipantCount, 'participants');
  }

  componentWillMount() {
    this.fetchQuestions().then(questions => {
      this.setState({
        questions: questions
      });
    })
  }

  async fetchQuestions() {
    try {
      const response = await fetch(
        `/api/meeting/${this._meetingId()}/questions`,
        {
          method: 'GET'
        });
      const json = await response.json();
      return json.questions;

    } catch (err) {
      alert('There is currently an error with the server. We apologize for your inconvenience.');
      return;
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

  addQuestion() {
    this.setState({
      questions: [
        {
          questionId: undefined,
          questionText: undefined,
          responses: [],
          numberParticipants: 1
        },
        ...this.state.questions
      ]
    });
  }

  _renderQuestions() {
    return this.state.questions.map((question,index) => {
      return <QuestionBlock key={index}
                            pushNotifier={this.pushNotifier}
                            meetingId={this._meetingId()}
                            question={question}
                            numberParticipants={this.state.numberParticipants}
                            />
    });
  }

  renderRankedOutput() {
    return (
      <div className="card responses">
        <div className="questionTitle">
          <h1>What are your biggest pain points related to this project?</h1>
        </div>
        <p className="responsesTitle">RESPONSES:</p>
        <ul className="answerList">
          <li className="answer">
            <p>Lack of coordination</p>
            <FeatherIcon className="iconSVG yellow" icon="star" />
            <FeatherIcon className="iconSVG yellow" icon="star" />
            <FeatherIcon className="iconSVG yellow" icon="star" />
          </li>
          <li className="answer">
            <p>Not enough snacks</p>
            <FeatherIcon className="iconSVG" icon="star" />
            <FeatherIcon className="iconSVG" icon="star" />
          </li>
          <li className="answer">
            <p>Changing timelines</p>
            <FeatherIcon className="iconSVG" icon="star" />
          </li>
          <li className="answer">
            <p>Squirrels</p>
          </li>
          <li className="answer">
            <p>I dunno</p>
          </li>
          <li className="answer">
            <p>Its cold outside.</p>
          </li>
        </ul>
        <div className="questionActions">
          <button className="btn">Share</button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
          <Header numberParticipants={this.state.numberParticipants}
                  meetingId={this._meetingId()}/>
            <div className="questionList">
                <button className="btn" onClick={this.addQuestion}>+ Add a Question</button>
                {this._renderQuestions()}
            </div>
      </React.Fragment>
    );
  }
}

export default FacilitatorView;
