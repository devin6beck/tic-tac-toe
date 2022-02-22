
// const Player = (mark) => {

// }

const gameBoard = (() => {
  const board = 
  [null, null, null,
  null, null, null,
  null, null, null];

  const box = document.querySelectorAll('.box');

  const player1 = "X";
  const player2 = "O";
  let currentPlayer = player1;

  box.forEach(box => {
    box.addEventListener('click', () => {
      box.textContent = currentPlayer;
      board[box.id] = box.textContent;

      switch (currentPlayer) {
        case "X": currentPlayer = "O"; break;
        case "O": currentPlayer = "X";
      }
      winnerCheck(player1);
      winnerCheck(player2);
    })
  })

  function winnerCheck(player) {
    if (board[0] === player && board[1] === player && board[2] === player){
      console.log(`${player}'s Win!`)
    } else if (board[0] === player && board[4] === player && board[8] === player){
      console.log(`${player}'s Win!`)
    } else if (board[0] === player && board[3] === player && board[6] === player){
      console.log(`${player}'s Win!`)
    } else if (board[2] === player && board[5] === player && board[8] === player){
      console.log(`${player}'s Win!`)
    } else if (board[3] === player && board[4] === player && board[5] === player){
      console.log(`${player}'s Win!`)
    } else if (board[6] === player && board[7] === player && board[8] === player){
      console.log(`${player}'s Win!`)
    } else if (board[2] === player && board[4] === player && board[6] === player){
      console.log(`${player}'s Win!`)
    } else {
      if(!board.includes(null)) {
        console.log("its a tie!")
      }
    }
  }
})()

