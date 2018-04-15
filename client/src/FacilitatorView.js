import React, { Component } from 'react';
import Header from './Header.js'
import FeatherIcon from 'feather-icons-react';
import ParticipantSocket from './ParticipantSocket';
import QuestionBlock from "./QuestionBlock";

class FacilitatorView extends Component {
    constructor(){
        super();
        this.state = ({
            textOrQuestion : true
        });

        this.changeMode = this.changeMode.bind(this);
    }
    changeMode(type){
        if(type === 'question'){
            this.setState({
                textOrQuestion : true
            })
        }else if(type === 'text'){
            this.setState({
                textOrQuestion: false
            })
        }
    }

  componentWillMount() {
    new ParticipantSocket(this._meetingId()).connectToServer(this.updateParticipantCount);
  }

  updateParticipantCount(data) {
    this.setState({
      numberParticipants: data.participants
    })
  }

  _meetingId() {
    return this.props.match.params.meetingId;
  }

  render() {
    return (
      <React.Fragment>
          <Header numberParticipants={this.state.numberParticipants}
                  meetingId={this._meetingId()}/>

            <div className="questionList">

                <button className="btn" onClick={alert("creating question")}>+ Add a Question</button>
                <QuestionBlock changeMode={this.changeMode.bind(this)}
                               questionMode={this.state.textOrQuestion}/>

                <div className="card question">
                    <div className="questionTitle">
                        <h1>What are your biggest pain points related to this project?</h1>
                    </div>

                    <div className="questionActions">
                        <div className="questionStatus yellow">
                            <FeatherIcon className="spin iconSVG" icon="loader" />
                            <div className="iconLabel">X of X People Responded</div>
                        </div>
                        <button className="btn" >End</button>

                    </div>
                </div>

                <div className="card responses">
                    <div className="questionTitle">
                        <h1>What are your biggest pain points related to this project?</h1>
                    </div>
                    <p className="responsesTitle">RESPONSES:</p>
                    <ul className="answerList">
                        <li className="answer">
                            <p>Squirrels</p>
                        </li>
                        <li className="answer">
                            <p>Its cold outside.</p>
                        </li>
                        <li className="answer">
                            <p>Not enough snacks</p>
                        </li>
                        <li className="answer">
                            <p>Lack of coordination</p>
                        </li>
                        <li className="answer">
                            <p>I dunno</p>
                        </li>
                        <li className="answer">
                            <p>Changing timelines</p>
                        </li>
                    </ul>
                    <div className="questionActions">
                        <button className="btn">Just Share</button>
                        <button className="btn">Send for Ranking</button>
                    </div>
                </div>

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

            </div>
      </React.Fragment>
    );
  }
}

export default FacilitatorView;
