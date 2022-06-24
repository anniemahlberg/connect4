// CREATING BOARD
const board = [[]];

for (i = 0; i < 6; i++) {
    board.push([])
}

const table = document.getElementsByTagName('table')[0];

function createBoard(boardArray) {
    let row = document.createElement('tr');
    for (i = 0; i < boardArray.length; i++) {
        let cell = document.createElement('td');
        row.appendChild(cell);
    }
        table.appendChild(row);
}

for (j = 0; j < 6; j++) {
    createBoard(board);
}

// CURRENT PLAYER
const player1Color = "rgb(119, 69, 165)";
const player2Color = "rgb(83, 128, 0)";
let currentPlayer = ""
let player1Name = ""
let player2Name = ""

function setPlayerName() {
    let player1NameInput = document.getElementsByTagName("input")[0].value
    let player2NameInput = document.getElementsByTagName("input")[1].value

    if (player1NameInput) {
        player1Name = player1NameInput
    } else {
        player1Name = "Player 1"
    }
    
    if (player2NameInput) {
        player2Name = player2NameInput
    } else if (document.getElementById("player2").style.display === "initial") {
        player2Name = "Player 2"
    } else {
        player2Name = "Computer"
    }
}

function getRandomPlayer() {
    let randomNumber = Math.floor(Math.random() * 2)

    if (randomNumber === 0) {
        currentPlayer = "player1"
    } else if (document.getElementById("player2").style.display === "initial") {
        currentPlayer = "player2"
    } else {
        currentPlayer = "player1"
    }

    document.getElementById("turn").innerText = `${currentPlayer}, you will be first!`
}

function changePlayer(event) {
    const currentCell = event.target
    setPlayerName();

    if (currentPlayer === 'player1' && currentCell.tagName === "TD" && document.getElementById("player2").style.display === "initial") {
        currentPlayer = 'player2'
        document.getElementById("turn").innerText = `${player2Name}, you are up!`
    } else if (currentPlayer === 'player1' && currentCell.tagName === "TD" && document.getElementById("player2").style.display === "none") {
        currentPlayer = 'computer'
        document.getElementById("turn").innerText = `${player2Name}, you are up!`
    } else if (currentPlayer === 'player2' && currentCell.tagName === "TD") {
        currentPlayer = 'player1'
        document.getElementById("turn").innerText = `${player1Name}, your turn!`
    }
}
      
// DROP CHIP
table.addEventListener('click', checkIfFull)

function checkIfFull(event) {
    let currentCell = event.target;
    setPlayerName();

    if (currentCell.tagName === "TD" && currentCell.className === "" && document.getElementById("turn").innerText !== `${player1Name} WINS!!!` && document.getElementById("turn").innerText !== `${player2Name} WINS!!!`) {
        dropChip(event);
        changePlayer(event);
    }
}

function dropChip(event) {
    const currentCell = event.target
    const index = Array.from(currentCell.parentElement.children).indexOf(currentCell)

    for (i = 5; i >= 0; i--) {
        let bottomCell = document.getElementsByTagName("tr")[i].childNodes[index]
        if (bottomCell.className === "" && currentCell.tagName === "TD") {
            bottomCell.className = currentPlayer;
            break;
        } else {
            continue;
        }
    }  
}

// START NEW GAME BUTTONS
const header = document.getElementsByTagName('header')[0];
header.addEventListener('click', createNewGame)

function createNewGame(event) {
    let multiGameButton  = document.getElementById("newMultiGame")
    let singleGameButton = document.getElementById("newSingleGame")
    let allCells = document.querySelectorAll("td")

    if (event.target === multiGameButton) {
        document.getElementById("landingScreen").style.display = "none";
        document.getElementById("players").style.display = "initial";
        document.getElementById("table").style.display = "initial"
        document.getElementById("player2").style.display = "initial";
        document.getElementById("computer").style.display = "none";
        for (i in allCells) {
            allCells[i].className = ""
        }
        getRandomPlayer()
    }

    if (event.target === singleGameButton) {
        document.getElementById("landingScreen").style.display = "none";
        document.getElementById("players").style.display = "initial";
        document.getElementById("table").style.display = "initial"
        document.getElementById("player2").style.display = "none"     
        document.getElementById("computer").style.display = "initial" 
        for (i in allCells) {
            allCells[i].className = ""
        }
        getRandomPlayer()
    }
}

// COMPUTER FUNCTIONALITY

table.addEventListener('click', delayComputer)

function computerDropChip() {
    setPlayerName();
    
    if (currentPlayer === "computer") {
        function getRandomCell() {
            let randomCell = Math.floor(Math.random() * 7)
            return randomCell
        }
        let randomCell = getRandomCell()

        for (i = 5; i >= 0; i--) {
            let bottomCell = document.getElementsByTagName("tr")[i].childNodes[randomCell]
            if (i === 0 && bottomCell.className !== "") {
                randomCell = getRandomCell();
                i=6;
                continue;
            }

            if (bottomCell.className === "") {
                bottomCell.className = "player2";
                break;
            } else {
                continue;
            }
        }
        
        currentPlayer = "player1"

        if (document.getElementById("turn").innerText !== `${player1Name} WINS!!!` && document.getElementById("turn").innerText !== `Computer WINS!!!`) {
            document.getElementById("turn").innerText = `${player1Name}, your turn!`
        }
    }

}

function delayComputer() {
    setPlayerName();

    if (document.getElementById("turn").innerText !== `${player1Name} WINS!!!` || document.getElementById("turn").innerText !== `Computer WINS!!!`) {
        setTimeout("computerDropChip()", 800)
    }
}

// VERTICAL WINNER

table.addEventListener('click', verticalWinner)

function verticalWinner() {
    setPlayerName();

    let row = document.getElementsByTagName("tr");

    for (i = 0; i < 7; i++) {
        if (row[0].childNodes[i].className === "player1" && row[1].childNodes[i].className === "player1" && row[2].childNodes[i].className === "player1" && row[3].childNodes[i].className === "player1") {
            document.getElementById("turn").innerText = `${player1Name} WINS!!!`
        } else if (row[1].childNodes[i].className === "player1" && row[2].childNodes[i].className === "player1" && row[3].childNodes[i].className === "player1" && row[4].childNodes[i].className === "player1") {
            document.getElementById("turn").innerText = `${player1Name} WINS!!!`
        } else if (row[2].childNodes[i].className === "player1" && row[3].childNodes[i].className === "player1" && row[4].childNodes[i].className === "player1" && row[5].childNodes[i].className === "player1") {
            document.getElementById("turn").innerText = `${player1Name} WINS!!!`
        }
    }

    for (i = 0; i < 7; i++) {
        if (row[0].childNodes[i].className === "player2" && row[1].childNodes[i].className === "player2" && row[2].childNodes[i].className === "player2" && row[3].childNodes[i].className === "player2") {
            document.getElementById("turn").innerText = `${player2Name} WINS!!!`
        } else if (row[1].childNodes[i].className === "player2" && row[2].childNodes[i].className === "player2" && row[3].childNodes[i].className === "player2" && row[4].childNodes[i].className === "player2") {
            document.getElementById("turn").innerText = `${player2Name} WINS!!!`
        } else if (row[2].childNodes[i].className === "player2" && row[3].childNodes[i].className === "player2" && row[4].childNodes[i].className === "player2" && row[5].childNodes[i].className === "player2") {
            document.getElementById("turn").innerText = `${player2Name} WINS!!!`
        }
    }
}

// HORIZONTAL WINNER

table.addEventListener('click', horizontalWinner)

function horizontalWinner() {
    setPlayerName();

    let row = document.getElementsByTagName("tr");
    for (i = 5; i >= 0; i--) {
        if (row[i].childNodes[0].className === "player1" && row[i].childNodes[1].className === "player1" && row[i].childNodes[2].className === "player1" && row[i].childNodes[3].className === "player1") {
            document.getElementById("turn").innerText = `${player1Name} WINS!!!`
        } else if (row[i].childNodes[1].className === "player1" && row[i].childNodes[2].className === "player1" && row[i].childNodes[3].className === "player1" && row[i].childNodes[4].className === "player1") {
            document.getElementById("turn").innerText = `${player1Name} WINS!!!`
        } else if (row[i].childNodes[2].className === "player1" && row[i].childNodes[3].className === "player1" && row[i].childNodes[4].className === "player1" && row[i].childNodes[5].className === "player1") {
            document.getElementById("turn").innerText = `${player1Name} WINS!!!`
        } else if (row[i].childNodes[3].className === "player1" && row[i].childNodes[4].className === "player1" && row[i].childNodes[5].className === "player1" && row[i].childNodes[6].className === "player1") {
            document.getElementById("turn").innerText = `${player1Name} WINS!!!`
        }
    }

    for (i = 5; i >= 0; i--) {
        if (row[i].childNodes[0].className === "player2" && row[i].childNodes[1].className === "player2" && row[i].childNodes[2].className === "player2" && row[i].childNodes[3].className === "player2") {
            document.getElementById("turn").innerText = `${player2Name} WINS!!!`
        } else if (row[i].childNodes[1].className === "player2" && row[i].childNodes[2].className === "player2" && row[i].childNodes[3].className === "player2" && row[i].childNodes[4].className === "player2") {
            document.getElementById("turn").innerText = `${player2Name} WINS!!!`
        } else if (row[i].childNodes[2].className === "player2" && row[i].childNodes[3].className === "player2" && row[i].childNodes[4].className === "player2" && row[i].childNodes[5].className === "player2") {
            document.getElementById("turn").innerText = `${player2Name} WINS!!!`
        } else if (row[i].childNodes[3].className === "player2" && row[i].childNodes[4].className === "player2" && row[i].childNodes[5].className === "player2" && row[i].childNodes[6].className === "player2") {
            document.getElementById("turn").innerText = `${player2Name} WINS!!!`
        }
    }
}

// DIAGONAL WINNER

table.addEventListener('click', diagonalWinner)

function diagonalWinner() {
    setPlayerName();

    let row = document.getElementsByTagName("tr")

    if (row[5].childNodes[3].className === "player1" && row[4].childNodes[4].className === "player1" && row[3].childNodes[5].className === "player1" && row[2].childNodes[6].className === "player1") {
        document.getElementById("turn").innerText = `${player1Name} WINS!!!`
    }

    if (row[5].childNodes[2].className === "player1" && row[4].childNodes[3].className === "player1" && row[3].childNodes[4].className === "player1" && row[2].childNodes[5].className === "player1") {
        document.getElementById("turn").innerText = `${player1Name} WINS!!!`
    }

    if (row[4].childNodes[3].className === "player1" && row[3].childNodes[4].className === "player1" && row[2].childNodes[5].className === "player1" && row[1].childNodes[6].className === "player1") {
        document.getElementById("turn").innerText = `${player1Name} WINS!!!`
    }

    if (row[5].childNodes[1].className === "player1" && row[4].childNodes[2].className === "player1" && row[3].childNodes[3].className === "player1" && row[2].childNodes[4].className === "player1") {
        document.getElementById("turn").innerText = `${player1Name} WINS!!!`
    }

    if (row[5].childNodes[3].className === "player1" && row[4].childNodes[4].className === "player1" && row[3].childNodes[5].className === "player1" && row[2].childNodes[6].className === "player1") {
        document.getElementById("turn").innerText = `${player1Name} WINS!!!`
    }

    if (row[4].childNodes[2].className === "player1" && row[3].childNodes[3].className === "player1" && row[2].childNodes[4].className === "player1" && row[1].childNodes[5].className === "player1") {
        document.getElementById("turn").innerText = `${player1Name} WINS!!!`
    }

    if (row[3].childNodes[3].className === "player1" && row[2].childNodes[4].className === "player1" && row[1].childNodes[5].className === "player1" && row[0].childNodes[6].className === "player1") {
        document.getElementById("turn").innerText = `${player1Name} WINS!!!`
    }

    if (row[5].childNodes[0].className === "player1" && row[4].childNodes[1].className === "player1" && row[3].childNodes[2].className === "player1" && row[2].childNodes[3].className === "player1") {
        document.getElementById("turn").innerText = `${player1Name} WINS!!!`
    }

    if (row[4].childNodes[1].className === "player1" && row[3].childNodes[2].className === "player1" && row[2].childNodes[3].className === "player1" && row[1].childNodes[4].className === "player1") {
        document.getElementById("turn").innerText = `${player1Name} WINS!!!`
    }

    if (row[3].childNodes[2].className === "player1" && row[2].childNodes[3].className === "player1" && row[1].childNodes[4].className === "player1" && row[0].childNodes[5].className === "player1") {
        document.getElementById("turn").innerText = `${player1Name} WINS!!!`
    }

    if (row[4].childNodes[0].className === "player1" && row[3].childNodes[1].className === "player1" && row[2].childNodes[2].className === "player1" && row[1].childNodes[3].className === "player1") {
        document.getElementById("turn").innerText = `${player1Name} WINS!!!`
    }

    if (row[3].childNodes[1].className === "player1" && row[2].childNodes[2].className === "player1" && row[1].childNodes[3].className === "player1" && row[0].childNodes[4].className === "player1") {
        document.getElementById("turn").innerText = `${player1Name} WINS!!!`
    }

    if (row[3].childNodes[0].className === "player1" && row[2].childNodes[1].className === "player1" && row[1].childNodes[2].className === "player1" && row[0].childNodes[3].className === "player1") {
        document.getElementById("turn").innerText = `${player1Name} WINS!!!`
    }

    if (row[5].childNodes[3].className === "player1" && row[4].childNodes[2].className === "player1" && row[3].childNodes[1].className === "player1" && row[2].childNodes[0].className === "player1") {
        document.getElementById("turn").innerText = `${player1Name} WINS!!!`
    }

    if (row[5].childNodes[4].className === "player1" && row[4].childNodes[3].className === "player1" && row[3].childNodes[2].className === "player1" && row[2].childNodes[1].className === "player1") {
        document.getElementById("turn").innerText = `${player1Name} WINS!!!`
    }

    if (row[4].childNodes[3].className === "player1" && row[3].childNodes[2].className === "player1" && row[2].childNodes[1].className === "player1" && row[1].childNodes[0].className === "player1") {
        document.getElementById("turn").innerText = `${player1Name} WINS!!!`
    }

    if (row[5].childNodes[5].className === "player1" && row[4].childNodes[4].className === "player1" && row[3].childNodes[3].className === "player1" && row[2].childNodes[2].className === "player1") {
        document.getElementById("turn").innerText = `${player1Name} WINS!!!`
    }

    if (row[4].childNodes[4].className === "player1" && row[3].childNodes[3].className === "player1" && row[2].childNodes[2].className === "player1" && row[1].childNodes[1].className === "player1") {
        document.getElementById("turn").innerText = `${player1Name} WINS!!!`
    }

    if (row[3].childNodes[3].className === "player1" && row[2].childNodes[2].className === "player1" && row[1].childNodes[1].className === "player1" && row[0].childNodes[0].className === "player1") {
        document.getElementById("turn").innerText = `${player1Name} WINS!!!`
    }

    if (row[5].childNodes[6].className === "player1" && row[4].childNodes[5].className === "player1" && row[3].childNodes[4].className === "player1" && row[2].childNodes[3].className === "player1") {
        document.getElementById("turn").innerText = `${player1Name} WINS!!!`
    }

    if (row[4].childNodes[5].className === "player1" && row[3].childNodes[4].className === "player1" && row[2].childNodes[3].className === "player1" && row[1].childNodes[2].className === "player1") {
        document.getElementById("turn").innerText = `${player1Name} WINS!!!`
    }

    if (row[3].childNodes[4].className === "player1" && row[2].childNodes[3].className === "player1" && row[1].childNodes[2].className === "player1" && row[0].childNodes[1].className === "player1") {
        document.getElementById("turn").innerText = `${player1Name} WINS!!!`
    }

    if (row[4].childNodes[6].className === "player1" && row[3].childNodes[5].className === "player1" && row[2].childNodes[4].className === "player1" && row[1].childNodes[3].className === "player1") {
        document.getElementById("turn").innerText = `${player1Name} WINS!!!`
    }

    if (row[3].childNodes[5].className === "player1" && row[2].childNodes[4].className === "player1" && row[1].childNodes[3].className === "player1" && row[0].childNodes[2].className === "player1") {
        document.getElementById("turn").innerText = `${player1Name} WINS!!!`
    }

    if (row[3].childNodes[6].className === "player1" && row[2].childNodes[5].className === "player1" && row[1].childNodes[4].className === "player1" && row[0].childNodes[3].className === "player1") {
        document.getElementById("turn").innerText = `${player1Name} WINS!!!`
    }

    // player 2

    if (row[5].childNodes[3].className === "player2" && row[4].childNodes[4].className === "player2" && row[3].childNodes[5].className === "player2" && row[2].childNodes[6].className === "player2") {
        document.getElementById("turn").innerText = `${player2Name} WINS!!!`
    }

    if (row[5].childNodes[2].className === "player2" && row[4].childNodes[3].className === "player2" && row[3].childNodes[4].className === "player2" && row[2].childNodes[5].className === "player2") {
        document.getElementById("turn").innerText = `${player2Name} WINS!!!`
    }

    if (row[4].childNodes[3].className === "player2" && row[3].childNodes[4].className === "player2" && row[2].childNodes[5].className === "player2" && row[1].childNodes[6].className === "player2") {
        document.getElementById("turn").innerText = `${player2Name} WINS!!!`
    }

    if (row[5].childNodes[1].className === "player2" && row[4].childNodes[2].className === "player2" && row[3].childNodes[3].className === "player2" && row[2].childNodes[4].className === "player2") {
        document.getElementById("turn").innerText = `${player2Name} WINS!!!`
    }

    if (row[5].childNodes[3].className === "player2" && row[4].childNodes[4].className === "player2" && row[3].childNodes[5].className === "player2" && row[2].childNodes[6].className === "player2") {
        document.getElementById("turn").innerText = `${player2Name} WINS!!!`
    }

    if (row[4].childNodes[2].className === "player2" && row[3].childNodes[3].className === "player2" && row[2].childNodes[4].className === "player2" && row[1].childNodes[5].className === "player2") {
        document.getElementById("turn").innerText = `${player2Name} WINS!!!`
    }

    if (row[3].childNodes[3].className === "player2" && row[2].childNodes[4].className === "player2" && row[1].childNodes[5].className === "player2" && row[0].childNodes[6].className === "player2") {
        document.getElementById("turn").innerText = `${player2Name} WINS!!!`
    }

    if (row[5].childNodes[0].className === "player2" && row[4].childNodes[1].className === "player2" && row[3].childNodes[2].className === "player2" && row[2].childNodes[3].className === "player2") {
        document.getElementById("turn").innerText = `${player2Name} WINS!!!`
    }

    if (row[4].childNodes[1].className === "player2" && row[3].childNodes[2].className === "player2" && row[2].childNodes[3].className === "player2" && row[1].childNodes[4].className === "player2") {
        document.getElementById("turn").innerText = `${player2Name} WINS!!!`
    }

    if (row[3].childNodes[2].className === "player2" && row[2].childNodes[3].className === "player2" && row[1].childNodes[4].className === "player2" && row[0].childNodes[5].className === "player2") {
        document.getElementById("turn").innerText = `${player2Name} WINS!!!`
    }

    if (row[4].childNodes[0].className === "player2" && row[3].childNodes[1].className === "player2" && row[2].childNodes[2].className === "player2" && row[1].childNodes[3].className === "player2") {
        document.getElementById("turn").innerText = `${player2Name} WINS!!!`
    }

    if (row[3].childNodes[1].className === "player2" && row[2].childNodes[2].className === "player2" && row[1].childNodes[3].className === "player2" && row[0].childNodes[4].className === "player2") {
        document.getElementById("turn").innerText = `${player2Name} WINS!!!`
    }

    if (row[3].childNodes[0].className === "player2" && row[2].childNodes[1].className === "player2" && row[1].childNodes[2].className === "player2" && row[0].childNodes[3].className === "player2") {
        document.getElementById("turn").innerText = `${player2Name} WINS!!!`
    }

    if (row[5].childNodes[3].className === "player2" && row[4].childNodes[2].className === "player2" && row[3].childNodes[1].className === "player2" && row[2].childNodes[0].className === "player2") {
        document.getElementById("turn").innerText = `${player2Name} WINS!!!`
    }

    if (row[5].childNodes[4].className === "player2" && row[4].childNodes[3].className === "player2" && row[3].childNodes[2].className === "player2" && row[2].childNodes[1].className === "player2") {
        document.getElementById("turn").innerText = `${player2Name} WINS!!!`
    }

    if (row[4].childNodes[3].className === "player2" && row[3].childNodes[2].className === "player2" && row[2].childNodes[1].className === "player2" && row[1].childNodes[0].className === "player2") {
        document.getElementById("turn").innerText = `${player2Name} WINS!!!`
    }

    if (row[5].childNodes[5].className === "player2" && row[4].childNodes[4].className === "player2" && row[3].childNodes[3].className === "player2" && row[2].childNodes[2].className === "player2") {
        document.getElementById("turn").innerText = `${player2Name} WINS!!!`
    }

    if (row[4].childNodes[4].className === "player2" && row[3].childNodes[3].className === "player2" && row[2].childNodes[2].className === "player2" && row[1].childNodes[1].className === "player2") {
        document.getElementById("turn").innerText = `${player2Name} WINS!!!`
    }

    if (row[3].childNodes[3].className === "player2" && row[2].childNodes[2].className === "player2" && row[1].childNodes[1].className === "player2" && row[0].childNodes[0].className === "player2") {
        document.getElementById("turn").innerText = `${player2Name} WINS!!!`
    }

    if (row[5].childNodes[6].className === "player2" && row[4].childNodes[5].className === "player2" && row[3].childNodes[4].className === "player2" && row[2].childNodes[3].className === "player2") {
        document.getElementById("turn").innerText = `${player2Name} WINS!!!`
    }

    if (row[4].childNodes[5].className === "player2" && row[3].childNodes[4].className === "player2" && row[2].childNodes[3].className === "player2" && row[1].childNodes[2].className === "player2") {
        document.getElementById("turn").innerText = `${player2Name} WINS!!!`
    }

    if (row[3].childNodes[4].className === "player2" && row[2].childNodes[3].className === "player2" && row[1].childNodes[2].className === "player2" && row[0].childNodes[1].className === "player2") {
        document.getElementById("turn").innerText = `${player2Name} WINS!!!`
    }

    if (row[4].childNodes[6].className === "player2" && row[3].childNodes[5].className === "player2" && row[2].childNodes[4].className === "player2" && row[1].childNodes[3].className === "player2") {
        document.getElementById("turn").innerText = `${player2Name} WINS!!!`
    }

    if (row[3].childNodes[5].className === "player2" && row[2].childNodes[4].className === "player2" && row[1].childNodes[3].className === "player2" && row[0].childNodes[2].className === "player2") {
        document.getElementById("turn").innerText = `${player2Name} WINS!!!`
    }

    if (row[3].childNodes[6].className === "player2" && row[2].childNodes[5].className === "player2" && row[1].childNodes[4].className === "player2" && row[0].childNodes[3].className === "player2") {
        document.getElementById("turn").innerText = `${player2Name} WINS!!!`
    }
}

// TIE GAME

table.addEventListener("click", tieGame)

function tieGame() {
    let tally = 0;
    for (i = 0; i < 7; i++) {
        for (j = 0; j < 6; j++) {
            let eachCell = document.getElementsByTagName("tr")[j].childNodes[i];
            if (eachCell.className !== "") {
                tally++;
            } else {
                continue;
            }
        }
    }

    if (tally === 42) {
        document.getElementById("turn").innerText = "TIE GAME"
    }
}
