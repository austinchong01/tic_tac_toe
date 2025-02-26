function createBoard(){
    let grid = ["", "", "",
                 "", "", "",
                 "", "", ""];
    const getBoard = () => grid;
    const updateBoard = (marker, position) => grid[position] = marker;
    return { getBoard, updateBoard };
}

function gameController(name1, name2){
    const board = createBoard();
    const display = displayController();
    
    const player1 = {name: name1, marker: "X"};
    const player2 = {name: name2, marker: "O"};
    const players = [player1, player2];

    let currPlayer = players[0];
    display.screen(currPlayer.name + "'s " + "turn");
    display.updateDOM(board.getBoard());

    function switchPlayer() {
        currPlayer = (currPlayer == players[0] ? players[1] : players[0]);
    }

    function validMove(position) {
        const grid = board.getBoard();
        console.log(grid);
        if(grid[position] == "X" || grid[position] == "O"){
            console.log("invalid input");
            return false;
        } else {
            return true;
        }
    }

    function checkWinner(){
        const grid = board.getBoard();
        for (let i = 0; i < 3; i++){
            // 0 1 2
            // 3 4 5
            // 6 7 8

            //i = 0: 0 1 2, 0 3 6
            //i = 1: 3 4 5, 1 4 7
            //i = 2: 6 7 8, 2 5 8
            let j = i*3;
            if ((grid[i] != "" && grid[i] == grid[i+3] && grid[i] == grid[i+6]) ||  //column check
                (grid[j] != "" && grid[j] == grid[j+1] && grid[j] == grid[j+2])){   //row check
                return true;
            }
        }
        //diagonal check
        if ((grid[0] != "" && grid[0] == grid[4] && grid[0] == grid[8]) || 
            (grid[2] != "" && grid[2] == grid[4] && grid[2] == grid[6])){
            return true;
        }
        return false;
    }

    function checkTie(){
        const grid = board.getBoard();
        if (!grid.includes("")){
            display.screen("Cat's Game");
            return true;
        } else {
            return false;
        }
    }

    const playRound = (position) => {
        if (validMove(position) && !checkWinner() && !checkTie()){

            board.updateBoard(currPlayer.marker, position);
            display.updateDOM(board.getBoard());

            if (checkWinner()){
                display.screen(currPlayer.name + " wins!");
                return;
            }
            if (checkTie()) return;
            switchPlayer();

            display.screen(currPlayer.name + "'s " + "turn")
        }
    };

    return {playRound};
}

function displayController(){
    //print to DOM
    function updateDOM(grid){
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                const cell = document.querySelector(`tr:nth-child(${i+1}) td:nth-child(${j+1})`);
                cell.textContent = grid[i*3 + j];
            }
        }
    }

    function screen(text) {
        const div = document.querySelector(".text");
        div.textContent = `${text}`;
    }

    return {updateDOM, screen};
}

const start = document.querySelector(".start");
const modal = document.querySelector("dialog");
const submit = document.querySelector("[data-close-modal]")

start.addEventListener("click", () => {
    modal.showModal();
})

submit.addEventListener("click", (event) => {
    event.preventDefault();
    let name1 = document.querySelector("#player1");
    let name2 = document.querySelector("#player2");
    const game = gameController(name1.value, name2.value);
    modal.close();
    name1.value = "";
    name2.value = "";

    //add X or O to DOM based on cell clicked
    document.addEventListener("click", (event) => {
        let position = event.target.getAttribute("data-index");
        if (position != null){
            game.playRound(position);
        }
    });
})