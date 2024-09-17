let gameRunning = true;
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = 'X';

const winMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn!`;

const scoreDisplay = document.querySelector('.score');
scoreDisplay.innerHTML = currentPlayerTurn();

document.querySelectorAll('.box').forEach((box) => box.addEventListener('click', boxClicked));
document.querySelector('.reset').addEventListener('click', restart);

function boxClicked(event) {
    const boxClick = event.target;
    const boxClickIndex = parseInt(boxClick.getAttribute('data-cell-index'));

    if (board[boxClickIndex] !== "" || !gameRunning) {
        return;
    }

    boxPlayed(boxClick, boxClickIndex);
    validate();
}

function boxPlayed(boxClick, boxClickIndex) {
    board[boxClickIndex] = currentPlayer;
    boxClick.innerHTML = currentPlayer;
}

const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function validate() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const [a, b, c] = winCondition[i].map((index) => board[index]);
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        scoreDisplay.innerHTML = winMessage();
        gameRunning = false;
        return;
    }

    let roundDraw = !board.includes("");
    if (roundDraw) {
        scoreDisplay.innerHTML = drawMessage();
        gameRunning = false;
        return;
    }

    changePlayer();
}

function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    scoreDisplay.innerHTML = currentPlayerTurn();
}

function restart() {
    gameRunning = true;
    currentPlayer = 'X';
    board = ["", "", "", "", "", "", "", "", ""];
    scoreDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.box').forEach((box) => box.innerHTML = "");
}
