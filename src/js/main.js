
// Import CSS.
import '../css/style.css';

// Import classes, objects and functions.
import Canvas from '../js/Canvas.js';
import Objects from '../js/Objects.js';
import Key from '../js/Keyboard.js';
import * as utils from '../js/utils.js';

// Import images.
import faviconImg from '../images/favicon.ico';

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
};

// Player states.
const pStates = {
    STANDING: 1,
    RUNNING: 2,
    JUMPING: 3
};

// Player object.
let player = {
    x: 30,
    y: 30,
    width: 64,
    height: 64,
    speed: 10,
    state: pStates.STANDING,
    moveX: function(speed){
        this.x += speed;
    },
    moveY: function(speed){
        this.y += speed;
    },
    moveUp: function(speed){
        this.y -= speed;
    },
    moveRight: function(speed){
        this.x += speed;
    },
    moveDown: function(speed){
        this.y += speed;
    },
    moveLeft: function(speed){
        this.x -= speed;
    },
    draw: function(){
        c.ctx.fillRect(this.x, this.y, this.width, this.height);
    },
    handleInput: function(method){
        // switch(this.state){
        //     case STANDING:
        //         if()
        // }
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
    console.log(player.x, player.y);
    
    // Clear canvas then render.
    c.clear();
    g.draw();
}

let setUpDocument = () => {

    // Favicon.
    utils.setFavicon(faviconImg);

    // Add event listeners for keyup and keydown.
    window.addEventListener('keydown', (e) => {Key.onKeyDown(e);}, false);
    window.addEventListener('keyup', (e) => {Key.onKeyUp(e);}, false);
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
        player.moveUp(utils.calcDiag(player.speed));
        player.moveRight(utils.calcDiag(player.speed));
    }else if(Key.isDown(Key.RIGHT) && Key.isDown(Key.DOWN)){
        player.moveRight(utils.calcDiag(player.speed));
        player.moveDown(utils.calcDiag(player.speed));
    }else if(Key.isDown(Key.DOWN) && Key.isDown(Key.LEFT)){
        player.moveDown(utils.calcDiag(player.speed));
        player.moveLeft(utils.calcDiag(player.speed));
    }else if(Key.isDown(Key.LEFT) && Key.isDown(Key.UP)){
        player.moveLeft(utils.calcDiag(player.speed));
        player.moveUp(utils.calcDiag(player.speed));
    }else if(Key.isDown(Key.UP)){
        player.moveUp(player.speed);
    }else if(Key.isDown(Key.RIGHT)){
        player.moveRight(player.speed);
    }else if(Key.isDown(Key.DOWN)){
        player.moveDown(player.speed);
    }else if(Key.isDown(Key.LEFT)){
        player.moveLeft(player.speed);
    }

    // Mouse.

}
