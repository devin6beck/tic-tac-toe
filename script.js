/*
Script for a game of tic-tac-toe. Can play human vs human or human vs cpu.
The user may be X's or O's vs the computer.
The cpu has difficulty choices of easy, medium, hard, and impossible.
The easy cpu picks a random open box on the board to play it's mark.
The medium cpu plays the best move 50% of the time.
The hard cpu plays the best move 80% of the time.
The impossible cpu plays the best move 100% of the time. User can not win.
*/

class Player {
  constructor(mark, name) {
    this.mark =  mark;
    this.name = name;
    this.turn = false;
    this.winningMessage = `${mark}'s Win!`
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
  let totalNumberOfRadioBtns = radioHumanOrCpu.length;

  /*
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
  The radio buttons on the welcome/start screen are listening for change.
  If changed to a cpu option then the input field for the player name changes
  to 'CPU(#difficulty)' and the controller is set accordingly.
  If changed to the human option then the input field is cleared and the
  controller is set to 'human'.
  */
  
  while(totalNumberOfRadioBtns--) {
    radioHumanOrCpu[totalNumberOfRadioBtns].addEventListener("change",function() {
      // 'this' refers to the HTML input (radio button) being click by user.
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
  Allows the "Enter" key to start the game after keyup.
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
  const screenGameOver = document.querySelector('.screen-gameover');
  const spanWinMessage = document.querySelector('.winning-message');
  const spanWinnerName = document.querySelector('.winners-name');
  const btnClearBoard = document.querySelector('.btn-clear-board');
  const btnNewGame = document.querySelector('.btn-restart');
  const btnBack = document.querySelector('.btn-back');

  const p1Score = document.querySelector('.p1-score');
  const p2Score = document.querySelector('.p2-score');

  let board = makeBoard();
  let gameOver = false;

  btnClearBoard.addEventListener('click', clearBoard);
  
  btnBack.addEventListener('click', () => { window.location.reload() })

  btnNewGame.addEventListener('click', () => {
    clearBoard();
    screenGameOver.style.display = "none";
  })

  // Disable the btnClearBoard if it is cpu vs cpu. 
  if (controller1 !== 'human' && controller2 !== 'human') {
    btnClearBoard.disabled = true;
    btnClearBoard.style = 'cursor: not-allowed'
  }

  // Call cpuTurn() right away just in case the cpu's turn is first.
  cpuTurn();

  function cpuTurn() {
    if (!gameOver && controller1 !== 'human') {
      console.log(controller1)
      if (!player2.turn) {
        cpuPlay(controller1, player1, p1Score)
      }
      
      if (player2.turn) {
        cpuPlay(controller2, player2, p2Score)
      }
    }

  }

  /*
  If at least one of the players is human as they mouseover an empty box 
  it will display their mark if it is their turn. 
  */
  if (controller1 === 'human' || controller2 === 'human') {
    box.forEach(box => {
      box.addEventListener('mouseover', () => {
        if (box.textContent.length === 0) {
          if (!player2.turn && controller1 === 'human') {
            box.textContent = player1.mark
          } else if (player2.turn && controller2 === 'human') {
            box.textContent = player2.mark
          }
        }
      });
      box.addEventListener('mouseout', (e) => {
        if (board[e.target.id] !== player1.mark && board[e.target.id] !== player2.mark) {
          box.textContent = ""
        }
      });
      // When a player clicks a box the drawMark function is called.
      box.addEventListener('click', drawMark);
    })
  }

  /*
  Sets the const gameBoard back to initial state, removes marks from board,
  and calls cpuTurn().
  */
  function clearBoard() {
    player2.turn = false;
    gameOver = false;
    board = makeBoard();
    box.forEach(box => {
      box.addEventListener('click', drawMark);
      box.textContent = "";
    })
    cpuTurn()
  }

  function drawMark(e) {
    let boxClicked = e.target; 
    if (!player2.turn) {
      humanPlay(player1, player2, p1Score, boxClicked, controller1)
    } 
    if (player2.turn) {
      humanPlay(player2, player1, p2Score, boxClicked, controller2)
    }
  }

  /*
  Plays the players's mark on the box the user clicks.
  It also checks if the game is over and changes turn.
  Lastly if it is human vs cpu and not game over then cpuPlay() is called 
  */
  function humanPlay(player, opponent, score, boxClicked, controller) {
    if (controller !== 'human') return; 
    if (boxClicked.textContent === player.mark && boxClicked.textContent !== opponent.mark) {
      boxClicked.textContent = player.mark;
      board[boxClicked.id] = player.mark;
      inquireGameOver(player, score);
      player2.turn = (player2.turn === true) ? false : true;
      if (!gameOver) {
        if (controller2 !== 'human') {
          cpuPlay(controller2, player2, p2Score);
          return;
        }
        if (controller1 !== 'human') {
          cpuPlay(controller1, player1, p1Score);
        }
      }
    }
  }

  // Delays for 1 second and then plays for the cpu.
  function cpuPlay(controller, player, score) {
    setTimeout( () => {
      delayedAiHandler(controller, player, score);
    }, 1000)
  }

  /*
  Plays for the cpu according to the cpu's difficulty, then checks for
  game over, and changes player2's turn. If it is a cpu vs cpu game it lastly
  plays the next turn by calling cpuTurn().
  */
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
      cpuTurn();
    }
  }

  // Easy Ai plays a random move as long as the box is available to play on.
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

  // Medium Ai plays the best move 50% of the time
  function cpuMediumAi(player) {
    const randomNum = randomZeroThroughEight();
    if (randomNum <= 4) {
      cpuEasyAi(player);
    } else {
      cpuImpossibleAi(player)
    }
  }

  // Hard Ai plays the best move 80% of the time
  function cpuHardAi(player) {
    const randomNum = randomZeroThroughEight();
    if (randomNum <= 1) {
      cpuEasyAi(player);
    } else {
      cpuImpossibleAi(player)
    }
  }

  // Impossible Ai plays the best move 100% of the time. Unbeatable 
  function cpuImpossibleAi(player) {
    let bestMove = (minimax(board, player).index)
    document.getElementById(bestMove).textContent = player.mark;
    board[bestMove] = player.mark;
  }

  // Returns random integer from 0 up to not including 9
  function randomZeroThroughEight() { 
    return Math.floor(Math.random() * 9); 
  }

  function makeBoard() {
    return [0, 1, 2,
            3, 4, 5,
            6, 7, 8];
  }

  // Returns true if there is a winner or the game is a tie.
  function inquireGameOver(player, score) {
    if (winnerCheck(board, player)) {
      spanWinnerName.textContent = `${player.name}`;
      spanWinMessage.textContent = `${player.mark}'s Win!`;
      score.textContent++;
      gameOver = true;
      screenGameOver.style.display = 'flex';
      return;
    }
    if (tieCheck()) {
      msgContainer.textContent = "It's A Tie!";
      gameOver = true;
      screenGameOver.style.display = "flex";
    }
  }

  // Returns the amount of empty boxes left on the board.
  function emptyIndexies(board){
    return  board.filter(s => s != player2.mark && s != player1.mark);
  }

  // Returns true if every box on the board is marked. 
  function tieCheck() {
    return (emptyIndexies(board).length === 0);
  } 

  // Returns true if a players mark ('X' or 'O') is 3 in a row on the board.
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

  // Determins the best available move using recursion. 
  function minimax(newBoard, player){
  
    //available spots
    const availSpots = emptyIndexies(newBoard);
  
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
    for (let i = 0; i < availSpots.length; i++){
      //create an object for each and store the index of that spot that was stored as a number in the object's index key
      const move = {};
      move.index = newBoard[availSpots[i]];
  
      // set the empty spot to the current player
      newBoard[availSpots[i]] = player.mark;
  
      //if collect the score resulted from calling minimax on the opponent of the current player
      if (player == player2){
        const result = minimax(newBoard, player1);
        move.score = result.score;
      }
      else{
        const result = minimax(newBoard, player2);
        move.score = result.score;
      }
  
      //reset the spot to empty
      newBoard[availSpots[i]] = move.index;
  
      // push the object to the array
      moves.push(move);
    }
  
  // if cpu's turn loop over the moves and choose the move with the highest score
    let bestMove;
    if(player === player2){
      let bestScore = -10000;
      for(let i = 0; i < moves.length; i++){
        if(moves[i].score > bestScore){
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else { 
  // else loop over the moves and choose the move with the lowest score
      let bestScore = 10000;
      for(let i = 0; i < moves.length; i++){
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
