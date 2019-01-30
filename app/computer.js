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

    this.resetMessage = this.resetMessage.bind(this)
  }

// 

  async facingBet(bet, opponent, street) {
    this.clearAllButtons();
 
    let allIn = false
    let effective
    if (this.stack + this.currentBet) {
      effective = this.opponent.stack + this.opponent.currentBet
    } else {
      effective = this.stack + this.currentBet
    }

    if (bet >= effective) allIn = true
    this.actionChoice = 'invalid';
    this.betSize = 0;


    await new Promise(resolve => setTimeout(resolve, 1000));

    if (street === "pre") this.actionChoice = this.facingBetPre();
    if (street === "flop") this.actionChoice = this.facingBetFlop();
    if (street === "turn") this.actionChoice = this.facingBetFlop();
    if (street === "river") this.actionChoice = this.facingBetRiver();
      


    const actionChoice = this.actionChoice;
 
    let betSize = this.betSize
    this.actionChoice = 'invalid';
    this.betSize = 0;

    
    setTimeout(this.resetMessage, 2000)
    switch(actionChoice){
      case "call":
        this.stack -= bet - this.currentBet;
        this.game.takeBet(bet - this.currentBet);
        this.currentBet = bet;
        this.message = "call"
        // await new Promise(resolve => setTimeout(resolve, 500));
        this.game.bettingHash[street] += 'c'

        return "call";

      case "fold":
        this.status = 'dead';
        // console.log("definitely folding...")
        this.message = "fold"

        return "fold";
      case 'raise':
        if (allIn) return "call"; 

        if (isNaN(betSize)) betSize = bet - this.currentBet + bet;
        betSize = bet * 3
        if (betSize > this.stack + this.currentBet) betSize = this.stack + this.currentBet;
        if (betSize < (bet - this.currentBet) + bet) {
          // console.log('test is happening');
          betSize = bet - this.currentBet + bet;
        }
        if (betSize < 20) betSize = 20
        if (betSize > opponent.stack + opponent.currentBet) betSize = opponent.stack + opponent.currentBet;


        // console.log(this.name, " raised");
        this.stack -= betSize - this.currentBet;
        this.game.takeBet(betSize - this.currentBet);
        this.currentBet = betSize;
        this.message = "raise"
        this.game.bettingHash[street] += 'r'


        await opponent.facingBet(betSize, this, street);
        return "raise";
    }
  }

  async betOption(opponent, street){
    setTimeout(this.resetMessage, 2000)

      this.actionChoice = 'invalid';
      console.log("bettingHash for this street is: ", this.game.bettingHash[street])
      console.log("we're in bet option on street: ", street)


      // debugger
      // console.log("promise = ", this.actionChoicePromise, 'and name is: ', this.name)
      console.log('current player with bet option is  ', this.name, ' opponent is', opponent.name, ' street: ', street);
      this.clearAllButtons();


      this.actionChoice = 'invalid';
      this.betSize = Math.floor(this.game.pot/2) + this.currentBet;

      await new Promise(resolve => setTimeout(resolve, 500));

      let random_num = Math.random();

      if (street === 'pre') this.actionChoice = this.betOptionPre()
      if (street === 'flop') this.actionChoice = this.betOptionFlop()
      if (street === 'turn') this.actionChoice = this.betOptionTurn()
      if (street === 'river') this.actionChoice = this.betOptionRiver()
      

      const actionChoice = this.actionChoice;
      let betSize = this.betSize
      this.betSize = 0

      // console.log("action choice is: ", actionChoice);
      //console.log(acttionChoice)

      switch (actionChoice) {
        case "check":
          // console.log(this.name, ' checked!!');
          this.message = "check"
          this.game.bettingHash[street] += 'x'

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
          console.log("starting the await here")
          this.game.bettingHash[street] += 'b'

          await opponent.facingBet(betSize, this, street);
          // console.log("should have waited")
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
    console.log("message is, game is: ", this.message, this.game)
    console.log("post render?")
    this.game.render()

  }

  receiveCard(card) {
    // card.exposed = "false"
    card.exposed = false
    this.hand.push(card);
  }

  exposeCards(){
    this.hand[0].exposed = true
    this.hand[1].exposed = true
  }




  facingBetPre(bet){
    this.getHandGroup()
    let handGroup = this.handGroup
    console.log("group is: ", handGroup)
    // debugger


    let random_num = Math.random();
    console.log("Am I in the right place?")
    console.log("bettingHash is: ", this.game.bettingHash['pre'])

    if (this.game.bbPlayer === this){

      if (this.game.bettingHash['pre'] === 'rrr'){
        if ([1].includes(handGroup)){
          this.betSize = bet * 4
         return 'raise'
        }
        if ([2].includes(handGroup)) return 'call'
        return 'fold'
      }
      if (this.game.bettingHash['pre'] === 'r'){
        if ([1].includes(handGroup)) {
          this.betSize = bet * 4
          return 'raise'
        }
        if ([2, 3].includes(handGroup)) return 'call'
        return 'fold'
      }
      if (this.game.bettingHash['pre'].includes('rr')){
        // this is when facing a raise after limping.
        console.log("line 298 of computer.js")
        if ([1].includes(handGroup)) {
          this.betSize = bet * 4
          return 'raise'
        }
        if ([2].includes(handGroup)) return 'call'
        return 'fold'
      }

      //above covers non first actions, below is first action
      console.log("passed the stuff we should pass")
      console.log("group is: ", handGroup)
      debugger
      


      if ( handGroup === 1){
        this.betSize = bet * 4
        return 'raise'
        }
      

      if ( handGroup === 2){
        this.betSize = bet * 4 
        return 'raise'
      }
      
      if ( handGroup === 3){
        console.log("yep, G3")
        if (random_num > .5) {
          this.betSize = bet * 4
          return 'raise'
        }else return 'call'
      }
      if (handGroup === 4) {
        debugger
        if (random_num > .7) {
          this.betSize = bet * 4;
        
          return 'raise'
        } else if (random_num > .3){
            return 'call'
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
    }else{
      //IN the SB / BU first action of the hand
      console.log("making opening decision");
      console.log("group is: ", handGroup)

      if (handGroup === 1){
        this.betSize = Math.floor(this.currentBet * 2.5)
       return 'raise'
      }

      if (handGroup === 2) {
        this.betSize = Math.floor(this.currentBet * 2.5)
        return 'raise'
      }

      if (handGroup === 3) {
        if (random_num > .5) {
          this.betSize = Math.floor(this.currentBet * 2.5)
          // console.log("group 3, so...: ", random_num)
        this.betSize = Math.floor(this.currentBet * 2.5)
          return 'raise'
        } else return 'call'
      }
      if (handGroup === 4) {
        if (random_num > .7) {
          this.betSize = Math.floor(this.currentBet * 2.5)
          return 'raise'
        } else if (random_num > .3) {
          return 'call'
        } else {
          return 'call'
        }
      }
      if (handGroup === 5) {
        if (random_num < .5) {
          return 'call'
        } else {
          return 'fold'
        }
      }
    }
  }

  betOptionPre(){
    this.getHandGroup()
    let handGroup = this.handGroup
    
    let random_num = Math.random();


    if (handGroup === 1) {
      // console.log("hello there, we're in the bb")
      this.betSize = this.currentBet * 3
      return 'bet'
    }


    if (handGroup === 2) {
      this.betSize = this.currentBet * 3
      return 'bet'
    }

    if (handGroup === 3) {
      if (random_num > .5) {
        this.betSize = this.currentBet * 3
        return 'bet'
      } else return 'check'
    }
    if (handGroup === 4) {
      if (random_num > .7) {
        this.betSize = this.currentBet * 3;

        return 'bet'
      } else if (random_num > .3) {
        return 'check'
      } else {
        return 'check'
      }
    }
    if (handGroup === 5) {
      if (random_num < .5) {
        return 'check'
      } else {
        return 'check'
      }
    }
  }

  facingBetFlop(bet){


    if (this.game.bbPlayer === this) {
      let random_num = Math.random();
      // this is primarily for facing a cbet
      
      if (this.game.getHandStrength(this.hand) === "high card") {
        
        if (random_num < .25) return 'raise'
        if (random_num > .75) return 'fold'
        return 'call'

      } else if ( this.game.getHandStrength(this.hand) === "pair"){
        if (random_num < .75) return 'call'
        return 'raise'
      } else {
          if (random_num < .03) return 'call'
          return 'raise'
      }
    }
    if (this.game.sbPlayer === this) {
      let random_num = Math.random();
      // this is primarily for facing a donk / though for time being, will still trigger when facing a 
      // 3bet followed by a cbet.
      
      if (this.game.getHandStrength(this.hand) === "high card") {
      
        if (random_num < .15) return 'raise'
        if (random_num > .9) return 'fold'
        return 'call'

      } else if ( this.game.getHandStrength(this.hand) === "pair"){
        if (random_num < .75) return 'call'
        return 'raise'
      } else {
        if (random_num < .5) return 'call'
        return 'raise'
      }
    }
  }

  betOptionFlop(){
    // should always C bet, and never donk lead.  No logic yet for limped pots.
    // debugger

    if (this.game.bbPlayer === this && ['rc', 'rrrc'].includes(this.game.bettingHash['pre']) ){
        // this is when BU raised and comp called pre, we always check.
       return 'check'
    }
    // if ( ['cx', 'cbc', 'rrc'].includes(this.game.bettingHash['pre']) ){
    if ( ['cx'].includes(this.game.bettingHash['pre']) ){
      //when should we C bet from OOP.
      let random_num = Math.random();
      if (this.game.getHandStrength(this.hand) === "high card") {

        if (random_num < .25) return 'check'
        return 'bet'

      } else if (this.game.getHandStrength(this.hand) === "pair") {
        if (random_num < .75) return 'bet'
        return 'check'
      } else {
        console.log('hand is strong Cat1')
        if (random_num < .2) return 'check'
        return 'bet'
      }
    }
    if (['cbc', 'rrc', 'rc'].includes(this.game.bettingHash['pre'])){
      console.log('cbet')
      return 'bet'
    }
  }

  betOptionTurn(){
    //no leading turn if IP bets flop
    // debugger
    let random_num = Math.random();
    let strength = this.game.getHandStrength(this.hand)
    if (this.game.bbPlayer === this){

      // debugger
      if ( ['xbc', 'brc'].includes(this.game.bettingHash['pre'])) {
        //never donk lead turn
        return 'check'
      }

       else if (['xx'].includes(this.game.bettingHash['flop'])){
        //if IP checks flop we play turn aggro.  We bet 66% of our air, and 90% of 1 pair+
        if (strength === 'high card' && random_num < .35){
          return 'check'
        } else if (strength === 'high card'){
          return 'bet'
        } else if (random_num < .1) {
          return "check"
        } else {
          return 'bet'
        }
       }
       else if (['bc', 'brrc'].includes(this.game.bettingHash['flop'])){
          if ( random_num < .3 && strength === 'high card'){
            return 'check' 
          } else {
            return 'bet'
          }
       }
      }else{
        //when we're IP
        if (['xbc', 'xbrrc'].includes(this.game.bettingHash['flop'])){
          if (random_num < .3 && strength == "high card"){
            return "check"
          }
        } else {
          return "bet"
        }
          
      }
    }
  

  

  betOptionRiver() {
    if (this.game.bbPlayer === this && ['rc', 'rrrc'].includes(this.game.bettingHash['pre'])) return 'check'
    if (['cx', 'cbc', 'rrc'].includes(this.game.bettingHash['pre'])) {
      //when should we C bet from OOP.
      let random_num = Math.random();
      if (this.game.getHandStrength(this.hand) === "high card") {
        if (random_num < .35) return 'bet'
        return 'check'
      } else if (this.game.getHandStrength(this.hand) === "pair") {
        if (random_num < .35) return 'bet'
        return 'check'
      } else {
        return 'bet'
      }
    }
  }
  facingBetRiver(bet) {


    if (this.game.bbPlayer === this) {
      let random_num = Math.random();
      // this is primarily for facing a cbet

      if (this.game.getHandStrength(this.hand) === "high card") {
        if (random_num < .35) return 'raise'
        else return 'fold'
      

      } else if (this.game.getHandStrength(this.hand) === "pair") {
        if (random_num < .75) return 'call'
        return 'fold'
      } else {
        if (random_num < .01) return 'call'
        return 'raise'
      }
    }
  }




  getHandGroup(){
    // debugger
    let cards = ""
    if (this.hand[0].value < this.hand[1].value) {
      this.hand = [this.hand[1], this.hand[0]]
    } else {
      this.hand = [this.hand[0], this.hand[1]]
    }

    if (this.hand[0].value === this.hand[1].value) {
      cards = `${this.hand[0].rank}${this.hand[1].rank}`
    } else if (this.hand[0].suit !== this.hand[1].suit) {
      cards = `${this.hand[0].rank}${this.hand[1].rank}o`
    } else {
      cards = `${this.hand[0].rank}${this.hand[1].rank}s`
    }
    // console.log('comps hand is: ', cards)

    if (group1.includes(cards)) this.handGroup = 1
    if (group2.includes(cards)) this.handGroup = 2
    if (group3.includes(cards)) this.handGroup = 3
    if (group4.includes(cards)) this.handGroup = 4
    if (group5.includes(cards)) this.handGroup = 5
  }

}

export default Computer
