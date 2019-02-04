const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];
const SUITS = ['c', 's', 'h', 'd'];

import Card from './card';

class Deck{
    constructor(){
        this.cards = []

        for (let rank_idx = 0; rank_idx < RANKS.length; rank_idx++ ){
            for (let suit_idx = 0; suit_idx < SUITS.length; suit_idx++){
                this.cards.push( new Card({suit: SUITS[suit_idx], rank: RANKS[rank_idx]}) )
            }
        }

        this.testCards = [
            //first 2 to SB, next 2 to BB 
            new Card({ suit: 'h', rank: 'K'}),
            new Card({ suit: 'c', rank: 'T'}),

            new Card({ suit: 's', rank: '5' }),
            new Card({ suit: 's', rank: '5' }),
            //flop
            new Card({ suit: 'c', rank: '8' }),
            new Card({ suit: 's', rank: '6' }),
            new Card({ suit: 'c', rank: 'J' }),
            //turn
            new Card({ suit: 'd', rank: '9' }),
            // river 
            new Card({ suit: 'd', rank: '2' }),
      
        ]
        this.deal = this.deal.bind(this)
    }

    // deal(player, player2){
    //     // this.cards.shift
    //     const card =  this.cards.splice([Math.floor(Math.random() * this.cards.length)], 1).shift()
    //     if (player2) player2.receiveCard(card)
    //     player.receiveCard(card)
    //     return card
    // }

    // adding a second deal method to handle testing.
    // when using this test method, just comment out 
    //first deal, and adjust the 9 cards as needed.

    deal(player, player2) {

        const card = this.testCards.shift()
        if (player2) player2.receiveCard(card)
        player.receiveCard(card)
        return card
    }
}

export default Deck;