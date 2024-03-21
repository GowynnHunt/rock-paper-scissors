const CHOICES = ["rock", "paper", "scissors"];
const SCORE = {
  ties: 0,
  wins: 0,
  losses: 0,
};

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

function getRandomNumber(lowerLim, upperLim) {
  return Math.floor(Math.random() * (upperLim + 1)) + lowerLim;
}

function getComputerChoice() {
  return CHOICES[getRandomNumber(0, 2)];
}

function getPlayerChoice() {
  let playerChoice;

  while (!CHOICES.includes(playerChoice)) {
    playerChoice = prompt("Please enter Rock, Paper, or Scissors: ");
    playerChoice = playerChoice.toLowerCase();

    if (!CHOICES.includes(playerChoice)) {
      alert("Incorrect entry. Try again.");
    }
  }

  return playerChoice;
}

function playRound(playerSelection, computerSelection) {
  playerSelection = capitalizeFirstLetter(playerSelection);
  computerSelection = capitalizeFirstLetter(computerSelection);
  // Game Logic
  if (playerSelection === computerSelection) {
    SCORE.ties += 1;
    return `You tie! You both chose ${playerSelection}.`;
  } else if (playerSelection === "Rock" && computerSelection === "Scissors") {
    SCORE.wins += 1;
    return `You win! ${playerSelection} beats ${computerSelection}.`;
  } else if (playerSelection === "Paper" && computerSelection === "Rock") {
    SCORE.wins += 1;
    return `You win! ${playerSelection} beats ${computerSelection}.`;
  } else if (playerSelection === "Scissors" && computerSelection === "Paper") {
    SCORE.wins += 1;
    return `You win! ${playerSelection} beats ${computerSelection}.`;
  } else {
    SCORE.losses += 1;
    return `You lose! ${computerSelection} beats ${playerSelection}`;
  }
}

function playGame() {
  for (let i = 0; i < 5; i++) {
    console.log(playRound(getPlayerChoice(), getComputerChoice()));
  }

  console.log(
    `Wins: ${SCORE.wins}\tLosses: ${SCORE.losses}\tTies: ${SCORE.ties}`,
  );
}

playGame();
