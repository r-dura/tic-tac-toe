function createGameboard() {
    const rows = 3;
    const board = [];
  
    // 2d array that will represent the state of the game board
    // For this 2d array, row 0 will represent the top row and
    // column 0 will represent the left-most column.
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < rows; j++) {
        board[i].push(Cell());
      }
    }

    const getBoard = () => board;

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    };

    return { getBoard, printBoard };
}

function Cell() {
    let value = 0;
  
    // Accept a player's token to change the value of the cell
    const fillSlot = (player) => {
      value = player;
    };
  
    // How we will retrieve the current value of this cell through closure
    const getValue = () => value;
  
    return {fillSlot, getValue};
}

function gameController() {
    const gameBoard = createGameboard();
    const board = gameBoard.getBoard();
    const players = [
    {
        name: 'Player One',
        value: 1
      },
    {
        name: 'Player Two',
        value: 2
      }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        if (activePlayer == players[0]) {
            activePlayer = players[1];
        } else {
            activePlayer = players[0];
        }
    };
    
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        gameBoard.printBoard();
    };

    const playRound = () => {
        let round = 0;
        hasWinner  = false
        while (!hasWinner && round < 9) {
            console.log(`${getActivePlayer().name}'s move`);
        
            let userInput = prompt("Please enter your row and column of where you want to place:");

            let numbers = userInput.split(' ');

            let row = parseInt(numbers[0]);
            let column = parseInt(numbers[1]);

            board[row][column].fillSlot(getActivePlayer().value);
            hasWinner = checkForWin(board);
            round++;
            switchPlayerTurn();
            printNewRound();
        }
        if (round >= 9) {
            console.log("Game ends in a tie!");
        } else {
            switchPlayerTurn();
            console.log(`${getActivePlayer().name} wins!`);
        }
    };

    return {playRound,getActivePlayer};
}

function startGame() {
    const game = gameController();
    game.playRound();
}

function checkForWin(board) {
    for (let i = 0; i < board.length; i++) {
        if (board[i][0].getValue() == board[i][1].getValue() && board[i][0].getValue() == board[i][2].getValue() && board[i][0].getValue() !== 0) {
            return true;
        }
    }
    for (let j = 0; j < board.length; j++) {
        if (board[0][j].getValue() == board[1][j].getValue() && board[0][j].getValue() == board[2][j].getValue() && board[0][j].getValue() !== 0) {
            return true;
        }
    }

    for (let j = 0; j < board.length; j++) {
        if (board[0][0].getValue() == board[1][1].getValue() && board[0][0].getValue() == board[2][2].getValue() && board[0][0].getValue() !== 0) {
            return true;
        }
    }
    return false;
}

startGame();
