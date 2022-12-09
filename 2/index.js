import { readFile } from 'node:fs';
import { promisify } from 'node:util';
import { EOL } from 'node:os';

const contents = await promisify(readFile)('./input.txt', 'utf-8');
const strategyRounds = contents.split(EOL);

const roundOutcomePoints = {
  lose: 0,
  draw: 3,
  win: 6,
};

const shapePoints = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

const symbolMap = {
  A: 'rock',
  B: 'paper',
  C: 'scissors',
  X: 'rock',
  Y: 'paper',
  Z: 'scissors',
};

const strategizedOutcomeMap = {
  X: 'lose',
  Y: 'draw',
  Z: 'win',
};

function roundResult(opponent, player) {
  if (opponent === player) {
    return 'draw';
  }

  if (opponent === 'rock') {
    return player === 'paper' ? 'win' : 'lose';
  }
  if (opponent === 'paper') {
    return player === 'scissors' ? 'win' : 'lose';
  }
  if (opponent === 'scissors') {
    return player === 'rock' ? 'win' : 'lose';
  }
}

const shapeToBeatMap = {
  rock: 'paper',
  paper: 'scissors',
  scissors: 'rock',
};

const shapeToLoseMap = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper',
};

let totalScore = 0;

for (const round of strategyRounds) {
  const [opponent, desiredOutcome] = round.split(' ');
  const opponentShape = symbolMap[opponent];

  const resultForCurrentRound = strategizedOutcomeMap[desiredOutcome]; //roundResult(opponentShape, playerShape);
  const playerShape =
    resultForCurrentRound === 'draw'
      ? opponentShape
      : resultForCurrentRound === 'win'
      ? shapeToBeatMap[opponentShape]
      : shapeToLoseMap[opponentShape]; //symbolMap[player];

  totalScore =
    totalScore +
    shapePoints[playerShape] +
    roundOutcomePoints[resultForCurrentRound];
}

console.log(totalScore);
