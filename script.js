// Variable declarations
const CHOICES = ["rock", "paper", "scissors"];
const SCORE = {
  wins: 0,
  losses: 0,
  ties: 0,
};

const choiceBox = document.querySelector(".choice-box");
const scoresBox = document.querySelector(".scores-box");

const wins = document.querySelector("#wins");
const losses = document.querySelector("#losses");
const ties = document.querySelector("#ties");

const playerChoice = document.querySelector("#player-choice");
const aiChoice = document.querySelector("#ai-choice");

// Functions
function clearScore() {
  for (const result in SCORE) {
    SCORE[result] = 0;
  }
}

function getWinner() {
  if (SCORE.wins === 5) {
    return "You won!";
  } else if (SCORE.losses === 5) {
    return "You lost!";
  }
}

function getRandomNumber(lowerLim, upperLim) {
  return Math.floor(Math.random() * (upperLim + 1)) + lowerLim;
}

function getComputerChoice() {
  return CHOICES[getRandomNumber(0, 2)];
}

function getImage(choice) {
  if (choice === "rock") {
    return "./images/rock.svg";
  } else if (choice === "paper") {
    return "./images/paper.svg";
  } else if (choice === "scissors") {
    return "./images/scissors.svg";
  }
}

function getRoundImages(player, ai) {
  playerChoice.setAttribute("src", getImage(player));
  playerChoice.style.backgroundColor = "transparent";
  aiChoice.setAttribute("src", getImage(ai));
  aiChoice.style.backgroundColor = "transparent";
}

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

function getRound(playerSelection, computerSelection) {
  // Game Logic
  if (playerSelection === computerSelection) {
    SCORE.ties += 1;
  } else if (playerSelection === "rock" && computerSelection === "scissors") {
    SCORE.wins += 1;
  } else if (playerSelection === "paper" && computerSelection === "rock") {
    SCORE.wins += 1;
  } else if (playerSelection === "scissors" && computerSelection === "paper") {
    SCORE.wins += 1;
  } else {
    SCORE.losses += 1;
  }

  const scoreUpdate = new CustomEvent("scoreUpdate", {
    detail: "Occurs whenever the SCORE is updated.",
  });

  scoresBox.dispatchEvent(scoreUpdate);
}

// Event Listeners

choiceBox.addEventListener("click", (event) => {
  const choice = event.target.id;
  const comChoice = getComputerChoice();
  // console.log(aiChoice);

  // Prevents clicking elsewhere in the box throwing an error
  if (!CHOICES.includes(choice)) return;

  getRound(choice, comChoice);
  getRoundImages(choice, comChoice);
});

scoresBox.addEventListener("scoreUpdate", () => {
  // nodeList is a HTMLCollection
  const nodeList = scoresBox.children;

  if (SCORE.wins === 5 || SCORE.losses === 5) {
    // endgame()
    console.log(getWinner());
    clearScore();
  }

  for (let i = 0; i < nodeList.length; i++) {
    const node = nodeList.item(i);
    const id = node.id;

    node.textContent = `${capitalizeFirstLetter(id)}: ${SCORE[id]}`;
  }
});
