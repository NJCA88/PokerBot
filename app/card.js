const RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K"];
const SUITS = ['c', 's', 'h', 'd'];

const CARD_SIZE = [72, 96];
const CARD_CENTER = [0, 0];
const card_images = new Image()
card_images.src = 
    "http://storage.googleapis.com/codeskulptor-assets/cards_jfitz.png";

const CARD_BACK_SIZE = (72, 96);
const CARD_BACK_CENTER = (36, 48);
const card_back = new Image()
card_back.src =
    "http://storage.googleapis.com/codeskulptor-assets/card_jfitz_back.png"; 

class Card {
    constructor(options){
        this.suit = options.suit
        this.rank = options.rank
    }



     draw(ctx, pos) {  
        const card_loc = [CARD_CENTER[0] + CARD_SIZE[0] * RANKS.indexOf(this.rank),
            CARD_CENTER[1] + CARD_SIZE[1] * SUITS.indexOf(this.suit)]

        ctx.drawImage(card_images, card_loc[0], card_loc[1], CARD_SIZE[0], CARD_SIZE[1], 100, 100, CARD_SIZE[0], CARD_SIZE[1])
     }

}

export default Card
