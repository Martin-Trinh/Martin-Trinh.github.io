import Game from './Game.js';
import { towerStats, pathPoints } from './gameData.js';
/**
 *  Navigate to page using History API
 * @param {*} pageId  html id to navigate
 * @param {*} pushState 
 */
function navigateToPage(pageId, pushState = false) {
    if(pushState)
        history.pushState({ page: pageId }, null, `#${pageId}`);
    const page = document.getElementById(pageId);
    const pages = document.querySelectorAll('.page');
    pages.forEach(p =>{
        p.style.display = 'none';
    });
    page.style.display = 'flex';
}
/**
 * Event listener for start game form
 */
const startForm = document.getElementById('start-game-form');
startForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const nameField = document.getElementById('player-name-input');
    const audioField = document.getElementById('audio');
    // navigate to loading page
    navigateToPage('loading-page');
    // simulate loading time
    setTimeout(() =>{
        // set name and audio settings
        game.setting(nameField.value, audioField.checked);
        loadGame();
    }, 2000);
});
/**
 * Event listener for show tutorial button
 */
const showTutorialBtn = document.getElementById('show-tutorial-btn');
showTutorialBtn.addEventListener('click', (e) =>{
    const videoTutorial = document.getElementById('tutorial-video');
    showTutorialBtn.style.display = 'none';
    videoTutorial.style.display = 'block';
});
/**
 * Handle back button from browser
 */
window.addEventListener('popstate', (e) =>{
    if(e.state && e.state.page){
        if(e.state.page === 'game-page', true){
            backToMenu();
        }
    }else{
        backToMenu();
    }
});
/**
 * Add towers to the tower menu
 */
const towers = document.querySelectorAll('.tower');
for(let tower of towers){
    const color = towerStats[tower.dataset.towerType].color;
    tower.style.backgroundColor = color;
    // add drag event
    tower.addEventListener('dragstart', (e) =>{
        e.dataTransfer.setData('text/plain', e.target.dataset.towerType);
    })
    // add mouseover event to highlight tile
    tower.addEventListener('mouseover', (e) =>{
        const type = document.querySelector('#tower-type');
        const damage = document.querySelector('#tower-damage');
        const range = document.querySelector('#tower-range');
        const speed = document.querySelector('#tower-speed');
        const price = document.querySelector('#tower-price');
        type.textContent = "Type: " + tower.dataset.towerType;
        damage.textContent ="Damage: " + towerStats[tower.dataset.towerType].damage;
        range.textContent = "Range: " + towerStats[tower.dataset.towerType].range;
        speed.textContent = "Speed: " + towerStats[tower.dataset.towerType].speed;
        price.textContent = "Price: " + towerStats[tower.dataset.towerType].price;
    })
   
}
// create game instance
const game = new Game(pathPoints);

const canvas = document.getElementById('canvas');
const nextWaveBtn = document.getElementById('next-wave-btn');
const resetBtn = document.getElementById('reset-btn');
const audioBtn = document.getElementById('audio-btn');
const backToMenuBtn = document.getElementById('back-to-menu');
const sellBtn = document.getElementById('sell-btn');

sellBtn.addEventListener('click', () => game.sellTower());

nextWaveBtn.addEventListener('click', () => game.nextWave());

resetBtn.addEventListener('click', () => game.reset());

backToMenuBtn.addEventListener('click', () => backToMenu());
/**
 * Event listener for audio button
 */
audioBtn.addEventListener('click', e =>{
    // background music
    if(game.backgroundMusic.paused){
        game.backgroundMusic.play();
    }else{
        game.backgroundMusic.pause();
    }
    // lose life audio
    if(game.map.loseLifeAudio.volume){
        game.map.loseLifeAudio.volume = 0;
    }else{
        game.map.loseLifeAudio.volume = 0.1;
    }
})

// dragover event to highlight tile based on mouse position on canvas
canvas.addEventListener('dragover', (e) =>{
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    game.map.setHighlightGrid(x, y);
});

// mousemove event to highlight tile based on mouse position on canvas
canvas.addEventListener('mousemove', (e) =>{
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    game.map.setHighlightGrid(x, y);
})
// click event to hightlight selected tower on canvas
canvas.addEventListener('click', (e) =>{
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    game.map.setHighlightTower(x, y);
})
// drop event to add tower on canvas
canvas.addEventListener('drop', (e) =>{
    e.preventDefault();
    // get data from drag event
    const towerType = e.dataTransfer.getData('text/plain');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // check if player has enough money
    if(game.gameInfo.money < towerStats[towerType].price){
        return;
    }
    if(game.map.addTower({x, y}, towerStats[towerType])){
        // decrease money
        game.gameInfo.money -= towerStats[towerType].price;
        game.setGameInfo();
    }
})
// exit and restart game button on game over page
const exitGameBtn = document.getElementById('exit-game');
const restartGameBtn = document.getElementById('restart-game');

exitGameBtn.addEventListener('click', () => backToMenu());
restartGameBtn.addEventListener('click', () => loadGame());

// back to menu function
function backToMenu(){
    navigateToPage('start-page');
    game.stop();
    game.reset();
}

// load game function
function loadGame(){
    navigateToPage('game-page', true);
    game.init();
}





