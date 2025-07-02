import { drawBoard } from './draw.js';

const gameRows = 20; 
const gameColumns = 10; 
const gameBoard = Array.from({ length: gameRows }, () => Array(gameColumns).fill("black"));
drawBoard(gameBoard);

const tetrominoes = {
    I: [[1, 1, 1, 1]],
    O: [[1, 1], [1, 1]],
    T: [[0, 1, 0], [1, 1, 1]],
    S: [[0, 1, 1], [1, 1, 0]],
    Z: [[1, 1, 0], [0, 1, 1]],
    J: [[1, 0, 0], [1, 1, 1]],
    L: [[0, 0, 1], [1, 1, 1]],
};

let currentTetromino = { shape: tetrominoes.T, row: 0, col: Math.floor(gameColumns / 2) - 1 };

function placeTetromino() {
    currentTetromino.shape.forEach((row, rIdx) => {
        row.forEach((cell, cIdx) => {
            if (cell) {
                const boardRow = currentTetromino.row + rIdx;
                const boardCol = currentTetromino.col + cIdx;
                if (boardRow >= 0 && boardRow < gameRows && boardCol >= 0 && boardCol < gameColumns) {
                    gameBoard[boardRow][boardCol] = "red";
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
    currentTetromino = { shape: tetrominoes[randomKey], row: 0, col: Math.floor(gameColumns / 2) - 1 };
}

function gameLoop() {
    moveTetrominoDown();
    drawBoard(gameBoard);
    setTimeout(gameLoop, 500); // Run every 500ms
}

spawnNewTetromino();
gameLoop();