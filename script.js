const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let gameActive = true;

let gameState = ["","","","","","","","",""];

const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function handleCellClick(){

    const index = this.dataset.index;

    if(gameState[index] !== "" || !gameActive){
        return;
    }

    gameState[index] = currentPlayer;
    this.textContent = currentPlayer;

    checkWinner();
}

function checkWinner(){

    let roundWon = false;

    for(let condition of winningConditions){

        const a = gameState[condition[0]];
        const b = gameState[condition[1]];
        const c = gameState[condition[2]];

        if(a === "" || b === "" || c === ""){
            continue;
        }

        if(a === b && b === c){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    if(!gameState.includes("")){
        statusText.textContent = "🤝 Match Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function restartGame(){

    currentPlayer = "X";
    gameActive = true;
    gameState = ["","","","","","","","",""];

    statusText.textContent = "Player X's Turn";

    cells.forEach(cell=>{
        cell.textContent="";
    });
}

cells.forEach(cell=>cell.addEventListener("click",handleCellClick));

restartBtn.addEventListener("click",restartGame);