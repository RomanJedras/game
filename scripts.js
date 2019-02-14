'use strict';


const newGameButton = document.getElementById('js-newGameButton'),
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
      playerWelcome = document.getElementById('js-welcome'),
      playerChoose= document.getElementById('player-choose'),
      RoundWrap = document.getElementById('js-round-wrap'),
      roundGame = document.getElementById('round'),
      tieText = "It's a Tie!";





let rounds = 0;
    let gameState = 'notStarted',  //started // ended //notStarted
      player = {
        name: '',
        score: 0
      },
      computer = {
        score: 0
      }, round = 0, winner = '';

  const setGameElements = function () {
    if (gameState === 'started') {
      newGameElem.style.display = 'none';
      pickElem.style.display = 'block';
      resultsElem.style.display = 'block';
      playerWelcome.style.display = 'none';
      RoundWrap.style.display = 'block';
    } else if (gameState === 'ended') {
      newGameElem.style.display = 'block';
      newGameButton.innerHTML = 'Finish Game';
      pickElem.style.display = 'none';
      resultsElem.style.display = 'none';
    } else if (gameState === 'finishRound') {
      pickElem.style.display = 'block';
      newGameElem.style.display = 'block';
      newGameButton.innerHTML = 'Finish Round : '+(round -1);
    } else {
      newGameElem.style.display = 'block';
      pickElem.style.display = 'none';
      resultsElem.style.display = 'none';
      RoundWrap.style.display = 'none';
    }
  };

  setGameElements();

  const newGame = function () {
    player.name = prompt('Player, please pass your name', 'Player Name');
    round = 1;
    rounds = parseInt(prompt('How much number round do you want play'));
    if(rounds > 0) {
      playerChoose.innerHTML = rounds;
      roundGame.innerHTML = round;

      if (player.name) {
        player.score = computer.score = 0;
        gameState = 'started';
        setGameElements();
        playerNameElem.innerHTML = player.name;
      }
    } else {
      alert('This is not number');
    }
  };

  const playerMove = function (playerPick) {
    const computerPick = getComputerPick();
    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
    winner = checkRoundWinner(playerPick, computerPick);
      endGame();
      setGamePoints();
      setGameElements();
  };

  function random() {
    return Math.floor(Math.random() * 3);
  };

  function getComputerPick() {
    let randomPick = random();
    let possiblePicks;
    if (randomPick === 1) {
      possiblePicks = 'paper';
    } else if (randomPick === 2) {
      possiblePicks = 'rock';
    } else {
      possiblePicks = 'scissors';
    }
    return possiblePicks;
  };

  function checkRoundWinner(playerPick, computerPick) {

    playerResultElem.innerHTML = computerResultElem.innerHTML = '';
    let winnerIs = 'player';
    if (playerPick === computerPick) {
      winnerIs = tieText; //remis
    }
    if (computerPick === 'rock' && playerPick === 'scissors' || computerPick === 'scissors' && playerPick === 'paper') {
      winnerIs = 'computer';
    } else if (computerPick === 'paper' && playerPick === 'rock') {
      winnerIs = 'computer';
    }

      if (winnerIs === 'player') {
        playerResultElem.innerText = 'Player win ';
        player.score++;
      } else if (winnerIs === 'computer') {
        computerResultElem.innerText = 'Computer wins !';
        computer.score++;
      } else {
        computerResultElem.innerText = 'Draw!';
        playerResultElem.innerText = 'Draw!';
      }

      return winnerIs;

  }

  function setGamePoints() {
    playerPointsElem.innerText = player.score;
    computerPointsElem.innerText = computer.score;
  }

  rock_button.addEventListener('click', function (event) {
    playerMove(this.name);
  });

  paper_button.addEventListener('click', function () {
    playerMove(this.name);
  });

  scissors_button.addEventListener('click', function () {
    playerMove(this.name);
  });


  newGameButton.addEventListener('click', newGame);


  function endGame() {

     let playerWinsText = "You win the round!",
         computerWinsText = "Computer wins the round!";

    if (player.score === 10 ) {
      round++;
      playerChoose.innerHTML = rounds;
      roundGame.innerHTML = round;
      if(rounds > round || rounds == round && rounds > 0 ) {
        playerResultElem.innerText = playerWinsText;
        scoreZero();
        gameState = 'finishRound';
      } else if (round > rounds && rounds >= 2 ){
        gameState = 'ended';
        alert('Player Win !!');
        playerChoose.innerHTML = rounds;
        roundGame.innerHTML = round -1;
        scoreZero();
        getEndInfo();
      }

    } else if (computer.score === 10 ) {
      round++;
      playerChoose.innerHTML = rounds;
      roundGame.innerHTML = round;
      if(rounds > round || rounds == round && rounds > 0 ) {
        computerResultElem.innerText = computerWinsText;
        gameState = 'finishRound';
        scoreZero();
        getEndInfo();
       } else if (round > rounds){
        gameState = 'ended';
        alert('Computer Win !!');
        playerChoose.innerHTML = rounds;
        roundGame.innerHTML = round - 1;

      }
    }
    setGamePoints();
  }

  function scoreZero() {
    return computer.score = player.score = 0;
  }

  function getEndInfo(){
    playerResultElem.innerHTML = 'Player Score';
    computerResultElem.innerHTML = 'Computer Score';
    playerPickElem.innerHTML = 'Player Selection';
    computerPickElem.innerHTML = 'Computer Selection';
  }

