const gameboard = (function () {
    gameboardArray = ['','','',
                      '','','',  
                      '','',''];

    const getGameboard = () => gameboardArray ;
    const resetGameboard = () =>     gameboardArray = ['','','',
                                                        '','','',  
                                                        '','',''];

    const fillGameboard = (choice, marker) => {
        if( !gameboardArray[choice] ) {
            gameboardArray[choice] = marker;
            return true;
        } else {
            return false;
        }
    }

    const gameOver = () => {
        return gameboardArray.every(( cell ) => cell != '');
    }

    const checkWinner = () => {
        let winnerMark = '';
        const checkArray = [[0,1,2], [3,4,5], [6,7,8], //for lignes
                            [0,3,6], [1,4,7], [2,5,8], //for colonnes
                            [0,4,8], [2,4,6] ] ;//for Diameters

        checkArray.forEach( (arr) => {
            if(gameboardArray[arr[0]] === gameboardArray[arr[1]] 
                && gameboardArray[arr[0]] === gameboardArray[arr[2]]
                && winnerMark == ''
            ) {
                winnerMark = gameboardArray[arr[0]];
            }
        })        
        
        return winnerMark;
    }

    return {
        getGameboard,
        fillGameboard,
        gameOver,
        checkWinner,
        resetGameboard
    }

})();

function createPlayer( name, marker) {

    const isMyMark= function (marker) {
        return this.marker === marker;
    }

    return {
        name, 
        marker, 
        isMyMark
    }
}

const game = (function() {
    const player1 = createPlayer('mohamed', 'X');
    const player2 = createPlayer('Abdo', 'O');
    let currentPlayer = player1;
    

    const startGame = () => {
        console.log('start game');
        let  winnerPlayer = '';

        
        if(gameboard.checkWinner()) {
            let winnerMark = gameboard.checkWinner();
            winnerPlayer = player1.isMyMark(winnerMark) ? player1 : player2 ;
            gameboard.resetGameboard();
            console.log('the winner is ' + winnerPlayer.name);
        } 
        console.log( gameboard.getGameboard() )
        
    }

    const getCurrentPlayer = () => currentPlayer;
    const switchPlayer = () => {
        if(currentPlayer === player1) currentPlayer = player2;
        else currentPlayer = player1;
    } 


    return {
        startGame, 
        getCurrentPlayer,
        switchPlayer
    }
    
})();

const displayController = (function () {

    const renderContent = () => {
        if( !!document ) {
            const domCells = Array.from(document.querySelectorAll('.cell'));
            domCells.forEach((cell) => {
                cell.addEventListener('click', (e) => {
                    //get the marker of current player
                    let marker = game.getCurrentPlayer().marker;
                    addMark(e.target.dataset.index, marker);
                })
            })
        }
        updateContent();
    }

    const updateContent = () => {
        if(!!document) {
            const domCells = Array.from(document.querySelectorAll('.cell'));
            const myBoard = gameboard.getGameboard();
            
            for(let index = 0; index < myBoard.length; index ++) {
                domCells[index].textContent = myBoard[index]
            }
        }
    }

    const addMark = (index, marker) => {
        if( gameboard.fillGameboard(index, marker)) {
            game.switchPlayer();
            updateContent();
        }
    }

    return {
        renderContent,
        updateContent
    }

})();

displayController.renderContent();