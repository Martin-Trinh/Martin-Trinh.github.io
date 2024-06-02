import Map from "./Map.js";

export default class Game{
    constructor(pathPoints){
        this.canvas = document.getElementById('canvas');
        this.scoreElem = document.getElementById('score');
        this.livesElem = document.getElementById('lives');
        this.moneyElem = document.getElementById('money');
        this.waveElem  = document.getElementById('wave-number');
        this.gameOver = document.getElementById('game-over');

        this.map = new Map(pathPoints);
        this.FPS = 30;
        this.interval = 1000 / this.FPS;
        this.lastTime = 0;
        this.gameloop = this.gameloop.bind(this);
        this.backgroundMusic = new Audio('assets/audio/background_music.mp3');
        this.backgroundMusic.volume = 0.1;
        this.backgroundMusic.loop = true;
        this.audioOn = true;
        this.playerName;
        // store game info - score, lives, money, wave
        this.gameInfo;
        // store timeout ids for spawning enemies
        this.timeOutIds = [];
        // store request id for game loop
        this.requestId = null;
    }
    /**
     * start next wave of enemies
     */
    nextWave(){
        this.gameInfo.wave++;
        this.#spawnEnemy(10, 1500);
    }
    /**
     * set player name and audio setting
     * @param {*} name player name
     * @param {*} audioOn if audio is on
     */
    setting(name, audioOn){
        this.audioOn = audioOn;
        this.playerName = name;
    }
    /**
     * refresh game info
     */
    setGameInfo(){
        this.scoreElem.textContent = this.gameInfo.score;
        this.livesElem.textContent = this.gameInfo.lives;
        this.moneyElem.textContent = this.gameInfo.money;
        this.waveElem.textContent = this.gameInfo.wave;
    }
    /**
     * Reset game objects and game info
     */
    reset(){
        this.map.towers = [];
        this.map.enemies = [];
        this.map.gridHighlight = null;
        this.map.towerHighlight = null;
        this.gameInfo = {
            score: 0,
            lives: 20,
            money: 100,
            wave: 0
        }
        // reset game info
        this.setGameInfo();
        // clear spawn enemy timeout
        for (let id of this.timeOutIds) {
            clearTimeout(id);
        }
        this.timeOutIds = [];
        if(!this.backgroundMusic.paused)
            this.backgroundMusic.pause();
    }
    /**
     * Initialize game
     */
    init(){
        this.reset();
        if(this.audioOn){
            this.backgroundMusic.play();
            this.map.loseLifeAudio.volume = 0.01;
        }else{
            this.map.loseLifeAudio.volume = 0;
        }
        const playerName = document.getElementById('player-name');
        playerName.textContent += this.playerName;
        this.setGameInfo();
        this.requestId = window.requestAnimationFrame(this.gameloop);
    }
    /**
     *  add enemy to the map
     */
    addEnemy(speed, maxHealth, coins){
        this.map.addEnemy(speed, maxHealth,coins);
    }
    /**
     * spawn enemy at a fixed interval
     * @param {*} count number of enemies
     * @param {*} interval time interval between each enemy 
     */
    #spawnEnemy(count, interval){
        for(let i = 0; i < count; i++){
            const timeoutId = setTimeout(() => {
                const speed = 2;
                const maxHealth = 100;
                const coins = 10;
                this.addEnemy(speed, maxHealth, coins);
            }, i*interval);
            this.timeOutIds.push(timeoutId);
        }
    }
    /**
     * Update game objects and refresh game info
     */
    update(){
        this.map.updateEnemies(this.gameInfo);
        this.map.updateTowers();
        this.setGameInfo();
    }
    /**
     * Render path and grid on map
     */
    render(){
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.map.renderPath();
        this.map.renderGrid();
    }
    /**
     * Main game loop
     * update and render game objects at a fixed interval
     * @param {*} timestamp 
     */
    gameloop(timestamp){
        const deltaTime = timestamp - this.lastTime;
        if(deltaTime >= this.interval){
            this.render();
            this.update();
            this.lastTime = timestamp;
        }
        // check if game over
        if(this.gameInfo.lives <= 0){
            this.gameOver.style.display = 'flex';
            const gameOverScore = document.getElementById('game-over-score');
            gameOverScore.textContent = this.gameInfo.score;
            this.reset();
            this.stop();
        }
        // request next frame
        if(this.requestId)
            this.requestId = window.requestAnimationFrame(this.gameloop);
    }
    /**
     * stop game loop
     */
    stop(){
        if(this.requestId)
            window.cancelAnimationFrame(this.requestId);
        this.requestId = null;
    }
    /**
     * sell tower and get half of the price back
     */
    sellTower(){
        let price = this.map.removeTower();
        if(price)
            this.gameInfo.money += price/2;
    }
}