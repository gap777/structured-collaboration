import React, { Component } from 'react';
import Header from './Header.js';

class ResponseView extends Component {
    render() {
        return (
            <React.Fragment>
                <Header sessionNumber={this.props.match.params.meetingId}/>

                <div className="responses">
                    <div className="questionTitle">
                        <h1>What are your biggest pain points related to this project?</h1>
                    </div>
                    <p className="responsesTitle">RESPONSES:</p>
                    <ul className="answerList">
                        <li className="answer">
                            <p>Response to the question</p>
                        </li>
                        <li className="answer">
                            <p>Longer response to the question</p>

                        </li>
                        <li className="answer">
                            <p>The biggest pain point is that the program is too slow.</p>

                        </li>
                    </ul>
                </div>
            </React.Fragment>
        );
    }
}

export default ResponseView;