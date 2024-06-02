import Position from "./Position.js";
import Enemy from "./Enemy.js";
import Tower from "./Tower.js";

export default class Map{
    constructor(pathPoints){
        this.canvas = document.getElementById('canvas');
        this.GRID_SIZE = 50;
        this.widthTile = this.canvas.width / this.GRID_SIZE;
        this.heightTile = this.canvas.height / this.GRID_SIZE;
        this.offset = new Position(this.GRID_SIZE / 2, this.GRID_SIZE / 2);
        this.path = [];
        this.createPath(pathPoints);
        this.enemies = [];
        this.towers = [];

        this.gridHighlight = null;
        this.towerHighlight = null;
        this.loseLifeAudio = new Audio('assets/audio/lose_life.mp3');

        // this.spawnStartEndPoint();
    }
    spawnStartEndPoint(){
        let x = Math.floor(Math.random() * this.widthTile / 4);
        let y = Math.floor(Math.random() * this.heightTile);
        // generate random start point
        const startPoint = new Position(x, y).multiply(this.GRID_SIZE).add(this.offset);
        // add start point to path
        x = (Math.floor(Math.random() * this.widthTile /4) + this.widthTile * 3/4);
        y = Math.floor(Math.random() * this.heightTile);
        // generate random end point
        const endPoint = new Position(x, y).multiply(this.GRID_SIZE).add(this.offset);
        // add end point to path
        this.path.push(endPoint);
    }
    addEnemy(speed, maxHealth,coins){
        this.enemies.push(new Enemy(speed, maxHealth, this.path, coins));
    }
    createPath(pathPoints){
        // create path from pathPoints
        pathPoints.forEach(path => {
            const offset = new Position(this.GRID_SIZE / 2, this.GRID_SIZE / 2);
            this.path.push(new Position(path.x, path.y).multiply(this.GRID_SIZE).add(offset));
        });
    }
    renderStartEndPoint(){
        const ctx = this.canvas.getContext('2d');
        ctx.fillStyle = '#FFDB00';
        const startPoint = this.path[0];
        // draw start point
        ctx.fillRect(startPoint.x - this.GRID_SIZE/2, startPoint.y - this.GRID_SIZE/2, this.GRID_SIZE, this.GRID_SIZE);
        ctx.fillStyle = '#FF3333';
        // draw end point
        const endPoint = this.path[this.path.length - 1];
        ctx.fillRect(endPoint.x - this.GRID_SIZE/ 2, endPoint.y - this.GRID_SIZE/2, this.GRID_SIZE, this.GRID_SIZE);
    }
    renderPath(){
        this.renderStartEndPoint();
        const ctx = this.canvas.getContext('2d');
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.path[0].x, this.path[0].y);
        for(let i = 1; i < this.path.length; i++){
            ctx.lineTo(this.path[i].x, this.path[i].y);
            ctx.stroke();
        }
    }
    renderGrid(){
        const ctx = this.canvas.getContext('2d');
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        for(let i = 0; i < this.canvas.width; i += this.GRID_SIZE){
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, this.canvas.height);
            ctx.stroke();
        }
        for(let i = 0; i < this.canvas.height; i += this.GRID_SIZE){
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(this.canvas.width, i);
            ctx.stroke();
        }
        // highlight selected tower position
        if(this.gridHighlight){
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.fillRect(this.gridHighlight.x, this.gridHighlight.y, this.GRID_SIZE, this.GRID_SIZE);
        }
        this.highlightTower();
    }
    updateEnemies(gameInfo){
        // move enemies
        this.enemies.forEach(enemy => {
            enemy.move(this.canvas);
        });
        // remove enemies that reach the end point or die
        this.enemies = this.enemies.filter(enemy => {
            // enemy reaches the end point
            if(enemy.pos.equal(this.path[this.path.length - 1])){
                this.loseLifeAudio.play();
                gameInfo.lives--;
                return false;
            }
            // enemy dies
            if(enemy.currentHealth <= 0){
                gameInfo.score++;
                gameInfo.money += enemy.coins;
                return false;
            }
            return true;
        });
        // render enemies
        this.enemies.forEach(enemy => {
            enemy.render(this.canvas);
        });
    }
    updateTowers(){
        this.towers.forEach(tower => {
            tower.update(this.enemies, this.canvas);
        });
    }
    collideWithPath(pos){
        for(let i = 0; i < this.path.length - 1; i++){
            if(pos.between(this.path[i], this.path[i+1]))
                return true;
        }
        return false;
    }
    addTower({x, y}, {range, damage, speed, price, color}){
        let xTower = Math.floor(x/this.GRID_SIZE) * this.GRID_SIZE;
        let yTower = Math.floor(y/this.GRID_SIZE) * this.GRID_SIZE;
        const pos = new Position(xTower, yTower).add(this.offset);
        if(this.collideWithPath(pos))
            return false;
        // create tower
        const tower = new Tower(pos, range, damage, speed, price, color);
        this.towers.push(tower);
        return true;
    }
    removeTower(){
        for(let i = 0; i < this.towers.length; i++){
            if(this.towers[i].pos.equal(this.towerHighlight)){
                const price = this.towers[i].price;
                this.towers.splice(i, 1);
                this.towerHighlight = null;
                return price;
            }
        }
    }
    setHighlightTower(x, y){
        let xTower = Math.floor(x/this.GRID_SIZE) * this.GRID_SIZE;
        let yTower = Math.floor(y/this.GRID_SIZE) * this.GRID_SIZE;
        const pos = new Position(xTower, yTower).add(this.offset);
        for(let i = 0; i < this.towers.length; i++){
            if(this.towers[i].pos.equal(pos)){
                this.towerHighlight = pos;
                return;
            }
        }
        this.towerHighlight = null;
    }
    setHighlightGrid(x, y){
        const xGrid = Math.floor(x / this.GRID_SIZE) * this.GRID_SIZE;
        const yGrid = Math.floor(y / this.GRID_SIZE) * this.GRID_SIZE;
        this.gridHighlight = new Position(xGrid, yGrid);
        if(this.collideWithPath(this.gridHighlight.add(this.offset))){
            this.gridHighlight = null;
            return
        }
    }
    highlightTower(){
        // highlight tower
        if(this.towerHighlight){
            const ctx = this.canvas.getContext('2d');
            const x = this.towerHighlight.x - this.offset.x;
            const y = this.towerHighlight.y - this.offset.y;
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.fillRect(x, y, this.GRID_SIZE, this.GRID_SIZE);
        }
    }

    

}
