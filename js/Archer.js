let bows = [
    {
        name: 'Bow1',
        src: './assets/bows/bow.png',
        size: 100,
        bowstring: {
            up: 45,
            down: -45,
            y: 22
        },
        maxTension: 30,//jak bardzo napnie sie cieciwa
        itemProps: {//co pokaze sie w sklepie
            tension: 1,
        },
        cost: 200,
        lbs: 1//sila naciagu luku -> rzeczywista predkosc luku

    },
    {
        name: 'Bow2',
        src: './assets/bows/bow2.png',
        size: 100,
        bowstring: {
            up: 45,
            down: -45,
            y: 22
        },
        maxTension: 30,
        itemProps: {
            tension: 2,
            enchanted: 'fire'
        },
        cost: 320,
        lbs: 2

    },
    {
        name: 'Bow3',
        src: './assets/bows/bow3.png',
        size: 100,
        bowstring: {
            up: 45,
            down: -45,
            y: 22
        },
        maxTension: 30,
        itemProps: {
            tension: 3,
            enchanted: 'fire'
        },
        cost: 600,
        lbs: 3

    },
    {
        name: 'Bow4',
        src: './assets/bows/bow4.png',
        size: 100,
        bowstring: {
            up: 45,
            down: -45,
            y: 22
        },
        maxTension: 30,
        itemProps: {
            tension: 4,
            enchanted: 'fire'
        },
        cost: 900,
        lbs: 4

    },
    {
        name: 'Bow5',
        src: './assets/bows/bow5.png',
        size: 100,
        bowstring: {
            up: 45,
            down: -45,
            y: 22
        },
        maxTension: 30,
        itemProps: {
            tension: 5,
            enchanted: 'fire'
        },
        cost: 1200,
        lbs: 50

    }

]

class Archer {
    constructor() {
        this.bow;
        this.position = new Vector(200, 750);
        this.angle = 0;
        this.currentArrow;
        this.isAiming = false;
        this.tension;
        this.init()
    }

    init() {

        this.changeBow(bows[0])

        window.addEventListener('mousedown', (e) => {
            if (e.target.id == 'ui')
                this.aiming()
        })

    }

    changeBow(bow) {
        this.bow = bow;
        this.bow.image = new Image();
        this.bow.image.src = bow.src
    }

    update() {
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.angle);

        ctx.drawImage(this.bow.image, -this.bow.size / 2, -this.bow.size / 2, this.bow.size, this.bow.size);
        // ctx.fillRect(0, 0, 5, 5);
        this.createBowstring()
        if (this.isAiming)
            this.currentArrow.setOnBow(this.position, this.tension);

        ctx.restore();


    }

    aiming() {
        this.currentArrow = new Arrow('Arrow1')
        this.isAiming = true;

        var targeting = (e) => {

            this.angle = Math.atan2(e.offsetX - this.position.x, - (e.offsetY - this.position.y));//obliczam kąt o jaki ma się obrócić łuk na podstawie pozycji łuku oraz myszki
            this.angle += Math.PI

            this.tension = Math.sqrt(Math.pow(this.position.x - e.offsetX, 2) + Math.pow(this.position.y - e.offsetY, 2));
            //na podstawie pozycji srodka łuku i pozycji myszki obliczam odległość i dzięki temu znam aktualne napięcie cięciwy

            if (this.tension > this.bow.maxTension + this.bow.bowstring.y) {//sprawdzamy czy łuk nie został za mocno napięty
                this.tension = this.bow.maxTension + this.bow.bowstring.y
            }

            if (this.tension < this.bow.bowstring.y) {//warunek blokujący napięcie się cięciwy w drugą stronę
                this.tension = this.bow.bowstring.y
            }


        }

        var shooting = () => {
            this.isAiming = false;
            this.shoot()
            window.removeEventListener('mousemove', targeting)
            window.removeEventListener('mouseup', shooting)
        }

        window.addEventListener('mousemove', targeting)

        window.addEventListener('mouseup', shooting)


    }

    createBowstring() {
        ctx.translate(-this.position.x, -this.position.y);
        ctx.beginPath();
        if (this.isAiming) {
            ctx.moveTo(this.position.x + this.bow.bowstring.up, this.position.y + this.bow.bowstring.y);
            ctx.lineTo(this.position.x, this.position.y + this.tension)
            ctx.lineTo(this.position.x + this.bow.bowstring.down, this.position.y + this.bow.bowstring.y);
        }
        else {
            ctx.moveTo(this.position.x + this.bow.bowstring.up, this.position.y + this.bow.bowstring.y);
            ctx.lineTo(this.position.x + this.bow.bowstring.down, this.position.y + this.bow.bowstring.y);
        }
        ctx.stroke();
    }

    shoot() {
        game.addObject(this.currentArrow);//dodaje strzałę do objektów które będę updatować w GameManager w render()
        let vec = new Vector()
        vec.x = Math.cos(this.angle - Math.PI / 2);//wzór na punkt na okręgu
        vec.y = Math.sin(this.angle - Math.PI / 2);//dzięki temu wiemy gdzie nasza strzała jest skierowana.
        vec.normalize();
        vec.mult((this.tension + this.bow.bowstring.y / 10 * this.bow.lbs) / 10)//strzała leci z taką prędkością z jaką naciąneliśmy cięciwe
        this.currentArrow.relase(vec, this.position.y);
    }

}