import React from 'react'

class Turn extends React.Component {

  render() {
    return (
        <h1 className="turn-count"> Turns: {this.props.currTurn} </h1>
    )
  }

};

export default Turn;