// Dimensões do tabuleiro
const NUM_CELULAS = 10;
const TAM_CELULA = 30;

// Criação do tabuleiro
let board = [];
for (let i = 0; i < NUM_CELULAS; i++) {
  board[i] = [];
  for (let j = 0; j < NUM_CELULAS; j++) {
    board[i][j] = 0;
  }
}

// Obtenção do elemento canvas e contexto 2D
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Função para desenhar o tabuleiro
function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < NUM_CELULAS; i++) {
    for (let j = 0; j < NUM_CELULAS; j++) {
      if (board[i][j] === 1) {
        ctx.fillStyle = "black";
      } else {
        ctx.fillStyle = "white";
      }
      ctx.fillRect(i * TAM_CELULA, j * TAM_CELULA, TAM_CELULA, TAM_CELULA);
      ctx.strokeStyle = "gray";
      ctx.strokeRect(i * TAM_CELULA, j * TAM_CELULA, TAM_CELULA, TAM_CELULA);
    }
  }
}

// Função para atualizar o estado do tabuleiro
function updateBoard() {
  let newBoard = [];
  for (let i = 0; i < NUM_CELULAS; i++) {
    newBoard[i] = [];
    for (let j = 0; j < NUM_CELULAS; j++) {
      const numNeighbors = countNeighbors(i, j);
      if (board[i][j] === 1) {
        if (numNeighbors < 2 || numNeighbors > 3) {
          newBoard[i][j] = 0;
        } else {
          newBoard[i][j] = 1;
        }
      } else {
        if (numNeighbors === 3) {
          newBoard[i][j] = 1;
        } else {
          newBoard[i][j] = 0;
        }
      }
    }
  }
  board = newBoard;
}

// Função para contar o número de vizinhos vivos de uma célula
function countNeighbors(x, y) {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      const newX = x + i;
      const newY = y + j;
      if (newX >= 0 && newX < NUM_CELULAS && newY >= 0 && newY < NUM_CELULAS) {
        count += board[newX][newY];
      }
    }
  }
  return count;
}

// Função para lidar com os cliques do usuário
function handleClick(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const cellX = Math.floor(x / TAM_CELULA);
  const cellY = Math.floor(y / TAM_CELULA);
}
// Inverte

// Função para lidar com os cliques do usuário
function handleClick(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const cellX = Math.floor(x / TAM_CELULA);
  const cellY = Math.floor(y / TAM_CELULA);

  // Inverte o estado da célula clicada
  board[cellX][cellY] = 1 - board[cellX][cellY];

  // Redesenhar o tabuleiro
  drawBoard();
}

// Adicionar o evento de clique ao canvas
canvas.addEventListener("click", handleClick);

// Função para atualizar o estado do tabuleiro em intervalos regulares
function gameLoop() {
  updateBoard();
  drawBoard();
}

// Definir um intervalo de atualização do tabuleiro (1000ms = 1 segundo)
setInterval(gameLoop, 1000);
