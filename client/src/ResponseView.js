import React, { Component } from 'react';
import Header from './Header.js';

class ResponseView extends Component {
    render() {
        return (
            <React.Fragment>
                <Header sessionNumber={this.props.match.params.meetingId}/>

                <div className="card question">
                    <div className="questionTitle">
                        <h1>What are your biggest pain points related to this project?</h1>
                    </div>
                    <div className="answerList">
                        <p>RESPONSES</p>
                        <div className="answer">
                            <p>What are your biggest pain points related to this project?</p>
                            <div className="answerActions">
                            </div>
                        </div>
                        <div className="answer">
                            <p>What are your biggest pain points related to this project?</p>
                            <div className="answerActions">
                            </div>
                        </div>
                        <div className="answer">
                            <p>What are your biggest pain points related to this project?</p>
                            <div className="answerActions">
                            </div>
                        </div>
                    </div>
                    <div className="questionActions">
                        <button className="btn">Share</button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ResponseView;