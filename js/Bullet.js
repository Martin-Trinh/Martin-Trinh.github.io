export default class Bullet{
    constructor(pos, damage, target){
        this.pos = pos;
        this.damage = damage;
        this.SPEED = 5;
        this.target = target;
        this.r = 5;
    }
    // render bullet on canvas as circle
    #render(canvas){
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'orange';
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
    }
    // update bullet position
    update(canvas){
        this.#render(canvas);
        // calculate angle between bullet and target
        const angle = Math.atan2(this.target.center.y - this.pos.y, this.target.center.x - this.pos.x);
        // add direction to bullet position
        this.pos.x += this.SPEED * Math.cos(angle);
        this.pos.y += this.SPEED * Math.sin(angle);
    }

}