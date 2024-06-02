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

        this.gameInfo;
        this.timeOutIds = [];
        this.requestId = null;
    }
    nextWave(){
        this.gameInfo.wave++;
        this.spawnEnemy(10, 1500);
    }
    setGameInfo(){
        this.scoreElem.textContent = this.gameInfo.score;
        this.livesElem.textContent = this.gameInfo.lives;
        this.moneyElem.textContent = this.gameInfo.money;
        this.waveElem.textContent = this.gameInfo.wave;
    }
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
        console.log(this.gameInfo);
        // reset game info
        this.setGameInfo();
        // clear spawn enemy timeout
        for (let id of this.timeOutIds) {
            clearTimeout(id);
        }
        this.timeOutIds = [];
    }
    init(){
        this.reset();
        this.setGameInfo();
        this.requestId = window.requestAnimationFrame(this.gameloop);
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
    update(){
        this.map.updateEnemies(this.gameInfo);
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
            this.update();
            this.lastTime = timestamp;
        }
        if(this.gameInfo.lives <= 0){
            this.reset();
            this.stop();
        }
        if(this.requestId)
            this.requestId = window.requestAnimationFrame(this.gameloop);
    }
    stop(){
        if(this.requestId)
            window.cancelAnimationFrame(this.requestId);
        this.requestId = null;
    }
    sellTower(){
        let price = this.map.removeTower();
        if(price)
            this.gameInfo.money += price/2;
    }
}