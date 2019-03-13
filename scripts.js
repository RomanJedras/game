/*jshint esversion: 6 */
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
        tieText = "It's a Tie!";

        let playerPick = document.querySelectorAll('.player-move');

                playerPick.forEach(function(item) {
                      item.addEventListener("click", function() {
                          playerMove(this.getAttribute('data-move'));
                      });
                });


        let gameState = 'notStarted';   //started // ended //notStarted


        const player = {
            name: '',
            score: 0,
            move: 0
            },
            computer = {
            score: 0,
            move: 0
        },
            game = {
              round: 0,
              rounds: 0,
              winner: ''
            },
            params = {
              progress: new Array()
            };



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
        break;
      case 'finishRound':
            pickElem.style.display = 'block';
            newGameElem.style.display = 'none';
            newRoundElement.style.display = 'block';
            newRoundButton.style.display = 'block';
            newRoundButton.innerHTML = 'Finish Round : '+(game.round - 1);
        break;
      case 'ended':
            newGameElem.style.display = 'block';
            newGameButton.innerHTML = 'Finish Game';
            newRoundButton.style.display = 'none';
            roundGame.innerHTML = checkRound();
            pickElem.style.display = 'none';
            resultsElem.style.display = 'none';
            output.innerHTML = '<p>Game over, please press the new game button!</p>';
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
    }

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
       if (player) {
           scoreZero();
           gameState = 'started';
           setGameElements();
         playerNameElem.innerHTML = player;
       }
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

    params.progress[(game.round)+'_playerPick'] = playerPick;
    params.progress[(game.round)+'_computerPick'] = computerPick;
    getProgressGame ();
    endGame();
    setGamePoints();
    setGameElements();

  };

  function random() {
      return Math.floor(Math.random() * 3);
  };

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


  function endGame() {

    if(game.rounds == 1) {
      oneRound();

    }


      if (player.score === 10 ) {
        game.round++;
        playerChoose.innerHTML = game.rounds;

        if (game.round < game.rounds ) {
          roundGame.innerHTML = game.round;
        }

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
         playerResultElem.innerText = playerWinsText;
         modalWindow(game.win);
         gameState = 'finishRound';
         getProgressGame();
         scoreZero();

      } else if (playerGame !== 'player' && game.rounds > round || round === game.rounds && game.rounds > 1 ) {
          game.win = "Computer wins the round!";
          modalWindow(game.win);
          computerResultElem.innerText = computerWinsText;
          gameState = 'finishRound';
          getProgressGame();
          scoreZero();
      }
  }

  let closeButtons = document.querySelectorAll('.modal .close');

    for(var i = 0; i < closeButtons.length; i++) {
      closeButtons[i].addEventListener('click', hideModal);
    }

  function finishEnd(round) {

    if (player.score === 10 && round > game.rounds && game.rounds >= 2 ) {
          gameState = 'ended';
          modalWindow(player.name.toLocaleUpperCase() +' Win in one round!!');
          playerChoose.innerHTML = game.rounds;
          roundGame.innerHTML = round;
          getProgressGame();
          scoreZero();
          getEndInfo();
      } else if (computer.score === 10 && round > game.rounds && game.rounds >= 2 ) {
          gameState = 'ended';
          modalWindow('Computer Win in one round !!');
          roundGame.innerHTML = round;
          getProgressGame();
          scoreZero();
          getEndInfo();
      }
    }


    function oneRound() {

      if (player.score === 10 && game.rounds === 1 && game.round === game.rounds ) {
          gameState = 'ended';
          game.win = player.name.toLocaleUpperCase() +' Win this one round!!';
          getProgressGame ();
          scoreZero();
          getEndInfo();
          game.round = 1;
      } else if (computer.score === 10 && game.rounds === 1 && game.round === game.rounds) {
          gameState = 'ended';
          game.win = 'Computer Win this one round !!';
          getProgressGame ();
          scoreZero();
          getEndInfo();
          game.round = 1;
      }
  }


  function getProgressGame () {

      if (game.rounds > 1 ) {
      params.progress[(game.round - 1) + '_player' ]  = player.score;
      params.progress[(game.round - 1) +'_computer' ]  = computer.score;
    }else {
      params.progress[(game.round) + '_player' ]  = player.score;
      params.progress[(game.round) +'_computer' ]  = computer.score;
    }
      params.progress['round_user'] = game.rounds;



     if (gameState === 'ended') {
         modalWindowTwo(game.win);
     }
    }


  function modalWindowTwo(header) {
    let modal = document.querySelector('#modal-overlay');
    modal.classList.add('show');
    modal.querySelector('#modal-two').classList.add('show');
    modal.querySelector('#modal-two header').innerHTML = header;
    const table = modal.querySelector('#modal-two table');
    const thead = table.querySelector('thead tr');
    const  tbody  = table.querySelector('tbody td');
    const td = new Array();
    let playerPick = new Array();

    const count = params.progress['round_user'];
    for (let i = 0; i < count; i++) {
      let tr = getItem('tr');
      appendBox(tr);
      getId(tr, 'index' + i);
      for(let j =0; j < thead.childElementCount; j++ ) {
        td[i] = getItem('td');
         document.getElementById('index' + i).appendChild(td[i]);
         if (j === i) {
           playerPick[i] = params.progress[i+1+'_playerPick'];
           td[0].innerHTML = (i + 1);
           let txt = document.createTextNode('IE8');
           td[1].appendChild(txt);



          // col[1].innerHTML = (i + 1);
           //col[2].innerHTML = params[i + 1+'_computerPick'];
         }

      }

    }
   }

  function getItem (dataBox) {
  let item = document.createElement(dataBox);
  return item;
  }

  function appendBox (box) {
    document.querySelector("table tbody").appendChild(box);
  }

  function getId(mainItem,id) {
    if (id !== null && typeof(id) !== undefined ) {
      mainItem.id = id;
    }
  }

  function modalWindow (header) {
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
    return computer.score = player.score = 0;
  }

  function getEndInfo(){
      playerResultElem.innerHTML = 'Player Score';
      computerResultElem.innerHTML = 'Computer Score';
      playerPickElem.innerHTML = 'Player Selection';
      computerPickElem.innerHTML = 'Computer Selection';
  }



