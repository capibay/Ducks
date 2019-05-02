let bows = [
    {
        name: 'Bow1',
        src: './bow2.png',
        size: 100,
        center: {
            x: 0,
            y: 0
        },
        bowstring: {
            up: 45,
            down: -45,
            y: 22

        },
        maxTension: 40
    }
]



class Archer {
    constructor() {
        this.bow;
        this.position = new Vector(200, 750);
        this.angle = 0;
        this.currentArrow;
        this.isAiming = false;

        this.init()
    }

    init() {

        this.changeBow(bows[0])

        let canvas = document.getElementById('canvas');

        canvas.addEventListener('mousedown', () => {
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
        ctx.fillStyle = "blue";
        ctx.drawImage(this.bow.image, -this.bow.size / 2, -this.bow.size / 2, this.bow.size, this.bow.size);
        // ctx.fillRect(0, 0, 5, 5);
        this.createBowstring()
        if (this.isAiming)
            this.currentArrow.setOnBow(this.position, this.tension)

        ctx.restore();

    }

    aiming() {
        this.currentArrow = new Arrow('Arrow1')
        this.isAiming = true;

        var targeting = (e) => {

            this.angle = Math.atan2(e.offsetX - this.position.x, - (e.offsetY - this.position.y));
            this.angle += Math.PI

            this.tension = Math.sqrt(Math.pow(this.position.x - e.offsetX, 2) + Math.pow(this.position.y - e.offsetY, 2));
            if (this.tension > this.bow.maxTension + this.bow.bowstring.y) {
                this.tension = this.bow.maxTension + this.bow.bowstring.y
            }
            if (this.tension < this.bow.bowstring.y) {
                this.tension = this.bow.bowstring.y
            }


        }

        var shooting = () => {
            this.isAiming = false;
            this.shoot()
            canvas.removeEventListener('mousemove', targeting)
            window.removeEventListener('mouseup', shooting)
        }

        canvas.addEventListener('mousemove', targeting)

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
        game.addObject(this.currentArrow);
        let vec = new Vector()
        vec.x = Math.cos(this.angle - Math.PI / 2);
        vec.y = Math.sin(this.angle - Math.PI / 2);
        vec.normalize()
        vec.mult((this.tension + this.bow.bowstring.y / 10) / 10)
        this.currentArrow.relase(vec, this.position.y)
    }

}