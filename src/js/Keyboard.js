let Key = {

    _pressed: {},

    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    LEFT: 37,

    isDown: (keyCode) => {
        return this._pressed[keyCode];
    },

    onKeyDown: (event) => {
        this._pressed[event.keyCode] = event.timeStamp;
    },

    onKeyup: (event) => {
        delete this._pressed[event.keyCode];
    }
}

export default Key;
