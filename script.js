
class Player {
  constructor(mark, name) {
    this.mark =  mark;
    this.name = name;
    this.turn = false;
    this.winningMessage = `${name} Wins!`
  }
}

/*
When the page loads the const screenWelcome is called. A welcome/start screen
shows the user an input for player names, radio buttons for player options,
and a start button.
*/
const screenWelcome = (() => {
  const btnStart = document.querySelector('.btn-start');
  const radioHumanOrCpu = document.querySelectorAll("input[type=radio]");
  const screenStart = document.querySelector('.screen-start');
  const displayNameP1 = document.querySelector(".name-player-one");
  const displayNameP2 = document.querySelector(".name-player-two");
  const inputNameP1 = document.querySelector('.input-player1')
  const inputNameP2 = document.querySelector('.input-player2')

  /*
  Controller1 = 'X' = player1. Controller2 = 'O' = player2
  Controllers let the const gameBoard know if players are human or cpu.
  They are initiated as human but the radio buttons can change them.
  Options: 'human', 'cpu(easy)', 'cpu(medium)', 'cpu(hard)', & 'cpu(impossible)', 
  */
  let controller1 = 'human'
  let controller2 = 'human'

  /*
  When the start button is clicked the name displays are applied,
  the player1 & player2 are created from Class Player,
  the start screen is set to display none,
  and the const gameBoard is called.
  */
  btnStart.addEventListener('click', () =>{
    start(controller1, controller2)
  });

  function start(controller1, controller2) {
    const p1Name = setP1Name();
    const p2Name = setP2Name();
    const player1 = new Player('X', p1Name);
    const player2 = new Player('O', p2Name);
    displayNameP1.textContent = p1Name;
    displayNameP2.textContent = p2Name;
    screenStart.style.display = "none";
    gameBoard(player1, player2, controller1, controller2);
  }

  /*
  The radio button on the welcome/start screen are listening for change.
  If changed to a cpu option then the input field for the player name changes
  to 'CPU(#difficulty)' and the controller is set accordingly. .
  If changed to the human option then the imput field is cleared and the
  controller is set to 'human'
  */
  totalNumberOfRadioBtns = radioHumanOrCpu.length;
  while(totalNumberOfRadioBtns--) {

    radioHumanOrCpu[totalNumberOfRadioBtns].addEventListener("change",function() {

      if (this.name === 'player1') {
        if (this.value !== 'human') {
          inputNameP1.value = this.value;
          controller1 = this.value
        } else {   
          inputNameP1.value = "";
          controller1 = 'human';
        }
      }

      if (this.name === 'player2') {
        if (this.value !== 'human') {
          inputNameP2.value = this.value;
          controller2 = this.value;  
        } else {
          inputNameP2.value = "";
          controller2 = 'human';
        }
      }

    });
  }

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

  /*

  */
  document.addEventListener("keyup", function(e) {
    if (e.key === "Enter") {
      if (screenStart.style.display !== "flex") {
        e.preventDefault();
        btnStart.click();
      }
    }
  })

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

  if (controller1 !== 'human' && controller2 !== 'human') {
    btnClearBoard.disabled = true;
    btnClearBoard.style = 'cursor: not-allowed'
  }

  playTurn();

  function playTurn() {

    /* 
    This block of code is for when it is CPU vs CPU. The CPUs take turns
    and take 1 second to think each.

    */
    if (!gameOver) {
      if (controller1 !== 'human') {
        if (!player2.turn) {
          cpuPlay(controller1, player1, p1Score)
        }
        
        if (player2.turn) {
          cpuPlay(controller2, player2, p2Score)
        }
      }
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
    playTurn()
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

          if (player2.turn && !gameOver && controller2 != 'human') {
            cpuPlay(controller2, player2, p2Score)
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

          if (!player2.turn && !gameOver) {
            cpuPlay(controller1, player1, p1Score)
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

  function cpuPlay(controller, player, score) {
    setTimeout( () => {
      delayedAiHandler(controller, player, score)
    }, 1000)
  }

  function delayedAiHandler(controller, player, score) {
    switch (controller) {
      case 'CPU(easy)': cpuEasyAi(player); break;
      case 'CPU(medium)': cpuMediumAi(player); break;
      case 'CPU(hard)': cpuHardAi(player); break;
      case 'CPU(impossible)': cpuImpossibleAi(player);
    }
    inquireGameOver(player, score)
    player2.turn = (player2.turn === true) ? false : true;
    if (controller1 !== 'human' && controller2 !== 'human') {
      playTurn()
    }
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
