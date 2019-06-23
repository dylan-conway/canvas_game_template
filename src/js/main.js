
/*
    Currently untitled 2d game.

    Author: Dylan Conway
*/

// Import CSS.
import '../css/style.css';

// Import classes, objects and functions.
import Canvas from '../js/Canvas.js';
import Objects from '../js/Objects.js';
import Key from '../js/Keyboard.js';
import Sprite from '../js/Sprite.js';
import Map from '../js/Map.js';
import Wall from '../js/Walls.js';
import Grass from '../js/Scenery.js';
import * as utils from '../js/utils.js';
import {states, commands, face} from '../js/Enums.js';

// Import images.
import faviconImg from '../images/favicon.ico';
import characterImg from '../images/characterSprite.png';
// import mapImg from '../images/rewoven.png';
import grassImg from '../images/grassSprite.png';

// Width and height of the canvas.
// window.WIDTH = 1024;
// window.HEIGHT = 768;
window.WIDTH = Math.floor(innerWidth);
window.HEIGHT = Math.floor(innerHeight);

// Canvas class and canvas objects classes. Global.

window.blocking = false;

function update(command){
    switch(command){
        case commands.MOVE_UP:
            if(player.y + player.height / 2 < map.y){
                moveDown(-(map.y - (player.y + player.height / 2)));
            }
            break;
        case commands.MOVE_RIGHT:
            if(player.x + player.width > map.x + map.width){
                moveLeft(-((player.x + player.width) - (map.x + map.width)));
            }
            break;
        case commands.MOVE_DOWN:
            if(player.y + player.height > map.y + map.height){
                moveUp(-((player.y + player.height) - (map.y + map.height)));
            }
            break;
        case commands.MOVE_LEFT:
            if(player.x < map.x){
                moveRight(-(map.x - player.x));
            }
            break;
        case commands.MOVE_UP_LEFT:
            if(player.y + player.height / 2 < map.y){
                moveDown(-(map.y - (player.y + player.height / 2)));
            }
            if(player.x < map.x){
                moveRight(-(map.x - player.x));
            }
            break;
        case commands.MOVE_UP_RIGHT:
            if(player.y + player.height / 2 < map.y){
                moveDown(-(map.y - (player.y + player.height / 2)));
            }
            if(player.x + player.width > map.x + map.width){
                moveLeft(-((player.x + player.width) - (map.x + map.width)));
            }
            break;
        case commands.MOVE_DOWN_RIGHT:
            if(player.y + player.height > map.y + map.height){
                moveUp(-((player.y + player.height) - (map.y + map.height)));
            }
            if(player.x + player.width > map.x + map.width){
                moveLeft(-((player.x + player.width) - (map.x + map.width)));
            }
            break;
        case commands.MOVE_DOWN_LEFT:
            if(player.y + player.height > map.y + map.height){
                moveUp(-((player.y + player.height) - (map.y + map.height)));
            }
            if(player.x < map.x){
                moveRight(-(map.x - player.x));
            }
            break;
    }
}

function handleCommands(command){
    let speed = player.speed;
    let diag = utils.calcDiag(player.speed);
    switch(command){
        case commands.STAND:
            player.state = states.STANDING;
            break;
        case commands.MOVE_UP:
            player.facing = face.NORTH;
            player.state = states.RUNNING;
            moveDown(speed);
            break;
        case commands.MOVE_RIGHT:
            player.facing = face.EAST;
            player.state = states.RUNNING;
            moveLeft(speed);
            break;
        case commands.MOVE_DOWN:
            player.facing = face.SOUTH;
            player.state = states.RUNNING;
            moveUp(speed);
            break;
        case commands.MOVE_LEFT:
            player.facing = face.WEST;
            player.state = states.RUNNING;
            moveRight(speed);
            break;
        case commands.MOVE_UP_LEFT:
            player.facing = face.NORTH_WEST;
            player.state = states.RUNNING;
            moveDown(diag);
            moveRight(diag);
            break;
        case commands.MOVE_UP_RIGHT:
            player.facing = face.NORTH_EAST;
            player.state = states.RUNNING;
            moveDown(diag);
            moveLeft(diag);
            break;
        case commands.MOVE_DOWN_RIGHT:
            player.facing = face.SOUTH_EAST;
            player.state = states.RUNNING;
            moveUp(diag);
            moveLeft(diag);
            break;
        case commands.MOVE_DOWN_LEFT:
            player.facing = face.SOUTH_WEST;
            player.state = states.RUNNING;
            moveUp(diag);
            moveRight(diag);
            break;
    }
}

window.onload = e => {
    // window.onload event info.
    console.log(e);

    // Set up various document things.
    setUpDocument();

    // Initiate objects for the animation.
    setUpObjects();

    // Call the game loop.
    gameLoop();
}

let gameLoop = () => {
    requestAnimationFrame(gameLoop);

    // Process input from keyboard and mouse.
    let command = processInput(blocking);

    // Handle the command from the input.
    handleCommands(command);

    // Update (check for collisions, make corrections).
    update(command);
    // console.log(player.mapX, player.mapY);
    // console.log(map.x, map.y);
    
    // Clear canvas then render.
    // c.clear();
    c.ctx.fillStyle = 'white';
    c.ctx.fillRect(0, 0, WIDTH, HEIGHT);
    draw();
}

let setUpDocument = () => {

    // Favicon.
    utils.setFavicon(faviconImg);

    // Add event listeners for keyup and keydown.
    window.addEventListener('keydown', e => {Key.onKeyDown(e);}, false);
    window.addEventListener('keyup', e => {Key.onKeyUp(e);}, false);
}

let setUpObjects = () => {

    // Get canvas tag and make canvas class.
    let canvasElem = document.getElementById('canvas');
    window.c = new Canvas(canvasElem, WIDTH, HEIGHT);

    // Maps.
    window.map = new Map(0, 0);

    // Game objects.
    window.player = new Player(64 / 2, 96 / 2, characterImg, 15);
    window.objects = new Objects();

    // let wall1 = new Wall(150, 150, 64, 64);
    // objects.addObstacle(wall1);
    let grass = new Grass(grassImg, 150, 250, 64, 64);
    objects.addScenery(grass);
    for(let i = 0; i < map.width / 64; i ++){
        for(let j = 0; j < map.height / 64; j ++){
            objects.addScenery(new Grass(grassImg, (i * 64), (j * 64), 64, 64));
        }
    }
}

let processInput = blocking => {

    // Keyboard.
    let command;
    if(!blocking){
        if(Key.isDown(Key.UP) && Key.isDown(Key.RIGHT)){
            command = commands.MOVE_UP_RIGHT
        }else if(Key.isDown(Key.RIGHT) && Key.isDown(Key.DOWN)){
            command = commands.MOVE_DOWN_RIGHT;
        }else if(Key.isDown(Key.DOWN) && Key.isDown(Key.LEFT)){
            command = commands.MOVE_DOWN_LEFT;
        }else if(Key.isDown(Key.LEFT) && Key.isDown(Key.UP)){
            command = commands.MOVE_UP_LEFT;
        }else if(Key.isDown(Key.UP)){
            command = commands.MOVE_UP;
        }else if(Key.isDown(Key.RIGHT)){
            command = commands.MOVE_RIGHT;
        }else if(Key.isDown(Key.DOWN)){
            command = commands.MOVE_DOWN;
        }else if(Key.isDown(Key.LEFT)){
            command = commands.MOVE_LEFT;
        }else if(!Key.isDown(Key.Up) && !Key.isDown(Key.RIGHT) &&
                !Key.isDown(Key.DOWN) && !Key.isDown(Key.LEFT)){
            command = commands.STAND;
        }
    }
    
    // Mouse.

    return command;
}

function draw(){
    map.draw(c.ctx);
    objects.draw(c.ctx);
    player.draw(c.ctx);
}

// Global game move functions.
window.moveUp = function moveUp(dist){
    player.moveDown(dist);
    map.y -= dist;
    objects.moveUp(dist);
    objects.checkDownCollisions(player);
}
window.moveRight = function moveRight(dist){
    player.moveLeft(dist);
    map.x += dist;
    objects.moveRight(dist);
    objects.checkLeftCollisions(player);
}
window.moveDown = function moveDown(dist){
    player.moveUp(dist);
    map.y += dist;
    objects.moveDown(dist);
    objects.checkUpCollisions(player);
}
window.moveLeft = function moveLeft(dist){
    player.moveRight(dist);
    map.x -= dist;
    objects.moveLeft(dist);
    objects.checkRightCollisions(player);
}

// Player class.
class Player{
    constructor(width, height, imgSrc, rate){
        this.width = width;
        this.height = height;
        this.mapX = Math.floor(WIDTH / 2) - (this.width / 2);
        this.mapY = Math.floor(HEIGHT / 2) - (this.height / 2);
        this.x = Math.floor(WIDTH / 2) - (this.width / 2);
        this.y = Math.floor(HEIGHT / 2) - (this.height / 2);
        this.rate = rate;
        this.sprite = new Sprite(imgSrc, this.rate, this.width, this.height);
        // 3
        this.speed = 3;
        this.state = states.STANDING;
        this.facing = face.SOUTH;
        this.name = 'player';
    }
    draw(ctx){
        ctx.beginPath();
        ctx.ellipse(this.x + (this.width / 2), this.y + this.height, this.width / 2, this.width / 4, Math.PI * 2, 0, Math.PI * 2, false);
        c.setFillColor('rgba(0, 0, 0, .4');
        ctx.fill();
        this.sprite.draw(ctx, this.x, this.y, this.facing, this.state);
    }
    moveUp(dist){
        this.mapY -= dist;
    }
    moveRight(dist){
        this.mapX += dist;
    }
    moveDown(dist){
        this.mapY += dist;
    }
    moveLeft(dist){
        this.mapX -= dist;
    }
}
