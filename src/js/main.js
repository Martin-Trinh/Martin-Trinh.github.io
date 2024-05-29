import Game from './Game.js';

const pathPoints = [
    {x: 0, y: 0},
    {x: 0, y: 4},
    {x: 9, y: 4},
    {x: 9, y: 10},
    {x: 6, y: 10},
    {x: 6, y: 2},
    {x: 20, y: 2},
    {x: 20, y: 20},
];
const game = new Game(pathPoints);
game.addEnemy(5, 100);
game.addEnemy(4, 200);
game.addEnemy(3, 300);
game.init();