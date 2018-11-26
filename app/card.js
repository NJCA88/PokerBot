const RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K"];
const SUITS = ['c', 's', 'h', 'd'];
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
        this.value = VALUES[options.rank]
        this.pos = options.pos
        this.exposed = options.exposed ? options.exposed : true
        // this.exposed = true
    }



     draw(ctx) {  
        const card_loc = [CARD_CENTER[0] + CARD_SIZE[0] * RANKS.indexOf(this.rank),
            CARD_CENTER[1] + CARD_SIZE[1] * SUITS.indexOf(this.suit)]

        if (this.exposed === true){
            ctx.drawImage(card_images, card_loc[0], card_loc[1], CARD_SIZE[0], CARD_SIZE[1], this.pos[0], this.pos[1], CARD_SIZE[0], CARD_SIZE[1])
        } else {
    
         ctx.drawImage(card_back, 0, 0, CARD_SIZE[0], CARD_SIZE[1], this.pos[0], this.pos[1], CARD_SIZE[0], CARD_SIZE[1])

        }
     }

}

export default Card
