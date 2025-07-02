// canvas stuff   
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// constants
// WARNING NOT DYNAMIC MEANT ONLY FOR READABILITY( BLOCKSIZE IS THE ONLY DYNAMIC ONE)
const blockSize = 20;
const screenRows = 24; 
const screenColumns = 24; 
const gameRows = 20; 
const gameColumns = 10; 

// Declare global variables
const colors = {
     "lightBlue": "#ADD8E6",
     "lightGrey": "#A9A9A9",
     "black": "#000000"
};
const screenBoard = Array.from({ length: screenRows }, () => Array(screenColumns).fill("lightBlue"));

function drawBoard(gameBoard) {
     // add the border of the game
     for (let row = 0; row < gameRows + 1; row++) {
          screenBoard[row + 1][6] = "lightGrey"; 
          screenBoard[row + 1][gameColumns + 1 + 6] = "lightGrey"; 
     }
     for (let col = 0; col < gameColumns + 2; col++) {
          screenBoard[gameRows + 1 + 1][col + 6] = "lightGrey"; 
     }

     // add the game board
     for (let row = 0; row < gameRows; row++) {
          for (let col = 0; col < gameColumns; col++) {
               screenBoard[row + 2][col + 7] = gameBoard[row][col];
          }
     }

     for (let row = 0; row < screenRows; row++) {
          for (let col = 0; col < screenColumns; col++) {
               // draw the block with minor changes
               ctx.fillStyle = colors[screenBoard[row][col]]
               ctx.fillRect(
               (col * blockSize) + blockSize * 0.05,
               (row * blockSize) + blockSize * 0.05,
               (blockSize * 0.9),
               (blockSize * 0.9)
               );
          }
     }
}

export { drawBoard };
