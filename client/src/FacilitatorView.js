import React, { Component } from 'react';
import Header from './Header.js'
import FeatherIcon from 'feather-icons-react';


class FacilitatorView extends Component {
  render() {
    return (
      <React.Fragment>
          <Header meetingId={this.props.match.params.meetingId}/>

            <div className="questionList">

                <button className="btn">+ Add a Question</button>

                <div className="card question">
                    <input type='text' placeholder="Type your question" />
                    <div className="questionActions">
                        <button className="btn" >Submit</button>
                    </div>
                </div>

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
                        <button className="btn">Share</button>
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
