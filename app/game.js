const VALUES = {

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
};

import Player from "./player";
import Computer from './computer';
import Human from './human';
import Card from "./card";
import Deck from "./deck";

class Game {
    constructor(options) {
        this.human = new Human({
            pos: [300, 450],
            stack: 1000,
            name: "Human",
            game: this
        });
        this.computer = new Computer({
            pos: [300, 50],
            stack: 1000,
            name: "Computer",
            game: this
        });
        this.deck = new Deck();
        this.pot = 0;
        this.allIn = false
        this.ctx = options.ctx;
        this.sbPlayer = "";
        this.bbPlayer = "";
        this.status = 'live';
        this.message = ""
        this.bettingHash = {
            'pre': '',
            'flop': '',
            'turn': '',
            'river': ''
        } 
        this.runHand(this.computer, this.human);
    }

    async runHand(bbPlayer, sbPlayer) {

        if (this.human.stack <= 0) {
            window.alert("You already lost!  Click start over to try again!");
        }
        if (this.computer.stack <= 0){
             window.alert("Congrats on winning!  Click start over to play again!");
            }


        console.log("starting new hand");
        this.render();
        this.sbPlayer = sbPlayer;
        this.bbPlayer = bbPlayer;
        this.sbPlayer.status = 'live';
        this.bbPlayer.status = 'live';

        this.setUp(bbPlayer, sbPlayer);
        await this.runPreflop();
        this.checkStatus();
        if (this.status === 'live') await this.runFlop();
        if (this.status === "live") await this.runTurn();
        if (this.status === 'live') await this.runRiver();
        console.log("HAND IS OVER");
         this.finishHand(sbPlayer, bbPlayer);

         this.render()

    }


    async runPreflop() {
        this.sbPlayer.handName = ""
        this.bbPlayer.handName = ""
        console.log("preflop")
        console.log("Comp cards are: ", this.computer.hand)


        const isCall = await this.sbPlayer.facingBet(10, this.bbPlayer, "pre");
        if (isCall === "call") {
            await this.bbPlayer.betOption(this.sbPlayer, "pre");
        }
        // if (this.checkStatus() === "dead") this.finishHand()


    }

    async runFlop() {
        this.resetCurrentBets(this.bbPlayer, this.sbPlayer);

        this.dealFlop();
        console.log("starting the flop now");
        console.log("Comp cards are: ", this.computer.hand);
        
        this.checkAllIn()
        if (this.allIn) return

        const isCheck = await this.bbPlayer.betOption(this.sbPlayer, "flop");
        if (isCheck === "check") {
            await this.sbPlayer.betOption(this.bbPlayer, "flop");
        }
        if (this.checkStatus() === "dead") this.finishHand()

    }

    async runTurn() {

        this.resetCurrentBets(this.bbPlayer, this.sbPlayer);

        this.dealTurn();
        console.log("starting the turn now");
        console.log("Comp cards are: ", this.computer.hand);
        this.checkAllIn()
        if (this.allIn) return

        // console.log("sb player: ", this.sbPlayer, "bbPlayer", this.bbPlayer);
        const isCheck = await this.bbPlayer.betOption(this.sbPlayer, "turn");
        if (isCheck === "check") {
            await this.sbPlayer.betOption(this.bbPlayer, "turn");
        }
        if (this.checkStatus() === "dead") this.finishHand()

    }

    async runRiver() {
        this.resetCurrentBets(this.bbPlayer, this.sbPlayer);

        this.dealRiver();
        console.log("starting the river now");
        // console.log("sb player: ", this.sbPlayer);
        console.log("Comp cards are: ", this.computer.hand);
        this.checkAllIn()
        if (this.allIn) return


        const isCheck = await this.bbPlayer.betOption(this.sbPlayer, "river");
        if (isCheck === "check") {
            await this.sbPlayer.betOption(this.bbPlayer, "river");
        }
        if (this.checkStatus() === "dead") this.finishHand();

    }

    clearPrevState(){
        this.bbPlayer.currentBet = 0;
        this.sbPlayer.currentBet = 0;
        this.bbPlayer.hand = [];
        this.sbPlayer.hand = [];
        this.allIn = false
        this.pot = 0;
        this.deck = new Deck();
        this.bettingHash = {
            'pre': '',
            'flop': '',
            'turn': '',
            'river': ''
        } 

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

        console.log("Comp cards are: ", this.computer.cards)

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
        // console.log("this.pot, this.betSize is", this.pot, betSize);
        this.pot += betSize;
        console.log("pot is now", this.pot);
    }

    checkAllIn(){
        if (this.human.stack === 0 ) this.allIn = true
        if (this.computer.stack === 0 ) this.allIn = true
    }

    checkStatus(){
        if (this.sbPlayer.status === 'live' && this.bbPlayer.status === 'live'){
            console.log('hand is still live')
            this.status = 'live'
            return 'live'
        }
        if (this.bbPlayer.status === 'live') this.status = this.bbPlayer
        if (this.sbPlayer.status === 'live') this.status = this.sbPlayer
    }

    finishHand(sbPlayer, bbPlayer) {
        console.log("finishing hand now");
        let winner = ""

        if (this.status === this.bbPlayer) { 
            winner = this.bbPlayer
        } else if (this.status === this.sbPlayer) {
            winner = this.sbPlayer
        } else {

            console.log('sb player cards are: ', sbPlayer.hand)
            console.log(this.getHandStrength(sbPlayer.hand));
            sbPlayer.handName = this.getHandStrength(sbPlayer.hand)
            bbPlayer.handName = this.getHandStrength(bbPlayer.hand)
            // debugger
            if (HAND_STRENGTHS[sbPlayer.handName] > HAND_STRENGTHS[bbPlayer.handName]){
                winner = bbPlayer
            } else if(HAND_STRENGTHS[sbPlayer.handName] < HAND_STRENGTHS[bbPlayer.handName]){
                winner = sbPlayer
            } else {
                console.log("we need to figure this shit out...")

                console.log('we think the winner is: ', this.breakTie(sbPlayer.handName))
                winner =  this.breakTie(sbPlayer.handName)
            }
        }
        if (winner !== "tie"){
            winner.stack += this.pot
            this.pot = 0
            console.log(winner.stack)
        } else {
            console.log('looks like its a tie...')
            this.sbPlayer.stack += (Math.floor(this.pot / 2))
            this.bbPlayer.stack += (Math.floor(this.pot / 2))
        };
        if (winner === 'tie') {this.message = "Its a push"
        }else{
            this.message = `winner is ${winner.name}`
        }

        this.computer.exposeCards()
        this.clearPrevState
        this.human.clearAllButtons()
        this.createGameManageButtons()

     // this.clearPrevState();
        // this.runHand(this.bbPlayer, this.sbPlayer)
        // setTimeout(function () { this.runHand(this.bbPlayer, this.sbPlayer).bind(this); }, 2000);

    }

    breakTie(handName){
        console.log('breaking the tie...')
        let sbValues = []
        let bbValues = []
        let sbPairsHash = {};
        let bbPairsHash = {};

        for (var card_idx = 0; card_idx < 7; card_idx++) {
            sbValues.push( (VALUES[this.sbPlayer.hand[card_idx].rank])  )
            bbValues.push((VALUES[this.bbPlayer.hand[card_idx].rank]))
            sbPairsHash[VALUES[this.sbPlayer.hand[card_idx].rank]] =
                sbPairsHash[VALUES[this.sbPlayer.hand[card_idx].rank]] + 1 || 1;
            bbPairsHash[VALUES[this.bbPlayer.hand[card_idx].rank]] =
                bbPairsHash[VALUES[this.bbPlayer.hand[card_idx].rank]] + 1 || 1;
        }
        sbValues.sort((a, b) => a - b).reverse()
        bbValues.sort((a, b) => a - b).reverse()

        let sbHand = []
        let bbHand = []


        if ( handName === "high card"){
             sbHand = sbValues.slice(0, 5)
             bbHand = bbValues.slice(0,5)
        }
        if (handName === "pair") {
            // debugger
            console.log("yes, we both have 1 pair hands")
            console.log('sbValues is: ', sbValues)
            console.log('sbPairsHahs is: ', sbPairsHash)
            sbHand.push(parseInt(Object.keys(sbPairsHash).find(key => sbPairsHash[key] === 2)) )
            sbHand.push(parseInt(Object.keys(sbPairsHash).find(key => sbPairsHash[key] === 2)) )
            // sbHand.push(Object.keys(sbPairsHash).find(key => sbPairsHash[key] === 2) )
            // sbHand.push(sbPairsHash[2])

            let i = 0
            while (sbHand.length < 5 ) {
                // debugger
                // if (sbValues[i] !== sbPairsHash[2]) sbHand.push(sbValues[i])
                if (sbPairsHash[sbValues[i]] !== 2) sbHand.push(sbValues[i])
                i++
            }

            bbHand.push(parseInt(Object.keys(bbPairsHash).find(key => bbPairsHash[key] === 2)))
            bbHand.push(parseInt(Object.keys(bbPairsHash).find(key => bbPairsHash[key] === 2)))
            // bbHand.push(Object.keys(bbPairsHash).find(key => bbPairsHash[key] === 2))
            i = 0
            while (bbHand.length < 5) {
                // if (bbValues[i] !== bbPairsHash[2]) bbHand.push(bbValues[i])
                if (bbPairsHash[bbValues[i]] !== 2) bbHand.push(bbValues[i]);

                i++
            }
            console.log('sbHand, bbHand', sbHand, bbHand)

        }
        if ( handName ==="2 pair"){
            for (let i = 0; i < 7; i++){
                // debugger
                if ( sbPairsHash[sbValues[i]] === 2 && !sbHand.includes(sbValues[i])) {                    sbHand.push(sbValues[i])
                    sbHand.push(sbValues[i])
                }
            }
            let i = 0
            while (sbHand.length < 5){
                if (!sbHand.includes(sbValues[i])) sbHand.push(sbValues[i])
                i++
            }


            for (let i = 0; i < 7; i++) {
                if (bbPairsHash[bbValues[i]] === 2 && !bbHand.includes(bbValues[i])) {                    bbHand.push(bbValues[i])
                    bbHand.push(bbValues[i])

                }
            }
             i = 0
            while (bbHand.length < 5) {
                if (!bbHand.includes(sbValues[i])) bbHand.push(sbValues[i])
                i++
            }

        }

        if (handName = "3 of a kind"){
            sbHand.push(Object.keys(sbPairsHash).find(key => sbPairsHash[key] === 3))
            sbHand.push(Object.keys(sbPairsHash).find(key => sbPairsHash[key] === 3))
            // sbHand.push(sbPairsHash[2])

            let i = 0
            while (sbHand.length < 5) {
                if (sbValues[i] !== sbPairsHash[2]) sbHand.push(sbValues[i])
                i++
            }

            bbHand.push(Object.keys(bbPairsHash).find(key => bbPairsHash[key] === 3))
            bbHand.push(Object.keys(bbPairsHash).find(key => bbPairsHash[key] === 3))
            i = 0
            while (bbHand.length < 5) {
                if (bbValues[i] !== bbPairsHash[2]) bbHand.push(bbValues[i])
                i++
            }
        }

        // console.log("values are: (sb then bb): ", sbValues, bbValues)
        // console.log("after logic, sbHand is: ", sbHand, "bbHand is: ", bbHand)
        // debugger
        for (let i = 0; i < 5; i++){
            // debugger
            if (sbHand[i] > bbHand[i]) return this.sbPlayer
            else if (sbHand[i] < bbHand[i]) return this.bbPlayer
        }
        return "tie"
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

        // somtimes makes straights out of 4 straights
        for (var start = 0; start < (values.length - 4); start ++){
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

    createGameManageButtons(){
        console.log('creating buttons')
        const buttonContainer = document.querySelector('.button-container')
        const deal = document.createElement("button")
        const newGame = document.createElement("button")
        deal.innerText = 'deal'
        newGame.innerText = 'Start Over'

        buttonContainer.appendChild(deal)
        buttonContainer.appendChild(newGame)

        deal.addEventListener('click', ()=> {
            console.log('dealing now"')
            this.message = ""
            this.clearPrevState()
            this.runHand(this.sbPlayer, this.bbPlayer)
        })
        newGame.addEventListener('click', () => {
            console.log('dealing now"')
            new Game({ctx: this.ctx})
        })
        if (this.human.stack === 0) window.alert("Looks like you lost.  Click start over to try again!")
        if (this.computer.stack === 0) window.alert("Congrats on winnning!  Click start over to play again!")

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

        this.ctx.fillStyle = "black";
        this.ctx.font = 20 + 'pt Arial';
        // console.log("render function things current bet is: ", this.human.currentBet)
        this.ctx.fillText(`${this.human.currentBet}`, 250, 400);

        this.ctx.fillStyle = "black";
        this.ctx.font = 20 + 'pt Arial';
        this.ctx.fillText(`${this.computer.currentBet}`, 250, 100);

        this.ctx.fillStyle = "black";
        this.ctx.font = 20 + 'pt Arial';
        this.ctx.fillText(`${this.message}`, 500, 250);


        window.requestAnimationFrame(this.render.bind(this));
    }
}

export default Game;
