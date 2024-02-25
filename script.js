var playersTurn = 'X';
const boardContainer = document.getElementById('board-container');
const playersTurnText = document.getElementById('playersTurnText');
const board = document.getElementById('gameboard');
const fields = document.querySelectorAll('.field');
const gameOverScreen = document.getElementById('gameOverScreen');
const whoWonText = document.getElementById('whoWonText');

playersTurnText.innerText = playersTurn + " 's turn";

fields.forEach(field => {
    field.addEventListener("click", () => click(field));
})

function click(field) {
    if (!field.classList.contains('X')
        && !field.classList.contains('O')) {
            field.classList.add(playersTurn);
            playerWon(whoWon());
        if (playersTurn == 'X') playersTurn = 'O'; else playersTurn = 'X';
        playersTurnText.innerText = playersTurn + " 's turn";
    }
}

function whoWon() {
    var usedFields = 0;
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let i of winCombinations) {
        const [a, b, c] = i;
        if (fields[a].classList.contains(playersTurn) &&
            fields[b].classList.contains(playersTurn) &&
            fields[c].classList.contains(playersTurn)) {
                if (playersTurn == 'X') return 1; else return 2;
            }
    }

    fields.forEach(field => {
        if (field.classList.contains('X') || field.classList.contains('O')) usedFields++;
    });
    if (usedFields == fields.length) {
        return 3;
    }

    return 0;
}

function playerWon(player) {
    if (player == 1) {
        gameOverScreen.classList.remove('hidden');
        whoWonText.innerText = "Player X Won!"
        boardContainer.classList.add('hidden');
    } else if (player == 2) {
        gameOverScreen.classList.remove('hidden');
        whoWonText.innerText = "Player O Won!"
        boardContainer.classList.add('hidden');
    } else if(player == 3) {
        gameOverScreen.classList.remove('hidden');
        whoWonText.innerText = "Draw"
        boardContainer.classList.add('hidden');
    }
}

function newGame() {
    gameOverScreen.classList.add('hidden');

    fields.forEach(field => {
        field.classList.remove('X');
        field.classList.remove('O');
    })

    boardContainer.classList.remove('hidden');
}