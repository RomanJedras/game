'use strict';

const  newGameButton = document.getElementById('js-newGameButton'),
    rock_button = document.getElementById('js-playerPick_rock'),
    paper_button = document.getElementById('js-playerPick_paper'),
    scissors_button = document.getElementById('js-playerPick_scissors'),
    newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('playerPickElement'),
    resultsElem = document.getElementById('results'),
    playerPointsElem = document.getElementById('playerPoints'),
    playerNameElem = document.getElementById('playerName'),
    computerPointsElem = document.getElementById('computerPoints'),
    playerPickElem = document.getElementById('playerPick'),
    computerPickElem = document.getElementById('computerPick'),
    playerResultElem = document.getElementById('playerResult'),
    computerResultElem = document.getElementById('computerResult'),
    playerWelcome = document.getElementById('js-welcome');

let gameState = 'notStarted',  //started // ended //notStarted
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

var setGameElements = function() {
    if (gameState === 'started') {
        newGameElem.style.display = 'none';
        pickElem.style.display = 'block';
        resultsElem.style.display = 'block';
        playerWelcome.style.display = 'none';
    } else if (gameState === 'ended') {
        newGameElem.style.display = 'block';
        newGameButton.innerHTML = 'One again';
    } else {
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
    }
}

setGameElements();

let newGame = function(playerPick) {

    player.name = prompt('Player, please pass your name', 'Player Name');
    if (player.name){
        player.score = computer.score = 0;
        gameState = 'started';
        setGameElements();
        playerNameElem.innerHTML = player.name;
    }
}
const playerMove = function (playerPick) {
    const computerPick = getComputerPick();
    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
    checkRoundWinner(playerPick, computerPick);
    endGame();
    setGamePoints();
    setGameElements();
}



let random = function() {
    return Math.floor(Math.random()*3);
};

const getComputerPick = function() {
    let randomPick = random();
    let possiblePicks;
    if (randomPick === 1) {
        possiblePicks = 'paper';
    } else if (randomPick === 2) {
        possiblePicks = 'rock';
    }else {
        possiblePicks = 'scissors';
    }
    return possiblePicks;
}




function checkRoundWinner (playerPick, computerPick) {
    playerResultElem.innerHTML = computerResultElem.innerHTML = '';
    let winnerIs = 'player';
    if (playerPick === computerPick) {
        winnerIs = 'none'; //remis
    }
    if (computerPick === 'rock' && playerPick === 'scissors' || computerPick === 'scissors' && playerPick === 'paper') {
        winnerIs = 'computer';
    } else if (computerPick === 'paper' && playerPick === 'rock') {
        winnerIs = 'computer';
    }

    if (winnerIs === 'player') {
        playerResultElem.innerText = 'Player Winner!';
        player.score++;
    }
    else if (winnerIs === 'computer') {
        computerResultElem.innerText = 'Computer Winner!';
        computer.score++;
    }
    else {
        computerResultElem.innerText = 'Draw!';
        playerResultElem.innerText = 'Draw!';
    }

}

function setGamePoints() {
    playerPointsElem.innerText = player.score;
    computerPointsElem.innerText = computer.score;
}


    rock_button.addEventListener('click', function (event) {
        playerMove(this.name);
    });

    paper_button.addEventListener('click', function () {
        playerMove(this.name)
    });

    scissors_button.addEventListener('click', function () {
        playerMove(this.name);
    });


newGameButton.addEventListener('click', newGame);

function endGame() {
    if (player.score === 10) {
        alert('Player Win');
        gameState = 'ended';
        computer.score = player.score = 0;
        playerResultElem.innerHTML = 'Player score';
        computerResultElem.innerHTML = 'Computer score';
        playerPickElem.innerHTML = 'Player Selection';
        computerPickElem.innerHTML = 'Computer Score';

    }
    else if (computer.score === 10) {
        alert('Computer Win');
        gameState = 'ended';
        computer.score = player.score = 0;
        playerResultElem.innerHTML = 'Player Score';
        computerResultElem.innerHTML = 'Computer Score';
        playerPickElem.innerHTML = 'Player Selection';
        computerPickElem.innerHTML = 'Computer Selection';

    }
    setGamePoints();
}