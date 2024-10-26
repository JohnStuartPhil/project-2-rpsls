/**
 * Declare constants for DOM elements
 * and possible choices
 */
const buttons = document.getElementsByClassName("control");
let playerImage = document.getElementById("player-image");
let computerImage = document.getElementById("computer-image");
const choices = ["rock", "paper", "scissors", "lizard", "spock"];
let pScore = 0;
let cScore = 0;
const game = `<div class="player">
                <h2 class="scores">Your score: <span id="player-score">0</span></h2>
                <img id="player-image" src="assets/images/rpsls.png" alt="Rock Paper Scissors Lizard Spock">
            </div>

            <div class="computer">
                <h2 class="scores">Computer score: <span id="computer-score">0</span></h2>
                <img id="computer-image" src="assets/images/rpsls.png" alt="Rock Paper Scissors Lizard Spock">
            </div>`;

/**
 * Add event listener to the functions
 */
function addListenersToControlButtons() {
    for (let button of buttons) {
        button.addEventListener("click", getPlayerChoice);
    }
}

function getPlayerChoice(event) {
    let playerChoice = event.target.getAttribute("data-choice");
    playGame(playerChoice);
}

function removeListenersToControlButtons() {
    for (let button of buttons) {
        button.removeEventListener("click", getPlayerChoice);
    }
}

function addListenerToEndGameButton() {
    let button = document.getElementById("play-again");
    button.addEventListener("click", startAgain);
}

function removeListenerToEndGameButton() {
    let button = document.getElementById("play-again");
    button.removeEventListener("click", startAgain);
}

function startAgain() {
    removeListenerToEndGameButton();
    let container = document.getElementById("game-container");
    container.innerHTML = game;
    pScore = 0;
    cScore = 0;
    playerImage = document.getElementById("player-image");
    computerImage = document.getElementById("computer-image");
    addListenersToControlButtons();
}

function endGameMenu(endOfGame) {
    let container = document.getElementById("game-container");
    let heading; 
    if (endOfGame == "end-player") {
        heading = `<h2>Player won</h2>`;
    } else {
        heading = `<h2>Computer won</h2>`;
    }
       
    let message = `<p>Thank you for playing. To play again click on play again button</p>`;
    let button = `<button id="play-again">Play again</button>`;
    container.innerHTML = heading + message + button;
    addListenerToEndGameButton();
    }
/**
 * The main game function. Accepts one paramter, which 
 * is the data choice value of the selected button
 */
function playGame(playerChoice) {

    removeListenersToControlButtons();

    playerImage.src = `assets/images/${choices[playerChoice]}.png`;
    playerImage.alt = choices[playerChoice];

    let computerChoice = Math.floor(Math.random() * 5);

    computerImage.src = `assets/images/${choices[computerChoice]}.png`;
    computerImage.alt = choices[computerChoice];

    let result = checkWinner(choices[computerChoice], choices[playerChoice]);

    updateMessage(result);

    updateScores(result);

    let endOfGame = checkEndOfGame();

    updateEndMessage(endOfGame);

    if (endOfGame == "next-round") {
        addListenersToControlButtons();
    } else {
        endGameMenu(endOfGame);
    }
}

/**
 * The function to set the conditions of the potential outcomes
 */
function checkWinner(computerChoice, playerChoice) {
    if (computerChoice == playerChoice) {
        return "draw";

    } else if (playerChoice == "rock" && computerChoice == "scissors") {
        return "player";
    } else if (playerChoice == "rock" && computerChoice == "paper") {
        return "computer";
    } else if (playerChoice == "rock" && computerChoice == "lizard") {
        return "player";
    } else if (playerChoice == "rock" && computerChoice == "spock") {
        return "computer";

    } else if (playerChoice == "paper" && computerChoice == "rock") {
        return "player";
    } else if (playerChoice == "paper" && computerChoice == "scissors") {
        return "computer";
    } else if (playerChoice == "paper" && computerChoice == "spock") {
        return "player";
    } else if (playerChoice == "paper" && computerChoice == "lizard") {
        return "computer";

    } else if (playerChoice == "scissors" && computerChoice == "paper") {
        return "player";
    } else if (playerChoice == "scissors" && computerChoice == "rock") {
        return "computer";
    } else if (playerChoice == "scissors" && computerChoice == "lizard") {
        return "player";
    } else if (playerChoice == "scissors" && computerChoice == "spock") {
        return "computer";

    } else if (playerChoice == "lizard" && computerChoice == "paper") {
        return "player";
    } else if (playerChoice == "lizard" && computerChoice == "rock") {
        return "computer";
    } else if (playerChoice == "lizard" && computerChoice == "spock") {
        return "player";
    } else if (playerChoice == "lizard" && computerChoice == "scissors") {
        return "computer";

    } else if (playerChoice == "spock" && computerChoice == "rock") {
        return "player";
    } else if (playerChoice == "spock" && computerChoice == "paper") {
        return "computer";
    } else if (playerChoice == "spock" && computerChoice == "scissors") {
        return "player";
    } else if (playerChoice == "spock" && computerChoice == "lizard")
        return "computer";
}

/**
 *  The fucntion to give each message of each round
 */
function updateMessage(result) {
    let message;
    if (result == "draw") {
        message = "This one's a draw";
    } else if (result == "player") {
        message = "Player wins this round";
    } else if (result == "computer") {
        message = "Computer wins this round";
    }

    let messagesDiv = document.getElementById("messages");
    messagesDiv.innerHTML = message;
}

/**
 *  The function to incrament and update the scores 
 */
function updateScores(result) {
    if (result == "draw") {
        return;
    }
    let scoreSpan = document.getElementById(result + "-score");
    let score; 
    if (result == "player") {
        pScore++;
        score = pScore;
    } else if (result == "computer") {
        cScore++;
        score = cScore;
}
    scoreSpan.innerHTML = score;
}

/**
 * The function to end the game when either player or computer reaches 10 points
 */
function checkEndOfGame() {
    if (pScore === 10) {
        return "end-player";
    } else if (cScore === 10) {
        return "end-computer";
    } 
    return "next-round";
}

/**
 * The function to announce to either continue playing or when player or computer wins
 */
function updateEndMessage(endOfGame) {
    let endMessage;
    if (endOfGame == "end-player") {
        endMessage = "End of game - Player Wins";
    } else if (endOfGame == "end-computer") {
    endMessage = "End of game - Computer Wins";
    } else {
        endMessage = "Continue playing";
    }
    let endMessageDiv = document.getElementById("end-message");
    endMessageDiv.innerHTML = endMessage;
}

addListenersToControlButtons();

// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

btn.addEventListener("click", openInstructionsModal);

/**
 * Funtion to open the Modal
 */
function openInstructionsModal() {
    modal.style.display = "block";
    let modalButton = document.getElementById('myBtn');
    modalButton.textContent = "Click anywhere to close instructions";
}

modal.addEventListener("click", closeInstructionsModal);
span.addEventListener("click", closeInstructionsModal);

/**
 * Funtion to close the Modal
 */
function closeInstructionsModal() {
    modal.style.display = "none";
    let modalButtonA = document.getElementById('myBtn');
    modalButtonA.textContent = "Click here for instructions";
}
