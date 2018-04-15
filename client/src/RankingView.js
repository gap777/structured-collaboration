import React, { Component } from 'react';
import Header from './Header.js';
import FeatherIcon from 'feather-icons-react';

class RankingView extends Component {
    render() {
        return (
            <React.Fragment>
                <Header sessionNumber={this.props.match.params.meetingId}/>

                {/* WITH RESPONSES */}
                <div className="responses card">
                    <div className="questionTitle">
                        <h1>This is a ranking question?</h1>
                    </div>
                    <p className="responsesTitle">SELECT YOUR TOP 3 RESPONSES:</p>
                    <ul className="answerList">
                        <li className="answer">
                            <label>
                                <p>Squirrels</p>
                            <input type="checkbox"/>
                            </label>
                        </li>
                        <li className="answer">
                            <label><p>Its cold outside.</p>
                            <input type="checkbox"/>
                            </label>
                        </li>
                        <li className="answer">
                            <label><p>Not enough snacks</p>
                            <input type="checkbox"/>
                            </label>
                        </li>
                        <li className="answer">
                            <label><p>Lack of coordination</p>
                            <input type="checkbox"/>
                            </label>
                        </li>
                        <li className="answer">
                            <label><p>I dunno</p>
                            <input type="checkbox"/>
                            </label>
                        </li>
                        <li className="answer">
                            <label><p>Changing timelines</p>
                            <input type="checkbox"/>
                            </label>
                        </li>
                    </ul>
                </div>
            </React.Fragment>
        );
    }
}

export default RankingView;