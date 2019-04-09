/*jshint esversion: 6 */
/*global window */
/* jshint browser: true */
/* jshint node: true */

'use strict';

const newGameButton = document.getElementById('js-newGameButton'),
        finishGameButton = document.getElementById('js-finishGameButton'),
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
  let item = '';

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
    score : 10,
    state : '',
    round : 0,
    numberOfRounds : 999,
    gameOver : false,
    options : ['paper', 'rock', 'scissors'],
    progress : [],
    roundWinner : ''
};

 params.state = 'notStarted';   //started // ended //notStarted

const newGame = function () {
  params.playerPick  = window.prompt('Player, please pass your name', 'Player Name');

  params.rounds = parseInt(window.prompt('How much number round do you want play'));

  if (isNaN(params.rounds) || params.rounds === '') {
    output.innerText ="the correct number has not been entered" + "<br><br>" + output.innerText;
  } else if (params.rounds !== null) {
    playerChoose.innerHTML = params.rounds;
    params.numberOfRounds = params.rounds;
    params.gameOver = false;
    params.winsPlayer = 0;
    params.winsComputer = 0;
    roundGame.innerText = params.round + 1;
    output.innerText = "After " + params.rounds + ' rounds, game is over /n/n' ;
    getPlayerName(params.playerPick);
  }
  };

  function getPlayerName(player) {

  if (! player) {
    throw new Error('nie podano Name player');
  }

  params.state = 'started';
  setGameElements();
  playerNameElem.innerHTML = player;
}

  function random() { return Math.floor(Math.random() * 3); }

  function getComputerPick() {
    const randomPick = random();
    if (randomPick === 1) { return 'paper'; } else if (randomPick === 2) { return 'rock'; }
  return 'scissors';
}

  function checkRoundWinner(playerChoice, computerChoice) {


    if ((playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'rock' && computerChoice ===  'scissors') ||
    (playerChoice === 'scissors' && computerChoice ===  'paper')) {
    params.winsPlayer++;
    params.roundWinner = 'player' ;
  } else {
    params.winsComputer++;
    params.roundWinner = 'computer' ;
  }

    playerPointsElem.innerText = params.winsPlayer;
    computerPointsElem.innerText = params.winsComputer;

   let results = checkWinner(playerChoice,computerChoice);

   if (results !== undefined) {
     output.innerText = results;
   }


  }

  function checkWinner(playerChoice,computerChoice) {
    let status;

    if (playerChoice === computerChoice ) {
      params.roundWinner = tieText; //DRAW
      computerResultElem.innerText = 'Draw!';
      playerResultElem.innerText = 'Draw!';
    }


    if ((params.winsPlayer === params.score) || (params.winsComputer === params.score) && params.numberOfRounds === 1) {
      params.options.push(playerChoice);
      params.options.push(computerChoice);
      params.state = 'ended';
      showModal(' YOU WON THE ENTIRE GAME!');
    }



    if (params.winsPlayer === params.score && params.numberOfRounds >= params.round && params.numberOfRounds > 1) {
        params.round++;
        params.options.push(playerChoice);
        params.options.push(computerChoice);
        status = 'YOU WIN: you played ' + playerChoice +' computer played ' + computerChoice ;
        playerResultElem.innerText = 'Player win ';
        params.roundWinner = 'player' ;
        params.state = 'finishRound';
        scoreZero();
        return status;
    } else if (params.winsComputer === params.score &&  params.numberOfRounds >= params.round && params.numberOfRounds > 1) {
        params.round++;
        params.options.push(playerChoice);
        params.options.push(computerChoice);
        status = 'YOU LOST: you played ' + playerChoice +' computer played ' + computerChoice ;
        computerResultElem.innerText = 'Computer wins !';
        params.roundWinner = 'computer' ;
        params.state = 'finishRound';
        scoreZero();
        return status;
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

 function handlePlayerMove (playerChoice) {

    if (params.gameOver === false) {
     let computerChoice =  getComputerPick();
     playerPickElem.innerHTML = playerChoice;
     computerPickElem.innerHTML = computerChoice;

     let resultText = checkRoundWinner(playerChoice, computerChoice);

     if (typeof(resultText) !== "undefined") {
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

  function scoreZero() {
  params.winsPlayer = params.winsComputer = 0;
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
      finishGameButton.style.display = 'none';
      break;
    case 'finishRound':
      pickElem.style.display = 'block';
      newGameElem.style.display = 'none';
      newRoundElement.style.display = 'block';
      newRoundButton.style.display = 'block';
      finishGameButton.style.display = 'none';
      newRoundButton.innerHTML = 'Finish Round : '+(params.round);
      break;
    case 'ended':
      newGameElem.style.display = 'block';
      newGameButton.style.display = 'none';
      finishGameButton.style.display = 'block';
      finishGameButton.innerHTML = 'Finish Game';
      newRoundButton.style.display = 'none';
      pickElem.style.display = 'none';
      resultsElem.style.display = 'none';
      break;
    case 'notFinished':
      newGameElem.style.display = 'block';
      newGameButton.style.display = 'block';
      roundGame.innerText = '0';
      playerChoose.innerText = '0';
      break;
    case 'notStarted':
    default:
      newRoundButton.style.display = 'none';
      finishGameButton.style.display = 'none';
      newRoundElement.style.display = 'none';
      newGameElem.style.display = 'block';
      pickElem.style.display = 'none';
      resultsElem.style.display = 'none';
      roundWrap.style.display = 'none';
      output.innerHTML = '';
    }
  };

  setGameElements();


  finishGameButton.addEventListener('click',function() {
     this.style.display = 'none';
     params.state = 'notFinished';
    setGameElements();
  });

  newGameButton.addEventListener('click', newGame);

  const playerMove = function (playerPick) {
  const computerPick = getComputerPick();
  playerPickElem.innerHTML = playerPick;
  computerPickElem.innerHTML = computerPick;
  handlePlayerMove(playerPick);
  setGameElements();

  if (params.round <= params.numberOfRounds ) roundGame.innerText = params.round + 1;
};

  let generateProgressTable = function() {

    params.progress.forEach(function(round, index) {
      document.querySelector("table tbody").appendChild(generateVTable (round,index));
    });
  };

  function generateVTable (round, index) {
    item =  generateTemplate('col-template', {data: round, id: index}, 'tr');
   return item;
  }

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


