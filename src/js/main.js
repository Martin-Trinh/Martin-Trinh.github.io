import Game from './Game.js';

const pathPoints = [
    {x: 0, y: 0},
    {x: 0, y: 4},
    {x: 6, y: 4},
    {x: 6, y: 10},
    {x: 10, y: 10},
    {x: 10, y: 2},
    {x: 13, y: 2},
    {x: 13, y: 9},
];

const towerStats = {
    basic: {
        range: 100,
        damage: 10,
        speed: 8,
        price: 10,
        color: 'red'
    },
    archer: {
        range: 50,
        damage: 5,
        speed: 10,
        price: 20,
        color: 'green'
    },
    cannon:{
        range: 150,
        damage: 20,
        speed: 5,
        price: 30,
        color: 'blue'
    },
    sniper:{
        range: 200,
        damage: 50,
        speed: 2,
        price: 50,
        color: 'purple'
    }
}
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
const startForm = document.getElementById('start-game-form');
startForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const nameField = document.getElementById('player-name');
    const audioField = document.getElementById('audio');
    navigateToPage('loading-page');
    setTimeout(() =>{
        game.setting(nameField.value, audioField.checked);
        loadGame();
    }, 2000);
});

const showTutorialBtn = document.getElementById('show-tutorial-btn');
showTutorialBtn.addEventListener('click', (e) =>{
    const videoTutorial = document.getElementById('tutorial-video');
    showTutorialBtn.style.display = 'none';
    videoTutorial.style.display = 'block';
});

window.addEventListener('popstate', (e) =>{
    if(e.state && e.state.page){
        if(e.state.page === 'game-page', true){
            backToMenu();
        }
    }else{
        backToMenu();
    }
});

const towers = document.querySelectorAll('.tower');
for(let tower of towers){
    const color = towerStats[tower.dataset.towerType].color;
    tower.style.backgroundColor = color;
    tower.addEventListener('dragstart', (e) =>{
        e.dataTransfer.setData('text/plain', e.target.dataset.towerType);
    })
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

audioBtn.addEventListener('click', e =>{
    if(game.backgroundMusic.paused){
        game.backgroundMusic.play();
    }else{
        game.backgroundMusic.pause();
    }
    if(game.map.loseLifeAudio.volume){
        game.map.loseLifeAudio.volume = 0;
    }else{
        game.map.loseLifeAudio.volume = 0.1;
    }
})


canvas.addEventListener('dragover', (e) =>{
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    game.map.setHighlightGrid(x, y);
});

canvas.addEventListener('mousemove', (e) =>{
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    game.map.setHighlightGrid(x, y);
})
canvas.addEventListener('click', (e) =>{
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    game.map.setHighlightTower(x, y);
})
canvas.addEventListener('drop', (e) =>{
    e.preventDefault();
    const towerType = e.dataTransfer.getData('text/plain');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if(game.gameInfo.money < towerStats[towerType].price){
        return;
    }
    if(game.map.addTower({x, y}, towerStats[towerType])){
        game.gameInfo.money -= towerStats[towerType].price;
        game.setGameInfo();
    }
})

const exitGameBtn = document.getElementById('exit-game');
const restartGameBtn = document.getElementById('restart-game');

exitGameBtn.addEventListener('click', () => backToMenu());
restartGameBtn.addEventListener('click', () => loadGame());

function backToMenu(){
    navigateToPage('start-page');
    game.stop();
    game.reset();
}

function loadGame(){
    navigateToPage('game-page', true);
    game.init();
}





