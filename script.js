
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

// function clearBoard() {
//   gameOver = true;
//   player2.turn = false;
//   game(player1, player2);
// }
// game(player1, player2);

// function game(player1, player2) {
//   console.log("playing a game...")
//   let board = makeBoard();
//   let gameOver = false;


//   box.forEach(box => {
//     box.addEventListener('click', boxClicked, {once: true});
//     box.textContent = "";
//   })

//   function boxClicked(e) {
//     const boxClicked = e.target;
//     if(!gameOver) {
//       drawMark(boxClicked);
//     }
//     if(winnerCheck(player1)) {
//       gameOver = true;
//       setTimeout(() => {alert(player1.winningMessage); }, 1);
//     } else if (winnerCheck(player2)) {
//       gameOver = true;
//       setTimeout(() => {alert(player2.winningMessage); }, 1);
//     }
//   }

//   function drawMark(boxClicked) {
//     if (!player2.turn) {
//       boxClicked.textContent = player1.mark;
//       player2.turn = true;
//       board[boxClicked.id] = player1;
//       return;
//     }
//     boxClicked.textContent = player2.mark;
//     player2.turn = false;
//     board[boxClicked.id] = player2;
//   }

//   function makeBoard() {
//     console.log("New board")
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

  
// }

// const gameBoard = (() => {
//   const player1 = new Player('X', "Player One");
//   const player2 = new Player('O', "Player Two");



//   game(player1, player2);

// })()

// const player1 = new Player();
// player1.wins++;
// player1.wins++;
// console.log(player1.wins)
// let p1Score = document.querySelector('.p1Score');
// let p2Score = document.querySelector('.p2Score');

// p1Score.textContent = player1.wins;

// const gameBoard = (() => {
  

//   const p1Score = document.querySelector('.p1Score');
//   const p2Score = document.querySelector('.p2Score');
//   const btnClear = document.querySelector('.btn-clear');

  
  
  // game();

  
  // function game() {
    
  //   const player1 = new Player("X", true);
  //   const player2 = new Player("O", false);
  //   let board = makeBoard();
  //   const box = document.querySelectorAll('.box');
  //   console.log(`board at start: ${board}`)
  //   btnClear.addEventListener('click', clearBoard);

  //   function clearBoard() {
  //     board = makeBoard();
  //     game();
  //   }

  //   box.forEach(box => {
  //     box.addEventListener('click', drawMark, { once: true});
  //     box.textContent = "";
  //   })

  //   function makeBoard() {
  //     return [null, null, null,
  //       null, null, null,
  //       null, null, null];
  //   }

  //   function drawMark(e) {
  //     const box = e.target;
  //     console.log(`board at drawMart: ${board}`)
  //     switch (player2.turn) {
  //       case false: box.textContent = player1.mark; 
  //       player2.turn = true;
  //       board[box.id] = player1;
  //       break;
  //       default: box.textContent = player2.mark;
  //       player2.turn = false;
  //       board[box.id] = player2;
  //     }
  //     if (!tieCheck()) {
  //       if (winnerCheck(player1)) {
  //         alertWinner(player1);
  //         p1Score.textContent++;
  //         return;
  //       } else if (winnerCheck(player2)) {
  //         alertWinner(player2);
  //         p2Score.textContent++;
  //         return;
          
  //       }
  //       console.log(board)
  //     } else {
  //       alert("Its a tie");
  //     }
  //   }

  //   function winnerCheck(player) {
  //     return winCombos(player);
  //   }

  //   function tieCheck() {
  //     console.log(`tie check board = ${board}`)
  //     return !board.includes(null)
  //   }

  //   function alertWinner(player) {
  //     alert(`${player.mark}'s Win!#!`);
  //     box.forEach(box => {
  //       box.removeEventListener('click', drawMark, { once: true})
  //     })
      
  //   }

  //   function winCombos(player) {
  //     if (board[0] === player && board[1] === player && board[2] === player){
  //       return `${player.mark}'s Win!`
  //     } else if (board[3] === player && board[4] === player && board[5] === player){
  //       return `${player.mark}'s Win!`
  //     } else if (board[6] === player && board[7] === player && board[8] === player){
  //       return `${player.mark}'s Win!`
  //     } else if (board[0] === player && board[3] === player && board[6] === player){
  //       return `${player.mark}'s Win!`
  //     } else if (board[1] === player && board[4] === player && board[7] === player){
  //       return `${player.mark}'s Win!`
  //     } else if (board[2] === player && board[5] === player && board[8] === player){
  //       return `${player.mark}'s Win!`
  //     } else if (board[0] === player && board[4] === player && board[8] === player){
  //       return `${player.mark}'s Win!`
  //     } else if (board[2] === player && board[4] === player && board[6] === player){
  //       return `${player.mark}'s Win!`
  //     }
  //   }

    // function winnerCheck(player) {
    //   if (board[0] === player && board[1] === player && board[2] === player){
    //     console.log(`${player.mark}'s Win!`)
    //   } else if (board[0] === player && board[4] === player && board[8] === player){
    //     console.log(`${player.mark}'s Win!`)
    //   } else if (board[0] === player && board[3] === player && board[6] === player){
    //     console.log(`${player.mark}'s Win!`)
    //   } else if (board[2] === player && board[5] === player && board[8] === player){
    //     console.log(`${player.mark}'s Win!`)
    //   } else if (board[3] === player && board[4] === player && board[5] === player){
    //     console.log(`${player.mark}'s Win!`)
    //   } else if (board[6] === player && board[7] === player && board[8] === player){
    //     console.log(`${player.mark}'s Win!`)
    //   } else if (board[2] === player && board[4] === player && board[6] === player){
    //     console.log(`${player.mark}'s Win!`)
    //   } else if (board[1] === player && board[4] === player && board[7] === player){
    //     console.log(`${player.mark}'s Win!`)
    //   }else {
    //     if(!board.includes(null)) {
    //       console.log("its a tie!")
    //     }
    //   }
    // }
//   }
// })()

// const gameBoard = (() => {
//   const player1 = new Player("X", true);
//   const player2 = new Player("O", false);

//   const board = 
//   [null, null, null,
//   null, null, null,
//   null, null, null];

//   const box = document.querySelectorAll('.box');

//   const player1 = "X";
//   const player2 = "O";
//   let currentPlayer = player1;

//   box.forEach(box => {
//     box.addEventListener('click', () => {
//       box.textContent = currentPlayer;
//       board[box.id] = box.textContent;

//       switch (currentPlayer) {
//         case "X": currentPlayer = "O"; break;
//         case "O": currentPlayer = "X";
//       }
//       winnerCheck(player1);
//       winnerCheck(player2);
//     })
//   })

//   function winnerCheck(player) {
//     if (board[0] === player && board[1] === player && board[2] === player){
//       console.log(`${player}'s Win!`)
//     } else if (board[0] === player && board[4] === player && board[8] === player){
//       console.log(`${player}'s Win!`)
//     } else if (board[0] === player && board[3] === player && board[6] === player){
//       console.log(`${player}'s Win!`)
//     } else if (board[2] === player && board[5] === player && board[8] === player){
//       console.log(`${player}'s Win!`)
//     } else if (board[3] === player && board[4] === player && board[5] === player){
//       console.log(`${player}'s Win!`)
//     } else if (board[6] === player && board[7] === player && board[8] === player){
//       console.log(`${player}'s Win!`)
//     } else if (board[2] === player && board[4] === player && board[6] === player){
//       console.log(`${player}'s Win!`)
//     } else {
//       if(!board.includes(null)) {
//         console.log("its a tie!")
//       }
//     }
//   }
// })()
