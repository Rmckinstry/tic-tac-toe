// player factory
const playerFactory = (name, marker, playerID) => {
  return { name, marker, playerID };
};

// gameboard module
const gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  function initializeBoard() {
    // re initalizing board here to account for reset being hit
    board = ["", "", "", "", "", "", "", "", ""];
    const gameContainer = document.getElementById("container");
    const winnerContainer = document.getElementById("winner-container");

    const playerOneName = document.getElementById('player-one-name');
    const playerTwoName = document.getElementById('player-two-name');

    playerOneName.textContent = gameController.getPlayers()[0].name;
    playerTwoName.textContent = gameController.getPlayers()[1].name;


    const squareOne = document.createElement("div");
    squareOne.classList.add("square");

    const squareTwo = document.createElement("div");
    squareTwo.classList.add("square");

    const squareThree = document.createElement("div");
    squareThree.classList.add("square");

    const squareFour = document.createElement("div");
    squareFour.classList.add("square");

    const squareFive = document.createElement("div");
    squareFive.classList.add("square");

    const squareSix = document.createElement("div");
    squareSix.classList.add("square");

    const squareSeven = document.createElement("div");
    squareSeven.classList.add("square");

    const squareEight = document.createElement("div");
    squareEight.classList.add("square");

    const squareNine = document.createElement("div");
    squareNine.classList.add("square");

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
        if (getBoardValue(i) === "" && gameController.canPlay()) {
          setBoardValue(i, gameController.getCurrentPlayer()["marker"]);
          element.textContent = getBoardValue(i);
          element.classList.add(`${gameController.getCurrentPlayer()["marker"]}`);

          // let game controller know when a square has succesfully been clicked
          let state = gameController.handleClick(board);
          if (state.winDetected){
            // adding winner message
            const winner = document.createElement("p");
            winner.textContent = `${state.winner["name"]} has won the game!`
            winner.classList.add(`${gameController.getCurrentPlayer()["marker"]}`);
            winner.classList.add("winner-text")
            winnerContainer.appendChild(winner)
          }
          else if (state.tieDetected){
            const winner = document.createElement("p");
            winner.textContent = "The game has ended in a tie!"
            winnerContainer.appendChild(winner)
          }

        }
      });
    });

    const resetButton = document.getElementById("reset-btn");
    resetButton.addEventListener("click", () => {
      // resets game container & winner container div to no child elements
      gameContainer.replaceChildren();
      winnerContainer.replaceChildren();
      gameController.reset();
    })
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

  let winState = {
    winDetected: false,
    tieDetected: false,
    winner: '',
  }

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
    let playerOne = playerFactory(prompt('Enter Player One Name:'), 'X', 1)
    let playerTwo = playerFactory(prompt('Enter Player Two Name:'), 'O', 2)

    // checks if prompts are skipped, adds defaults
    playerOne.name = playerOne.name === null ? 'Player One' : playerOne.name;
    playerTwo.name = playerTwo.name === null ? 'Player Two' : playerTwo.name;


    setPlayers(playerOne);
    setPlayers(playerTwo);
    
    // sets current player by default to player 1
    currentPlayer = players[0];

    gameboard.initializeBoard();
  }

  function handleClick(board) {
    let winDetected = checkWinStatus(board, winningCombinations);

    if (winDetected) {
      // a player has won
        winState.winner = currentPlayer;
        winState.winDetected = true;
    }
    else{
      // check for tie
      if (checkTieStatus(board)) {
        // there is a tie
        winState.tieDetected = true;
      } else {
        // no tie && no winner, keep playing
        winState.winDetected = false;
        winState.tieDetected = false;
        winState.winner = '';
        // checks playerID of current player, assigns to the other player in arrays
        currentPlayer = currentPlayer.playerID == 1 ? players[1] : players[0];
      }
      
    }
    return winState;
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

  function checkTieStatus(currentBoard){
    return currentBoard.every((element)=> element !== '')
  }

  function canPlay(){
    return winState.winDetected == false && winState.tieDetected == false;
  }

  function reset(){
    players = [];
    currentPlayer = null;

    winState = {
      winDetected: false,
      tieDetected: false,
      winner: '',
    }

    startGame();
  }

  return { getPlayers, getCurrentPlayer, startGame, handleClick, canPlay, reset };
})();

gameController.startGame();
