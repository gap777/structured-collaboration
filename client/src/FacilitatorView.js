import React, { Component } from 'react';
import Header from './Header.js'
import FeatherIcon from 'feather-icons-react';
import QuestionBlock from "./QuestionBlock";

class FacilitatorView extends Component {
    constructor(){
        super();
        this.state = ({
            textOrQuestion : true
        });

        this.changeMode = this.changeMode.bind(this);
    }
    changeMode(type){
        if(type === 'question'){
            this.setState({
                textOrQuestion : true
            })
        }else if(type === 'text'){
            this.setState({
                textOrQuestion: false
            })
        }
    }

  render() {
    return (
      <React.Fragment>
          <Header meetingId={this.props.match.params.meetingId}/>

            <div className="questionList">
                
                <button className="btn">+ Add a Question</button>
                
                <QuestionBlock changeMode={this.changeMode.bind(this)}
                               questionMode={this.state.textOrQuestion}/>
        
                <div className="card question"> 
                    <div className="questionTitle">          
                        <h1>What are your biggest pain points related to this project?</h1>
                    </div>
                    
                    <div className="questionActions">
                        <div className="questionStatus yellow">
                            <FeatherIcon className="spin iconSVG" icon="loader" />
                            <div className="iconLabel">X of X People Responsed</div>
                        </div>                
                        <button className="btn" >End</button>
                        
                    </div>
                </div>
        
                <div className="card question"> 
                    <div className="questionTitle">          
                        <h1>What are your biggest pain points related to this project?</h1>
                    </div>
                    <div className="answerList">
                        <p>RESPONSES</p>
                        <div className="answer">
                            <p>Squirrels</p>
                        </div>
                        <div className="answer">
                            <p>Its cold outside.</p>
                        </div>
                        <div className="answer">
                            <p>Not enough snacks</p>
                        </div>
                        <div className="answer">
                            <p>Lack of coordination</p>
                        </div>
                        <div className="answer">
                            <p>I dunno</p>
                        </div>
                        <div className="answer">
                            <p>Changing timelines</p>
                        </div>
                    </div>
                    <div className="questionActions">
                        <button className="btn">Share</button>
                    </div>
                </div>
        
                <div className="card question"> 
                    <div className="questionTitle">          
                        <h1>What are your biggest pain points related to this project?</h1>
                    </div>
                    <div className="answerList">
                        <p>RESPONSES</p>
                        <div className="answer">
                            <p>Lack of coordination</p>
                            <FeatherIcon className="iconSVG" icon="star" />
                            <FeatherIcon className="iconSVG" icon="star" />
                            <FeatherIcon className="iconSVG" icon="star" />
                        </div>
                        <div className="answer">
                            <p>Changing timelines</p>
                            <FeatherIcon className="iconSVG" icon="star" />
                            <FeatherIcon className="iconSVG" icon="star" />
                        </div>
                        <div className="answer">
                            <p>Not enough snacks</p>
                            <FeatherIcon className="iconSVG" icon="star" />
                        </div>
                        <div className="answer">
                            <p>Squirrels</p>
                        </div>
                        <div className="answer">
                            <p>I dunno</p>
                        </div>
                        <div className="answer">
                            <p>Its cold outside.</p>
                        </div>
                        
                    </div>
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
