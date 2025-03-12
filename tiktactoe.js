// RULES!

// 1. Store the gameboard as an array inside of a Gameboard object
// 2. Players are stored in objects, so...
// 3. Get an object to control the flow of the game itself!
// 4. Have little to no global code/variables - tuck most of them inside of factory functions/objects
// 5. You need a single instance of the gameboard or the displayController, wrap the factory in an IIFE module so you it can't be reused to make more instances.
// 6. Think where should each bit of logic reside? Each functionality should fit in the game, player, or gameboard objects. Put them in logical (smart) places. (BRAINSTORM HERE to make life easier later!)
// 7. Look at this article for more info + an example on how to organize your application/structure your code/your approach: https://www.ayweb.dev/blog/building-a-house-from-the-inside-out
// 8. Get a WORKING GAME in the console first.
// 9. Include logic to check when game is over:
  // a. Always check for all winning 3-in-a-rows and ties.
// 10. Don't worry about DOM, HTML, CSS until game works!
  // a. Don't worry about taking user input either.
// 11. You can call functions and pass arguments (to them) to play the game yourself to check if everything works as intended.
// 12. AFTER GAME WORKS in the console...create an object that handles the display/DOM logic.
// 13. Write a function to render the contents of the "gameboard" array to the webpage.
  // a. Just fill the gameboard array with X and O jut to see what's going on
// 14. Write functions that allow players to add marks to a specific spot on the board by interacting w/ the right DOM elements
  // a. Ex: Let players click on a board square to place their marker.
  // b. Also write logic that keeps players from playing in spots already taken!
// 15. Clean up (aka put final touches on) the interface to:
  // a. Allow players to put their names.
  // b. Include a button to start/restart the game
// 16. And add a display element that shows the results upon game's end.
// HAPPY CODING :)

/* State of the board in rows and columns.
// Each square holds a box.
// We also expose a dropMark method to add Boxes to squares
*/
function Gameboard() {
  const rows = 3;
  const cols = 3;
  const board = [];

  // 2d array to represent state of the game's board.
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < cols; j++) {
      board[i].push(Box());
    }
  }

  // To get entire board for UI
  const getBoard = () => board;

  // Code to add a mark in a Box
  const dropMark = (row, column, player) => {

    // Find out if selected box is available
    // (meaning box value is 0)
    const availableBox = board[row][column].getValue() === 0 ? true : false;

    // If box is not available, stop execution
    if (!availableBox) return;

    // Add Mark for the player
    board[row][column].addMark(player);
  };

    // Print board for the console only. (not needed for UI)
  const printBoard = () => {
    const boardWithBoxValues = board.map((singleRow) => singleRow.map((box) => box.getValue()));
    
    console.log(boardWithBoxValues);
  };

  return { getBoard, dropMark, printBoard };
}

/* Box represents a square on the board. It can have one of:
// 0: no mark is in the square
// 1: Player One's mark,
// 2: Player Two's mark
*/
function Box() {
  let value = 0;

  // Accept player's mark and change value of the Box
  const addMark = (player) => {
    value = player;
  }

  // Get current value of box
  const getValue = () => value;

  return { addMark, getValue }
}

/* GameController responsible for controlling the flow
// and state of the game's turns. Plus who won the game.
*/
function GameController() {

}