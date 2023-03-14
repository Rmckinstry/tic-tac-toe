// player factory
const playerFactory = (name, marker, playerID) => {
  return { name, marker, playerID };
};

// gameboard module
const gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  function initializeBoard() {
    const gameContainer = document.getElementById("container");
    const infoContainer = document.getElementById("info-container");

    const playerOneName = document.getElementById('player-one-name');
    const playerTwoName = document.getElementById('player-two-name');

    playerOneName.textContent = gameController.getPlayers()[0].name;
    playerTwoName.textContent = gameController.getPlayers()[1].name;


    const squareOne = document.createElement("div");
    squareOne.classList.add("square");
    squareOne.setAttribute("id", "squareOne");

    const squareTwo = document.createElement("div");
    squareTwo.classList.add("square");
    squareTwo.setAttribute("id", "squareTwo");

    const squareThree = document.createElement("div");
    squareThree.classList.add("square");
    squareThree.setAttribute("id", "squareThree");

    const squareFour = document.createElement("div");
    squareFour.classList.add("square");
    squareFour.setAttribute("id", "squareFour");

    const squareFive = document.createElement("div");
    squareFive.classList.add("square");
    squareFive.setAttribute("id", "squareFive");

    const squareSix = document.createElement("div");
    squareSix.classList.add("square");
    squareSix.setAttribute("id", "squareSix");

    const squareSeven = document.createElement("div");
    squareSeven.classList.add("square");
    squareSeven.setAttribute("id", "squareSeven");

    const squareEight = document.createElement("div");
    squareEight.classList.add("square");
    squareEight.setAttribute("id", "squareEight");

    const squareNine = document.createElement("div");
    squareNine.classList.add("square");
    squareNine.setAttribute("id", "squareNine");

    gameContainer.appendChild(squareOne);
    gameContainer.appendChild(squareTwo);
    gameContainer.appendChild(squareThree);
    gameContainer.appendChild(squareFour);
    gameContainer.appendChild(squareFive);
    gameContainer.appendChild(squareSix);
    gameContainer.appendChild(squareSeven);
    gameContainer.appendChild(squareEight);
    gameContainer.appendChild(squareNine);

    gameContainer.childNodes.forEach((element, i) => {
      element.addEventListener("click", () => {
        // if index of gameboard is empty, assign the value to the gameboard and visually represent
        if (getBoardValue(i) === "") {
          setBoardValue(i, gameController.getCurrentPlayer()["marker"]);
          element.textContent = getBoardValue(i);
          element.classList.add("played");

          // let game controller know when a square has succesfully been clicked
          let gameWon = gameController.handleClick(board);

          if (gameWon) {
          }
        }
      });
    });
  }

  function getBoardValue(index) {
    return board[index];
  }

  function setBoardValue(index, value) {
    board[index] = value;
  }
  return { initializeBoard, getBoardValue };
})();

const gameController = (() => {
  let players = [];
  let currentPlayer = null;

//   winning combinations (values are index based so for a real human grid +1 on the number)
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function setPlayers(player) {
    // logic check to prevent adding more than 2 users
    if (players.length < 2) {
      players.push(player);
    }
  }

  function getPlayers(){
    return players
  }

  function getCurrentPlayer() {
    return currentPlayer;
  }

  function startGame() {
    currentPlayer = players[0];
  }

  function handleClick(board) {
    let winDetected = checkWinStatus(board, winningCombinations);

    console.log(winDetected);
    if (winDetected) {
        console.log(`${currentPlayer.name} won!`)
    }
    else{
      // checks playerID of current player, assigns to the other player in arrays
        currentPlayer = currentPlayer.playerID == 1 ? players[1] : players[0];  
    }

    return winDetected;
  }

  function checkWinStatus(currentBoard, winningCombinations) {
    const checkCombo = (combo) => {
      // checks if the value on the current board at index of the spot of a certain winning combo is the marker of the curent player
      return (
        currentBoard[combo[0]] === currentPlayer.marker &&
        currentBoard[combo[1]] === currentPlayer.marker &&
        currentBoard[combo[2]] === currentPlayer.marker
      );
    };

    return (winningCombinations.some(checkCombo));
  }

  return { setPlayers, getPlayers, getCurrentPlayer, startGame, handleClick };
})();

let playerOne = playerFactory("Ryan", "X", 1);
gameController.setPlayers(playerOne);
let playerTwo = playerFactory("Bob", "O", 2);
gameController.setPlayers(playerTwo);

gameController.startGame();
gameboard.initializeBoard();
