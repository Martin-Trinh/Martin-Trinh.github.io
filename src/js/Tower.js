import Position from './Position.js';
import Bullet from './Bullet.js';

export default class Tower {
    constructor(pos, range, damage, speed, price, color){
        this.range = range;
        this.damage = damage;
        this.speed = speed;
        this.price = price;
        this.color = color;
        this.pos = pos;
        this.target = null;
        this.bullets = [];
        // for generating bullets
        this.frame = 0;

        this.GRID_SIZE = 50;
        this.width = Math.sqrt(2* this.GRID_SIZE** 2)/2 
        this.height = Math.sqrt(2* this.GRID_SIZE** 2)/2; 
        
    }
    /**
     * Render tower on canvas
     */
    #render(canvas){
        const ctx = canvas.getContext('2d');
        // Save the current ctx state
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.range, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.save(); 
        // Move the ctx to the center of the rectangle
        ctx.translate(this.pos.x, this.pos.y);
        // Rotate the ctx
        ctx.rotate(45 * Math.PI / 180);
        // Draw the rectangle centered at the origin (0, 0)
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height);
        // ctx.fillRect(this.pos.x, this.pos.y, 10, 10);
        // Restore the context to its original state
        ctx.restore()
    }
    /**
     * Create bullet and shoot at target
     */
    #shoot(){
        if(this.frame % Math.floor(100/this.speed) === 0 && this.target !== null){
            const bulletPos = new Position(this.pos.x, this.pos.y);
            this.bullets.push(new Bullet(bulletPos, this.damage, this.target));
            this.frame = 0;
        }
        this.frame++;
    }
    /**
     * Update enemy position and shoot bullets
     * @param {*} enemies 
     * @param {*} canvas 
     */
    update(enemies, canvas){
        this.#render(canvas);
        // find all targets in range
        const enemiesInRange = enemies.filter(enemy => {
            return this.pos.distanceTo(enemy.pos) < this.range + enemy.r;
        });
        if(enemiesInRange.length !== 0){
            // select the first enemy in range
            this.target = enemiesInRange[0];
        } else {
            // no enemy in range
            this.target = null;
        }
        // shoot
        this.#shoot();
        // update bullets
        for(let i = this.bullets.length - 1; i >= 0; i--){
            const bullet = this.bullets[i];
            bullet.update(canvas);
            // if bullet hits the target
            if(bullet.pos.distanceTo(bullet.target.center) < bullet.r + bullet.target.r){
                bullet.target.currentHealth -= bullet.damage;
                this.bullets.splice(i, 1);
            }
        }
    }
}