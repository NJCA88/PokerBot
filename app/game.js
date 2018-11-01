
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

    runHand(bbPlayer, sbPlayer) {
        // this.render()
        console.log("Running game now");
        this.setUp(bbPlayer, sbPlayer);
        this.runPreflop(bbPlayer, sbPlayer);
    }

    runPreflop(bbPlayer, sbPlayer) {
        if (sbPlayer.facingBet(5, bbPlayer, "pre") === "call") {
            bbPlayer.betOption(bbPlayer);
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
        console.log("this.card1 is ", this.card1);
        this.render();
    }

    takeBet(betSize) {
        console.log("this.pot, this.betSize is", this.pot, betSize)
        this.pot += betSize;
        console.log("pot is now", this.pot);
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