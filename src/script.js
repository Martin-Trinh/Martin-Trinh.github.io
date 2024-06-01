document.addEventListener('DOMContentLoaded', function() {
    const startPage = document.getElementById('startPage');
    const gamePage = document.getElementById('gamePage');
    const settingsForm = document.getElementById('settingsForm');
    const backButton = document.getElementById('backButton');

    settingsForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const audioEnabled = document.getElementById('audio').checked;
        console.log('Game started with audio:', audioEnabled);

        // Use History API to push new state
        history.pushState({page: 'game'}, 'Game', '/game');

        // Hide start page and show game page
        startPage.classList.add('hidden');
        gamePage.classList.remove('hidden');

        // Initialize game (Placeholder)
        initializeGame(audioEnabled);
    });

    backButton.addEventListener('click', function() {
        // Use History API to push new state
        history.pushState({page: 'start'}, 'Start', '/start');

        // Hide game page and show start page
        gamePage.classList.add('hidden');
        startPage.classList.remove('hidden');
    });

    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.page === 'game') {
            startPage.classList.add('hidden');
            gamePage.classList.remove('hidden');
        } else {
            gamePage.classList.add('hidden');
            startPage.classList.remove('hidden');
        }
    });

    function initializeGame(audioEnabled) {
        // Placeholder function to initialize the game
        const gameCanvas = document.getElementById('gameCanvas');
        const context = gameCanvas.getContext('2d');
        
        gameCanvas.width = 800;
        gameCanvas.height = 600;

        context.fillStyle = 'lightgray';
        context.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
        
        // Example: Draw a simple rectangle as a placeholder for game content
        context.fillStyle = 'blue';
        context.fillRect(100, 100, 200, 100);
    }
});
