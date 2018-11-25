import Player from "./player";


class Human extends Player{
  constructor(options){
    super(options);
    this.message = ""
  }

  async facingBet(bet, opponent, street) {
    console.log('current player facing a bet is is ', this.name, ' opponent is', opponent.name);
    this.clearAllButtons();

    if (this.name === "Human") this.createFacingBetButtons();

    this.actionChoice = 'invalid';
    this.betSize = 0;


    if (this.name === "Computer") {
      this.actionChoice = 'call';
    }  else {
      // console.log(this.actionChoicePromise)
      await this.actionChoicePromise;
      // console.log(this.actionChoicePromise)
    }

    const actionChoice = this.actionChoice;
    let betSize = parseInt(this.betSize);
    this.actionChoice = 'invalid';
    this.betSize = 0;


    opponent.message = ""
    switch(actionChoice){
      case "call":
        console.log(this.name, ' called!!');
        this.stack -= bet - this.currentBet;
        this.game.takeBet(bet - this.currentBet);
        this.currentBet = bet;
        this.game.bettingHash[street] += 'c'
        return "call";
        break;
      case "fold":
        console.log('current player is ', this.name, ' opponent is', opponent.name);
        console.log(this.name, " folded");
        this.status = 'dead';
        this.game.bettingHash[street] += 'f'

        return "fold";
        break;
      case 'raise':
        if (isNaN(betSize)) betSize = bet - this.currentBet + bet;
        if (betSize > this.stack + this.currentBet) betSize = this.stack + this.currentBet;
        if (betSize > opponent.stack + opponent.currentBet) betSize = opponent.stack;
        if (betSize < (bet - this.currentBet) + bet ){
          console.log('test is happening');
         betSize = bet - this.currentBet + bet;
        }
        if ( betSize < 20) betSize = 20

        console.log(this.name, " raised");
        this.stack -= betSize - this.currentBet;
        this.game.takeBet(betSize - this.currentBet);
        this.currentBet = betSize;
        this.game.bettingHash[street] += 'r'

         await opponent.facingBet(betSize, this, street);
        return "raise";
        break;
    }
  }

  async betOption(opponent, street){
    // debugger
    // console.log("promise = ", this.actionChoicePromise, 'and name is: ', this.name)
    console.log('current player with bet option is  ', this.name, ' opponent is', opponent.name, ' street: ', street);
    this.clearAllButtons();

    if (this.name === "Human") this.createBetOptionButtons();

    this.actionChoice = 'invalid';
    this.betSize = 0;

      if (this.name === "Computer"){
        this.actionChoice = 'check';
      } else {
        await this.actionChoicePromise;

      }

    const actionChoice = this.actionChoice;
    let betSize = parseInt(this.betSize);

    this.actionChoice = 'invalid';
    this.betSize = 0;
    console.log(this.name, "action choice is: ", actionChoice, "on street: ", street);

    switch (actionChoice) {
      case "check":
        console.log(this.name, ' checked!!');
        this.game.bettingHash[street] += 'x'
        return "check";
      case 'bet':
        if (isNaN(betSize)) betSize = 10;
        if ( betSize > this.stack) betSize = this.stack;
        if ( betSize > opponent.stack) betSize = opponent.stack;
        if ( betSize < 10) betSize = 10;
        console.log(this.name, " bet", betSize);
        this.stack -= betSize - this.currentBet;
        this.game.takeBet(betSize - this.currentBet);
        this.currentBet = betSize;
        this.game.bettingHash[street] += 'b'

         await opponent.facingBet(betSize, this, street);
         return 'bet';
      case 'fold':
        console.log('folding');
        this.status = "dead";
        this.game.bettingHash[street] += 'f'
        return 'fold';
    }
  }

  createBetOptionButtons(){
    // console.log('creating buttons here')
    // debugger

    const buttonContainer = document.querySelector('.button-container');
    // const callButton = document.createElement("button")
    const input = document.createElement('input');
    const bet = document.createElement('button');
    const check = document.createElement('button');
    // const fold = document.createElement('button');

    bet.innerText = "Bet";
    // input.value = "55";
    check.innerText = 'Check';
    // fold.innerText = 'Fold';

    buttonContainer.appendChild(input);
    buttonContainer.appendChild(bet);
    buttonContainer.appendChild(check);
    // buttonContainer.appendChild(fold);

    this.actionChoicePromise = new Promise( res => {

      bet.addEventListener('click', () => {
        res();

        const inputValue = document.querySelector('input');
        console.log("Betting", inputValue.value);
        this.actionChoice = "bet";
        this.betSize = inputValue.value;

      });

      // fold.addEventListener('click', () => {
      //     res();
      //     console.log("folding");
      //     this.actionChoice = "fold";
      //   });

      check.addEventListener('click', () => {
          res();
          console.log("checking");
          this.actionChoice = "check";
        });
    }
  );
  }

  createFacingBetButtons() {
    // console.log('createFacingBetButtons now')

    const buttonContainer = document.querySelector('.button-container');
    const call = document.createElement("button");
    const input = document.createElement('input');
    const raise = document.createElement('button');
    const fold = document.createElement('button');
    fold.innerText = "Fold";
    call.innerText = "Call";
    input.value = "";
    raise.innerText = `Raise`;


    buttonContainer.appendChild(input);
    buttonContainer.appendChild(raise);
    buttonContainer.appendChild(call);
    buttonContainer.appendChild(fold);

    // const deal = document.createElement("button")
    // deal.innerText = 'deal'

    // buttonContainer.appendChild(deal)

    this.actionChoicePromise = new Promise(res => {

      raise.addEventListener('click', () => {
        res();

        const inputValue = document.querySelector('input');
        // console.log("raiseting", inputValue.value);
        this.actionChoice = "raise";
        this.betSize = inputValue.value;
      });

        fold.addEventListener('click', () => {
          res();
          console.log("folding");
          this.actionChoice = "fold";
      });


      call.addEventListener('click', () => {
        res();
        console.log("call");
        this.actionChoice = "call";
      });
    }
  );
  }

  clearAllButtons(){
    const buttonContainer = document.querySelector(".button-container");
    while (buttonContainer.firstChild) {
      buttonContainer.removeChild(buttonContainer.firstChild);
    }
  }

  receiveCard(card) {
    card.exposed = true
    this.hand.push(card);
  }

}

export default Human
