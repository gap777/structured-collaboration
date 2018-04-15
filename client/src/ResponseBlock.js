
import React, { Component } from 'react';
import FeatherIcon from 'feather-icons-react';

class ResponseBlock extends Component {

  renderResponseList() {
    return (
      <ul className="answerList">
        {this.renderResponses()}
      </ul>
    );
  }

  renderResponses() {
    return this.props.responses.map((responseText, index) => {
      return (
        <li key={index} className="answer">
          <p>{responseText}</p>
        </li>
      )
    });
  }

  render() {
    return (
      <div className="card responses">
        <p className="responsesTitle">RESPONSES:</p>
        {this.renderResponseList()}
      </div>
    );
  }

}

export default ResponseBlock;