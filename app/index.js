/**
 * Application entry point
 */

// Load application styles
import 'styles/index.scss';

// ================================
// START YOUR APP HERE
// ================================

// const Human = require("./human.js");
import Player from './player';
import Card from './card';
import Deck from './deck';
import Game from './game';
import Background from './background';

// const testFunction = () => {
//   console.log("test funciton is running")
// }


document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("myCanvas");
  canvasEl.width = 800;
  canvasEl.height = 500;

  const ctx = canvasEl.getContext("2d");
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, 800, 500);

  new Game({ctx: ctx})


  // const background = new Background()
  // background.draw(ctx)



  
  
  // const person = new Player({pos: [300, 450], stack: 1000,  name: "Human"});
  // const comp = new Player({ pos: [300, 50], stack: 1000,  name: "Computer" });
  
  // const myDeck = new Deck
  
  
  // person.draw(ctx)
  // comp.draw(ctx)
  
  // const cardPos1 = [ 350, 90] 
  // const cardPos2 = [ 400, 90]
  // const cardPos3 = [ 350, 300]
  // const cardPos4 = [ 400, 300]

// console.log("person is", person)
//   const card1 = myDeck.deal(person)
//   card1.pos = cardPos1;
  
//   const card2 = myDeck.deal(person)
//   card2.pos = cardPos2;

//   const card3 = myDeck.deal(comp)
//   card3.pos = cardPos3;

//   const card4 = myDeck.deal(comp)
//   card4.pos = cardPos4;

  

// card1.draw(ctx)
// card2.draw(ctx)
// card3.draw(ctx)
// card4.draw(ctx)
//   console.log(card1, card2, card3, card4)
//   console.log(myDeck.cards.length)
  
  // const game = new Game({human: person, computer: comp});


  // document.addEventListener("click", e => {
  //   console.log(getMousePos(canvasEl, e))
  // } )

  // const getMousePos = (canvas, e) =>  {
  //   const rect = canvas.getBoundingClientRect();
  //   return {
  //     x: e.clientX - rect.left,
  //     y: e.clientY - rect.top
  //   }
  // }
  



  // //  stuff Nima added related to manipulating dom and adding buttons from here
  // const button = document.querySelector(".testFunction")

  // button.addEventListener("click", e => {
  // //   console.log("test button works")
  // // })

  // const buttonContainer = document.querySelector('.button-container')

  // const callButton = document.createElement("button")
  // const input = document.createElement('input')
  // const submit = document.createElement('button')
  // submit.innerText = "submit"

  // callButton.className="call-button"
  // callButton.innerText = "Call"

  // // buttonContainer.appendChild(callButton)
  // buttonContainer.appendChild(input)
  // buttonContainer.appendChild(submit)

  // submit.addEventListener('click', () => {
  //   const inputValue = document.querySelector('input')
  //   console.log("inputtttttt")
  //   console.log(inputValue.value)
  // })

  // console.log(callButton)



});



