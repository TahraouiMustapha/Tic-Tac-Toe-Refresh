const gameboard = (function () {
    gameboardArray = ['','','',
                      '','','',  
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
    return {
        getGameboard,
        fillGameboard,
        gameOver
    }

})();

function createPlayer( name, marker) {
    return {
        name, 
        marker
    }
}

const game = (function() {
    const player1 = createPlayer('mohamed', 'X');
    const player2 = createPlayer('Abdo', 'O');
    


    const startGame = () => {
        console.log('start game');
        gameboard.fillGameboard(0, player1.marker);
        gameboard.fillGameboard(1, player2.marker);
    
        console.log( gameboard.getGameboard() )
        
    }

    return {
        startGame
    }
    
})();


game.startGame();