const gameBoard = (() => {
    let gameBoard = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    let gameFrozen = false;
    const clearMarkers = () => {
        gameBoard = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    }
    const checkRow = (indices) => {
        left = gameBoard[indices[0]];
        right = gameBoard[indices[1]];
        middle = gameBoard[indices[2]];
        if (left === "O" || left == "X") {
            if (left === middle && left === right) {
                return true
            }
        }
        return false
    };
    const checkForWins = () => {
        const COMBOS = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]];
        for (combo of COMBOS) {
            if (checkRow(combo)) {
                return gameBoard[combo[0]];
            }
        }
        if (!gameBoard.includes(" ")){
            return "tie";
        }
        return "game is not over"
    };
    const placeMarker = (marker, spot) => {
        if (marker !== "O" && marker !== "X") { return "error" }
        if (gameBoard[spot] !== " ") { return "error" }
        gameBoard[spot] = marker;
        return "okay";
    }
    const getGameBoard = () => {
        return gameBoard;
    }

    return {
        checkForWins,
        placeMarker,
        getGameBoard,
        clearMarkers
    }
})();

const playerFactory = (marker) => {
    const place = (spot) => {
        gameBoard.placeMarker(marker, spot);
    };

    return {
        marker,
        place
    }
}

const displayController = (() => {
    const clearBoard = () => {
        const domBoard = document.getElementById('game-board');
        domBoard.innerHTML = '';
    }
    const renderBoard = () => {
        clearBoard();
        const domBoard = document.getElementById("game-board");
        for (let i = 0; i < 9; i++) {
            const tile = document.createElement('div');
            tile.addEventListener('click', () => {
                if (gameBoard.getGameBoard()[i] !== " ") { return; }
                if (gameFlow.gameFrozen) { return; }
                gameFlow.getCurrentPlayer().place(i);
                gameFlow.tick();
            });
            tile.textContent = gameBoard.getGameBoard()[i]
            domBoard.appendChild(tile);
        }
    }

    return {
        renderBoard,
        clearBoard
    }
})();

const gameFlow = (() => {
    let currentPlayer = null;
    const configureModal = () => {
        const modal = document.getElementById('game-over-message')
        modal.addEventListener('click', () => {
            modal.classList.toggle('invisible');
            initalizeGame();
        })
    }
    const initalizeGame = () => {
        gameBoard.gameFrozen = false;
        gameBoard.clearMarkers(); 
        displayController.renderBoard();
        currentPlayer = playerFactory('X');  
    }
    const tick = () => {
        currentPlayer = currentPlayer.marker === 'X' ? playerFactory('O') : playerFactory('X');
        displayController.renderBoard();
        console.log('tick')
        const gameStatus = gameBoard.checkForWins();
        if (gameStatus !== "game is not over") { toggleGameOver(gameStatus) }
    }
    const toggleGameOver = (gameStatus) => {
        gameBoard.gameFrozen = true;
        const modal = document.getElementById('game-over-message');
        modal.classList.toggle('invisible');
        if (gameStatus === 'tie') {
            modal.textContent = "It's a tie!";
        } else {
            modal.textContent = `${gameStatus} wins!`;
        }
    }
    const getCurrentPlayer = () => { return currentPlayer }
    return {
        getCurrentPlayer,
        initalizeGame,
        tick,
        configureModal
    }
})();

gameFlow.configureModal();
gameFlow.initalizeGame();

