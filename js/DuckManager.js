
class DuckManager {
    constructor() {
        this.level = 1;

        this.init();
    }

    init() {

    }

    update() {


        let draw = Math.floor(Math.random() * 10000)//funkcja losująca liczby
        //jezeli wylosowana liczna jest mnijsza od 100 to tworzymy kaczke


        if (draw < 60 + this.level - 1 * 30) {
            this.addDuck();


        }
    }

    addDuck() {
        let posVec = new Vector();
        let speedVec = new Vector();

        let h = Math.random() * 300;//losujemy wysokosc na jakiej będzie lecieć kaczka
        let speed = (Math.random() * 10 + 3 + this.level / 10) / 2;//losujemy prędkość kaczki

        if (Math.floor(Math.random() * 2)) {//losujemy z której strony będzie lecieć kaczka.
            posVec.set(0, h);//lewej
            speedVec.set(speed, 0);
        }
        else {
            posVec.set(width, h);//z prawej strony
            speedVec.set(-speed, 0);
        }

        game.addObject(new Duck("Duck" + Math.floor(Math.random() * 3 + 1), posVec, speedVec));
        //                            losujemy typ kaczki
    }

    nextLevel() {
        this.level++;
    }
}