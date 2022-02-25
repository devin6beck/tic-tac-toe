
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
          box.textContent = "X"
        } else {
          box.textContent = "O"
        }
      }
    });

    box.addEventListener('mouseout', (e) => {
      if (board[e.target.id] === null) {
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
      boxClicked.textContent = player1.mark;
      board[boxClicked.id] = player1;
      inquireGameOver(player1, p1Score)
      if (!playHuman && playEasy && !gameOver) {
        player2.turn = true;
        computerPlay();
        inquireGameOver(player2, p2Score)
      } 
    } else if (playHuman && !playEasy){
      boxClicked.textContent = player2.mark;
      board[boxClicked.id] = player2;
      inquireGameOver(player2, p2Score)
    } 
    player2.turn = (player2.turn) ? false: true;


  }

  function inquireGameOver(player, score) {
    if (winnerCheck(player)) {
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

  function randomInt() { //random int between 0 an 9
    return Math.floor(Math.random() * 10)
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

})





