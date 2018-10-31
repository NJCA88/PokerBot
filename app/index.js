/**
 * Application entry point
 */

// Load application styles
import 'styles/index.scss';

// ================================
// START YOUR APP HERE
// ================================

// const Human = require("./human.js");
import Player from './human';
import Card from './card';
import Deck from './deck';


document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("myCanvas");
  canvasEl.width = 800;
  canvasEl.height = 500;

  const ctx = canvasEl.getContext("2d");
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, 800, 500);

  
  
  const person = new Player({pos: [300, 450], stack: 1000,  name: "Human"});
  const comp = new Player({ pos: [300, 50], stack: 1000,  name: "Computer" });
  
  const myDeck = new Deck
  
  
  person.draw(ctx)
  comp.draw(ctx)
  
  
  
  const cardPos1 = [ 350, 90] 
  const cardPos2 = [ 400, 90]
  const cardPos3 = [ 350, 300]
  const cardPos4 = [ 400, 300]


  const card1 = myDeck.deal()
  card1.pos = cardPos1;
  
  const card2 = myDeck.deal()
  card2.pos = cardPos2;

  const card3 = myDeck.deal()
  card3.pos = cardPos3;

  const card4 = myDeck.deal()
  card4.pos = cardPos4;

  

  card1.draw(ctx)
  card2.draw(ctx)
  card3.draw(ctx)
  card4.draw(ctx)
  console.log(card1, card2, card3, card4)
  console.log(myDeck.cards.length)
  
});



