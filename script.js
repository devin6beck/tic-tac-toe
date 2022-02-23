
class Player {
  constructor(mark, name) {
    this.mark =  mark;
    this.name = name;
    this.turn = false;
    this.wins = 0;
    this.winningMessage = `${name} Wins!`
  }
}

const player1 = new Player('X', "Player One");
let p1Score = document.querySelector('.p1Score');
const player2 = new Player('O', "Player Two");
let p2Score = document.querySelector('.p2Score');
let board = makeBoard();
let gameOver = false;

const box = document.querySelectorAll('.box');
const btnClearBoard = document.querySelector('.btnClearBoard');

box.forEach(box => {
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
  if (!player2.turn) {
    boxClicked.textContent = player1.mark;
    board[boxClicked.id] = player1;
  } else {
    boxClicked.textContent = player2.mark;
    board[boxClicked.id] = player2;
  }
  player2.turn = (player2.turn) ? false: true;
  console.log(`board = ${board}`)
  if (winnerCheck(player1)) {
    setTimeout(() => {alert(player1.winningMessage); }, 1);
    p1Score.textContent++;
    gameOver = true;
  } else if (winnerCheck(player2)) {
    setTimeout(() => {alert(player2.winningMessage); }, 1);
    p2Score.textContent++;
    gameOver = true;
  } else if (tieCheck()) {
    setTimeout(() => {alert("It's A Tie!"); }, 1);
    gameOver = true;
  }
}

function tieCheck() {
  return !board.includes(null)
}

function makeBoard() {
  console.log("~New Board~")
  return [null, null, null,
    null, null, null,
    null, null, null];
}

function winnerCheck(player) {
  
  if (board[0] === player && board[1] === player && board[2] === player){
    return true;
  } else if (board[3] === player && board[4] === player && board[5] === player){
    return true;
  } else if (board[6] === player && board[7] === player && board[8] === player){
    return true;
  } else if (board[0] === player && board[3] === player && board[6] === player){
    return true;
  } else if (board[1] === player && board[4] === player && board[7] === player){
    return true;
  } else if (board[2] === player && board[5] === player && board[8] === player){
    return true;
  } else if (board[0] === player && board[4] === player && board[8] === player){
    return true;
  } else if (board[2] === player && board[4] === player && board[6] === player){
    return true;
  }
}
