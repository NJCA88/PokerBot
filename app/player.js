

class Player {
  constructor(options) {
    this.pos = options.pos;
    this.name = options.name;
    this.stack = options.stack;
    this.currentBet= 0;
    this.hand = [];
    this.game = options.game
    this.status = 'live'
    // this.receieveCard = this.receiveCard.bind(this)
  }

  receiveCard(card){
    this.hand.push(card)
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

  async facingBet(bet, opponent){
    console.log('current player facing a bet is is ', this.name, ' opponent is', opponent.name)
    if (this.name === "Human") this.createFacingBetButtons();

    this.actionChoice = 'invalid'
    this.betSize = 0


    if (this.name === "Computer") {
      this.actionChoice = 'call'
    } else {
      await this.actionChoicePromise
    }

    // while (this.actionChoice === 'invalid' ) {
    //   // temp solutions for sake of testing
    //   if (this.name === "Computer" ) this.actionChoice = 'call'
    //   if(this.name === 'Human') this.actionChoice = "fold"
    // }

    const actionChoice = this.actionChoice
    let betSize = parseInt(this.betSize)
    this.actionChoice = 'invalid'
    this.betSize = 0


    switch(actionChoice){
      case "call":
        console.log(this.name, ' called!!')
        this.game.takeBet(bet);
        return "call" 
      case "fold":
        console.log('current player is ', this.name, ' opponent is', opponent.name)
        console.log(this.name, " folded");
        return "fold"
      case 'raise':
        console.log(this.name, " raised");
        this.game.takeBet(betSize)
        return opponent.facingBet(betSize, this)
    }
  }

  async betOption(opponent){
    console.log('current player with bet option is  ', this.name, ' opponent is', opponent.name)
    this.actionChoice = 'invalid'
    this.betSize = 0

      if (this.name === "Computer"){
        this.actionChoice = 'check'
      }else{
        await this.actionChoicePromise
      }
    
    // while (this.actionChoice === 'invalid') {
    //   // temp solutions for sake of testing
    //   if (this.name === 'Human') this.actionChoice = "bet"
    // }

    const actionChoice = this.actionChoice
    let betSize = parseInt(this.betSize)

    this.actionChoice = 'invalid'
    this.betSize = 0

    switch (actionChoice) {
      case "check":
        console.log(this.name, ' checked!!')
        return "check"
      case 'bet':
        console.log(this.name, " bet", betSize);
        this.game.takeBet(50)
        return opponent.facingBet(betSize, this)
    }
  }

  createBetOptionButtons(){
    console.log('creating buttons here')

    const buttonContainer = document.querySelector('.button-container')
    const callButton = document.createElement("button")
    const input = document.createElement('input')
    const bet = document.createElement('button')
    bet.innerText = "Bet"

    buttonContainer.appendChild(input)
    buttonContainer.appendChild(bet)


    this.actionChoicePromise = new Promise(res => {

      bet.addEventListener('click', () => {
        res()

        const inputValue = document.querySelector('input')
        console.log("Betting", inputValue.value)
        this.actionChoice = "bet"
        this.betSize = inputValue.value
      })
    }
       ) 
  }

  createFacingBetButtons() {
    console.log('createFacingBetButtons now')

    const buttonContainer = document.querySelector('.button-container')
    const call = document.createElement("button")
    const input = document.createElement('input')
    const raise = document.createElement('button')
    const fold = document.createElement('button')
    fold.innerText = "fold"
    raise.innerText = "raise"
    call.innerText = "call"

    buttonContainer.appendChild(input)
    buttonContainer.appendChild(raise)
    buttonContainer.appendChild(call)
    buttonContainer.appendChild(fold)



    this.actionChoicePromise = new Promise(res => {

      raise.addEventListener('click', () => {
        res()

        const inputValue = document.querySelector('input')
        console.log("raiseting", inputValue.value)
        this.actionChoice = "raise"
        this.betSize = inputValue.value
      })

        fold.addEventListener('click', () => {
          res()
          console.log("folding")
          this.actionChoice = "fold"
      })


      call.addEventListener('click', () => {
        res()
        console.log("call")
        this.actionChoice = "call"
        this.betSize = inputValue.value
      })
    }
    )
  }


  draw(ctx){

    ctx.fillStyle = "black";
    ctx.font = 20 + 'pt Arial';
    ctx.fillText(`${this.name}`, this.pos[0] + 50, this.pos[1]);

    ctx.fillStyle = "black";
    ctx.font = 20 + 'pt Arial';
    ctx.fillText(`${this.stack}`, this.pos[0] + 50, this.pos[1]+ 30);

    // requestAnimationFrame(this.draw)
  }

}

export default Player;
