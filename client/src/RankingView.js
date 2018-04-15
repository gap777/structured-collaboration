import React, { Component } from 'react';
import Header from './Header.js';


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
                            <label class="container">
                                <p>Squirrels</p>
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>
                        </li>
                        <li className="answer">
                            <label class="container">
                                <p>Its cold outside.</p>
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>
                        </li>
                        <li className="answer">
                            <label class="container">
                                <p>Not enough snacks</p>
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>                
                        </li>
                        <li className="answer">
                            <label class="container">
                                <p>Lack of coordination</p>
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>  
                        </li>
                        <li className="answer">
                            <label class="container">
                                <p>I dunno</p>
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>                  
                        </li>
                        <li className="answer">
                             <label class="container">
                                <p>Changing timelines</p>
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>
                        </li>
                    </ul>
                    <div className="questionActions">
                        <button className="btn">Submit</button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default RankingView;