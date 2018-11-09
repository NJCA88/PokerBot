import Player from "./player";


class Computer extends Player{
  constructor(options){
    super(options);
    this.message = ""
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
    console.log('MIDDLE TEST human bet is: ', this.game.human.currentBet)
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('!!!!');
    // this.game.render()
    // this.wait(10050);  //7 seconds in milliseconds
    // this.actionChoice = 'call';

    let random_num = Math.random();
    // random_num = .9;
    console.log('random num is ', random_num);

    if (random_num < .5) {
      // console.log("shouldn't be checking here...")
      this.actionChoice = 'call'
    } else if (random_num >= .5 && random_num < .75){
      // console.log("RAISING!")
      this.actionChoice = 'raise'
    } else {
      console.log('Folding here I hope')
      this.actionChoice = 'fold'
    }


    const actionChoice = this.actionChoice;
    let betSize = Math.floor(this.game.pot /2) + this.currentBet ;
    this.actionChoice = 'invalid';
    this.betSize = 0;

    
    setTimeout(this.resetMessage, 1000)
    switch(actionChoice){
      case "call":
        this.stack -= bet - this.currentBet;
        this.game.takeBet(bet - this.currentBet);
        this.currentBet = bet;
        this.message = "call"

        // await new Promise(resolve => setTimeout(resolve, 500));
        return "call";
      case "fold":
        this.status = 'dead';
        console.log("definitely folding...")
        this.message = "fold"

        return "fold";
      case 'raise':
        if (isNaN(betSize)) betSize = bet - this.currentBet + bet;
        if (betSize > this.stack + this.currentBet) betSize = this.stack + this.currentBet;
        if (betSize > opponent.stack + opponent.currentBet) betSize = opponent.stack;
        if (betSize < (bet - this.currentBet) + bet) {
          console.log('test is happening');
          betSize = bet - this.currentBet + bet;
        }
        if (betSize < 20) betSize = 20

        console.log(this.name, " raised");
        this.stack -= betSize - this.currentBet;
        this.game.takeBet(betSize - this.currentBet);
        this.currentBet = betSize;
        this.message = "raise"

        await opponent.facingBet(betSize, this);
        return "raise";
    }
  }

    async betOption(opponent, street){
      this.actionChoice = 'invalid';

      // debugger
      // console.log("promise = ", this.actionChoicePromise, 'and name is: ', this.name)
      console.log('current player with bet option is  ', this.name, ' opponent is', opponent.name, ' street: ', street);
      this.clearAllButtons();


      this.actionChoice = 'invalid';
      this.betSize = Math.floor(this.game.pot/2) + this.currentBet;

      await new Promise(resolve => setTimeout(resolve, 500));

      // temp selection for testing
      let random_num = Math.random();
      // random_num = .7;
      console.log('random num is ', random_num);

      if (random_num < .5){
         this.actionChoice = 'check'
       } else{
         console.log('computer is trying to bet flop, betSize, this.currentBet: ', this.betSize, this.currentBet)
         this.actionChoice = 'bet'

       }

       // this.game.takeBet(this.betSize - this.currentBet)
       // this.currentBet = ( this.betSize + this.currentBet)


      const actionChoice = this.actionChoice;
      let betSize = this.betSize
      this.betSize = 0

      console.log(this.name, "action choice is: ", actionChoice, "on street: ", street);

      switch (actionChoice) {
        case "check":
          console.log(this.name, ' checked!!');
          this.message = "check"

          return "check";
        case 'bet':
          if (this.stack === 0) return "check"
          if (isNaN(betSize)) betSize = 10;
          if (betSize > opponent.stack) betSize = opponent.stack;
          if (betSize < 10) betSize = 10;
          if (betSize > this.stack) betSize = this.stack;
          console.log(this.name, " bet", betSize);
          this.stack -= betSize - this.currentBet;
          this.game.takeBet(betSize - this.currentBet);
          this.currentBet = betSize;
          this.message = "bet"

          await opponent.facingBet(betSize, this);
          return 'bet';
        case 'fold':
          console.log('folding');
          this.message = "fold"

          this.status = "dead";
        return 'fold';
      }
  }

  resetMessage(){
    this.message = ""
    console.log("message is: ", this.message)
  }

}

export default Computer
