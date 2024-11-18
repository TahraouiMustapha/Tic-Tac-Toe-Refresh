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
    return {
        name, 
        marker
    }
}

const game = (function() {
    const player1 = createPlayer('', 'X');
    const player2 = createPlayer('', 'O');
    let currentPlayer = player1;
    let winnerPlayer = '';
    

    const startGame = () => {
        console.log('start game');
        displayController.renderContent();
    }

    const playTurn = ( index ) => {
        if(!gameboard.gameOver() && !winnerPlayer) {
            let marker = currentPlayer.marker;
            if( gameboard.fillGameboard(index, marker) ) {
                
                displayController.updateContent();
                if( gameboard.checkWinner()) {
                    winnerPlayer = currentPlayer;
                    console.log( winnerPlayer.name + ' is win');
                } else {
                    switchPlayer();
                }
            }
        } else {
            console.log('gameOver');
        }
    }

    const switchPlayer = () => {
        if(currentPlayer === player1) currentPlayer = player2;
        else currentPlayer = player1;
    } 

    const setPlayersNames = (player1Name, player2Name) =>{
        player1.name = player1Name;
        player2.name = player2Name;
    }


    return {
        startGame, 
        playTurn,
        switchPlayer,
        setPlayersNames
    }
    
})();

const displayController = (function () {
    const myDialog = document.querySelector('dialog');
    const startBtn = document.querySelector('#start-btn');

    startBtn.addEventListener('click', () => {
        const player1Name = document.querySelector('input[name="player1_name"]').value;
        const player2Name = document.querySelector('input[name="player2_name"]').value;

        if(!!player1Name && !!player2Name) {
            game.setPlayersNames(player1Name, player2Name);
            game.startGame();
        }

    })

    const openDialog = () => myDialog.showModal();

    const renderContent = () => {
        if( !!document ) {
            const domCells = Array.from(document.querySelectorAll('.cell'));
            domCells.forEach((cell) => {
                cell.addEventListener('click', (e) => {
                    game.playTurn(e.target.dataset.index);
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

    return {
        renderContent,
        updateContent,
        openDialog
    }

})();

displayController.openDialog();