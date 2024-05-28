import Game from './Game.js';
import Enemy from './Enemy.js';
import Position from './Position.js';

"use strict";

const game = new Game();
game.addEnemy(new Enemy(new Position(0, 0), 1, 100));
game.addEnemy(new Enemy(new Position(0, 0), 1, 100));
game.init();