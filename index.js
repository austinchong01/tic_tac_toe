function createBoard(){
    let board = [0, 0, 0,
                 0, 0, 0,
                 0, 0, 0];

    const getBoard = () => board;
    const updateBoard = (marker, position) => board[position] = marker;
    const printBoard = () => {
        for (let i = 0; i < board.length; i += 3){
            console.log(board[i], board[i+1], board[i+2]);
        }
    };

    return { getBoard, updateBoard, printBoard };
}

const game = (function gameController(){
    const board = createBoard();
    
    const player1 = {name: "p1", marker: "X"};
    const player2 = {name: "p2", marker: "O"};
    const players = [player1, player2];

    let currPlayer = players[0]; //first player is X
    console.log(currPlayer);

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
            //check row and column of i
            // 0 1 2
            // 3 4 5
            // 6 7 8

            //i = 0: 0 1 2, 0 3 6
            //i = 1: 3 4 5, 1 4 7
            //i = 2: 6 7 8, 2 5 8

            //column check
            if (grid[i] != 0 && grid[i] == grid[i+3] && grid[i] == grid[i+6]) return true;

            //row check
            let j = i*3;
            if (grid[j] != 0 && grid[j] == grid[j+1] && grid[j] == grid[j+2]) return true;
        }
        //diagonal check
        if ((grid[0] != 0 && grid[0] == grid[4] && grid[0] == grid[8]) || 
            (grid[2] != 0 && grid[2] == grid[4] && grid[2] == grid[6])){
            return true;
        }

        return false;
    };

    function checkTie(){
        const grid = board.getBoard();
        if (!grid.includes(0)){
            console.log("Tie!")
            return true;
        } else {
            return false;
        }
    }

    const playRound = (position) => {
        if (validMove(position)){
            board.updateBoard(currPlayer.marker, position);
            if (checkWinner()){
                console.log(currPlayer.name + " wins!");
            }
            checkTie();
            switchPlayer();
            board.printBoard();
        }
        console.log("");
    };

    return {playRound};
})();

game.playRound(2);
game.playRound(4);
game.playRound(6);