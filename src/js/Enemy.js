"use strict";


export default class Enemy{
    constructor(position, speed, health){
        this.position = position;
        this.speed = speed;
        this.health = health;
        this.width = 10;
        this.height = 10;
        this.r = 3


    }
    update(ctx){
        this.render(ctx);
        this.move();
    }
    render(ctx){
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
        // ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
    move(){
        this.pos.x += 1;
    }

}