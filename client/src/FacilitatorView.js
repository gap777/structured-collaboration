import React, { Component } from 'react';
import Header from './Header.js'

class FacilitatorView extends Component {
  render() {
    return (
      <React.Fragment>
          <Header sessionNumber={this.props.match.params.meetingId}/>
            
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
                        <button className="btn" >End</button>
                    </div>
                </div>
        
            </div>
      </React.Fragment>
    );
  }
}

export default FacilitatorView;
