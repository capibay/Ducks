Keyboard = {
    keys: [],
    init() {
        document.addEventListener('keydown', (e) => {
            this.keys[e.keyCode] = true;
            console.log(e.key);

        })

        document.addEventListener('keyup', (e) => {
            this.keys[e.keyCode] = false;
        })
    },

    getKeys() {
        return this.keys;
    }
}
