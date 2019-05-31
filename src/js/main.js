
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
        this.level = undefined;
    }
    addLevel(level){
        this.level = level;
    }
    update(){
        // Check collisions.
        if(player.x < 0){
            let diff = 0 - player.x;
            this.moveX(player, diff);
        }
        if(player.y < 0){
            let diff = 0 - player.y;
            this.moveY(player, diff);
        }
        if(player.x + player.width > WIDTH){
            let diff = WIDTH - (player.x + player.width);
            this.moveX(player, diff);
        }
        if(player.y + player.height > HEIGHT){
            let diff = HEIGHT - (player.y + player.height);
            this.moveY(player, diff)
        }
    }
    draw(){
        // Draw game objects.
        this.level.draw(c.ctx);
        objects.draw(c.ctx);
        player.draw(c.ctx);
    }
    moveX(obj, dist){
        obj.x += dist;
    }
    moveY(obj, dist){
        obj.y += dist;
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
}

// Player class.
class Player{
    constructor(width, height, imgSrc, rate){
        this.x = 300;
        this.y = 250;
        this.width = width;
        this.height = height;
        this.rate = rate
        this.sprite = new Sprite(imgSrc, this.rate, this.width, this.height);
        this.speed = 4;
        this.state = states.STANDING;
        this.facing = face.SOUTH;
    }
    moveX(speed){
        this.x += speed;
    }
    moveY(speed){
        this.y += speed;
    }
    draw(ctx){
        ctx.beginPath();
        ctx.ellipse(this.x + (this.width / 2), this.y + this.height, this.width / 2, this.width / 4, Math.PI * 2, 0, Math.PI * 2, false);
        c.setFillColor('rgba(0, 0, 0, .4');
        ctx.fill();
        this.sprite.draw(ctx, this.x, this.y, this.facing, this.state);
    }
    handleCommands(command){
        switch(command){
            case commands.STAND:
                this.state = states.STANDING;
                break;
            case commands.MOVE_UP:
                this.facing = face.NORTH;
                this.state = states.RUNNING;
                g.moveUp(this, this.speed);
                break;
            case commands.MOVE_RIGHT:
                this.facing = face.EAST;
                this.state = states.RUNNING;
                g.moveRight(this, this.speed);
                break;
            case commands.MOVE_DOWN:
                this.facing = face.SOUTH;
                this.state = states.RUNNING;
                g.moveDown(this, this.speed);
                break;
            case commands.MOVE_LEFT:
                this.facing = face.WEST;
                this.state = states.RUNNING;
                g.moveLeft(this, this.speed);
                break;
            case commands.MOVE_UP_LEFT:
                this.facing = face.NORTH_WEST;
                this.state = states.RUNNING;
                g.moveUp(this, utils.calcDiag(this.speed));
                g.moveLeft(this, utils.calcDiag(this.speed));
                break;
            case commands.MOVE_UP_RIGHT:
                this.facing = face.NORTH_EAST;
                this.state = states.RUNNING;
                g.moveUp(this, utils.calcDiag(this.speed));
                g.moveRight(this, utils.calcDiag(this.speed));
                break;
            case commands.MOVE_DOWN_RIGHT:
                this.facing = face.SOUTH_EAST;
                this.state = states.RUNNING;
                g.moveDown(this, utils.calcDiag(this.speed));
                g.moveRight(this, utils.calcDiag(this.speed));
                break;
            case commands.MOVE_DOWN_LEFT:
                this.facing = face.SOUTH_WEST;
                this.state = states.RUNNING;
                g.moveDown(this, utils.calcDiag(this.speed));
                g.moveLeft(this, utils.calcDiag(this.speed));
                break;
        }
    }
}

let gameLoop = () => {
    requestAnimationFrame(gameLoop);

    // Process input from keyboard and mouse.
    if(g.blocking){
        console.log('blocking!!!!');
    }else{
        processInput();
    }

    // Update.
    g.update();
    // console.log(player.x, player.y);
    
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
    let level1 = new Map(mapImg, -100, -100);

    // Game objects.
    g = new Game();
    g.addLevel(level1);
    player = new Player(32, 48, characterImg, 20);
    objects = new Objects();
}

let processInput = () => {

    // Keyboard.
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
    player.handleCommands(command);

    // Mouse.

}
