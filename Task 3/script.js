const buttons = document.querySelectorAll('.board button');
const messageEl = document.getElementById('message');

let currentPlayer = 'X';
let gameBoard = Array(9).fill(null);

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(event) {
  const cellIndex = parseInt(event.target.dataset.cellIndex);
  
  if (gameBoard[cellIndex] !== null) return;

  gameBoard[cellIndex] = currentPlayer;
  event.target.textContent = currentPlayer;

  const winner = checkWinner();
  if (winner) {
    messageEl.textContent = `${winner} wins!`;
    disableButtons();
    return;
  }

  if (checkDraw()) {
    messageEl.textContent = "It's a Draw!";
    disableButtons();
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  messageEl.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  for (let i = 0; i < winningConditions.length; i++) {
    const condition = winningConditions[i];
    const cell1 = gameBoard[condition[0]];
    const cell2 = gameBoard[condition[1]];
    const cell3 = gameBoard[condition[2]];

    if (cell1 === currentPlayer && cell2 === currentPlayer && cell3 === currentPlayer) {
      return currentPlayer;
    }
  }
  return null;
}

function checkDraw() {
  return gameBoard.every(cell => cell !== null);
}

function disableButtons() {
  buttons.forEach(button => button.disabled = true);
}

buttons.forEach(button => button.addEventListener('click', handleCellClick));

messageEl.textContent = `Player ${currentPlayer}'s turn`;
