
class DuckManager {
    constructor() {

        this.lastUpdate = Date.now();


        this.init()
    }

    init() {

    }

    update() {

        let draw = Math.floor(Math.random() * 10000)

        if (draw < 100) {
            this.addDuck()


        }
    }

    addDuck() {
        let posVec = new Vector();
        let speedVec = new Vector();
        let h = Math.random() * 300
        let speed = (Math.random() * 3 + 3) / 100
        if (Math.floor(Math.random() * 2)) {
            posVec.set(0, h)
            speedVec.set(speed, 0)
        }
        else {
            posVec.set(width, h)
            speedVec.set(-speed, 0)
        }

        game.addObject(new Duck("Duck" + Math.floor(Math.random() * 3 + 1), posVec, speedVec));
    }
}