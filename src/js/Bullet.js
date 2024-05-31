export default class Bullet{
    constructor(pos, damage, speed, target){
        this.pos = pos;
        this.damage = damage;
        this.speed = speed;
        this.target = target;
        this.radius = 1;
    }
    render(canvas){
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

}