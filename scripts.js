const boxes = document.querySelectorAll(".box.blank");
const gameInformation = document.querySelector(".game-info");
const actionsDiv = document.querySelector(".actions");
const resetButton = document.querySelector("#reset");

boxes.forEach(box => {
    box.addEventListener("click", toggleBox);
});
resetButton.addEventListener("click", resetGame);


// True is for crosses, false for nought
let currentTurn = true;
let boxesUsed = 0;
let xPositions = [];
let oPositions = [];

const winningPositions = [
    123,
    456,
    789,
    147,
    258,
    369,
    159,
    357
]

function toggleBox(event) {
    boxesUsed++;
    const currentBox = event.srcElement;
    const position = currentBox.id[currentBox.id.length - 1];;

    currentBox.classList.remove("blank");
    if (currentTurn) {
        currentBox.classList.add("cross");
        xPositions.push(position);
        checkResults(xPositions, "Crosses");

    } else {
        oPositions.push(position)
        currentBox.classList.add("nought");
        checkResults(oPositions, "Nought");
    }

    currentTurn = !currentTurn;
    currentBox.removeEventListener("click", toggleBox);
}


function checkResults(array, current) {
    let positionsToCheck = array.sort().join("");


    winningPositions.forEach(winningCombination => {
        let winningNumbers = winningCombination.toString().split("");
        if (positionsToCheck.includes(winningNumbers[0]) &&
            positionsToCheck.includes(winningNumbers[1]) &&
            positionsToCheck.includes(winningNumbers[2])) {
            endOfGame(current);
            return;
        }
        if (boxesUsed >= 9) {
            endOfGame();
        }
    });
}

function endOfGame(winner = "none") {
    boxesToReset = document.querySelectorAll(".box.blank");
    boxesToReset.forEach(box => {
        box.removeEventListener("click", toggleBox);
    });
    actionsDiv.classList.add("endGame")
    if (winner === "none") {
        gameInformation.textContent = "Its a draw!"
    } else {
        gameInformation.textContent = `${winner} wins!`;
    }
}

function resetGame() {
    gameInformation.textContent = "Place 3 in a line to win the match!";
    actionsDiv.classList.remove("endGame")
    currentTurn = !currentTurn;
    boxesUsed = 0;
    xPositions = [];
    oPositions = [];
    boxesToReset = document.querySelectorAll(".box");
    boxesToReset.forEach(box => {
        box.addEventListener("click", toggleBox);
        box.classList = "";
        box.classList.add("box");
        box.classList.add("blank");
    })
}
