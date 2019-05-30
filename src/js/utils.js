export function newImage(src){
    let img = new Image();
    img.src = src;
    return img;
}

export function setFavicon(faviconImg){
    let link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = faviconImg;
    document.getElementsByTagName('head')[0].appendChild(link);
}

export function calcDiag(speed){
    return Math.sqrt((speed ** 2) / 2);
}