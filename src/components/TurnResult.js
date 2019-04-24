import React from 'react'

class TurnResult extends React.Component {

  render() {
    return (
        <div> 
            <h2 className="turn-result" id="turn-result-text"> {this.props.turnresult} </h2>
            <button className="turn-result" id="next-turn-btn" onClick={this.props.onClick}> OK </button>
        </div>
    )
  }

};

export default TurnResult;