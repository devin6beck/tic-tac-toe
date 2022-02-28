
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
        console.log(`board[boxClicked.id] = ${board[boxClicked.id]}`)
        inquireGameOver(player1, p1Score)

        if (!playHuman && playEasy && !gameOver) {
          player2.turn = true;
          computerPlay();
          inquireGameOver(player2, p2Score)
        } 

        if (!playHuman && !playEasy && !gameOver) {
          player2.turn = true;
          console.log("playing hard computer");
          hardAi();
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

  function randomInt() { 
    return Math.floor(Math.random() * 10) //random int between 0 an 9
  }

  function tieCheck() {
    let num = 0;
    for (let i = 0; i < 8; i++) {
      if (board[i] === player1.mark || board[i] === player2.mark) {
        num++;
      }
    }
    return (num === 8);
  } 
  
  function makeBoard() {
    console.log("~New Board~")
    return [0, 1, 2,
            3, 4, 5,
            6, 7, 8];
  }

  function winnerCheck(player) {
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

  function hardAi() {
    console.log("in hard ai fucntion")
  }

})





