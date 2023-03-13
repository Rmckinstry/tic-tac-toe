// gameboard module
const gameboard = (() =>{
    let board = ['X','0','X','X','0','X','X','0','X',];
    return {board};
})();

const gameController = (()=>{
    function initialize(){
        let gameContainer = document.getElementById("container")
        
        const squareOne = document.createElement('div');
        squareOne.classList.add("square");
        squareOne.setAttribute("id", "squareOne")

        const squareTwo = document.createElement('div');
        squareTwo.classList.add("square");
        squareTwo.setAttribute("id", "squareTwo")

        const squareThree = document.createElement('div');
        squareThree.classList.add("square");
        squareThree.setAttribute("id", "squareThree")

        const squareFour = document.createElement('div');
        squareFour.classList.add("square");
        squareFour.setAttribute("id", "squareFour")

        const squareFive = document.createElement('div');
        squareFive.classList.add("square");
        squareFive.setAttribute("id", "squareFive")

        const squareSix = document.createElement('div');
        squareSix.classList.add("square");
        squareSix.setAttribute("id", "squareSix")

        const squareSeven = document.createElement('div');
        squareSeven.classList.add("square");
        squareSeven.setAttribute("id", "squareSeven")

        const squareEight = document.createElement('div');
        squareEight.classList.add("square");
        squareEight.setAttribute("id", "squareEight")

        const squareNine = document.createElement('div');
        squareNine.classList.add("square");
        squareNine.setAttribute("id", "squareNine")

        gameContainer.appendChild(squareOne);
        gameContainer.appendChild(squareTwo);
        gameContainer.appendChild(squareThree);
        gameContainer.appendChild(squareFour);
        gameContainer.appendChild(squareFive);
        gameContainer.appendChild(squareSix);
        gameContainer.appendChild(squareSeven);
        gameContainer.appendChild(squareEight);
        gameContainer.appendChild(squareNine);
    }

    return{initialize}
})()

// player factory
const playerFactory = (name) =>{
    return {name}
}

gameController.initialize();