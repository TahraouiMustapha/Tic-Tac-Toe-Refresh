const gameboard = (function () {
    gameboardArray = ['O','O','O',
                      '','X','',  
                      '','',''];

    const getGameboard = () => gameboardArray ;

    const fillGameboard = (choice, marker) => {
        if( !gameboardArray[choice] ) {
            gameboardArray[choice] = marker;
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
        checkWinner
    }

})();

function createPlayer( name, marker) {
    return {
        name, 
        marker, 
    }
}

const game = (function() {
    const player1 = createPlayer('mohamed', 'X');
    const player2 = createPlayer('Abdo', 'O');
    


    const startGame = () => {
        console.log('start game');
        if(gameboard.checkWinner()) {
            console.log(gameboard.checkWinner());
        } else {
            console.log('no')
        }
    
        console.log( gameboard.getGameboard() )
        
    }

    return {
        startGame
    }
    
})();


game.startGame();