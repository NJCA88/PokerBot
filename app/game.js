const VALUES = {"A": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7":7, "8": 8, "9": 9, "T": 10, "J": 11, "Q": 12, "K": 13, "A": 14 };


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
        // this.render()
        this.runHand(this.computer, this.human);
    }

    async runHand(bbPlayer, sbPlayer) {

        this.setUp(bbPlayer, sbPlayer);
        this.render()
        await this.runPreflop(bbPlayer, sbPlayer);
        await this.runFlop(bbPlayer, sbPlayer)
        await this.runTurn(bbPlayer, sbPlayer)
        await this.runRiver(bbPlayer, sbPlayer)
        console.log('HAND IS OVER')
        console.log(sbPlayer, bbPlayer)
        this.getHandStrength(sbPlayer.hand)
    }

    // this works and is clean syntax
    async runPreflop(bbPlayer, sbPlayer){
        const isCall = await sbPlayer.facingBet(5, bbPlayer)
        // const isCall = await sbPlayer.betOption( bbPlayer)
        if (isCall === "call") bbPlayer.betOption(sbPlayer);
        // if (isCall === "check") bbPlayer.betOption(sbPlayer);
    }

    async runFlop(bbPlayer, sbPlayer) {
        this.dealFlop()
        console.log("starting the flop now, we don't need to cards!")
        const isCheck = await bbPlayer.betOption( sbPlayer, 'flop' )
        if (isCheck === "check"){

         await sbPlayer.betOption( bbPlayer, 'flop' );
        }
    }

    async runTurn(bbPlayer, sbPlayer) {
        this.dealTurn()
        console.log("starting the turn now, we don't need to cards !")
        console.log('sb player: ', sbPlayer, 'bbPlayer', bbPlayer)
        const isCheck = await bbPlayer.betOption(sbPlayer, 'turn')
        if (isCheck === "check") {

            await sbPlayer.betOption(bbPlayer, 'turn');
        }
    }

    async runRiver(bbPlayer, sbPlayer) {
        this.dealRiver()
        console.log("starting the right now, we don't need to cards!")
        console.log("sb player: ", sbPlayer);

        const isCheck = await bbPlayer.betOption(sbPlayer, 'river')
        if (isCheck === "check") {

            await sbPlayer.betOption(bbPlayer, 'river');
        }
    }
    // for post streets
    // if Player.betOption(player).then( isCheck =>{
    //     if isCheck === "check" do stuff
    // }

    // check = await payer.betOption(player)
    //     if isCheck === "check" do stuff

    setUp(bbPlayer, sbPlayer) {
        const cardPos1 = [350, 90];
        const cardPos2 = [400, 90];
        const cardPos3 = [350, 300];
        const cardPos4 = [400, 300];

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
        bbPlayer.status = "live";
        sbPlayer.status = "live";
        // console.log("this.card1 is ", this.card1);
        this.render();
    }

    dealFlop(){
        const cardPos5 = [50, 200];
        const cardPos6 = [125, 200];
        const cardPos7 = [200, 200];

        this.card5 = this.deck.deal(this.human, this.computer);
        this.card6 = this.deck.deal(this.human, this.computer);
        this.card7 = this.deck.deal(this.human, this.computer);

        this.card5.pos = cardPos5;
        this.card6.pos = cardPos6;
        this.card7.pos = cardPos7;

        this.card5.draw(this.ctx)
        this.card6.draw(this.ctx)
        this.card7.draw(this.ctx)
    }

    dealTurn(){
        const cardPos8 = [275, 200];
        this.card8 = this.deck.deal(this.human, this.computer);
        this.card8.pos = cardPos8;
        this.card8.draw(this.ctx)
        this.render()
    }

    dealRiver() {
        const cardPos9 = [350, 200];
        this.card9 = this.deck.deal(this.human, this.computer);
        this.card9.pos = cardPos9;
        this.card9.draw(this.ctx)
    }

    takeBet(betSize) {
        console.log("this.pot, this.betSize is", this.pot, betSize)
        this.pot += betSize;
        console.log("pot is now", this.pot);
    }

    getHandStrength(hand){
        const pairsHash = {};
        const suitsHash = {}
        const ranks = []
        const values = []
        for(var card_idx = 0; card_idx < hand.length; card_idx++ ) {
            pairsHash[hand[card_idx].rank] = pairsHash[hand[card_idx].rank] + 1 || 1;
            suitsHash[hand[card_idx].suit] = suitsHash[hand[card_idx].suit] + 1 || 1;
            ranks.push(hand[card_idx].rank)
            values.push(VALUES[hand[card_idx].rank] )

        }

        console.log('pairsHash is: ', pairsHash)

        console.log('suitsHash.values is: ', Object.values(suitsHash))
        console.log("ranks array is: ", ranks)
        // console.log("sorted values is: ", ]))



    }

    render() {
        this.human.draw(this.ctx);
        this.computer.draw(this.ctx);
        this.card1.draw(this.ctx);
        this.card2.draw(this.ctx);
        this.card3.draw(this.ctx);
        this.card4.draw(this.ctx);
    }
}

export default Game