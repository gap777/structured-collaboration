import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
        };
    }

    updateInputValue(event){
        this.setState({
           inputValue: event.target.value
        });
    }

    generateRandomNum(){
        return Math.floor(1000 + Math.random() * 9000);
    }
  render() {

    return (
      <div>
        <Link to={`/${this.generateRandomNum()}/facilitate`}>Start Meeting</Link>
          <input type='text' onChange={event => this.updateInputValue(event)}/>
          <button >Submit</button>
        <Link to={`/${this.state.inputValue}/participate`}>Join Meeting</Link>
      </div>
    );
  }
}


export default LandingPage;