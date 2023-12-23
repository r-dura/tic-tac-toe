function createGameboard(getActivePlayer,playRound) {
    const rows = 3;
    const board = [];
    const gameBoardElement = document.getElementById('gameContainer');
  
    // 2d array that will represent the state of the game board
    // For this 2d array, row 0 will represent the top row and
    // column 0 will represent the left-most column.
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < rows; j++) {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        gameBoardElement.appendChild(cellElement);
        board[i].push(Cell(cellElement, getActivePlayer, playRound));
      }
    }

    const getBoard = () => board;

    return { getBoard };
}

function Cell(cellElement, getActivePlayer, playRound) {
    let value = 0;
    cellElement.addEventListener('click', function() {
        let value = getActivePlayer().value;
        cellElement.innerHTML = getActivePlayer().img;
        fillSlot(value);
        playRound();
    });
    const fillSlot = (player) => {
      value = player;
    };
  
    const getValue = () => value;

    const resetCell = () => {
        cellElement.innerHTML = '';
        fillSlot(0);
    }
  
    return {fillSlot, getValue, resetCell};
}

function gameController() {
    const playerIndicatorElement = document.getElementById('turnIndicator');
    const players = [
    {
        name: 'Player One',
        value: 1,
        img: '<img src = "close.png"></img>'
      },
    {
        name: 'Player Two',
        value: 2,
        img: '<img src = "circle.png"></img>'
      }
    ];

    let activePlayer = players[0];

    
    const switchPlayerTurn = () => {
        if (activePlayer == players[0]) {
            activePlayer = players[1];
        } else {
            activePlayer = players[0];
        }
        playerIndicatorElement.textContent = `${getActivePlayer().name}'s move`;
    };
    
    const getActivePlayer = () => activePlayer;

    let round = 0;
    let hasWinner = false;
    
    const playRound = () => {
        if (!hasWinner && round < 9) {
            console.log(`${getActivePlayer().name}'s move`);
    
            hasWinner = checkForWin(board);
            if (hasWinner) {
                playerIndicatorElement.textContent = `${getActivePlayer().name} wins!`;
                return;
            } else {
                round++;
                if (round >= 9) {
                    playerIndicatorElement.textContent = "Game ends in a tie!";
                    return; 
                }
            }
    
            switchPlayerTurn();
        }
    }

    const gameBoard = createGameboard(getActivePlayer, playRound);
    const board = gameBoard.getBoard();
    playerIndicatorElement.textContent = `${getActivePlayer().name}'s move`

    const reset = () => {
        const rows = 3;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < rows; j++) {
              board[i][j].resetCell();
            }
        }
        round = 0;
        hasWinner = false;
        activePlayer = players[0];

        playerIndicatorElement.textContent = `${getActivePlayer().name}'s move`
    }

    document.getElementById('reset').addEventListener('click', reset);

    return {getActivePlayer,playRound};
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
    if (board[0][0].getValue() == board[1][1].getValue() && board[0][0].getValue() == board[2][2].getValue() && board[0][0].getValue() !== 0) {
        return true;
    }
    if (board[2][0].getValue() == board[1][1].getValue() && board[2][0].getValue() == board[0][2].getValue() && board[2][0].getValue() !== 0) {
        return true;
    }
    return false;
}

const game = gameController();

