import { drawBoard } from './draw.js';

const gameRows = 20; 
const gameColumns = 10; 
const gameBoard = Array.from({ length: gameRows }, () => Array(gameColumns).fill("black"));
drawBoard(gameBoard);

const tetrominoes = {
     I: {
          shape: [
               [1, 1, 1, 1]
          ],
          color: "cyan"
     },
     O: {
          shape: [
               [1, 1],
               [1, 1]
          ],
          color: "yellow"
     },
     T: {
          shape: [
               [0, 1, 0],
               [1, 1, 1]
          ],
          color: "purple"
     },
     S: {
          shape: [
               [0, 1, 1],
               [1, 1, 0]
          ],
          color: "green"
     },
     Z: {
          shape: [
               [1, 1, 0],
               [0, 1, 1]
          ],
          color: "red"
     },
     J: {
          shape: [
               [1, 0, 0],
               [1, 1, 1]
          ],
          color: "blue"
     },
     L: {
          shape: [
               [0, 0, 1],
               [1, 1, 1]
          ],
          color: "orange"
     },
};

let currentTetromino = { 
     shape: tetrominoes.T.shape, 
     color: tetrominoes.T.color, 
     row: 0, 
     col: Math.floor(gameColumns / 2) - 1 
};

function placeTetromino() {
     currentTetromino.shape.forEach((row, rIdx) => {
          row.forEach((cell, cIdx) => {
               if (cell) {
                    const boardRow = currentTetromino.row + rIdx;
                    const boardCol = currentTetromino.col + cIdx;
                    if (boardRow >= 0 && boardRow < gameRows && boardCol >= 0 && boardCol < gameColumns) {
                         gameBoard[boardRow][boardCol] = currentTetromino.color;
                    }
               }
          });
     });
}

function clearTetromino() {
     currentTetromino.shape.forEach((row, rIdx) => {
          row.forEach((cell, cIdx) => {
               if (cell) {
                    const boardRow = currentTetromino.row + rIdx;
                    const boardCol = currentTetromino.col + cIdx;
                    if (boardRow >= 0 && boardRow < gameRows && boardCol >= 0 && boardCol < gameColumns) {
                         gameBoard[boardRow][boardCol] = "black";
                    }
               }
          });
     });
}

function moveTetrominoDown() {
     clearTetromino();
     currentTetromino.row++;
     if (checkCollision()) {
          currentTetromino.row--;
          placeTetromino();
          checkAndClearRows();
          spawnNewTetromino();
     } else {
          placeTetromino();
     }
}

function checkCollision() {
     return currentTetromino.shape.some((row, rIdx) => {
          return row.some((cell, cIdx) => {
               if (cell) {
                    const boardRow = currentTetromino.row + rIdx;
                    const boardCol = currentTetromino.col + cIdx;
                    return (
                         boardRow >= gameRows ||
                         boardCol < 0 ||
                         boardCol >= gameColumns ||
                         (boardRow >= 0 && gameBoard[boardRow][boardCol] !== "black")
                    );
               }
               return false;
          });
     });
}

function checkAndClearRows() {
     for (let row = 0; row < gameRows; row++) {
          if (gameBoard[row].every(cell => cell !== "black")) {
               gameBoard.splice(row, 1);
               gameBoard.unshift(Array(gameColumns).fill("black"));
          }
     }
}

function spawnNewTetromino() {
     const tetrominoKeys = Object.keys(tetrominoes);
     const randomKey = tetrominoKeys[Math.floor(Math.random() * tetrominoKeys.length)];
     const shape = tetrominoes[randomKey].shape;
     const colOffset = randomKey === "I" ? Math.floor(gameColumns / 2) - 2 : 
                       randomKey === "O" ? Math.floor(gameColumns / 2) - 1 : 
                       Math.floor(gameColumns / 2) - 1;
     currentTetromino = { 
          shape: shape, 
          color: tetrominoes[randomKey].color, 
          row: 0, 
          col: colOffset 
     };
}

function gameLoop() {
     moveTetrominoDown();
     drawBoard(gameBoard);
     setTimeout(gameLoop, 500);
}

spawnNewTetromino();
gameLoop();