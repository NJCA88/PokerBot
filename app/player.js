

class Player {
  constructor(options) {
    this.pos = options.pos;
    this.name = options.name;
    this.stack = options.stack;
    this.currentBet= 0;
    this.hand = [];
    this.handName ="";
    this.game = options.game;
    this.status = 'live';
    // this.receieveCard = this.receiveCard.bind(this)
    this.facingBet = this.facingBet.bind(this);
  }

  receiveCard(card){
    card.exposed = false
    this.hand.push(card);
  }

  makeBet(betAmt){
    this.stack -= ( betAmt - this.currentBet);
    this.currentBet = betAmt;
  }

  postSB(){
    this.currentBet = 5;
    this.stack -= 5;
    return 5;
  }

  postBB(){
    this.currentBet = 10;
    this.stack -= 10;
    return 10;
  }

  clearAllButtons(){
    const buttonContainer = document.querySelector(".button-container");
    while (buttonContainer.firstChild) {
      buttonContainer.removeChild(buttonContainer.firstChild);
    }
  }


  draw(ctx){

    ctx.fillStyle = "black";
    ctx.font = 20 + 'pt Arial';
    ctx.fillText(`${this.name}`, this.pos[0] + 50, this.pos[1]);
    ctx.fillText(`${this.handName}`, this.pos[0] + 200, this.pos[1]);


    ctx.fillStyle = "black";
    ctx.font = 20 + 'pt Arial';
    ctx.fillText(`${this.stack}`, this.pos[0] + 50, this.pos[1]+ 30);

    ctx.fillStyle = "black";
    ctx.font = 20 + 'pt Arial';
    ctx.fillText(`${this.message}`, this.pos[0] + 250, this.pos[1] + 30);


    // requestAnimationFrame(this.draw)
  }

}

export default Player;
