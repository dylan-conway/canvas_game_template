
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
import * as utils from '../js/utils.js';
import {states, commands, face} from '../js/Enums.js';

// Import images.
import faviconImg from '../images/favicon.ico';
import characterImg from '../images/characterSprite.png';
import mapImg from '../images/rewoven.png'

// Width and height of the canvas.
const WIDTH = 1024;
const HEIGHT = 768;

// Canvas class and canvas objects classes.
let c, g, player, objects;

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

class Game{
    constructor(){
        this.name = 'game';
        this.blocking = false;
        this.map = undefined;
    }
    addMap(map){
        this.map = map;
    }
    update(){
        // Check collisions.
        if(player.x < this.map.x){
            this.moveRight(this.map, -(this.map.x - player.x));
        }
        if(player.y < this.map.y){
            this.moveDown(this.map, -(this.map.y - player.y));
        }
        if(player.x + player.width > this.map.x + this.map.width){
            this.moveLeft(this.map, -((player.x + player.width) - (this.map.x + this.map.width)));
        }
        if(player.y + player.height > this.map.y + this.map.height){
            this.moveUp(this.map, -((player.y + player.height) - (this.map.y + this.map.height)));
        }
    }
    draw(){
        // Draw game objects.
        this.map.draw(c.ctx);
        objects.draw(c.ctx);
        player.draw(c.ctx);
    }
    moveUp(obj, dist){
        obj.y -= dist;
    }
    moveRight(obj, dist){
        obj.x += dist;
    }
    moveDown(obj, dist){
        obj.y += dist;
    }
    moveLeft(obj, dist){
        obj.x -= dist;
    }
    handleCommands(command){
        switch(command){
            case commands.STAND:
                player.state = states.STANDING;
                break;
            case commands.MOVE_UP:
                player.facing = face.NORTH;
                player.state = states.RUNNING;
                g.moveDown(this.map, player.speed);
                break;
            case commands.MOVE_RIGHT:
                player.facing = face.EAST;
                player.state = states.RUNNING;
                g.moveLeft(this.map, player.speed);
                break;
            case commands.MOVE_DOWN:
                player.facing = face.SOUTH;
                player.state = states.RUNNING;
                g.moveUp(this.map, player.speed);
                break;
            case commands.MOVE_LEFT:
                player.facing = face.WEST;
                player.state = states.RUNNING;
                g.moveRight(this.map, player.speed);
                break;
            case commands.MOVE_UP_LEFT:
                player.facing = face.NORTH_WEST;
                player.state = states.RUNNING;
                g.moveDown(this.map, utils.calcDiag(player.speed));
                g.moveRight(this.map, utils.calcDiag(player.speed));
                break;
            case commands.MOVE_UP_RIGHT:
                player.facing = face.NORTH_EAST;
                player.state = states.RUNNING;
                g.moveDown(this.map, utils.calcDiag(player.speed));
                g.moveLeft(this.map, utils.calcDiag(player.speed));
                break;
            case commands.MOVE_DOWN_RIGHT:
                player.facing = face.SOUTH_EAST;
                player.state = states.RUNNING;
                g.moveUp(this.map, utils.calcDiag(player.speed));
                g.moveLeft(this.map, utils.calcDiag(player.speed));
                break;
            case commands.MOVE_DOWN_LEFT:
                player.facing = face.SOUTH_WEST;
                player.state = states.RUNNING;
                g.moveUp(this.map, utils.calcDiag(player.speed));
                g.moveRight(this.map, utils.calcDiag(player.speed));
                break;
        }
    }
}

// Player class.
class Player{
    constructor(width, height, imgSrc, rate){
        this.width = width;
        this.height = height;
        this.x = (WIDTH / 2) - (this.width / 2);
        this.y = (HEIGHT / 2) - (this.height / 2);
        this.rate = rate
        this.sprite = new Sprite(imgSrc, this.rate, this.width, this.height);
        // 3
        this.speed = 30;
        this.state = states.STANDING;
        this.facing = face.SOUTH;
    }
    draw(ctx){
        ctx.beginPath();
        ctx.ellipse(this.x + (this.width / 2), this.y + this.height, this.width / 2, this.width / 4, Math.PI * 2, 0, Math.PI * 2, false);
        c.setFillColor('rgba(0, 0, 0, .4');
        ctx.fill();
        this.sprite.draw(ctx, this.x, this.y, this.facing, this.state);
    }
}

let gameLoop = () => {
    requestAnimationFrame(gameLoop);

    // Process input from keyboard and mouse.
    if(g.blocking){
        console.log('blocking!!!!');
    }else{
        processInput(g.blocking);
    }

    // Update.
    g.update();
    // console.log(player.x, player.y);
    // console.log(g.map.x, g.map.y);
    
    // Clear canvas then render.
    c.clear();
    g.draw();
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
    c = new Canvas(canvasElem, WIDTH, HEIGHT);

    // Maps.
    let map1 = new Map(mapImg, 0, 0);

    // Game objects.
    g = new Game();
    g.addMap(map1);
    player = new Player(64 / 2, 96 / 2, characterImg, 15);
    objects = new Objects();
}

let processInput = blocking => {

    // Keyboard.
    if(!blocking){
        let command;
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
        g.handleCommands(command);
    }
    
    // Mouse.

}
