
import getData from '../utils/dataFetch'
const isPractice = false
const dataToFetch = isPractice ? 'practice' : 'data'

// The score for a single round is the score for the shape you selected 
// (1 for Rock (X), 2 for Paper (Y), and 3 for Scissors (Z)) plus the score for the outcome of the round 
// (0 if you lost, 3 if the round was a draw, and 6 if you won).
const points = {
  rock: 1,
  paper: 2,
  scissors: 3,
  loose: 0,
  draw: 3,
  win: 6
}

// Purely for readability (could be removed)
const moves = {
  rock: 'X',
  paper: 'Y',
  scissors: 'Z'
}

// X means you need to lose, 
// Y means you need to end the round in a draw,
// and Z means you need to win. Good luck!"
const lookupTable = {
  // player choice [loose, draw, win]
  A: [moves.scissors, moves.rock, moves.paper], // ROCK
  B: [moves.rock, moves.paper, moves.scissors], // PAPER
  C: [moves.paper, moves.scissors, moves.rock] // SCISSORS
}

// Points translation table
const pointsLookup = {
  'A X': points.rock + points.draw, // rock -> rock -> draw
  'A Y': points.paper + points.win, // Rock -> Paper -> win
  'A Z': points.scissors + points.loose, // Rock -> scissons -> loose
  'B X': points.rock + points.loose, // Paper -> rock -> Loose
  'B Y': points.paper + points.draw, // Paper -> Paper -> drawn 
  'B Z': points.scissors + points.win, // Paper -> scissors -> win
  'C X': points.rock + points.win, // Scissors -> rock -> win
  'C Y': points.paper + points.loose,
  'C Z': points.scissors + points.draw,
}

// Function run here
function init() {
  const data = getData('day2', dataToFetch, true)
  
  /**
   * PART 1
   */
  const total = data.reduce((acc, curVal) => {
   return acc + pointsLookup[curVal]
  }, 0)

  console.log('PART 1', total)

  /**
   * PART 2
   */
  const part2Total = data.reduce((acc, game) => {
    const [a, b] = game.split(' ')
    let newB
    // Need to loose
    if (b === 'X') newB = lookupTable[a][0]
    // Need to draw
    if (b === 'Y') newB = lookupTable[a][1]
    // Need to win
    if (b === 'Z') newB = lookupTable[a][2] 
    return acc + pointsLookup[`${a} ${newB}`]
  }, 0)

  console.log('PART 2', part2Total)
}

init()