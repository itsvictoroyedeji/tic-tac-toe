
/* State of the board in rows and columns.
** Each square holds a box.
** We also expose a dropMark method to add Boxes to squares
*/
function Gameboard() {
  const rows = 3;
  const cols = 3;
  let board = [];

  // 2d array to represent state of the game's board.
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < cols; j++) {
      board[i].push(Box());
    }
  };

  // To get entire board for UI
  const getBoard = () => board;

  // Code to add a mark in a Box
  const dropMark = (row, column, player) => {

    // Find out if selected box is available
    // (meaning box value is blank)
    const availableBox = board[row][column].getValue() === '' ? true : false;

    // If box is not available, stop execution
    if (!availableBox) {
      alert("You clicked on a box already set. You lost your turn :(");
      return;
    };

    // Add Mark for the player
    board[row][column].addMark(player);
  };

  // Print board for the console only. (not needed for UI)
  const printBoard = () => {
    const boardWithBoxValues = board.map((singleRow) => singleRow.map((box) => box.getValue()));
    
    console.table(boardWithBoxValues);
  };

  // Used to check winning values later
  // Difference here is value is returned
  const checkValues = () => {
    const checkBoardValues = board.map((singleRow) => singleRow.map((box) => box.getValue()));

    return checkBoardValues;
  }

  const resetBoard = () => {
    board = [];

    // 2d array to represent state of the game's board.
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < cols; j++) {
        board[i].push(Box());
      }
    };
    
    console.log(board);

    return board;
  }

  return { 
    getBoard,
    dropMark,
    printBoard,
    checkValues,
    resetBoard
  };
}


/* Box represents a square on the board. It can have one of:
** 0: no mark is in the square
** 1: Player One's mark,
** 2: Player Two's mark
*/
function Box() {
  let value = '';

  // Accept player's mark and change value of the Box
  const addMark = (player) => {
    value = player;
  }

  // Get current value of box
  const getValue = () => value;


  return { addMark, getValue }
}


/* GameController responsible for controlling the flow
** and state of the game's turns. Plus who won the game.
*/
function GameController(
  playerOneName = "Player One", 
  playerTwoName = "Player Two"
) {
  // Get gameboard's API objects
  const board = Gameboard();

  // Player's array of objects
  const players = [
    {
      name: playerOneName,
      mark: 'X',
    },
    {
      name: playerTwoName,
      mark: 'O',
    }
  ];

  // List active player
  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  }

  // Closure function to protect 'activePlayer' variable
  const getActivePlayer = () => activePlayer;

  // Set active Player when game resets
  const setActivePlayer = () => {
    activePlayer = players[0];
    console.log(activePlayer);
  };

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn (${getActivePlayer().mark})`);
  }

  // The actual gameplay round!
  const playRound = (row, column) => {
    // Drop mark for the current player (with message)
    console.log(
      `Adding ${getActivePlayer().name}'s mark into row ${row}, column ${column}...`
    );
    board.dropMark(row, column, getActivePlayer().mark);
    

    // Check WINNING LOGIC with win message
    const winningLogic = () => {

      const checkWinner = board.checkValues();
      const winner = WinningMessage();
      
      // For same winning marks in a row (loop to check all rows)
      for (let i = 0; i < checkWinner.length; i++) {
        // Check each row
        let checkWinnerRow = checkWinner[i];
        if (checkWinnerRow.join(" ") === 'X X X') {
          board.printBoard();
          // Add "setTimeout" to show winning mark on screen
          // (set at DisplayController().clickHandlerBoard()) before
          // winner popup message appears.
          setTimeout(() => {winner.message(playerOneName)}, 200);
          return;
        } else if (checkWinnerRow.join(" ") === 'O O O') {
          board.printBoard();
          setTimeout(() => {winner.message(playerTwoName)}, 200);
          return;
        };
      };

      // For same winning marks in a column (loop to check all columns)
      const boardColumn = checkWinner.map(row => row[0]);

      for (i = 0 ; i < boardColumn.length; i++) {
        // Check each column
        let checkWinnerColumn = checkWinner.map(row => row[i]);
        if (checkWinnerColumn.join(" ") === 'X X X') {
          board.printBoard();
          setTimeout(() => {winner.message(playerOneName)}, 200);
          return;
        } else if (checkWinnerColumn.join(" ") === 'O O O') {
          board.printBoard();
          setTimeout(() => {winner.message(playerTwoName)}, 200);
          return;
        };
      };

      // For same winning marks diagonally

      // First Diagonal Check (from top-left to bottom-right)
      let checkWinnerDiagonally1 = [];
      for (let i = 0; i < checkWinner.length; i++) {
        // Add each diagonal mark into array
        checkWinnerDiagonally1.push(checkWinner[i][i]);  
      };
      if (checkWinnerDiagonally1.join(" ") === 'X X X') {
        board.printBoard()
        setTimeout(() => {winner.message(playerOneName)}, 200);
        checkWinnerDiagonally1 = [];
        return;
      } else if (checkWinnerDiagonally1.join(" ") === 'O O O') {
        board.printBoard()
        setTimeout(() => {winner.message(playerTwoName)}, 200);
        checkWinnerDiagonally1 = [];
        return;
      };

      console.log(checkWinnerDiagonally1);

  
      // Second Diagonal Check (from top-right to bottom-left)
      let checkWinnerDiagonally2 = [];
      for (let i = 0; i < checkWinner.length; i++) {
          checkWinnerDiagonally2.push(
            checkWinner[i][(checkWinner.length - 1) - i]
          ); 
        };
      if (checkWinnerDiagonally2.join(" ") === 'X X X') {
        board.printBoard()
        setTimeout(() => {winner.message(playerOneName)}, 200);
        checkWinnerDiagonally2 = [];
        return;
      } else if (checkWinnerDiagonally2.join(" ") === 'O O O') {
        board.printBoard()
        setTimeout(() => {winner.message(playerTwoName)}, 200);
        checkWinnerDiagonally2 = [];
        return;
      };

      console.log(checkWinnerDiagonally2);

      // Check if all boxes are filled (TIE GAME)
      let checkAllBoxesFilled = [];
      for (let i = 0; i < checkWinner.length; i++) {
        for (let j = 0; j < checkWinner[i].length; j++) {
          checkAllBoxesFilled.push(checkWinner[i][j]);
        }
      };
      const noValue = '';

      if (!checkAllBoxesFilled.includes(noValue)) {
        // setTimeout to allow final mark to show on screen
        setTimeout(() => {
          alert("Nobody won the game. Click 'Reset Game' to play again.")}, 200);

        checkAllBoxesFilled = [];
      };

      console.log(checkAllBoxesFilled);
    }

    winningLogic();
        
    // If no winner, switch player's turn
    switchPlayerTurn();
    printNewRound();
  }

  // Initial message of game 
  printNewRound();

  return { 
    playRound,
    getActivePlayer,
    setActivePlayer,
    getBoard: board.getBoard,
    printBoard: board.printBoard,
    resetBoard: board.resetBoard
  };
};


/*
** Code to display game in the UI
*/
function DisplayController() {

  // Entire GameController's API collected here (to retrieve game). 
  // Let's first initialize it. Declared in Welcome series
  // at bottom.
  let game;

  // Add DOM references to gameboard and displaying the player's turn
  const playersTurnDiv = document.querySelector('.turn');
  const boardDiv = document.querySelector('.board');

  // Add DOM reference to container and create "Reset game" button
  const container = document.querySelector('.container');

  // Container for the buttons
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("btn-container");

  const resetButton = document.createElement("button");
  resetButton.classList.add("button", "reset-button");
  resetButton.textContent = "Reset Game";

  const startOverButton = document.createElement("button");
  startOverButton.classList.add("button", "start-over-button");
  startOverButton.textContent = "Start With New Players";

  // Main part of the DisplayController()
  const updateScreen = () => {
    // clears the board before a new round 
    boardDiv.textContent = "";

    // Add reset button at button
    buttonContainer.appendChild(resetButton);
    buttonContainer.appendChild(startOverButton);

    container.appendChild(buttonContainer);
    
    // Get latest board version and player's turn
    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    // Display player's turn on screen
    playersTurnDiv.textContent = `${activePlayer.name}'s turn (${activePlayer.mark})...`;

    // Render board squares on screen
    board.forEach((row, rowIndex) => {
      row.forEach((box, colIndex) => {
        // Anything clickable is a 'button'
        const boxButton = document.createElement('button');
        boxButton.classList.add("box");

        // Create a data-column attribute to identify column's 
        // and row's index
        // to make it easier to pass the "playRound" function
        boxButton.dataset.row = rowIndex;
        boxButton.dataset.column = colIndex;

        boxButton.textContent = box.getValue();
        
        boardDiv.appendChild(boxButton);
      })
    })
  };

  // Event listener for the board
  boardDiv.addEventListener("click", clickHandlerBoard);

  function clickHandlerBoard(e) {
    // Get Box Element that's clicked
    const selectedRow = e.target.dataset.row;
    const selectedColumn = e.target.dataset.column;

    // If selected box is invalid, don't proceed
    if (!selectedColumn && !selectedRow) return;

    // PLAY THE ROUND from the GameController()...
    game.playRound(selectedRow, selectedColumn);
    updateScreen();
  };

  // No zoom on double-click of buttons
  document.addEventListener('dblclick', function(event) {
    event.preventDefault();
  });
  

  // Welcome Series start button is here!
  Welcome().startButton.addEventListener("click", (e) => {

    let playerOne = prompt("Add Player One's name:", "Player One");
    let playerTwo = prompt("Add Player Two's name:", "Player Two");

    if (playerOne === null ) {
      // "undefined" allows GameController() parameters
      // to pass default values
      playerOne = undefined;
    }
    if (playerTwo === null ) {
      playerTwo = undefined;
    }

    // Render Game Controller API with player's names
    game = GameController(playerOne, playerTwo);

    const welcomeBoard = document.querySelector('.welcome-board');

    // Remove Welcome elements
    e.target.parentElement.parentElement.removeChild(welcomeBoard);

    // Render game screen
    updateScreen();
  
  });

  // Reset Game event listener button
  resetButton.addEventListener('click', resetGame);
  function resetGame() {
    // Reset Game controls
    game.resetBoard();
    game.setActivePlayer();
    game.printBoard();
    updateScreen();
  }

  // Start Game Over event listener button
  startOverButton.addEventListener('click', startWithNewPlayers);
  function startWithNewPlayers() {
    const text = "Are you sure you want to end this game?"

    if (confirm(text) === true) {
      // Reload page
      location.reload();
    } else {
      return;
    }

  }

  // Don't return anything. Everything is encapsulated here.
}

/*
  ** Display winning message
  */
function WinningMessage() {
  const message = (player) => {
    console.log(`Boom! ${player} has won the game!`);

    alert(`Boom! ${player} has won the game!\n\nClick "Reset Game" to play another game.`);
  };

  return { message }
}
/*
** Create a Welcome screen to start game.
*/
function Welcome() {
  const container = document.querySelector('.container');

  // Transparent Welcome element that has a message + button
  // Layers on top of tic tac toe box
  const welcomeBoard = document.createElement('div');
  welcomeBoard.classList.add("welcome-board");

  const welcomeMessage = document.createElement('h2');
  welcomeMessage.classList.add('welcome');
  welcomeMessage.textContent = "Let's play Tic-Tac-Toe";

  const startButton = document.createElement('button');
  startButton.classList.add('button', 'start-button');
  startButton.textContent = "Start Game";

  welcomeBoard.appendChild(welcomeMessage);
  welcomeBoard.appendChild(startButton);

  container.appendChild(welcomeBoard);

  // startButton will be used in DisplayController's
  // event listener, so it will be available
  return { startButton };
}


DisplayController();