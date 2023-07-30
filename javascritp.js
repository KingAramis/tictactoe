
/********************* GET DOM ELEMENTS ************************************ */

const startFormBtn = document.querySelector(".start-form-btn");
const resetBtn = document.querySelector(".reset-game-btn");
const startGameBtn = document.querySelector(".begin-btn");
const closeMenuBtn = document.querySelector(".close-btn");
const startForm = document.querySelector(".start-form-container");
const gameCells = document.querySelectorAll(".cell");
const playerTurn = document.querySelector(".player-turn");
const player1Score = document.querySelector(".player1-score");
const player2Score = document.querySelector(".player2-score");
const player1Name = document.querySelector(".player1-name");
const player2Name = document.querySelector(".player2-name");

/******************** LISTENER EVENTS ************************************* */

startFormBtn.addEventListener("click", () => {
    startForm.style.display = "flex";
});

closeMenuBtn.addEventListener("click", () => {
    startForm.style.display = "none";
});

const cells = Array.from(document.querySelectorAll(".cell"));

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
})

function handleCellClick(event) {
    const clickedCell = event.target;
    if (ticTacToeBoard.checkCell(clickedCell) === true) {
        if (playerTurn.textContent === player1Name.textContent) {
            clickedCell.textContent = "X";
            playerTurn.textContent = player2Name.textContent;
            console.log(clickedCell.id);
        } else if (playerTurn.textContent === player2Name.textContent) {
            clickedCell.textContent = "O";
            playerTurn.textContent = player1Name.textContent;
            console.log(clickedCell.id);
        } else {
            console.log("Didn't work");
        }
    } else {
        console.log("is it working?");
    }
}

/********************* PLAYER OBJECT *************************************** */

function createPlayer(name) {
    return {
        name: name,
        winCount: 0,
    };
};

startForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const playerName1 = document.getElementById("player1").value;
    const playerName2 = document.getElementById("player2").value;

    const player1 = createPlayer(playerName1);
    const player2 = createPlayer(playerName2);

    console.log(player1.name);
    console.log(player2.name);
    startForm.style.display = "none"

    ticTacToeBoard.clearBoard();
    playerTurn.textContent = player1.name;
    player1Name.textContent = player1.name;
    player2Name.textContent = player2.name;
});

/************************** GAME BOARD OBJECT ****************************** */
// array of cells

const ticTacToeBoard = (function () {
    // Private
    const board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];


    function checkXWin(board) {
      for (let i = 0; i < 3; i++) {
        if (board[i][0] === "X" && board[i][1] === "X" && board[i][2] === "X") {
          return true;
        }
      }
      for (let j = 0; j < 3; j++) {
        if (board[0][j] === "X" && board[1][j] === "X" && board[2][j] === "X") {
          return true;
        }
      }
      if (board[0][0] === "X" && board[1][1] === "X" && board[2][2] === "X") {
        return true;
      }
      if (board[0][2] === "X" && board[1][1] === "X" && board[2][0] === "X") {
        return true;
      }
      return false;
    }

    // Function to check if "X" has won the game
    function checkOWin(board) {
      for (let i = 0; i < 3; i++) {
        if (board[i][0] === "O" && board[i][1] === "O" && board[i][2] === "O") {
          return true;
        }
      }
      for (let j = 0; j < 3; j++) {
        if (board[0][j] === "O" && board[1][j] === "O" && board[2][j] === "O") {
          return true;
        }
      }
      if (board[0][0] === "O" && board[1][1] === "O" && board[2][2] === "O") {
        return true;
      }
      if (board[0][2] === "O" && board[1][1] === "O" && board[2][0] === "O") {
        return true;
      }
      return false;
    }

    // Function Check Tie
    function checkTie(board) {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] !== " " && 
                    checkXWin === false && 
                    checkOWin === false) {
                        return true;
                }
            }
        }
    }

    // Change indicator for player turns
    function changeTurns() {
        if (playerTurn.textContent === player1.name) {
            playerTurn.textContent = player2.name + "'s turn";
        } else if (playerTurn.textContent === player2.name) {
            playerTurn.textContent = player1.name + "'s turn";
        };
    };



    // Public   
    return {
        clearBoard() {
            for (let i = 0; i < gameCells.length; i++) {
                gameCells[i].textContent = " ";
            };
        },

        checkCell(clickedCell) {
            if (clickedCell.textContent === "X" || 
                clickedCell.textContent === "O") {
                    return false;
                } else {
                    return true;
                }
            }
    };
})();



/************************* GAME CONTROL OBJECT ***************************** */
// change player turn h3
// if player.name === h3.textContent
// player.symbol = cell.textContent
// check if cell doesn't contain " "
// check for win conditions or tie condition


