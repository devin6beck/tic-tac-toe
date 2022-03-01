
class Player {
  constructor(mark, name) {
    this.mark =  mark;
    this.name = name;
    this.turn = false;
    // this.wins = 0;
    this.winningMessage = `${name} Wins!`
    this.score = 0;
  }
}

const screenWelcome = (() => {
  const btnStart = document.querySelector('.btn-start');
  const btnEasyComp = document.getElementById('cpu-easy-player1');
  const btnHardComp = document.querySelector('.hard');
  const screenStart = document.querySelector('.screen-start');
  const p1NameField = document.querySelector(".name-player-one");
  const p2NameField = document.querySelector(".name-player-two");
  const p1NameInput = document.querySelector('.input-player1')
  const p2NameInput = document.querySelector('.input-player2')

  let controller1 = 'human'
  let controller2 = 'human'

  let inputs=document.querySelectorAll("input[type=radio]");
    x=inputs.length;
    while(x--)
    inputs[x].addEventListener("change",function(){
      if (this.name === 'player1') {
        if(this.value !== 'human') {
          p1NameField.textContent = this.value;
          p1NameInput.value = this.value;
          controller1 = this.value
        } else {
          p1NameField.textContent = "";
          p1NameInput.value = "";
          controller1 = 'human';
        }
      }
      if (this.name === 'player2') {
        if(this.value !== 'human') {
          p2NameField.textContent = this.value;
          p2NameInput.value = this.value;
          controller2 = this.value;  
        } else {
          p2NameField.textContent = "";
          p2NameInput.value = "";
          controller2 = 'human';
        }
      }
    },0);

  btnStart.addEventListener('click', () =>{
    start(controller1, controller2)
  });



  function start(controller1, controller2) {
    const p1Name = setP1Name();
    const p2Name = setP2Name();
    
    p1NameField.textContent = p1Name;
    p2NameField.textContent = p2Name;
    const player1 = new Player('X', p1Name);
    const player2 = new Player('O', p2Name);
    screenStart.style.display = "none";
    gameBoard(player1, player2, controller1, controller2);
  }

  document.addEventListener("keyup", function(e) {
    if (e.key === "Enter") {
      if (screenStart.style.display !== "flex") {
        e.preventDefault();
        btnStart.click();
      }
    }
  })

  function setP1Name() {
    radioChecked = document.querySelector(`input[name="player1"]:checked`).value;
    if (radioChecked === "human") {
      if (document.querySelector('.input-player1').value.length === 0) {
        return "Player One"
      } else {
        return document.querySelector('.input-player1').value
      }
    } else {
      return radioChecked
    }
  }

  function setP2Name() {
    radioChecked = document.querySelector(`input[name="player2"]:checked`).value;
    if (radioChecked === "human") {
      if (document.querySelector('.input-player2').value.length === 0) {
        return "Player Two"
      } else {
        return document.querySelector('.input-player2').value
      }
    } else {
      return radioChecked
    }
  }

  
})()

const gameBoard = ((player1, player2, controller1, controller2) => {
  const box = document.querySelectorAll('.box');
  const btnClearBoard = document.querySelector('.btn-clear-board');
  const screenGameOver = document.querySelector('.screen-gameover');
  const msgContainer = document.querySelector('.msg-container');
  const btnNewGame = document.querySelector('.btn-restart');
  const btnBack = document.querySelector('.btn-back');

  let p1Score = document.querySelector('.p1-score');
  let p2Score = document.querySelector('.p2-score');
  let board = makeBoard();
  let gameOver = false;

  newGame();

  function newGame() {
    if (controller1 !== 'human' && controller2 !== 'human') {
      btnClearBoard.disabled = true;
      btnClearBoard.style = 'cursor: not-allowed'
    }
    if (!gameOver) {
      if (controller1 !== 'human') {
        if (controller1 === 'CPU(easy)' && !player2.turn) {
          setTimeout(dealyedEasyAi, 1000) 
        }

        if (controller1 === 'CPU(medium)' && !player2.turn) {
          setTimeout(dealyedMediumAi, 1000) 
        }

        if (controller1 === 'CPU(hard)' && !player2.turn) {
          setTimeout(dealyedHardAi, 1000) 
        }

        if (controller1 === 'CPU(impossible)' && !player2.turn) {
          setTimeout(dealyedImpossibleAi, 1000)
        }
        
        if (controller2 !== 'human' && !gameOver && player2.turn) {
          
          if (controller2 === 'CPU(easy)') {
            setTimeout(dealyedEasyAi2, 1000) 
          }
    
          if (controller2 === 'CPU(medium)') {
            setTimeout(dealyedMediumAi2, 1000) 
          }
    
          if (controller2 === 'CPU(hard)') {
            setTimeout(dealyedHardAi2, 1000) 
          }
    
          if (controller2 === 'CPU(impossible)') {
            setTimeout(dealyedImpossibleAi2, 1000) 
          }
        }
      }
    }

  }

  function dealyedEasyAi2() {
    if (!gameOver) {
      cpuEasyAi(player2)
      inquireGameOver(player2, p2Score)
      player2.turn = false;
      if (controller1 !== 'human' && controller2 !== 'human') {
        newGame()
      }
    }
  }

  function dealyedMediumAi2() {
    cpuMediumAi(player2)
    inquireGameOver(player2, p2Score)
    player2.turn = false;
    if (controller1 !== 'human' && controller2 !== 'human') {
      newGame()
    }
  }

  function dealyedHardAi2() {
    cpuHardAi(player2)
    inquireGameOver(player2, p2Score)
    player2.turn = false;
    if (controller1 !== 'human' && controller2 !== 'human') {
      newGame()
    }
  }

  function dealyedImpossibleAi2() {
    cpuImpossibleAi(player2)
    inquireGameOver(player2, p2Score)
    player2.turn = false;
    if (controller1 !== 'human' && controller2 !== 'human') {
      newGame()
    }
  }

  function dealyedEasyAi() {
    if (!gameOver) {
      cpuEasyAi(player1)
      inquireGameOver(player1, p1Score)
      player2.turn = true;
      if (controller1 !== 'human' && controller2 !== 'human') {
        newGame()
      }
    }
  }

  function dealyedMediumAi() {
    cpuMediumAi(player1)
    inquireGameOver(player1, p1Score)
    player2.turn = true;
    if (controller1 !== 'human' && controller2 !== 'human') {
      newGame()
    }
  }

  function dealyedHardAi() {
    cpuHardAi(player1)
    inquireGameOver(player1, p1Score)
    player2.turn = true;
    if (controller1 !== 'human' && controller2 !== 'human') {
      newGame()
    }
  }

  function dealyedImpossibleAi() {
    cpuImpossibleAi(player1)
    inquireGameOver(player1, p1Score)
    player2.turn = true;
    if (controller1 !== 'human' && controller2 !== 'human') {
      newGame()
    }
  }

  btnNewGame.addEventListener('click', () => {
    clearBoard();
    screenGameOver.style.display = "none";
  })

  if (controller1 === 'human' || controller2 === 'human') {
    box.forEach(box => {
      box.addEventListener('mouseover', () => {
        if (box.textContent.length === 0) {
          if (!player2.turn) {
            box.textContent = player1.mark
          } else {
            box.textContent = player2.mark
          }
        }
      });

      box.addEventListener('mouseout', (e) => {
        if (board[e.target.id] !== player1.mark && board[e.target.id] !== player2.mark) {
          box.textContent = ""
        }
      });
      box.addEventListener('click', drawMark);
    })
  }

  btnClearBoard.addEventListener('click', clearBoard);
  
  btnBack.addEventListener('click', () => {
    window.location.reload()
  })

  function clearBoard() {
    player2.turn = false;
    gameOver = false;
    board = makeBoard();
    box.forEach(box => {
      box.addEventListener('click', drawMark);
      box.textContent = "";
    })
    newGame()
  }

  function drawMark(e) {
    let boxClicked = e.target;
    if (gameOver) {
      return;
    }
  
    if (!player2.turn) {
      if(controller1 === 'human') {
        if (boxClicked.textContent === player1.mark && boxClicked.textContent !== player2.mark) {
        boxClicked.textContent = player1.mark;
        board[boxClicked.id] = player1.mark;
        inquireGameOver(player1, p1Score)
        player2.turn = true;

        if (controller2 === 'CPU(easy)' && !gameOver && player2.turn) {
          setTimeout(dealyedEasyAi2, 1000)
        }
        if (controller2 === 'CPU(medium)' && !gameOver && player2.turn) {
          setTimeout(dealyedMediumAi2, 1000)
        }

        if (controller2 === 'CPU(hard)' && !gameOver && player2.turn) {
          setTimeout(dealyedHardAi2, 1000)
        }

        if (controller2 === 'CPU(impossible)' && !gameOver && player2.turn) {
          setTimeout(dealyedImpossibleAi2, 1000)
        }

        } 
      }

    } 

    if (player2.turn) {
      if(controller2 === 'human' && controller1 === 'human') {
        if (boxClicked.textContent === player2.mark && boxClicked.textContent !== player1.mark) {
        boxClicked.textContent = player2.mark;
        board[boxClicked.id] = player2.mark;
        inquireGameOver(player2, p2Score)
        player2.turn = false;
        } 
      }
      
      if (controller2 === 'human' && controller1 !=='human') {
        if (boxClicked.textContent === player2.mark && boxClicked.textContent !== player1.mark) {
          boxClicked.textContent = player2.mark;
          board[boxClicked.id] = player2.mark;
          inquireGameOver(player2, p2Score)
          player2.turn = false;

          if (controller1 === 'CPU(easy)' && !player2.turn && !gameOver) {
            setTimeout(dealyedEasyAi, 1000) 
          }

          if (controller1 === 'CPU(medium)' && !player2.turn && !gameOver) {
            setTimeout(dealyedMediumAi, 1000) 
          }

          if (controller1 === 'CPU(hard)' && !player2.turn && !gameOver) {
            setTimeout(dealyedHardAi, 1000) 
          }

          if (controller1 === 'CPU(impossible)' && !player2.turn && !gameOver) {
            setTimeout(dealyedImpossibleAi, 1000) 
          }

        }

      }
    }
  }


  function inquireGameOver(player, score) {
    if (winnerCheck(board, player)) {
      msgContainer.textContent = player.winningMessage;
      score.textContent++;
      gameOver = true;
      screenGameOver.style.display = "flex";
      return;
    }
    if (tieCheck()) {
      msgContainer.textContent = "It's A Tie!";
      gameOver = true;
      screenGameOver.style.display = "flex";
    }
  }

  function randomInteger() {
    return Math.random() * (9) + 1;
  }

  // Returns random integer from 0 up to not including 9
  function randomZeroThroughEight() { 
    return Math.floor(Math.random() * 9); 
  }

  function tieCheck() {
    return (emptyIndexies(board).length === 0)
  } 
 
  function makeBoard() {
    return [0, 1, 2,
            3, 4, 5,
            6, 7, 8];
  }

  function winnerCheck(board, player) {
    if (
      (board[0] === player.mark && board[1] === player.mark && board[2] === player.mark) ||
      (board[3] === player.mark && board[4] === player.mark && board[5] === player.mark) || 
      (board[6] === player.mark && board[7] === player.mark && board[8] === player.mark) || 
      (board[0] === player.mark && board[3] === player.mark && board[6] === player.mark) || 
      (board[1] === player.mark && board[4] === player.mark && board[7] === player.mark) ||  
      (board[2] === player.mark && board[5] === player.mark && board[8] === player.mark) || 
      (board[0] === player.mark && board[4] === player.mark && board[8] === player.mark) ||   
      (board[2] === player.mark && board[4] === player.mark && board[6] === player.mark)
    ) return true;
     
  }
  function cpuEasyAi(player) {
    
    randomNum = randomZeroThroughEight();
    if (board[randomNum] instanceof String || typeof(board[randomNum]) === "string" && !gameOver) {
      cpuEasyAi(player);
    } else {
      if (!gameOver) {
        document.getElementById(`${randomNum}`).textContent = player.mark;
        board[randomNum] = player.mark;
      }
    }
  }

  function cpuMediumAi(player) {
    const randomNum = randomInteger();
    if (randomNum <= 5) {
      cpuEasyAi(player);
    } else {
      cpuImpossibleAi(player)
    }
  }

  function cpuHardAi(player) {
    const randomNum = randomInteger();
    if (randomNum <= 2) {
      cpuEasyAi(player);
    } else {
      cpuImpossibleAi(player)
    }
  }

  function cpuImpossibleAi(player) {
    let bestMove = (minimax(board, player).index)
    document.getElementById(bestMove).textContent = player.mark;
    board[bestMove] = player.mark;
  }

  function emptyIndexies(board){
    return  board.filter(s => s != player2.mark && s != player1.mark);
  } 

  function minimax(newBoard, player){
  
    //available spots
    var availSpots = emptyIndexies(newBoard);
  
    // checks for the terminal states such as win, lose, and tie and returning a value accordingly
    if (winnerCheck(newBoard, player1)){
       return {score:-10};
    }
    else if (winnerCheck(newBoard, player2)){
      return {score:10};
    }
    else if (availSpots.length === 0){
      return {score:0};
    }
  
  // an array to collect all the objects
    let moves = [];
  
    // loop through available spots
    for (var i = 0; i < availSpots.length; i++){
      //create an object for each and store the index of that spot that was stored as a number in the object's index key
      var move = {};
      move.index = newBoard[availSpots[i]];
  
      // set the empty spot to the current player
      newBoard[availSpots[i]] = player.mark;
  
      //if collect the score resulted from calling minimax on the opponent of the current player
      if (player == player2){
        var result = minimax(newBoard, player1);
        move.score = result.score;
      }
      else{
        var result = minimax(newBoard, player2);
        move.score = result.score;
      }
  
      //reset the spot to empty
      newBoard[availSpots[i]] = move.index;
  
      // push the object to the array
      moves.push(move);
    }
  
  // if it is the computer's turn loop over the moves and choose the move with the highest score
    var bestMove;
    if(player === player2){
      var bestScore = -10000;
      for(var i = 0; i < moves.length; i++){
        if(moves[i].score > bestScore){
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }else{
  
  // else loop over the moves and choose the move with the lowest score
      var bestScore = 10000;
      for(var i = 0; i < moves.length; i++){
        if(moves[i].score < bestScore){
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
  
  // return the chosen move (object) from the array to the higher depth
    return moves[bestMove];
  }
})
