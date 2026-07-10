// =======================================
// Tic Tac Toe Ultimate
// =======================================

// DOM Elements
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
const drawScore = document.getElementById("drawScore");
const historyList = document.getElementById("historyList");

// Game Variables
let currentPlayer = "X";
let gameActive = true;

let board = Array(9).fill("");

let scores = {

    X: Number(localStorage.getItem("scoreX")) || 0,

    O: Number(localStorage.getItem("scoreO")) || 0,

    draw: Number(localStorage.getItem("draw")) || 0

};

const winPatterns = [

    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]

];

// ==============================
// Initialize
// ==============================

updateScore();

cells.forEach(cell=>{

    cell.addEventListener("click",handleMove);

});

restartBtn.addEventListener("click",restartGame);

// ==============================
// Handle Click
// ==============================

function handleMove(e){

    const index=e.target.dataset.index;

    if(board[index]!=="" || !gameActive)
        return;

    placeMark(index,currentPlayer);

    if(checkWinner()) return;

    switchPlayer();

}

// ==============================
// Place Mark
// ==============================

function placeMark(index,player){

    board[index]=player;

    cells[index].textContent=player;

    cells[index].classList.add(player.toLowerCase());

}

// ==============================
// Switch Player
// ==============================

function switchPlayer(){

    currentPlayer=currentPlayer==="X"?"O":"X";

    statusText.textContent=`Player ${currentPlayer}'s Turn`;

}

// ==============================
// Winner
// ==============================

function checkWinner(){

    for(const pattern of winPatterns){

        const[a,b,c]=pattern;

        if(

            board[a] &&
            board[a]===board[b] &&
            board[a]===board[c]

        ){

            finishGame(pattern);

            return true;

        }

    }

    if(!board.includes("")){

        statusText.textContent="🤝 Match Draw";

        scores.draw++;

        saveScore();

        updateScore();

        addHistory("🤝 Draw");

        gameActive=false;

        return true;

    }

    return false;

}

// ==============================
// Finish Game
// ==============================

function finishGame(pattern){

    gameActive=false;

    pattern.forEach(index=>{

        cells[index].classList.add("winner");

    });

    statusText.textContent=`🎉 Player ${currentPlayer} Wins!`;

    scores[currentPlayer]++;

    saveScore();

    updateScore();

    addHistory(`🏆 Player ${currentPlayer} Won`);

}

// ==============================
// Restart
// ==============================

function restartGame(){

    board.fill("");

    gameActive=true;

    currentPlayer="X";

    statusText.textContent="Player X's Turn";

    cells.forEach(cell=>{

        cell.textContent="";

        cell.className="cell";

    });

}

// ==============================
// Scoreboard
// ==============================

function updateScore(){

    if(scoreX) scoreX.textContent=scores.X;

    if(scoreO) scoreO.textContent=scores.O;

    if(drawScore) drawScore.textContent=scores.draw;

}

// ==============================
// Save
// ==============================

function saveScore(){

    localStorage.setItem("scoreX",scores.X);

    localStorage.setItem("scoreO",scores.O);

    localStorage.setItem("draw",scores.draw);

}

// ==============================
// Match History
// ==============================

function addHistory(result){

    if(!historyList) return;

    const item=document.createElement("li");

    item.textContent=result;

    historyList.prepend(item);

    while(historyList.children.length>10){

        historyList.removeChild(historyList.lastChild);

    }

}
