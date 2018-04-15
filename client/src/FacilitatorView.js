import React, { Component } from 'react';
import Header from './Header.js'
import FeatherIcon from 'feather-icons-react';


class FacilitatorView extends Component {
  render() {
    return (
      <React.Fragment>
          <Header meetingId={this.props.match.params.meetingId}/>

            <div className="questionList">
                
                <button className="btn">+ Add a Question</button>
                
                <div className="card question"> 
                    <input type='text' placeholder="Type your question" />
                    <div className="questionActions">
                        <button className="btn" >Submit</button>
                    </div>
                </div>
        
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
                                <FeatherIcon className="iconSVG" icon="star" />
                            </div>
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
