
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
    return this.props.responses.map((response, index) => {
      return (
        <li key={index} className="answer">
          <p>{response.responseText}</p>
        </li>
      )
    });
  }

  render() {
    return (
      <div className="responses">
        <p className="responsesTitle">RESPONSES:</p>
        {this.renderResponseList()}
      </div>
    );
  }

}

export default ResponseBlock;