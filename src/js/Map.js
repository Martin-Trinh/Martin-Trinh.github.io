import Position from "./Position.js";
import Enemy from "./Enemy.js";
import Tower from "./Tower.js";

export default class Map{
    constructor(pathPoints){
        this.canvas = document.getElementById('canvas');
        this.GRID_SIZE = 50;
        this.widthTile = this.canvas.width / this.GRID_SIZE;
        this.heightTile = this.canvas.height / this.GRID_SIZE;
        this.path = [];
        this.createPath(pathPoints);
        this.enemies = [];
        this.towers = [];
        // this.spawnStartEndPoint();
    }
    spawnStartEndPoint(){
        const offset = new Position(this.GRID_SIZE / 2, this.GRID_SIZE / 2);
        let x = Math.floor(Math.random() * this.widthTile / 4);
        let y = Math.floor(Math.random() * this.heightTile);
        // generate random start point
        const startPoint = new Position(x, y).multiply(this.GRID_SIZE).add(offset);
        // add start point to path
        this.path.splice(0, 0, startPoint);
        x = (Math.floor(Math.random() * this.widthTile /4) + this.widthTile * 3/4);
        y = Math.floor(Math.random() * this.heightTile);
        // generate random end point
        const endPoint = new Position(x, y).multiply(this.GRID_SIZE).add(offset);
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
        ctx.fillStyle = 'green';
        const startPoint = this.path[0];
        ctx.fillRect(startPoint.x - this.GRID_SIZE/2, startPoint.y - this.GRID_SIZE/2, this.GRID_SIZE, this.GRID_SIZE);
        ctx.fillStyle = 'red';
        const endPoint = this.path[this.path.length - 1];
        ctx.fillRect(endPoint.x - this.GRID_SIZE/ 2, endPoint.y - this.GRID_SIZE/2, this.GRID_SIZE, this.GRID_SIZE);
    }
    renderPath(){
        this.renderStartEndPoint();
        const ctx = this.canvas.getContext('2d');
        ctx.strokeStyle = 'blue';
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
    }
    updateEnemies(){
        // move enemies
        this.enemies.forEach(enemy => {
            enemy.move(this.canvas);
        });
        // remove enemies that reach the end point
        this.enemies = this.enemies.filter(enemy => !enemy.pos.equal(this.path[this.path.length - 1]));
        // render enemies
        this.enemies.forEach(enemy => {
            enemy.render(this.canvas);
        });

    }
    updateTowers(){
        // this.towers.forEach(tower => {
        //     tower.update();
        // });
        this.towers.forEach(tower => {
            tower.render(canvas);
        });
    }
    addTower({x, y}, {range, damage, speed, price, color}){
        let xTower = Math.floor(x/this.GRID_SIZE) * this.GRID_SIZE;
        let yTower = Math.floor(y/this.GRID_SIZE) * this.GRID_SIZE;
        const pos = new Position(xTower, yTower);
        console.log(xTower, yTower);
        for(let i = 0; i < this.path.length - 1; i++){
            if(pos.between(this.path[i], this.path[i+1]))
                return;
        }

        const tower = new Tower(pos, range, damage, speed, price, color);
        this.towers.push(tower);
    }
    removeTower(pos){
        for(let i = 0; i < this.towers.length; i++){
            if(this.towers[i].pos.equal(pos)){
                this.towers.splice(i, 1);
                return this.towers[i].price
            }
        }
        return null;
    }
    locateTower(pos){

    }

    

}
