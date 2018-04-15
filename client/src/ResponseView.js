import React, { Component } from 'react';
import Header from './Header.js';
import FeatherIcon from 'feather-icons-react';

class ResponseView extends Component {
    render() {
        return (
            <React.Fragment>
                <Header sessionNumber={this.props.match.params.meetingId}/>
                {/* WAITING FOR RESPONSES */}
                <div className="questionStatus yellow">
                    <FeatherIcon className="spin iconSVG" icon="loader" />
                    <div className="iconLabel">Collecting Responses</div>
                </div>
                
                {/* WITH RESPONSES */}
                <div className="responses card">
                    <div className="questionTitle">
                        <h1>What are your biggest pain points related to this project?</h1>
                    </div>
                    <p className="responsesTitle">RESPONSES:</p>
                    <ul className="answerList">
                        <li className="answer">
                            <p>Response to the question</p>
                        </li>
                        <li className="answer">
                            <p>Longer response to the question</p>git
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