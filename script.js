
class Player {
  constructor(mark, name) {
    this.mark =  mark;
    this.name = name;
    this.turn = false;
    this.wins = 0;
    this.winningMessage = `${name} Wins!`
  }
}

const computer = false;

const gameController = (() => {
  const player1 = new Player('X', "Player One");
  const p2Name = !computer ? "Player Two": "Computer";
  const player2 = new Player('O', p2Name)

  game(player1, player2);
  

})()

function game(player1, player2) {
  let board = makeBoard();
  let gameEnded = false;
  const box = document.querySelectorAll('.box');

  while (!gameEnded) {
    box.forEach(box => {
      box.addEventListener('click', handleClick, {once: true});
    })
    gameEnded = true;
  }

  function makeBoard() {
    return [null, null, null,
      null, null, null,
      null, null, null];
  }

  function handleClick(e) {
    const boxClicked = e.target;
    drawMark(boxClicked);
  }

  function drawMark(boxClicked) {
    if (!player2.turn) {
      boxClicked.textContent = player1.mark;
      player2.turn = true;
      board[boxClicked.id] = player1;
      return;
    }
    boxClicked.textContent = player2.mark;
    player2.turn = false;
    board[boxClicked.id] = player2;
  }
}

// const game = ((player1, player2) => {
//   console.log("playing a game...")
//   let board = makeBoard();
//   let winner;
//   const box = document.querySelectorAll('.box');

//   box.forEach(box => {
//     box.addEventListener('click', boxClicked, {once: true});
//     box.textContent = "";
//   })

//   function boxClicked(e) {
//     const boxClicked = e.target;
//     drawMark(boxClicked);
//     if (winnerCheck()) {
//       console.log(`${winner.mark}'s win ##`)
//       return;
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
//     return [null, null, null,
//       null, null, null,
//       null, null, null];
//   }

//   function winnerCheck() {
//     if ((board[0] && player1) === board[1] && board[0] === board[2]){
//       winner = player1; 
//       return true;
//     } 
//   }
  
// })

// const gameBoard = (() => {
//   const player1 = new Player('X');
//   const player2 = new Player('O');

//   const btnClearBoard = document.querySelector('.btnClearBoard');

//   btnClearBoard.addEventListener('click', clearBoard);

//   function clearBoard() {
//     game();
//   }

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
