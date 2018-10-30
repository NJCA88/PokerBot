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
// import Deck from './deck';

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("myCanvas");
  canvasEl.width = 800;
  canvasEl.height = 500;

  const ctx = canvasEl.getContext("2d");
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, 800, 500);



  const person = new Player({pos: [300, 450], stack: 1000,  name: "Human"});
  const comp = new Player({ pos: [300, 50], stack: 1000,  name: "Computer" });
  
  const testCard = new Card({suit: 's', rank: '7'})
  // const myDeck = new Deck
  testCard.draw(ctx)


  person.draw(ctx)
  comp.draw(ctx)


  var deck = Deck()
  var card = deck[5]
  
});



