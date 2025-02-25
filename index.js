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

function gameController(){
    const board = createBoard();
    
    const player1 = {marker: "X"};
    const player2 = {marker: "O"};
    const players = [player1, player2];

    let currPlayer = players[0]; //first player is X

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

    function checkEnd(){
        //check if a player has won
        if (!board.includes(0)){
            console.log("tie")
            return true;
        }
    };

    const playRound = (position) => {
        if (validMove(position)){
            board.updateBoard(currPlayer.marker, position);
            switchPlayer();
            board.printBoard();
        }
        //checkEnd();
    };

    return {playRound};
}

const game = gameController();
game.playRound(3);
game.playRound(0);

game.playRound(0);
