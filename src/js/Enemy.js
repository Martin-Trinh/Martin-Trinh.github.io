import Position from "./Position.js";

export default class Enemy{
    constructor(speed, maxHealth, path, coins){
        // minimum distance tolerate from destination
        this.MIN_DIST_FROM_DEST = 3;
        this.speed = speed;
        this.coins = coins;
        this.maxHealth = maxHealth;
        this.currentHealth = this.maxHealth;
        this.SIZE = 25;
        this.r = 15;
        // destination (corner)
        this.destination;
        // path to follow
        this.paths = path;
        this.pathIndex = 0;
        
        this.direction;
        this.pos = new Position(path[0].x, path[0].y);
        this.center = new Position(this.pos.x + this.SIZE/2, this.pos.y + this.SIZE/2);

    }
    // render enemy on canvas as circle
    render(canvas){
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = this.#healthCheck();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        // ctx.fillRect(this.pos.x - this.SIZE/2, this.pos.y - this.SIZE/2, this.SIZE, this.SIZE);
    }
    // change enemie's color based on health percentage
    #healthCheck(){
        // return color based on health percentage
        const healthPercentage = this.currentHealth / this.maxHealth;
        // console.log("health: " + this.currentHealth + " " + this.health);
        if(healthPercentage < 0.3)
            return "#FF6666";
        if (healthPercentage < 0.8)
            return "#FFFF33";
        return "#33FF33"
    }
    // move enemy along the path
    move(){
        // minimum distance tolerate from destination
        // check if enemy reach the end of path
        if(this.pathIndex >= this.paths.length){
            this.pos = this.destination;
            // console.log("Reached destination: "+ this.destination.x + " " + this.destination.y);
            return;
        }
        // fetch destination from path
        this.destination = this.paths[this.pathIndex];
        // calculate direction
        this.direction = new Position(this.destination.x - this.pos.x, this.destination.y - this.pos.y).getDirection();
        // console.log("dir: " + this.direction.x + " " + this.direction.y);
        // move
        this.pos = this.pos.add(this.direction.multiply(this.speed));
        this.center = new Position(this.pos.x + this.SIZE/2, this.pos.y + this.SIZE/2);
        // console.log("pos: " + this.pos.x + " " + this.pos.y);
        // check if enemy reach destination
        if(this.pos.equal(this.destination) || this.pos.distanceTo(this.destination) < this.MIN_DIST_FROM_DEST){
            // move to next destination
            this.pathIndex++;
        }
    }

}