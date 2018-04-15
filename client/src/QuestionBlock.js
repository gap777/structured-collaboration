import React, { Component } from 'react';
import FeatherIcon from 'feather-icons-react';
class QuestionBlock extends Component {
    constructor(){
        super();
        this.state = ({
            text: ''
        })
    }

    updateInputTextValue(event){
        this.setState({
            text: event.target.value
        });
    }

    render() {
        const questionBlock = (
            <div className="card question">
                <input type='text'
                       placeholder="Type your question"
                       onChange={event => this.updateInputTextValue(event)}/>
                <div className="questionActions">
                    <button className="btn"
                            onClick={() => this.props.changeMode('text')}
                    >Submit</button>
                </div>
            </div>);
        const textBlock = (
            <div className="card question">
                <p><b>{this.state.text}</b></p>
                <FeatherIcon className="spin iconSVG" icon="loader" />
                <div className="iconLabel">X of X People Responsed</div>
                <div className="questionActions">
                    <button className="btn">End</button>
                </div>
            </div>);

        if(this.props.questionMode === true){
            return (
                questionBlock
            );
        }else{
            return (
                textBlock
            );
        }
    }
}

export default QuestionBlock;
