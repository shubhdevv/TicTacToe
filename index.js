const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#status-text");
const restartBtn = document.querySelector("#restart");
const winCondition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currPlayer = "X";
let running = false;

iniGame();

function iniGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currPlayer}'s turn`;
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");
    if(options[cellIndex] != "" || !running) {
        return;
    }

    updateCell(this,cellIndex);
    checkWinner();
}

function updateCell(cell,index) {
    options[index] = currPlayer;
    cell.textContent = currPlayer;
}

function changePlayer() {
    currPlayer = (currPlayer == "X") ? "0" : "X";
    statusText.textContent = `${currPlayer}'s turn`;
}

function checkWinner() {
    let roundWon = false;

    for(let i=0;i<winCondition.length;i++) {
        const condition = winCondition[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == "") {
            continue;
        } 

        if(cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        }
    }

        if(roundWon == true) {
            statusText.textContent = `${currPlayer} has won`;
            running = false;
        }
        else if(!options.includes("")) {
            statusText.textContent = `Draw!`;
            running = false;
        }
        else {
            changePlayer(); 
        }
}

function restartGame() {
    currPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currPlayer}'s turn`;

    cells.forEach(cell => cell.textContent = "");
    running = true;
}

