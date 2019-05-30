
// Import CSS.
import '../css/style.css';

// Import classes, objects and functions.
import Canvas from '../js/Canvas.js';
import Objects from '../js/Objects.js';
import Key from '../js/Keyboard.js';
import * as utils from '../js/utils.js';

// Import images.
import faviconImg from '../images/favicon.ico';
import characterImg from '../images/character.png';
import { createContext } from 'vm';

// Width and height of the canvas.
const WIDTH = 1024;
const HEIGHT = 768;

// Canvas class and canvas objects class.
let c, objects;

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

let g = {
    name: 'game',
    blocking: false,
    update: function(){
        // Check collisions.
        if(player.x < 0){
            let diff = 0 - player.x;
            player.moveX(diff);
        }
        if(player.y < 0){
            let diff = 0 - player.y;
            player.moveY(diff);
        }
        if(player.x + player.width > WIDTH){
            let diff = WIDTH - (player.x + player.width);
            player.moveX(diff);
        }
        if(player.y + player.height > HEIGHT){
            let diff = HEIGHT - (player.y + player.height);
            player.moveY(diff)
        }
    },
    draw: function(){
        // Draw game objects.
        objects.draw();
        player.draw();
    },
    moveX: function(obj, dist){
        obj.x += dist;
    },
    moveY: function(obj, dist){
        obj.y += dist;
    },
    moveUp: function(obj, dist){
        obj.y -= dist;
    },
    moveRight: function(obj, dist){
        obj.x += dist;
    },
    moveDown: function(obj, dist){
        obj.y += dist;
    },
    moveLeft: function(obj, dist){
        obj.x -= dist;
    }
};

// Player states.
const states = {
    STANDING: 1,
    RUNNING: 2,
    JUMPING: 3
};

// Player commands.
const commands = {
    MOVE_UP: 1,
    MOVE_RIGHT: 2,
    MOVE_DOWN: 3,
    MOVE_LEFT: 4,
    MOVE_UP_LEFT: 5,
    MOVE_UP_RIGHT: 6,
    MOVE_DOWN_RIGHT: 7,
    MOVE_DOWN_LEFT: 8
}

// Player object.
let player = {
    x: 30,
    y: 30,
    width: 32,
    height: 32,
    img: utils.newImage(characterImg),
    speed: 8,
    state: states.STANDING,
    moveX: function(speed){
        this.x += speed;
    },
    moveY: function(speed){
        this.y += speed;
    },
    draw: function(){
        // c.ctx.fillRect((this.x), (this.y), this.width, this.height);
        c.ctx.drawImage(this.img, this.x, this.y);
    },
    handleCommands: function(command){
        switch(command){
            case commands.MOVE_UP:
                g.moveUp(this, this.speed);
                break;
            case commands.MOVE_RIGHT:
                g.moveRight(this, this.speed);
                break;
            case commands.MOVE_DOWN:
                g.moveDown(this, this.speed);
                break;
            case commands.MOVE_LEFT:
                g.moveLeft(this, this.speed);
                break;
            case commands.MOVE_UP_LEFT:
                g.moveUp(this, utils.calcDiag(this.speed));
                g.moveLeft(this, utils.calcDiag(this.speed));
                break;
            case commands.MOVE_UP_RIGHT:
                g.moveUp(this, utils.calcDiag(this.speed));
                g.moveRight(this, utils.calcDiag(this.speed));
                break;
            case commands.MOVE_DOWN_RIGHT:
                g.moveDown(this, utils.calcDiag(this.speed));
                g.moveRight(this, utils.calcDiag(this.speed));
                break;
            case commands.MOVE_DOWN_LEFT:
                g.moveDown(this, utils.calcDiag(this.speed));
                g.moveLeft(this, utils.calcDiag(this.speed));
                break;
        }
    }
};

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

    // Game objects.
    objects = new Objects();
}

let processInput = () => {

    // Keyboard.
    if(Key.isDown(Key.UP) && Key.isDown(Key.RIGHT)){
        player.handleCommands(commands.MOVE_UP_RIGHT);
        // player.moveUp(utils.calcDiag(player.speed));
        // player.moveRight(utils.calcDiag(player.speed));
    }else if(Key.isDown(Key.RIGHT) && Key.isDown(Key.DOWN)){
        player.handleCommands(commands.MOVE_DOWN_RIGHT);
        // player.moveRight(utils.calcDiag(player.speed));
        // player.moveDown(utils.calcDiag(player.speed));
    }else if(Key.isDown(Key.DOWN) && Key.isDown(Key.LEFT)){
        player.handleCommands(commands.MOVE_DOWN_LEFT);
        // player.moveDown(utils.calcDiag(player.speed));
        // player.moveLeft(utils.calcDiag(player.speed));
    }else if(Key.isDown(Key.LEFT) && Key.isDown(Key.UP)){
        player.handleCommands(commands.MOVE_UP_LEFT);
        // player.moveLeft(utils.calcDiag(player.speed));
        // player.moveUp(utils.calcDiag(player.speed));
    }else if(Key.isDown(Key.UP)){
        player.handleCommands(commands.MOVE_UP);
        // player.moveUp(player.speed);
    }else if(Key.isDown(Key.RIGHT)){
        player.handleCommands(commands.MOVE_RIGHT);
        // player.moveRight(player.speed);
    }else if(Key.isDown(Key.DOWN)){
        player.handleCommands(commands.MOVE_DOWN);
        // player.moveDown(player.speed);
    }else if(Key.isDown(Key.LEFT)){
        player.handleCommands(commands.MOVE_LEFT);
        // player.moveLeft(player.speed);
    }

    // Mouse.

}
