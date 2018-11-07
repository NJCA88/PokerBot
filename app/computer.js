import Player from "./player";


class Computer extends Player{
  constructor(options){
    super(options);
  }

  wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

  async facingBet(bet, opponent) {
    console.log('current player facing a bet is is ', this.name, ' opponent is', opponent.name);
    this.clearAllButtons();


    this.actionChoice = 'invalid';
    this.betSize = 0;

    //temp action selection for testing
    this.wait(1250);  //7 seconds in milliseconds
    this.actionChoice = 'call';


    const actionChoice = this.actionChoice;
    let betSize = parseInt(this.betSize);
    this.actionChoice = 'invalid';
    this.betSize = 0;


    switch(actionChoice){
      case "call":
        this.stack -= bet - this.currentBet;
        this.game.takeBet(bet - this.currentBet);
        this.currentBet = bet;
        return "call";
        break;
      case "fold":
        this.status = 'dead';
        return "fold";
        break;
      case 'raise':
        if (isNaN(betSize)) betSize = bet - this.currentBet + bet;
        if (betSize > this.stack + this.currentBet) betSize = this.stack + this.currentBet;
        if (betSize > opponent.stack + opponent.currentBet) betSize = opponent.stack;
        if (betSize < (bet - this.currentBet) + bet ){
         betSize = bet - this.currentBet + bet;
        }
        this.stack -= betSize - this.currentBet;
        this.game.takeBet(betSize - this.currentBet);
        this.currentBet = betSize;
         opponent.facingBet(betSize, this);
        return "raise";
        break;
    }
  }

    async betOption(opponent, street){
      // debugger
      // console.log("promise = ", this.actionChoicePromise, 'and name is: ', this.name)
      console.log('current player with bet option is  ', this.name, ' opponent is', opponent.name, ' street: ', street);
      this.clearAllButtons();


      this.actionChoice = 'invalid';
      this.betSize = 0;

      // temp selection for testing
      this.actionChoice = 'check';


      const actionChoice = this.actionChoice;
      let betSize = parseInt(this.betSize);

      this.actionChoice = 'invalid';
      this.betSize = 0;
      console.log(this.name, "action choice is: ", actionChoice, "on street: ", street);

      switch (actionChoice) {
        case "check":
          console.log(this.name, ' checked!!');
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
           opponent.facingBet(betSize, this);
           return 'bet';
        case 'fold':
          console.log('folding');
          this.status = "dead";
        return 'fold';
      }
  }

}

export default Computer
