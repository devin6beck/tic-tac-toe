
class Player {
  constructor(mark, name) {
    this.mark =  mark;
    this.name = name;
    this.turn = false;
    this.wins = 0;
    this.winningMessage = `${name} Wins!`
    this.score = 0;
  }
}

const screenWelcome = (() => {
  const btnStart = document.querySelector('.btn-start');
  const btnEasyComp = document.querySelector('.easy');
  const btnHardComp = document.querySelector('.hard');
  const screenStart = document.querySelector('.screen-start');
  const p1NameField = document.querySelector(".name-player-one");
  const p2NameField = document.querySelector(".name-player-two");
  const p2NameInput = document.querySelector('.player2')

  let playHuman = true;
  let playEasy = false;

  btnEasyComp.addEventListener('click', () => {
    playHuman = false;
    playEasy = true;
    p2NameField.textContent = "Computer"
    p2NameInput.value = "Computer"
  })


  btnHardComp.addEventListener('click', () => {
    playHuman = false;
    playEasy = false;
    p2NameField.textContent = "Computer"
    p2NameInput.value = "Computer"
  })

  btnStart.addEventListener('click', () =>{
    start(playHuman, playEasy)
  });

  function start(playHuman, playEasy) {
    let p1Name;
    let p2Name;
  
    if (document.querySelector('.player1').value.length === 0) {
      p1Name = "Player One"
    } else {
      p1Name = document.querySelector('.player1').value
    }
    if (document.querySelector('.player2').value.length === 0) {
      p2Name = "Player Two"
    } else {
      p2Name = document.querySelector('.player2').value
    }
  
    p1NameField.textContent = p1Name;
    p2NameField.textContent = p2Name;
    const player1 = new Player('X', p1Name);
    const player2 = new Player('O', p2Name);
    screenStart.style.display = "none";
    
    gameBoard(player1, player2, playHuman, playEasy);
  }

  document.addEventListener("keyup", function(e) {
    if (e.key === "Enter") {
      if (screenStart.style.display !== "flex") {
        e.preventDefault();
        btnStart.click();
      }
    }
  })
})()

const gameBoard = ((player1, player2, playHuman, playEasy) => {
  const box = document.querySelectorAll('.box');
  const btnClearBoard = document.querySelector('.btn-clear-board');
  const screenGameOver = document.querySelector('.screen-gameOver');
  const msgContainer = document.querySelector('.msg-container');
  const btnNewGame = document.querySelector('.btn-restart');

  let p1Score = document.querySelector('.p1-score');
  let p2Score = document.querySelector('.p2-score');
  let board = makeBoard();
  let gameOver = false;


  btnNewGame.addEventListener('click', () => {
    clearBoard();
    screenGameOver.style.display = "none";
  })

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
    box.addEventListener('click', drawMark, {once: true});
  })

  btnClearBoard.addEventListener('click', clearBoard);

  function clearBoard() {
    player2.turn = false;
    gameOver = false;
    board = makeBoard();
    box.forEach(box => {
      box.addEventListener('click', drawMark, {once: true});
      box.textContent = "";
    })
  }

  function drawMark(e) {
    let boxClicked = e.target;
    if (gameOver) {
      return;
    }
    if (!player2.turn && !gameOver) {
      if (boxClicked.textContent === player1.mark && boxClicked.textContent !== player2.mark) {
        boxClicked.textContent = player1.mark;
        board[boxClicked.id] = player1.mark;

        inquireGameOver(player1, p1Score)

        if (!playHuman && playEasy && !gameOver) {
          player2.turn = true;
          computerPlay();
          inquireGameOver(player2, p2Score)
        } 

        if (!playHuman && !playEasy && !gameOver) {
          player2.turn = true;
          const bestMove = hardAi()
          board[bestMove] = player2.mark;
          document.getElementById(`${bestMove}`).textContent = player2.mark;
          inquireGameOver(player2, p2Score)
        }
        player2.turn = (player2.turn) ? false: true;
      }
      
    } else if (playHuman && !playEasy){
      boxClicked.textContent = player2.mark;
      board[boxClicked.id] = player2.mark;
      inquireGameOver(player2, p2Score)
      player2.turn = (player2.turn) ? false: true;
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

  function computerPlay() {

    between0And9 = randomInt();
    if (board[between0And9] === null) {
      document.getElementById(`${between0And9}`).textContent = player2.mark;
      board[between0And9] = player2;
    } else {
      computerPlay();
    }
  }

  function randomInt() { 
    return Math.floor(Math.random() * 10) //random int between 0 an 9
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
    ) {
      return true;
    } else {
      return false;
    }       
  }

  function hardAi() {
    return (minimax(board, player2).index)
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





