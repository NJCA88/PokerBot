const VALUES = {
    A: 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    T: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14
};

const HAND_STRENGTHS= {
    'quads':  1,
    'full house':  2,
    'flush':  3,
    'straight':  4,
    "3 of a kind":  5,
    "2 pair":  6,
    "pair":  7,
    "high card":  8,

}

import Player from "./player";
import Card from "./card";
import Deck from "./deck";

class Game {
    constructor(options) {
        this.human = new Player({
            pos: [300, 450],
            stack: 1000,
            name: "Human",
            game: this
        });
        this.computer = new Player({
            pos: [300, 50],
            stack: 1000,
            name: "Computer",
            game: this
        });
        this.deck = new Deck();
        this.pot = 0;
        this.ctx = options.ctx;
        this.sbPlayer = ""
        this.bbPlayer = ""
        this.status = 'live'
        this.runHand(this.computer, this.human);
    }

    async runHand(bbPlayer, sbPlayer) {
        console.log("starting new hand")
        this.render();
        this.sbPlayer = sbPlayer
        this.bbPlayer = bbPlayer

        this.setUp(bbPlayer, sbPlayer);
        await this.runPreflop();
        if (this.status === 'live') await this.runFlop();
        if (this.status === "live") await this.runTurn();
        if (this.status === 'live') await this.runRiver();
        console.log("HAND IS OVER");
        console.log(sbPlayer, bbPlayer);
         this.finishHand(sbPlayer, bbPlayer);
        this.getHandStrength(sbPlayer.hand)
    }


    async runPreflop() {

        const isCall = await this.sbPlayer.facingBet(10, this.bbPlayer, "flop");
        if (isCall === "call") {
            await this.bbPlayer.betOption(this.sbPlayer, "flop");
        }
        // if (this.checkStatus() === "dead") this.finishHand()

    }

    async runFlop() {
        this.resetCurrentBets(this.bbPlayer, this.sbPlayer);

        this.dealFlop();
        console.log("starting the flop now, we don't need to cards!");
        
        const isCheck = await this.bbPlayer.betOption(this.sbPlayer, "flop");
        if (isCheck === "check") {
            await this.sbPlayer.betOption(this.bbPlayer, "flop");
        }
        if (this.checkStatus() === "dead") this.finishHand()

    }

    async runTurn() {
        this.resetCurrentBets(this.bbPlayer, this.sbPlayer);

        this.dealTurn();
        console.log("starting the turn now, we don't need to cards !");
        console.log("sb player: ", this.sbPlayer, "bbPlayer", this.bbPlayer);
        const isCheck = await this.bbPlayer.betOption(this.sbPlayer, "turn");
        if (isCheck === "check") {
            await this.sbPlayer.betOption(this.bbPlayer, "turn");
        }
        if (this.checkStatus() === "dead") this.finishHand()

    }

    async runRiver() {
        this.resetCurrentBets(this.bbPlayer, this.sbPlayer);

        this.dealRiver();
        console.log("starting the right now, we don't need to cards!");
        console.log("sb player: ", this.sbPlayer);

        const isCheck = await this.bbPlayer.betOption(this.sbPlayer, "river");
        if (isCheck === "check") {
            await this.sbPlayer.betOption(this.bbPlayer, "river");
        }
        if (this.checkStatus() === "dead") this.finishHand()

    }

    clearPostState(){
        this.bbPlayer.currentBet = 0
        this.sbPlayer.currentBet = 0
        this.bbPlayer.hand = []
        this.sbPlayer.hand = []
        this.pot = 0
    }


    setUp(bbPlayer, sbPlayer) {

        const cardPos1 = [350, 300];
        const cardPos2 = [400, 300];
        const cardPos3 = [350, 90];
        const cardPos4 = [400, 90];

        // const cardPos1 = [350, 90];
        // const cardPos2 = [400, 90];
        // const cardPos3 = [350, 300];
        // const cardPos4 = [400, 300];

        this.card1 = this.deck.deal(this.human);
        this.card1.pos = cardPos1;

        this.card2 = this.deck.deal(this.human);
        this.card2.pos = cardPos2;

        this.card3 = this.deck.deal(this.computer);
        this.card3.pos = cardPos3;

        this.card4 = this.deck.deal(this.computer);
        this.card4.pos = cardPos4;

        bbPlayer.postBB();
        sbPlayer.postSB();
        this.pot += 15;
        sbPlayer.currentBet = 5
        // bbPlayer.currentBet = 10
        this.bbPlayer.status = "live";
        this.sbPlayer.status = "live";
        // console.log("this.card1 is ", this.card1);
        this.render();
    }

    dealFlop() {
        const cardPos5 = [50, 200];
        const cardPos6 = [125, 200];
        const cardPos7 = [200, 200];

        this.card5 = this.deck.deal(this.human, this.computer);
        this.card6 = this.deck.deal(this.human, this.computer);
        this.card7 = this.deck.deal(this.human, this.computer);

        this.card5.pos = cardPos5;
        this.card6.pos = cardPos6;
        this.card7.pos = cardPos7;

        this.card5.draw(this.ctx);
        this.card6.draw(this.ctx);
        this.card7.draw(this.ctx);
    }

    dealTurn() {
        const cardPos8 = [275, 200];
        this.card8 = this.deck.deal(this.human, this.computer);
        this.card8.pos = cardPos8;
        this.card8.draw(this.ctx);
        this.render();
    }

    dealRiver() {
        const cardPos9 = [350, 200];
        this.card9 = this.deck.deal(this.human, this.computer);
        this.card9.pos = cardPos9;
        this.card9.draw(this.ctx);
    }

    takeBet(betSize) {
        console.log("this.pot, this.betSize is", this.pot, betSize);
        this.pot += betSize;
        console.log("pot is now", this.pot);
    }

    checkStatus(){
        if (this.sbPlayer.status === 'live' && this.bbPlayer.status === 'live'){
            console.log('hand is still live')
            this.status = 'live'
            return 'live'
        }
        this.status = 'dead'
        return 'dead'
    }

    finishHand(sbPlayer, bbPlayer) {
        console.log("finishing hand now");
        let winner = ""
        if (this.status === 'dead'){
            if (this.sbPlayer.status = 'dead') winner = this.bbPlayer
            else winner = this.bbPlayer
            console.log("winner is: ", winner.name)
        } else{

        console.log('sb player cards are: ', sbPlayer.hand)
        console.log(this.getHandStrength(sbPlayer.hand));
        sbPlayer.handName = this.getHandStrength(sbPlayer.hand)
        bbPlayer.handName = this.getHandStrength(bbPlayer.hand)
        if (HAND_STRENGTHS[sbPlayer.handName] < HAND_STRENGTHS[bbPlayer.handName]){
            winner = sbPlayer
        }else
        winner = bbPlayer
        }

        winner.stack += this.pot

        this.clearPostState();
        this.runHand(this.bbPlayer, this.sbPlayer)
    }

    resetCurrentBets(player1, player2) {
        player1.currentBet = 0;
        player2.currentBet = 0;
    }

    getHandStrength(hand) {
        const pairsHash = {};
        const suitsHash = {};
        const ranks = [];
        let values = [];
        for (var card_idx = 0; card_idx < hand.length; card_idx++) {
            pairsHash[hand[card_idx].rank] =
                pairsHash[hand[card_idx].rank] + 1 || 1;
            suitsHash[hand[card_idx].suit] =
                suitsHash[hand[card_idx].suit] + 1 || 1;
            ranks.push(hand[card_idx].rank);
            let val =  (VALUES[hand[card_idx].rank]);
            if ( !values.includes(val)) values.push(val)
        }
        values = values.sort((a,b) => a - b).reverse()
        

        if (Object.values(pairsHash).includes(4)) return "quads"
        if (Object.values(pairsHash).includes(3) && Object.values(pairsHash).includes(2)) return "full house"
        if (Object.values(suitsHash).sort((a, b)=> a - b)[Object.values(suitsHash).length] >= 5  ) return "flush"
        if (Object.values(suitsHash).sort().reverse()[0] >= 5) return "flush"
      
        // debugger
        for (var start = 0; start < 3; start ++){
            if (this.checkStraight(values.slice(start, start + 5)) === true ) return "straight"
        }

        if (Object.values(pairsHash).includes(3)) return "3 of a kind"
        if ( this.checkTwoPair(Object.values(pairsHash))) return "2 pair"
        if (Object.values(pairsHash).includes(2)) return "pair";
        return "high card"

    }

    checkStraight(valArr){
        for (let i = 0; i < valArr.length; i++){
          if (valArr[0] - valArr[i] != i ) return false 
        } 
        return true
    }
    checkTwoPair(pairsHashArr){
        for (let i = 0; i < pairsHashArr.length - 1; i++){
            if ( pairsHashArr[i] === 2){
                for (let j = i + 1; j < pairsHashArr.length; j++){
                    if (pairsHashArr[j] === 2 ) return true
                }
            }
        }
        return false
    }

    render() {
        this.ctx.clearRect(0, 0, 800, 500);
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(0, 0, 800, 500);
        
        this.ctx.fillStyle = "black";
        this.ctx.font = 20 + 'pt Arial';
        this.ctx.fillText(`${this.pot}`, 450 , 250);
        
        this.human.draw(this.ctx);
        this.computer.draw(this.ctx);

        this.human.hand.forEach(card => {
            card.draw(this.ctx);
        });
        this.computer.hand.forEach(card => {
            card.draw(this.ctx);
        });

        window.requestAnimationFrame(this.render.bind(this));
    }
}

export default Game;
