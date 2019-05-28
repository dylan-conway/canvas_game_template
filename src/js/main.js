
// Import canvas class.
import Canvas from '../js/Canvas.js';

// Add favicon.
import faviconImg from '../images/favicon.ico';
(()=>{
    let link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = faviconImg;
    document.getElementsByTagName('head')[0].appendChild(link);
})();

window.onload = o => {
    let check = o;
    
    // Get canvas tag and context;
    let canvasElem = document.getElementById('canvas');
    let context = canvasElem.getContext('2d');
    let c = new Canvas(canvasElem, context, innerWidth, innerHeight);
}