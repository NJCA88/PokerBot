

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
    this.facingBet = this.facingBet.bind(this)
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

    const actionChoice = this.actionChoice
    let betSize = parseInt(this.betSize)
    this.actionChoice = 'invalid'
    this.betSize = 0


    switch(actionChoice){
      case "call":
        console.log(this.name, ' called!!')
        this.game.takeBet(bet);
        return "call" 
        break
      case "fold":
        console.log('current player is ', this.name, ' opponent is', opponent.name)
        console.log(this.name, " folded");
        return "fold"
        break
      case 'raise':
        console.log(this.name, " raised");
        this.game.takeBet(betSize)
         opponent.facingBet(betSize, this)
        return "raise"
        break
    }
  }

  async betOption(opponent){
    console.log('current player with bet option is  ', this.name, ' opponent is', opponent.name)
    this.clearAllButtons();

    if (this.name === "Human") this.createBetOptionButtons();

    this.actionChoice = 'invalid'
    this.betSize = 0

      if (this.name === "Computer"){
        console.log("computer made his flop choice to check")
        this.actionChoice = 'check'
      }else{
        await this.actionChoicePromise
      }

    const actionChoice = this.actionChoice
    let betSize = parseInt(this.betSize)

    this.actionChoice = 'invalid'
    this.betSize = 0
    console.log(this.name, "action choice is: ", actionChoice)

    switch (actionChoice) {
      case "check":
        console.log(this.name, ' checked!!')
        return "check"
      case 'bet':
        console.log(this.name, " bet", betSize);
        this.game.takeBet(50)
        return opponent.facingBet(betSize, this)
      case 'fold':
      console.log('folding')
      return 'fold'
    }
  }

  createBetOptionButtons(){
    // console.log('creating buttons here')

    const buttonContainer = document.querySelector('.button-container')
    // const callButton = document.createElement("button")
    const input = document.createElement('input')
    const bet = document.createElement('button')
    const check = document.createElement('button')
    const fold = document.createElement('button')
    
    bet.innerText = "Bet"
    check.innerText = 'Check'
    fold.innerText = 'Fold'

    buttonContainer.appendChild(input)
    buttonContainer.appendChild(bet)
    buttonContainer.appendChild(check)
    buttonContainer.appendChild(fold)

    this.actionChoicePromise = new Promise( res => {

      bet.addEventListener('click', () => {
        res()

        const inputValue = document.querySelector('input')
        console.log("Betting", inputValue.value)
        this.actionChoice = "bet"
        this.betSize = inputValue.value

      })

      fold.addEventListener('click', () => {
          res()
          console.log("folding")
          this.actionChoice = "fold"
        })
        
      check.addEventListener('click', () => {
        console.log("did I check?  TEST")
          res()
          console.log("checking")
          this.actionChoice = "check"
        })
    }
       ) 
  }

  createFacingBetButtons() {
    // console.log('createFacingBetButtons now')

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
      })
    }
    )
  }

  clearAllButtons(){
    const buttonContainer = document.querySelector(".button-container");
    console.log('buttonContainer is: ', buttonContainer)
    while (buttonContainer.firstChild) {
      buttonContainer.removeChild(buttonContainer.firstChild);
    }
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
