import Position from "./Position.js";

"use strict";


export default class Map{
    constructor(canvas){
        this.canvas = canvas;
        this.path = [
            new Position(0, 400),
            new Position(400, 0),
        ];
        this.GRID_SIZE = 25;
    }
    addPath (path){
        this.path.push(path);
    }
    renderPath(){
        const ctx = this.canvas.getContext('2d');
        let drawPos = new Position(50, 0);
        ctx.fillStyle = 'blue';
        this.path.forEach(vec => {
            let x = drawPos.x - this.GRID_SIZE;
            let y = drawPos.y - this.GRID_SIZE;
            let w = vec.x + this.GRID_SIZE * 2;
            let h = this.GRID_SIZE * 2;
            if(vec.x == 0){
                w = this.GRID_SIZE * 2;
                h = vec.y + this.GRID_SIZE * 2;
            }
            ctx.fillRect(x, y, w, h);
            drawPos.x += vec.x;
            drawPos.y += vec.y;
        });
    }
    drawPath(){
        const paths = [
            new Position(12.5, 12.5),
            new Position(0, 400),
            new Position(600, 0),   
        ]
        const ctx = this.canvas.getContext('2d');
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 2;
        ctx.beginPath();
        let drawPos = new Position(paths[0].x, paths[0].y);
        ctx.moveTo(drawPos.x, drawPos.y);
        for(let i = 1; i < paths.length; i++){
            if(paths[i].x == 0)
                drawPos.y += paths[i].y;
            else
                drawPos.x += paths[i].x;
            ctx.lineTo(drawPos.x, drawPos.y);
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
}
