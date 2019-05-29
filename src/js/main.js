
// Import CSS.
import '../css/style.css';

// Import classes, objects and functions.
import Canvas from '../js/Canvas.js';
import Key from '../js/Keyboard.js';
import * as utils from '../js/utils.js';

// Import images.
import faviconImg from '../images/favicon.ico';

const WIDTH = 4 * 256;
const HEIGHT = 3 * 256;

let c;


window.onload = e => {
    console.log(e);

    // Set up various document things.
    setUpDocument();
    
    // Start canvas programming.
    c.setFillColor('red');
    c.ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

let setUpDocument = () => {

    // Favicon.
    utils.setFavicon(faviconImg);

    // Add event listeners for keyup and keydown.
    window.addEventListener('keydown', (e) => {Key.onKeyDown(e);}, false);
    window.addEventListener('keyup', (e) => {Key.onKeyUp(e);}, false);

    // Get canvas tag and make canvas class.
    let canvasElem = document.getElementById('canvas');
    c = new Canvas(canvasElem, WIDTH, HEIGHT);
}
