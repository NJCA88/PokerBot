import Player from "./player";

const group1 = [
  'AA', 'KK', 'QQ', 'JJ', 'AKs', 'AKo','A5s' 
]
const group2 = [
  'TT', '99', '88',
  'AQs', 'AJs', 'ATs', 'A4s',
  'KQs', 'KJs', 'KTs', 
  'QJs', 'QTs',
  'JTs',
  'T9s',
  '98s',
  '87s',
  '76s',
  'AQo', 'AJo',
  'KQo', 'KJo',
  'QJo'
]
const group3 = [
  '77', '66', '55', '44', '44', '33', '22',
  'A9s', 'A8s', 'A7s', 'A6s', 'A3s', 'A2s',
  'K9s', 'K8s', 'K7s', 'K6s', 'K5s',
  'Q9s', 'Q8s', 'Q7s', 'Q6s', 'Q5s',
  'J9s', 'J8s', 'J7s', 'J6s', 'J5s',
  'T8s', 'T7s', 
  '97s',
  '86s',
  '76s', '75s',
  '65s',
  '54s',
  'ATo', 'A9o', 'A8o', 'A7o', 'A6o', 'A5o', 'A4o', 'A3o', 'A2o',
  'KTo', 'K9o',
  'QTo', 'Q9o',
  'JTo', 'J9o', 'J8o',
  'T9o', 'T8o',
  '98o', '97o',
  '87o',
  '76o',
]

const group4 = [
  'K4s', 'K3s', 'K2s',
  'Q4s', 'Q3s', 'Q2s',
  'J4s', 'J3s', 'J2s',
  'T6s', 'T5s', 'T4s', 'T3s',
  '96s',
  '85s',
  '74s',
  '63s',
  '53s',
  '43s',
  '32s',
  'K8o', 'K7o', 'K6o', 'K5o', 'K4o',
  'Q8o', 'Q7o', 'Q6o',
  'J7o', 'J6o',
  'T7o', 'T6o',
  '96o',
  '86o', '85o',
  '75o', '74o',
  '65o', '44o',
  '54o', '53o',
  '43o', '42o',
  '32o',
]

const group5 = [
  'T4s', 'T3s', 'T2s',
  '95s', '94s', '93s', '92s',
  '84s', '83s', '82s', 
  '73s', '72s', 
  '62s', 
  '52s', 
  '42s', 
  'K3o', 'K2o',
  'K3o', 'K2o',
  'Q5o', 'Q4o', 'Q3o', 'Q2o',
  'J5o', 'J4o', 'J3o', 'J2o',
  'T5o', 'T4o', 'T3o', 'T2o',
  '95o', '94o', '93o', '92o',
  '84o', '83o', '82o',
  '73o', '72o',
  '63o', '62o',
  '52o',


  
]


class Computer extends Player{
  constructor(options){
    super(options);
    this.message = ""
    this.group = ""
  }

  wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

  async facingBet(bet, opponent) {
    // console.log('current player facing a bet is is ', this.name, ' opponent is', opponent.name);
    this.clearAllButtons();


    this.actionChoice = 'invalid';
    this.betSize = 0;

    //temp action selection for testing
    // console.log('MIDDLE TEST human bet is: ', this.game.human.currentBet)
    await new Promise(resolve => setTimeout(resolve, 2000));
    // console.log('!!!!');
    // this.game.render()
    // this.wait(10050);  //7 seconds in milliseconds
    // this.actionChoice = 'call';

    // if (this.game.street === 'pre') {
    if (5 === 5) {
      console.log("yea, we're at the place!")
      this.actionChoice = this.actPre()
    }else {

      let random_num = Math.random();

      if (random_num < .5) {
        this.actionChoice = 'call'
      } else if (random_num >= .5 && random_num < .75){
        this.actionChoice = 'raise'
      } else {
        this.actionChoice = 'fold'
      }
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
        // console.log("definitely folding...")
        this.message = "fold"

        return "fold";
      case 'raise':
        if (isNaN(betSize)) betSize = bet - this.currentBet + bet;
        if (betSize > this.stack + this.currentBet) betSize = this.stack + this.currentBet;
        if (betSize > opponent.stack + opponent.currentBet) betSize = opponent.stack;
        if (betSize < (bet - this.currentBet) + bet) {
          // console.log('test is happening');
          betSize = bet - this.currentBet + bet;
        }
        if (betSize < 20) betSize = 20

        // console.log(this.name, " raised");
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
      // console.log('random num is ', random_num);

      if (random_num < .5){
         this.actionChoice = 'check'
       } else{
        //  console.log('computer is trying to bet flop, betSize, this.currentBet: ', this.betSize, this.currentBet)
         this.actionChoice = 'bet'

       }

       // this.game.takeBet(this.betSize - this.currentBet)
       // this.currentBet = ( this.betSize + this.currentBet)


      const actionChoice = this.actionChoice;
      let betSize = this.betSize
      this.betSize = 0

      // console.log(this.name, "action choice is: ", actionChoice, "on street: ", street);

      switch (actionChoice) {
        case "check":
          // console.log(this.name, ' checked!!');
          this.message = "check"

          return "check";
        case 'bet':
          if (this.stack === 0) return "check"
          if (isNaN(betSize)) betSize = 10;
          if (betSize > opponent.stack) betSize = opponent.stack;
          if (betSize < 10) betSize = 10;
          if (betSize > this.stack) betSize = this.stack;
          // console.log(this.name, " bet", betSize);
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
    // console.log("message is: ", this.message)
  }

  receiveCard(card) {
    card.exposed = "false"
    this.hand.push(card);
  }

  exposeCards(){
    this.hand[0].exposed = true
    this.hand[1].exposed = true
  }




  actPre(){
    console.log('getting computer hand abbrev')
    let cards = ""
    if (this.hand[0].value < this.hand[1].value) {
      this.cards = [this.hand[1], this.hand[0]]
    }else{
      this.cards = [this.hand[0], this.hand[1]]
    }

    if (this.hand[0].value === this.hand[1].value){
      cards = `${this.hand[0].rank}${this.hand[1].rank}`
    } else if  (this.hand[0].suit !== this.hand[1].rank) {
      cards = `${this.hand[0].rank}${this.hand[1].rank}o`
    }else{
        cards = `${this.hand[0].rank}${this.hand[1].rank}s`
    }
    // console.log('comps hand is: ', cards)

    let handGroup
    let random_num = Math.random();
    if (group1.includes(cards)) handGroup = 1
    if (group2.includes(cards)) handGroup = 2
    if (group3.includes(cards)) handGroup = 3
    if (group4.includes(cards)) handGroup = 4
    if (group5.includes(cards)) handGroup = 5

    if ( handGroup === 1) return 'raise'

    if ( handGroup === 2) return 'raise'
    
    if ( handGroup === 3){
      if (random_num > .5) {
        return 'raise'
      }else return 'call'
    }
    if (handGroup === 4) {
      if (random_num > .7) {
        return 'raise'
      } else if (random_num > .3){
          return call
      } else{
          return 'fold'
      }
    }
    if (handGroup === 5){
      if (random_num < .5) {
        return 'fold'
      } else{
        return 'call'
      }
    }


  }

}

export default Computer
