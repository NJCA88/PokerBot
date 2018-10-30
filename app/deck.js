const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
const SUITS = ['a', 's', 'h', 'c'];

import Card from './card';

class Deck{
    constructor(){
        this.cards = []

        for (let rank_idx = 0; rank_idx < RANKS.length; rank_idx++ ){
            for (let suit_idx = 0; suit_idx < SUITS.length; suit_idx++){
                this.cards.push( new Card({suit: SUITS[suit_idx], rank: RANKS[rank_idx]}) )
            }
        }
        console.log(this.cards)
    }
}

export default Deck;