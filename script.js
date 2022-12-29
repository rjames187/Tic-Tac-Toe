const gameBoard = (() => {
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    const checkRow = (indices) => {
        left = gameBoard[indices[0]];
        right = gameBoard[indices[1]];
        middle = gameboard[indices[2]];
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
                break;
            }
        }
    };
    const placeMarker = (marker, spot) => {
        if (marker !== "O" && marker !== "X") {
            return "error";
        }
        if (gameBoard[spot] !== "") {
            return "error";
        }
        gameBoard[spot] = marker;
        return "okay";
    }
    const getGameBoard = () => {
        return gameBoard;
    }

    return {
        checkForWins,
        placeMarker,
        getGameBoard
    }
})();

const playerFactory = (marker) => {
    const marker = marker;
    const getMarker = () => marker;
    const place = (gameBoard, spot) => {
        gameBoard.placeMarker(marker, spot);
    };

    return {
        getMarker,
        place
    }
}