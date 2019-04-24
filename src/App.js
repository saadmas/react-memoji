import React from 'react';
import ReactDOM from 'react-dom'
import './App.css';

import Card from './components/Card';
import Turn from './components/Turn';
import TurnResult from './components/TurnResult';

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      cardVals: this.generateCards(),
      turn: 0,
      turnResult: "",
      turnResClass: "turn-result-hide",
      flippedCards: [],
      lastFlippedCard: "",
      gameOver: false,
      showTurnResult: false
    };
  }

  shuffleCards(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
  }
  
  
  generateCards() {
    const emojiCodes = ['0x1F601', '0x1F602', '0x1F603', '0x1F604', '0x1F605', '0x1F606', '0x1F609', '0x1F60A', '0x1F60B', '0x1F60C',       '0x1F60D', '0x1F60E', '0x1F612', '0x1F613', '0x1F614', '0x1F616', '0x1F618', '0x1F61A'];
    const cardsArr = [];
    let idx = 0;
    
    //*
    for (let i=0; i<8; i++) {
        // 2 of each symbol
        cardsArr.push(String.fromCodePoint(emojiCodes[idx]));
        cardsArr.push(String.fromCodePoint(emojiCodes[idx]));
        idx++;
    }
    return this.shuffleCards(cardsArr);
  }

  promptNextTurn(turnRes) {

    if (turnRes==="w") {
      this.setState({turnResult: "Match!"});
    } else {
      this.setState({turnResult: "No Match!"});
    }

    this.setState({showTurnResult: true});
  }

  checkForEndGame() {
    const cards = document.querySelectorAll(".card-block");
    let gameOver = true;

    for (let i=0; i<cards.length; i++) {
      // game is on if there is any card that is yet to be flipped
      if (!cards[i].textContent) {
        gameOver = false;
        break;
      }
    }

    if (gameOver) {
      this.setState({gameOver: true});
    }
  }

  nextTurnClick() {

    // no match --> hide emojis 
    if (this.state.turnResult==="No Match!") {
      const fc = this.state.flippedCards;
      fc[0].textContent = "";
      fc[1].textContent = "";
      this.setState({flippedCards: fc});
    // match --> check if game is over
    } else {
      this.checkForEndGame();
    }

    // update state for next turn
    this.setState({turnResult: ""});
    this.setState({turn: this.state.turn+1});
    this.setState({flippedCards: []});
    this.setState({lastFlippedCard: ""});
    this.setState({showTurnResult: false});
  }

  cardClick(evt) {    

    // 2 flips per turn
    if (this.state.flippedCards.length!== 2 && this.state.lastFlippedCard!== evt.target) {

      this.setState({lastFlippedCard: evt.target});

      // show emoji
      if (!evt.target.textContent) {
        evt.target.textContent = evt.target.id;
      // hide emoji
      } else {
        evt.target.textContent = "" ;
      }

      // add card to flipped cards for curr turn
      const fc = this.state.flippedCards;
      fc.push(evt.target);
      this.setState({flippedCards: fc})
    } 

    // end of turn
    if (this.state.flippedCards.length=== 2 && this.state.lastFlippedCard!== evt.target) {
      const card1 = this.state.flippedCards[0];
      const card2 = this.state.flippedCards[1];

      // match
      if (card1.textContent === card2.textContent) {
        this.promptNextTurn("w");
      // no match :(
      } else {
        this.promptNextTurn("l");
      }
    }
      
  }

  render() {
    let cardsRow1 = [];
    let cardsRow2 = [];
    let cardsRow3 = [];
    let cardsRow4 = [];
    let idx = 0;
    
    //*
    for (let i=0; i<4; i++) {
      cardsRow1.push(<Card key={i} id={this.state.cardVals[idx]} onClick={(card) => {this.cardClick(card)}} />);
      idx++;
    }
    
    for (let i=0; i<4; i++) {
      cardsRow2.push(<Card key={i} id={this.state.cardVals[idx]} onClick={(card) => {this.cardClick(card)}} />);
      idx++;
    }

    for (let i=0; i<4; i++) {
      cardsRow3.push(<Card key={i} id={this.state.cardVals[idx]} onClick={(card) => {this.cardClick(card)}} />);
      idx++;
    }
    
    for (let i=0; i<4; i++) {
      cardsRow4.push(<Card key={i} id={this.state.cardVals[idx]} onClick={(card) => {this.cardClick(card)}} />);
      idx++;
    }
    
    // game over
    if (this.state.gameOver) {
      return (
        <div className="game-result">
          <h1> Game Over! </h1>
        </div>
      )
    }

    // turn over
    if (this.state.showTurnResult) {
      return (
        <div className="game">
          <Turn currTurn={this.state.turn}/>
          <div className="row"> 
            {cardsRow1}
          </div>
          <div className="row"> 
            {cardsRow2}
          </div>
          <div className="row"> 
            {cardsRow3}
          </div>
          <div className="row"> 
            {cardsRow4}
          </div>
          <TurnResult id="turn-result" turnresult={this.state.turnResult} onClick={() => {this.nextTurnClick()}}/>
        </div>
      )
    }

    // in play
    return (
      <div className="game">
        <Turn currTurn={this.state.turn}/>
        <div className="row"> 
          {cardsRow1}
        </div>
        <div className="row"> 
          {cardsRow2}
        </div>
        <div className="row"> 
          {cardsRow3}
        </div>
        <div className="row"> 
          {cardsRow4}
        </div>
      </div>
    )
    
  }

};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

export default App;
