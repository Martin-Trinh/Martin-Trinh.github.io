import Position from './Position.js';

export default class Tower {
    constructor(pos, range, damage, speed, price, color){
        this.range = range;
        this.damage = damage;
        this.speed = speed;
        this.price = price;
        this.color = color;
        this.pos = pos;
    }
    render(canvas){
        const ctx = canvas.getContext('2d');
        // Save the current ctx state
        ctx.save(); 
        // Move the ctx to the center of the rectangle
        // ctx.translate(this.pos.x, this.pos.y);
        // Rotate the ctx
        ctx.rotate(45);
        // Draw the rectangle centered at the origin (0, 0)
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.x, this.pos.y, 35, 35);
        // ctx.fillRect(this.pos.x, this.pos.y, 10, 10);
        // Restore the context to its original state
    }
    update(){
        this.render();
        // find target
        // shoot
    }
}