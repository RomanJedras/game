/*jshint esversion: 6 */
/*global window */
/* jshint browser: true */
/* jshint node: true */

'use strict';


const newGameButton = document.getElementById('js-newGameButton'),
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
  playerWelcome = document.getElementById('js-welcome'),
  newRoundElement = document.getElementById('js-newRoundElement'),
  newRoundButton = document.getElementById('js-newRoundButton'),
  playerChoose= document.getElementById('player-choose'),
  roundWrap = document.getElementById('js-round-wrap'),
  roundGame = document.getElementById('round'),
  output = document.getElementById('output'),
  result = document.getElementById('result'),
  tieText = "It's a Tie!";

let playerPick = document.querySelectorAll('.player-move');


playerPick.forEach(function(item) {
  item.addEventListener("click", function() {
    playerMove(this.getAttribute('data-move'));
  });
});


/* zmienne globalne */
const params = {
  winsPlayer : 0,
  playerPick : '',
  winsComputer : 0,
  state : '',
  round : 0,
  gameOver : false,
  options : ['paper', 'rock', 'scissors'],
  progress : [],
  roundWinner : ''
};

params.state = 'notStarted';   //started // ended //notStarted

const newGame = function () {
  params.playerPick  = window.prompt('Player, please pass your name', 'Player Name');
  params.numberOfRounds = parseInt(window.prompt('How much number round do you want play'));
  reset();
  params.progress = [];

  while (document.querySelector("table tbody").children.length) {
    document.querySelector("table tbody").removeChild(document.querySelector("table tbody").lastChild);
  }


  if (isNaN(params.numberOfRounds ) || params.numberOfRounds  === '') {
    output.innerText ="the correct number has not been entered" + "<br><br>" + output.innerText;
  } else if (params.numberOfRounds !== null) {
    playerChoose.innerHTML = params.numberOfRounds;
    params.gameOver = false;
    params.winsPlayer = 0;
    params.winsComputer = 0;
    output.innerHTML = '';
    roundGame.innerText = params.round;
    params.state = 'started';
    setGameElements();
    playerNameElem.innerHTML = params.playerPick;
  }
};

function random() { return Math.floor(Math.random() * 3); }

function getComputerPick() {
  const randomPick = random();
  if (randomPick === 1) { return 'paper'; } else if (randomPick === 2) { return 'rock'; }
  return 'scissors';
}

function checkRoundWinner(playerChoice, computerChoice) {
  //TODO: weryfikacja warunków przyznawania pkt.
  if (playerChoice === computerChoice ) {
    params.roundWinner = tieText; //DRAW
    computerResultElem.innerText = 'Draw!';
    playerResultElem.innerText = 'Draw!';
  } else if ((playerChoice === 'paper' && computerChoice === 'rock') || (playerChoice === 'rock' && computerChoice ===  'scissors') || (playerChoice === 'scissors' && computerChoice ===  'paper')) {
    params.winsPlayer++;
    params.roundWinner = 'player' ;
    output.innerText = 'YOU WIN: you played ' + playerChoice +' computer played ' + computerChoice ;
    playerResultElem.innerText = 'Player win ';
    params.state = 'finishRound';
  } else {
    params.winsComputer++;
    output.innerText = 'YOU LOST: you played ' + playerChoice +' computer played ' + computerChoice ;
    computerResultElem.innerText = 'Computer wins !';
    params.roundWinner = 'computer' ;
    params.state = 'finishRound';
  }

  params.options.push(playerChoice);
  params.options.push(computerChoice);

  playerPointsElem.innerText = params.winsPlayer;
  computerPointsElem.innerText = params.winsComputer;
  checkWinner();
}

function checkWinner() {

  params.round++;
  console.log(params.round);
  if ( params.round === params.numberOfRounds ) {
    params.state = 'ended';
    showModal(' YOU WON THE ENTIRE GAME!');
  }
}


function addRoundInfo(playerChoice, computerChoice) {
  params.progress.push({
    player_movement : playerChoice,
    computer_movement : computerChoice,
    round_winner : params.roundWinner,
    round_result : params.winsPlayer + ':' + params.winsComputer
  });
}

function handlePlayerMove(playerChoice) {

  if (params.gameOver === false) {
    let computerChoice = getComputerPick();
    playerPickElem.innerHTML = playerChoice;
    computerPickElem.innerHTML = computerChoice;

    let resultText = checkRoundWinner(playerChoice, computerChoice);

    if (resultText) {
      output.innerHTML += resultText;
    }
    if (params.round >= params.numberOfRounds) {
      params.gameOver = true;
    }

    addRoundInfo(playerChoice, computerChoice);

  } else {
    output.innerHTML += '<br> Game over, please press the new game button! <br>';
    showWinner();
    params.state = 'ended';

  }
}

function reset() {
  params.winsPlayer = params.winsComputer = 0;
  playerPointsElem.innerText = 0;
  computerPointsElem.innerText = 0;
}

function showWinner() {
  if (params.gameOver && params.roundWinner === 'player') {
    showModal(' YOU WON THE ENTIRE GAME!');
  }else {
    showModal(' COMPUTER WON THE ENTIRE GAME!');
  }
}


const setGameElements = function () {
  switch(params.state) {
    case 'started':
      newGameElem.style.display = 'none';
      pickElem.style.display = 'block';
      resultsElem.style.display = 'block';
      playerWelcome.style.display = 'none';
      roundWrap.style.display = 'block';
      newRoundButton.style.display = 'none';
      newRoundElement.style.display = 'none';
      output.innerHTML = '';
      roundGame.innerText = '1';
      break;
    case 'finishRound':
      pickElem.style.display = 'block';
      newGameElem.style.display = 'none';
      newRoundElement.style.display = 'block';
      newRoundButton.style.display = 'block';
      newRoundButton.innerHTML = 'Finish Round : '+(params.round);
      break;
    case 'ended':
      newGameElem.style.display = 'block';
      newGameButton.style.display = 'block';
      newGameButton.innerHTML = 'Finish Game';
      newRoundButton.style.display = 'none';
      pickElem.style.display = 'none';
      resultsElem.style.display = 'none';
      break;
    case 'notStarted':
    default:
      newRoundButton.style.display = 'none';
      newRoundElement.style.display = 'none';
      newGameElem.style.display = 'block';
      pickElem.style.display = 'none';
      resultsElem.style.display = 'none';
      roundWrap.style.display = 'none';
      output.innerHTML = '';
  }
};

setGameElements();



newGameButton.addEventListener('click', newGame);

const playerMove = function (playerPick) {
  const computerPick = getComputerPick();
  playerPickElem.innerHTML = playerPick;
  computerPickElem.innerHTML = computerPick;
  handlePlayerMove(playerPick);
  setGameElements();

  if (params.round <= params.numberOfRounds ) roundGame.innerText = params.round + 1;
};

const generateProgressTable = function () {
    let template = null;
    console.log(params);

    params.progress.forEach(function (param, index) {
      template = generateTemplate('col-template', {data: params.progress}, 'tr');
      document.querySelector("table tbody").appendChild(template);
    });
    params.progress = [];
  };

function  showModal(text){
  generateProgressTable();
  document.querySelector('#modal-overlay').classList.add('show');
  document.querySelector('#modal-one').classList.add('show');
  result.innerHTML = text + '<br>' + params.winsPlayer + '-' + params.winsComputer;
}


function generateTemplate(name, data, basicElement) {
  const template = document.getElementById(name).innerHTML;
  let element = document.createElement(basicElement || 'tr');
  Mustache.parse(template);
  element.innerHTML = Mustache.render(template, data );
  return element;
}


function hideModal(event){
  event.preventDefault();
  document.querySelector('#modal-overlay').classList.remove('show');
  document.querySelector('#modal-one').classList.remove('show');
}

let closeButtons = document.querySelectorAll('.modal .close');

for(let i = 0; i < closeButtons.length; i++){
  closeButtons[i].addEventListener('click', hideModal);
}

document.querySelector('#modal-overlay').addEventListener('click', hideModal);

let modals = document.querySelectorAll('.modal');

for(let i = 0; i < modals.length; i++){
  modals[i].addEventListener('click', function(event){
      event.stopPropagation();
    }
  );
}



