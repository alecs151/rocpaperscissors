import { startConfetti, stopConfetti, removeConfetti } from "./confetti.js";

const playerScore = document.getElementById("player-score");
const playerChoiceE = document.getElementById("player-choice");
const computahScore = document.getElementById("computah-score");
const computahChoiceE = document.getElementById("computah-choice");
const resultText = document.getElementById("resultText");

const playerRock = document.getElementById("player-rock");
const playerPaper = document.getElementById("player-paper");
const playerScissors = document.getElementById("player-scissors");
const computahRock = document.getElementById("computah-rock");
const computahPaper = document.getElementById("computah-paper");
const computahScissors = document.getElementById("computah-scissors");

const allGameIcons = document.querySelectorAll(".fas");

const choices = {
  rock: { name: "Rock", defeats: ["scissors"] },
  paper: { name: "Paper", defeats: ["rock"] },
  scissors: { name: "Scissors", defeats: ["paper"] },
};

let playerScoreNumber = 0;
let computerScoreNumber = 0;
let computerChoice = "";

// reset all icons that are selected

function resetSelected() {
  allGameIcons.forEach((icon) => {
    icon.classList.remove("selected");
  });
  stopConfetti();
  removeConfetti();
}

// reset score and player choice / computer choice

function resetAll() {
  playerScoreNumber = 0;
  computerScoreNumber = 0;
  playerScore.textContent = playerScoreNumber;
  computahScore.textContent = computerScoreNumber;
  playerChoiceE.textContent = "";
  computerChoice.textContent = "";
  resultText.textContent = "";
  resetSelected();
}

window.resetAll = resetAll;

// random choice by computah
function computerRandomChoice() {
  const computerChoiceNumber = Math.random();
  if (computerChoiceNumber < 0.3) {
    computerChoice = "rock";
  } else if (computerChoiceNumber <= 0.6) {
    computerChoice = "paper";
  } else if (computerChoiceNumber <= 0.9) {
    computerChoice = "scissors";
  }
}

// add selected styilinh and computer choice

function displayComputerChoice() {
  // add selected styiling
  switch (computerChoice) {
    case "rock":
      computahRock.classList.add("selected");
      computahChoiceE.textContent = " --- Rock";
      break;
    case "paper":
      computahPaper.classList.add("selected");
      computahChoiceE.textContent = " --- Paper";
      break;
    case "scissors":
      computahScissors.classList.add("selected");
      computahChoiceE.textContent = " --- Scissors";
      break;
    default:
      break;
  }
}

//check result, increase scores, update score text
function updateScore(playerChoice) {
  // console.log(playerChoice, computerChoice);
  if (playerChoice === computerChoice) {
    resultText.textContent = "Tie";
  } else {
    const choice = choices[playerChoice];
    if (choice.defeats.indexOf(computerChoice) > -1) {
      resultText.textContent = "You Win!!";
      startConfetti();
      playerScoreNumber++;
      playerScore.textContent = playerScoreNumber;
    } else {
      resultText.textContent = "You Loose!";
      computerScoreNumber++;
      computahScore.textContent = computerScoreNumber;
    }
  }
}

// call functions to process turn
function checkResult(playerChoice) {
  resetSelected();
  computerRandomChoice();
  displayComputerChoice();
  updateScore(playerChoice);
}

// pass player select value and styiling icons

function select(playerChoice) {
  checkResult(playerChoice);
  // add selected styiling
  switch (playerChoice) {
    case "rock":
      playerRock.classList.add("selected");
      playerChoiceE.textContent = " --- Rock";
      break;
    case "paper":
      playerPaper.classList.add("selected");
      playerChoiceE.textContent = " --- Paper";
      break;
    case "scissors":
      playerScissors.classList.add("selected");
      playerChoiceE.textContent = " --- Scissors";
      break;
    default:
      break;
  }
}

window.select = select;
// on startup set initial values
resetAll();
