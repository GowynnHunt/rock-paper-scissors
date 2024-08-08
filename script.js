// Variable declarations
const CHOICES = ["rock", "paper", "scissors"];
const SCORE = {
  wins: 0,
  losses: 0,
  ties: 0,
  rounds: 0,
};

const elemChoiceBox = document.querySelector(".choice-box");
const elemScoresBox = document.querySelector(".scores-box");
const elemGamesBox = document.querySelector(".game-box");
const elemRulesBox = document.querySelector(".rules-box");
const elemLogBox = document.querySelector(".log-box");

const elemLogList = document.querySelector(".log-box ol");

const elemPlayerChoice = document.querySelector("#player-choice");
const elemAiChoice = document.querySelector("#ai-choice");

const scoreUpdate = new CustomEvent("scoreUpdate", {
  detail: "Occurs whenever the SCORE is updated.",
});

const elemResetButton = document.createElement("button");
elemResetButton.setAttribute("id", "reset-button");
elemResetButton.setAttribute("class", "choices");
elemResetButton.textContent = "Reset";

// Functions

function endGame() {
  // Prevent Play
  elemChoiceBox.removeEventListener("click", choiceHandler);

  // Reset Button
  elemGamesBox.insertBefore(elemResetButton, elemLogBox);
}

function resetGame() {
  for (const property in SCORE) {
    SCORE[property] = 0;
  }

  removeChildNodes(elemLogList);
  elemChoiceBox.addEventListener("click", choiceHandler);
  elemScoresBox.dispatchEvent(scoreUpdate);
  clearRoundImages();
  elemResetButton.remove();
}

function removeChildNodes(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

function getLogText(playerChoice, aiChoice, result) {
  switch (result) {
    case "win":
      return `Round ${SCORE.rounds}: ${getCapitalized(playerChoice)} beats ${getCapitalized(aiChoice)}. You win!`;
    case "loss":
      return `Round ${SCORE.rounds}: ${getCapitalized(aiChoice)} beats ${getCapitalized(playerChoice)}. You lose!`;
    case "tie":
      return `Round ${SCORE.rounds}: ${getCapitalized(aiChoice)} ties with ${getCapitalized(playerChoice)}. You tie!`;
  }
}

function getLogNode(logText) {
  const logNode = document.createElement("li");
  logNode.textContent = logText;
  elemLogList.appendChild(logNode);
}

function getCapitalized(string) {
  return string[0].toUpperCase() + string.slice(1);
}

function getAiChoice() {
  const randomNumber = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[randomNumber];
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
  elemPlayerChoice.setAttribute("src", getImage(player));
  elemPlayerChoice.style.backgroundColor = "transparent";
  elemAiChoice.setAttribute("src", getImage(ai));
  elemAiChoice.style.backgroundColor = "transparent";
}

function clearRoundImages() {
  elemPlayerChoice.setAttribute("src", "");
  elemPlayerChoice.style.backgroundColor = "#2a3749";
  elemAiChoice.setAttribute("src", "");
  elemAiChoice.style.backgroundColor = "#2a3749";
}

function playRound(playerChoice, aiChoice) {
  SCORE.rounds += 1;
  let result;

  if (playerChoice === aiChoice) {
    result = "tie";
  } else if (playerChoice === "rock" && aiChoice === "scissors") {
    result = "win";
  } else if (playerChoice === "paper" && aiChoice === "rock") {
    result = "win";
  } else if (playerChoice === "scissors" && aiChoice === "paper") {
    result = "win";
  } else {
    result = "loss";
  }

  switch (result) {
    case "tie":
      SCORE.ties += 1;
      break;
    case "win":
      SCORE.wins += 1;
      break;
    case "loss":
      SCORE.losses += 1;
      break;
  }

  getLogNode(getLogText(playerChoice, aiChoice, result));
  getRoundImages(playerChoice, aiChoice);

  elemScoresBox.dispatchEvent(scoreUpdate);
}

// Event Listeners & Handler(s)

function choiceHandler(event) {
  const playerChoice = event.target.id;
  const aiChoice = getAiChoice();

  // Prevents clicking elsewhere in the box throwing an error
  if (!CHOICES.includes(playerChoice)) return;

  playRound(playerChoice, aiChoice);
}

elemChoiceBox.addEventListener("click", choiceHandler);

elemScoresBox.addEventListener("scoreUpdate", () => {
  // nodeList is a HTMLCollection
  const nodeList = elemScoresBox.children;

  for (let i = 0; i < nodeList.length; i++) {
    const node = nodeList.item(i);
    const id = node.id;

    node.textContent = `${getCapitalized(id)}: ${SCORE[id]}`;
  }

  if (SCORE.wins === 5) {
    getLogNode(`Congratulations, you beat the AI!`);
    endGame();
  } else if (SCORE.losses === 5) {
    getLogNode(`You lost to the AI. Better luck next time!`);
    endGame();
  }
});

elemResetButton.addEventListener("click", resetGame);
