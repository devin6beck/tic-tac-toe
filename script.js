
class Player {
  constructor(mark, name) {
    this.mark =  mark;
    this.name = name;
    this.turn = false;
    this.wins = 0;
    this.winningMessage = `${name} Wins!`
  }
}
const btnStart = document.querySelector('.btn-start');
const btnEasyComp = document.querySelector('.easy');

let p2NameField = document.querySelector(".name-player-two");
let p2NameInput = document.querySelector('.player2')

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
  // put names in name fields
  let p1Name;
  let p2Name;
  const p1NameField = document.querySelector(".name-player-one");
  const p2NameField = document.querySelector(".name-player-two");
  const screenStart = document.querySelector('.screen-start');

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
  console.log("pressed start")

  

  // set booleans for playHuman and playEasy
  // if play human is true then playEasy should be false
  // if playEasy is true then playHuman should be false
  // if Hard Computer button is pressed then playEasy and playHuamn should be false


  // start the gameBoard with parameters of (playHuman, playEasy, p1Name, p2Name)
  gameBoard(player1, player2, playHuman, playEasy);
}





function gameBoard(player1, player2, playHuman, playEasy) {
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
      if (winnerCheck(player1)) {
        msgContainer.textContent = player1.winningMessage;
        p1Score.textContent++;
        gameOver = true;
        screenGameOver.style.display = "flex";
      } else if (tieCheck()) {
        msgContainer.textContent = "It's A Tie!";
        gameOver = true;
        screenGameOver.style.display = "flex";
      }
      if (!playHuman && playEasy && !gameOver) {
        player2.turn = true;
        computerPlay();
        if (winnerCheck(player2)) {
          msgContainer.textContent = player2.winningMessage;
          p2Score.textContent++;
          gameOver = true;
          screenGameOver.style.display = "flex";
        } else if (tieCheck()) {
          msgContainer.textContent = "It's A Tie!";
          gameOver = true;
          screenGameOver.style.display = "flex";
        }
        
      } 
    } else if (playHuman && !playEasy){
      boxClicked.textContent = player2.mark;
      board[boxClicked.id] = player2;
      if (winnerCheck(player2)) {
        msgContainer.textContent = player2.winningMessage;
        p2Score.textContent++;
        gameOver = true;
        screenGameOver.style.display = "flex";
      } else if (tieCheck()) {
        msgContainer.textContent = "It's A Tie!";
        gameOver = true;
        screenGameOver.style.display = "flex";
      }
    } 
    player2.turn = (player2.turn) ? false: true;


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

}

// const gameBoard = (() => {
//   const btnNewGame = document.querySelector('.btn-restart');
//   const box = document.querySelectorAll('.box');
//   const btnClearBoard = document.querySelector('.btnClearBoard');
//   const screenGameOver = document.querySelector('.screen-gameOver');
//   const msgContainer = document.querySelector('.msg-container');
//   const screenStart = document.querySelector('.screen-start');
//   const btnStart = document.querySelector('.btn-start');
//   const p1NameField = document.querySelector(".name-player-one");
//   const p2NameField = document.querySelector(".name-player-two");


//   let p1Score = document.querySelector('.p1Score');
//   let p2Score = document.querySelector('.p2Score');
//   let board = makeBoard();
//   let gameOver = false;
//   let player1;
//   let player2;

//   btnStart.addEventListener('click', () => {
//     let p1Name;
//     let p2Name;
//     if (document.querySelector('.player1').value.length === 0) {
//       p1Name = "Player One"
//     } else {
//       p1Name = document.querySelector('.player1').value
//     }
//     if (document.querySelector('.player2').value.length === 0) {
//       p2Name = "Player Two"
//     } else {
//       p2Name = document.querySelector('.player2').value
//     }
//     p1NameField.textContent = p1Name;
//     p2NameField.textContent = p2Name;
//     player1 = new Player('X', p1Name);
//     player2 = new Player('O', p2Name);
//     screenStart.style.display = "none";
//     console.log("pressed start")
//   })

//   btnNewGame.addEventListener('click', () => {
//     clearBoard();
//     screenGameOver.style.display = "none";
//   })
  
//   box.forEach(box => {
    
//     box.addEventListener('mouseover', () => {
//       if (box.textContent.length === 0) {
//         if (!player2.turn) {
//           box.textContent = "X"
//         } else {
//           box.textContent = "O"
//         }
//       }
//     });

//     box.addEventListener('mouseout', (e) => {
//       if (board[e.target.id] === null) {
//         box.textContent = ""
//       }
//     });
//     box.addEventListener('click', drawMark, {once: true});
//   })
  
//   btnClearBoard.addEventListener('click', clearBoard);
  
//   function clearBoard() {
//     player2.turn = false;
//     gameOver = false;
//     board = makeBoard();
//     box.forEach(box => {
//       box.addEventListener('click', drawMark, {once: true});
//       box.textContent = "";
//     })
//   }
  
//   function drawMark(e) {
//     let boxClicked = e.target;
//     if (gameOver) {
//       return;
//     }
//     if (!player2.turn) {
//       boxClicked.textContent = player1.mark;
//       board[boxClicked.id] = player1;
//     } else {
//       boxClicked.textContent = player2.mark;
//       board[boxClicked.id] = player2;
//     }
//     player2.turn = (player2.turn) ? false: true;
//     console.log(`board = ${board}`)
//     if (winnerCheck(player1)) {
//       msgContainer.textContent = player1.winningMessage;
//       p1Score.textContent++;
//       gameOver = true;
//       screenGameOver.style.display = "flex";
//     } else if (winnerCheck(player2)) {
//       msgContainer.textContent = player2.winningMessage;
//       p2Score.textContent++;
//       gameOver = true;
//       screenGameOver.style.display = "flex";
//     } else if (tieCheck()) {
//       msgContainer.textContent = "It's A Tie!";
//       gameOver = true;
//       screenGameOver.style.display = "flex";
//     }
//   }
  
//   function tieCheck() {
//     return !board.includes(null)
//   }
  
//   function makeBoard() {
//     console.log("~New Board~")
//     return [null, null, null,
//       null, null, null,
//       null, null, null];
//   }
  
//   function winnerCheck(player) {
    
//     if (board[0] === player && board[1] === player && board[2] === player){
//       return true;
//     } else if (board[3] === player && board[4] === player && board[5] === player){
//       return true;
//     } else if (board[6] === player && board[7] === player && board[8] === player){
//       return true;
//     } else if (board[0] === player && board[3] === player && board[6] === player){
//       return true;
//     } else if (board[1] === player && board[4] === player && board[7] === player){
//       return true;
//     } else if (board[2] === player && board[5] === player && board[8] === player){
//       return true;
//     } else if (board[0] === player && board[4] === player && board[8] === player){
//       return true;
//     } else if (board[2] === player && board[4] === player && board[6] === player){
//       return true;
//     }
//   }

//   document.addEventListener("keyup", function(e) {
//     if (e.key === "Enter") {
//       if (document.querySelector(".screen-start").style.display !== "flex") {
//         e.preventDefault();
//         btnStart.click();
//       }
//     }
//   })
// })()




