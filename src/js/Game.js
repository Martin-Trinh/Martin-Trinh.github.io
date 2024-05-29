import Map from "./Map.js";

export default class Game{
    constructor(pathPoints){
        this.canvas = document.getElementById('canvas');
        this.map = new Map(pathPoints);
        this.FPS = 30;
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
    addEnemy(speed, maxHealth){
        this.map.addEnemy(speed, maxHealth);
    }
    update(){
        this.map.updateEnemies();
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
        requestAnimationFrame(this.gameloop);
    }
}