import Map from "./Map.js";

"use strict";

export default class Game{
    constructor(){
        this.canvas = document.getElementById('canvas');
        this.enemies = []; 
        this.map = new Map(canvas);
        this.FPS = 60;
        this.interval = 1000 / this.FPS;
        this.lastTime = 0;
        this.gameloop = this.gameloop.bind(this);
    }
    init(){
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.canvas.style.backgroundColor = 'gray';
        requestAnimationFrame(this.gameloop);
    }
    addEnemy(enemy){
        this.enemies.push(enemy);
    }
    update(){
        // this.map.drawPath();
        this.map.renderPath();
        this.map.renderGrid();
        // this.enemies.forEach(enemy => {
        //     enemy.update(this.context);
        // });

    }
    render(){
    }
    gameloop(timestamp){
        const deltaTime = timestamp - this.lastTime;
        if(deltaTime >= this.interval){
            this.update();
            this.render();
            this.lastTime = timestamp;
        }
        requestAnimationFrame(this.gameloop);
    }
}