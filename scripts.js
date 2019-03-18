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
        tieText = "It's a Tie!";

  let playerPick = document.querySelectorAll('.player-move');

  playerPick.forEach(function(item) {
      item.addEventListener("click", function() {
          playerMove(this.getAttribute('data-move'));
      });
  });


  let gameState = 'notStarted';   //started // ended //notStarted


  const player = { name: '', score: 0, move: 0 },
          computer = { score: 0, move: 0 },
          game = { round: 0, rounds: 0, winner: '' },
          params = { progress: [] },
          test = [],
          roundProgress = {};



  const setGameElements = function () {
      switch(gameState) {
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
            newRoundButton.innerHTML = 'Finish Round : '+(game.round - 1);
        break;
      case 'ended':
            newGameElem.style.display = 'block';
            newGameButton.style.display = 'none';
            finishGameButton.style.display = 'block';
            finishGameButton.innerHTML = 'Finish Game';
            newRoundButton.style.display = 'none';
            roundGame.innerHTML = checkRound();
            pickElem.style.display = 'none';
            resultsElem.style.display = 'none';
            output.innerHTML = '<p>Game over, please press the new game button!</p>';
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

  const newGame = function () {
      player.name = window.prompt('Player, please pass your name', 'Player Name');
      game.round = 1;
      game.rounds = parseInt(window.prompt('How much number round do you want play'));

      if (game.rounds > 0) {
        playerChoose.innerHTML = game.rounds;
        getPlayerName(player.name);
      } else {
        window.alert('This is not number');
      }
  };

   function getPlayerName(player) {

     if (! player) {
         throw new Error('nie podano Name player');
     }

     scoreZero();
     gameState = 'started';
     setGameElements();
     playerNameElem.innerHTML = player;
   }


   function checkRound() {

     if (game.rounds > 1 ) {
       game.round = (game.round - 1);
     }
     return game.round;
   }


  const playerMove = function (playerPick) {
    const computerPick = getComputerPick();
    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    game.winner = checkRoundWinner(playerPick, computerPick);

    roundProgress.playerPick = playerPick;
    roundProgress.computerPick = computerPick;

    endGame();
    setGamePoints();
    setGameElements();




    if (gameState === 'ended') {
      roundProgress.round = game.rounds;
      displaymodalScore(game.win);
    }
  };

  function random() {
      return Math.floor(Math.random() * 3);
  }

  function getComputerPick() {
    const randomPick = random();
    if (randomPick === 1) {
          return 'paper';
      } else if (randomPick === 2) {
          return 'rock';
      }
      return 'scissors';
  }

  function checkRoundWinner(playerPick, computerPick) {
    playerResultElem.innerHTML = computerResultElem.innerHTML = '';
    let winnerIs = 'player';
    if (playerPick === computerPick) {
      winnerIs = tieText; //DRAW
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

  newGameButton.addEventListener('click', newGame);

  finishGameButton.addEventListener('click', finGame);

  function finGame() {
    document.location.reload();
  }


  function endGame() {

    if(game.rounds === 1) {
      oneRound();
    }

    if (game.round < game.rounds ) {
      roundGame.innerHTML = game.round;
    }


    if (player.score === 10 ) {
      game.round++;
      playerChoose.innerHTML = game.rounds;
      checkWinner(game.round,'player');
      finishEnd(game.round);
    } else if (computer.score === 10 ) {
      game.round++;
      playerChoose.innerHTML = game.rounds;
      checkWinner(game.round,'computer');
      finishEnd(game.round);
    }

    if (game.round >= 1 ) {
      roundGame.innerHTML = game.round;
    } else {
      roundGame.innerHTML = game.round + 1;
    }
     setGamePoints();
  }


  function checkWinner(round, playerGame = '') {
      let playerWinsText = "You win the round!",
             computerWinsText = "Computer wins the round!";

      if (playerGame !== 'computer' && game.rounds > round || round === game.rounds && game.rounds > 1 ) {
        game.win = "You win the round!";
        displayRoundWindow(game.win);
        playerResultElem.innerText = playerWinsText;
        gameState = 'finishRound';
        if (gameState === 'finishRound') {
          roundProgress.playerScore = player.score;
          roundProgress.computerScore = computer.score;
          test.push(roundProgress);
          console.log(test);
        }
        // setProgressGame();
        scoreZero();

      } else if (playerGame !== 'player' && game.rounds > round || round === game.rounds && game.rounds > 1 ) {
         game.win = "Computer wins the round!";
         displayRoundWindow(game.win);
         computerResultElem.innerText = computerWinsText;
         gameState = 'finishRound';
        if (gameState === 'finishRound') {
          roundProgress.playerScore  = player.score;
          roundProgress.computerScore = computer.score;
          test.push(roundProgress);
          console.log(test);
        }
         //setProgressGame();
         scoreZero();
      }
  }



  let closeButtons = document.querySelectorAll('.modal .close'),
    modal = document.querySelectorAll('.modal');


    modal.forEach(function(item){
      item.addEventListener('click', hideModal);
    });

    let buttonsNumber =  closeButtons.childElementCount;

    for (let i = 0; i < buttonsNumber; i++) {
      closeButtons[i].addEventListener('click', hideModal);
    }

  function finishEnd(round) {

    if (player.score === 10 && round > game.rounds && game.rounds >= 2 ) {
          gameState = 'ended';
          displayRoundWindow(player.name.toLocaleUpperCase() +' Win all round!!');
          playerChoose.innerHTML = game.rounds;
          roundGame.innerHTML = round;
          console.log(player.score);
          console.log(computer.score);
       roundProgress.playerScorelst = player.score;
       roundProgress.computerScorelst = computer.score;
       params.progress.push(roundProgress);
      // setProgressGame();
          scoreZero();
          getEndInfo();
      } else if (computer.score === 10 && round > game.rounds && game.rounds >= 2 ) {
          gameState = 'ended';
          displayRoundWindow('Computer Win all round !!');
          roundGame.innerHTML = round;
          console.log(player.score);
          console.log(computer.score);
       roundProgress.playerScorelst = player.score;
       roundProgress.computerScorelst = computer.score;
       params.progress.push(roundProgress);
      //setProgressGame();
          scoreZero();
          getEndInfo();
      }
    }


    function oneRound() {

      if (player.score === 10 && game.rounds === 1 && game.round === game.rounds ) {
          gameState = 'ended';
          game.win = player.name.toLocaleUpperCase() +' Win this one round!!';
          setProgressGame ();
          scoreZero();
          getEndInfo();
          game.round = 1;
      } else if (computer.score === 10 && game.rounds === 1 && game.round === game.rounds) {
          gameState = 'ended';
          game.win = 'Computer Win this one round !!';
          setProgressGame ();
          scoreZero();
          getEndInfo();
          game.round = 1;
      }
  }


  function setProgressGame () {
      roundProgress.playerScore = player.score;
      roundProgress.computerScore = computer.score;
      params.progress.push(roundProgress);

  }


  function displaymodalScore(header) {
    let modal = document.querySelector('#modal-overlay');
    modal.classList.add('show');
    modal.querySelector('#modal-two').classList.add('show');
    modal.querySelector('#modal-two header').innerHTML = header;
    const table = modal.querySelector('#modal-two table');
    const thead = table.querySelector('thead tr');
    //const count = params.progress.round_user;
    console.log(params);
    // if (count >= 1) {
    // for (let i = 0; i < count; i++) {
    // let tr = createItem('tr');
    // appendBox(tr);
    // getId(tr, 'index' + i);
    // createRow(thead, i);
    // createData(i);
    // }
   //}
 }

  function createData(indexCol) {
    let k = 0;
    let col = document.querySelectorAll('tbody tr');
    col.forEach(function(item) {
      if (indexCol === k) {
        item.children[0].innerHTML = (k + 1);
        item.children[1].innerHTML = params.progress[k+1+'_playerPick'];
        item.children[2].innerHTML = params.progress[k+1+'_computerPick'];
        item.children[3].innerHTML = params.progress[k+'_player'];
        item.children[4].innerHTML = params.progress[k+'_computer'];
      }
      k  = k + 1;
    });
  }

  function createRow(thead, index) {
      for(let j =0; j < thead.childElementCount; j++ ) {
      document.getElementById('index' + index).appendChild(createItem('td'));
    }
  }


  function createItem (tagName) {
   return document.createElement(tagName);
   }

  function appendBox (box) {
    document.querySelector("table tbody").appendChild(box);
  }

  function getId(mainItem,id) {
    if (id !== '' &&  id != null) {
      mainItem.id = id;
    }
  }

  function displayRoundWindow (header) {
    let modal = document.querySelector('#modal-overlay');
    modal.classList.add('show');
    modal.querySelector('.modal').classList.add('show');
    modal.querySelector('.modal header').innerHTML = header;
  }

   function hideModal (event){
    event.preventDefault();
    document.querySelector('#modal-overlay').classList.remove('show');
    }


  function scoreZero() {
    computer.score = player.score = 0;
    }

  function getEndInfo(){
      playerResultElem.innerHTML = 'Player Score';
      computerResultElem.innerHTML = 'Computer Score';
      playerPickElem.innerHTML = 'Player Selection';
      computerPickElem.innerHTML = 'Computer Selection';
  }



