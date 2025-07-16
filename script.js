
const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status");
const modeSelect = document.getElementById("modeSelect");

let board = Array(9).fill("");
let currentPlayer = "X";
let isGameOver = false;
let mode = "ai";

modeSelect.addEventListener("change", () => {
  mode = modeSelect.value;
  resetGame();
});

cells.forEach(cell => {
  cell.addEventListener("click", handleCellClick);
});

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (board[index] !== "" || isGameOver) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    status.textContent = `${currentPlayer} wins! 🎉`;
    isGameOver = true;
    return;
  }

  if (!board.includes("")) {
    status.textContent = "It's a draw! 🤝";
    isGameOver = true;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";

  if (mode === "ai" && currentPlayer === "O") {
    setTimeout(aiMove, 300);
  }
}

function aiMove() {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 9; i++) {
    if (board[i] === "") {
      board[i] = "O";
      let score = minimax(board, 0, false);
      board[i] = "";
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  board[move] = "O";
  cells[move].textContent = "O";
  if (checkWinner()) {
    status.textContent = `O wins! 🎉`;
    isGameOver = true;
    return;
  }
  if (!board.includes("")) {
    status.textContent = "It's a draw! 🤝";
    isGameOver = true;
    return;
  }
  currentPlayer = "X";
}

function minimax(newBoard, depth, isMaximizing) {
  const winner = checkWinner(newBoard);
  if (winner === "O") return 1;
  if (winner === "X") return -1;
  if (!newBoard.includes("")) return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (newBoard[i] === "") {
        newBoard[i] = "O";
        best = Math.max(best, minimax(newBoard, depth + 1, false));
        newBoard[i] = "";
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 9; i++) {
      if (newBoard[i] === "") {
        newBoard[i] = "X";
        best = Math.min(best, minimax(newBoard, depth + 1, true));
        newBoard[i] = "";
      }
    }
    return best;
  }
}

function checkWinner(b = board) {
  const wins = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  for (let [a, b1, c] of wins) {
    if (b[a] && b[a] === b[b1] && b[a] === b[c]) {
      return b[a];
    }
  }
  return null;
}

function resetGame() {
  board = Array(9).fill("");
  currentPlayer = "X";
  isGameOver = false;
  status.textContent = "";
  cells.forEach(cell => (cell.textContent = ""));
}