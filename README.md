# Proposal



## Background and Overview
- A Heads Up No Limit poker game with a strong AI player.
- The game renders on canvas with visuals consistent with current online poker norms.
- AI that is coded with logic to play in different styles, depending on user preferences.
- Reasons for choosing this project
    - Extensive knowledge of poker / poker gametree
    - Scalability to be able to add many more features after graduation.
    - Fun UI for a recruitor to play with.

## Functionality and MVP Features
* MVP 1
    - Game renders in visually appealing way consistent with online poker norms.
    - Can play individual hands without bugs.
    - Computer player always takes most loose / passive action allowed.

* MVP 2
    - AI that plays back with Loose         Aggressive style of play with correct decisions being made on all   3 streets of play.   

* MVP 3
    - Stores paying a 'session.'

* MVP 4
    - tracks stats across a single session including but not limited to:
    - VPIP
    - PRF
    - CBet flop / turn river
    - fold to C Bet on flop / turn River

## Architecture and Technologies
* Canvas
    - All of the rendering will be done with Canvas.
* Cards.js
    - This is a simple library to help with rendering of individual playing cards that will make rendering the game easier so I can more quickly focus on building out the logic of the AI.
* Webpack
    - Running the page.

# Implementation Timeline
- My intention is to go ground up building out the game logic, and the rendering of it at the same time.
* monday - tuesday
    - First I'll set up the deck and the players and the board, and get all of that showing on the canvas.
* Wed  (Maybe Thursday also)
    - Then set up initial states of a hand / render it.
    - Build out all of the logic to handle a single street of betting, render it.
* Thurs / Fri
    - Same for following streets, and ending a hand.
    - Logic / rendering for finishing a hand.
* Weekend
    - Impliment a maximally loose passive AI opponent
    - Build out AI logic if I have time.
