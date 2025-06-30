import { drawBoard } from './draw.js';
const gameRows = 20; 
const gameColumns = 10; 
const gameBoard = Array.from({ length: gameRows }, () => Array(gameColumns).fill("black"));
drawBoard(gameBoard)
