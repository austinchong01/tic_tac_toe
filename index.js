function createBoard(){
    let grid = ["", "", "",
                 "", "", "",
                 "", "", ""];
    const getBoard = () => grid;
    const updateBoard = (marker, position) => grid[position] = marker;
    const printBoard = () => {
        for (let i = 0; i < grid.length; i += 3){
            console.log(grid[i], grid[i+1], grid[i+2]);
        }
    };
    return { getBoard, updateBoard, printBoard };
}

const game = (function gameController(){
    const board = createBoard();
    const display = displayController();
    
    const player1 = {name: "p1", marker: "X"};
    const player2 = {name: "p2", marker: "O"};
    const players = [player1, player2];

    let currPlayer = players[0]; //first player is X
    display.screen(currPlayer.marker + "'s " + "turn");
    //console.log(currPlayer.marker + "'s " + "turn")

    function switchPlayer() {
        currPlayer = (currPlayer == players[0] ? players[1] : players[0]);
    };

    function validMove(position) {
        const grid = board.getBoard();
        if(grid[position] == "X" || grid[position] == "O"){
            console.log("invalid input");
            return false;
        } else {
            return true;
        }
    };

    function checkWinner(){
        const grid = board.getBoard();
        for (let i = 0; i < 3; i++){
            // 0 1 2
            // 3 4 5
            // 6 7 8

            //i = 0: 0 1 2, 0 3 6
            //i = 1: 3 4 5, 1 4 7
            //i = 2: 6 7 8, 2 5 8

            //column check
            if (grid[i] != "" && grid[i] == grid[i+3] && grid[i] == grid[i+6]) return true;
            //row check
            let j = i*3;
            if (grid[j] != "" && grid[j] == grid[j+1] && grid[j] == grid[j+2]) return true;
        }
        //diagonal check
        if ((grid[0] != "" && grid[0] == grid[4] && grid[0] == grid[8]) || 
            (grid[2] != "" && grid[2] == grid[4] && grid[2] == grid[6])){
            return true;
        }
        return false;
    };

    function checkTie(){
        const grid = board.getBoard();
        if (!grid.includes("")){
            display.screen("Cat's Game");
            //console.log("Cat's Game!");
            return true;
        } else {
            return false;
        }
    }

    const playRound = (position) => {
        if (validMove(position) && !checkWinner() && !checkTie()){

            board.updateBoard(currPlayer.marker, position);
            display.updateDOM(board.getBoard());
            //board.printBoard();

            if (checkWinner()){
                display.screen(currPlayer.marker + " wins!");
                //console.log(currPlayer.marker + " wins!");
                return;
            }
            if (checkTie()) return;
            switchPlayer();

            display.screen(currPlayer.marker + "'s " + "turn")
            // console.log("");
            // console.log(currPlayer.marker + "'s " + "turn")
        }
    };

    return {playRound};
})();

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
        const div = document.querySelector("div");
        div.textContent = `${text}`;
    }

    document.addEventListener("click", (event) => {
        let position = event.target.getAttribute("data-index");
        if (position != null){
            game.playRound(position);
        }
    });

    return {updateDOM, screen};
}

    // 0 1 2
    // 3 4 5
    // 6 7 8

//print board
// game.playRound(0);
// game.playRound(3);
// game.playRound(6);

// tie game
// game.playRound(4);
// game.playRound(0);
// game.playRound(2);
// game.playRound(6);
// game.playRound(1);
// game.playRound(7);
// game.playRound(3);
// game.playRound(5);
// game.playRound(8);

// // O wins
// game.playRound(7);
// game.playRound(3);
// game.playRound(5);
// game.playRound(8);
// game.playRound(4);
// game.playRound(0);
// game.playRound(2);
// game.playRound(6);