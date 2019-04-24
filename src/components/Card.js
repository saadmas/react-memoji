import React from 'react'
class Card extends React.Component {
  
  handleClick(evt) { 
    this.setState({isVisible: !this.state.isVisible})
  }

  render() {
    return (
      <div className="card-block" onClick={this.props.onClick} id ={this.props.id}>
      </div>
      )
  }
};

export default Card;