import Game from './Game.js';

const pathPoints = [
    {x: 0, y: 0},
    {x: 0, y: 4},
    {x: 6, y: 4},
    {x: 6, y: 10},
    {x: 10, y: 10},
    {x: 10, y: 2},
    {x: 13, y: 2},
    {x: 13, y: 9},
];

const towerStats = {
    basic: {
        range: 100,
        damage: 10,
        speed: 1,
        price: 10,
        color: 'red'
    },
    archer: {
        range: 50,
        damage: 5,
        speed: 5,
        price: 20,
        color: 'green'
    },
    cannon:{
        range: 150,
        damage: 20,
        speed: 0.5,
        price: 30,
        color: 'blue'
    },
    sniper:{
        range: 200,
        damage: 50,
        speed: 2,
        price: 50,
        color: 'purple'
    }
}
const nextStageBtn = document.getElementById('next-stage-btn');
const startBtn= document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const audioBtn = document.getElementById('audio-btn');
const backToMenu = document.getElementById('back-to-menu');

const towers = document.querySelectorAll('.tower');

for(let tower of towers){
    const color = towerStats[tower.dataset.towerType].color;
    tower.style.backgroundColor = color;
    tower.addEventListener('dragstart', (e) =>{
        e.dataTransfer.setData('text/plain', e.target.dataset.towerType);
    })
    tower.addEventListener('mouseover', (e) =>{
        const type = document.querySelector('#tower-type');
        const damage = document.querySelector('#tower-damage');
        const range = document.querySelector('#tower-range');
        const speed = document.querySelector('#tower-speed');
        const price = document.querySelector('#tower-price');
        type.textContent = "Type: " + tower.dataset.towerType;
        damage.textContent ="Damage: " + towerStats[tower.dataset.towerType].damage;
        range.textContent = "Range: " + towerStats[tower.dataset.towerType].range;
        speed.textContent = "Speed: " + towerStats[tower.dataset.towerType].speed;
        price.textContent = "Price: " + towerStats[tower.dataset.towerType].price;
    })
   
}
const game = new Game(pathPoints);
game.init();
const canvas = document.getElementById('canvas');

canvas.addEventListener('dragover', (e) =>{
    e.preventDefault();
});

canvas.addEventListener('drop', (e) =>{
    e.preventDefault();
    const towerType = e.dataTransfer.getData('text/plain');
    console.log(towerType);
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    console.log(`x: ${x}, y: ${y}`);
    game.map.addTower({x, y}, towerStats[towerType]);
})



