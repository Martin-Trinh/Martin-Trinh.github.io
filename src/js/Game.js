import Map from "./Map.js";
import Tower from "./Tower.js";

export default class Game{
    constructor(pathPoints){
        this.canvas = document.getElementById('canvas');
        this.scoreElem = document.getElementById('score');
        this.livesElem = document.getElementById('lives');
        this.moneyElem = document.getElementById('money');
        this.waveElem  = document.getElementById('wave-number');

        this.map = new Map(pathPoints);
        this.FPS = 30;
        this.interval = 1000 / this.FPS;
        this.lastTime = 0;
        this.gameloop = this.gameloop.bind(this);
        
        this.score = 0;
        this.lives = 20;
        this.money = 100;
        this.wave = 1;
        
        this.timeOutIds = [];
    }
    nextStage(){

    }
    reset(){
        this.map.towers = [];
        this.map.enemies = [];
        this.map.gridHighlight = null;
        this.map.towerHighlight = null;
        this.score = 0;
        this.lives = 20;
        this.money = 100;
        this.wave = 1;
        // reset game info
        this.setGameInfo();
        // clear spawn enemy timeout
        for (let id of this.timeOutIds) {
            clearTimeout(id);
        }
        this.timeOutIds = [];
    }
    start(){
        this.spawnEnemy(10, 1500);
    }
    setGameInfo(){
        this.scoreElem.textContent = this.score;
        this.livesElem.textContent = this.lives;
        this.moneyElem.textContent = this.money;
        this.waveElem.textContent = this.wave;
    }
    init(){
        this.setGameInfo();
        requestAnimationFrame(this.gameloop);
    }
    addEnemy(speed, maxHealth, coins){
        this.map.addEnemy(speed, maxHealth,coins);
    }
    spawnEnemy(count, interval){
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
    update(timestamp){
        this.map.updateEnemies();
        this.map.updateTowers();
        this.setGameInfo();
    }
    render(){
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.map.renderPath();
        this.map.renderGrid();

    }
    gameloop(timestamp){
        const deltaTime = timestamp - this.lastTime;
        if(deltaTime >= this.interval){
            // console.log("FPS:" + 1000 / deltaTime);
            this.render();
            this.update(timestamp);
            this.lastTime = timestamp;
        }
        requestAnimationFrame(this.gameloop);
    }
    sellTower(){
        let price = this.map.removeTower();
        if(price instanceof Number)
            this.money += price/2;
    }
}