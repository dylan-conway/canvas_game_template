
let Key = {
    _pressed: {},
    UP: 87,
    RIGHT: 68,
    DOWN: 83,
    LEFT: 65,
    isDown: function(keyCode){
        return this._pressed[keyCode];
    },
    onKeyDown: function(event){
        this._pressed[event.keyCode] = event.timeStamp;
    },
    onKeyUp: function(event){
        delete this._pressed[event.keyCode];
    }
}

export default Key;
