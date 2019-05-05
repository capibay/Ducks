
let ducks = [
    {
        name: 'Duck1',
        src: '',
        animations: [
            './assets/ducks/standard/duckgray1.png',
            './assets/ducks/standard/duckgray2.png',
            './assets/ducks/standard/duckgray3.png',
            './assets/ducks/standard/duckgray2.png'
        ],
        size: 100,
        hp: 10
    },

    {
        name: 'Duck2',
        src: '',
        animations: [
            './assets/ducks/standard/duckgray1.png',
            './assets/ducks/standard/duckgray2.png',
            './assets/ducks/standard/duckgray3.png',
            './assets/ducks/standard/duckgray2.png'
        ],
        size: 100,
        hp: 10
    },

    {
        name: 'Duck3',
        src: '',
        animations: [
            './assets/ducks/standard/duckgold1.png',
            './assets/ducks/standard/duckgold2.png',
            './assets/ducks/standard/duckgold3.png',
            './assets/ducks/standard/duckgold2.png'
        ],
        size: 120,
        hp: 20
    }
]

function getDuckByName(name) {
    for (let duck of ducks) {
        if (duck.name == name) {
            return duck;
        }
    }
}


class Duck {
    constructor(name, posVec = new Vector(), speedVec = new Vector()) {
        this.position = posVec;
        this.velocity = new Vector();
        this.acceleration = new Vector();
        this.speed = speedVec;
        this.forces = [];
        this.name = name
        this.duck;
        this.points;
        this.hp;
        this.animationFrames = []
        this.currentFrame = 0;
        this.lastUpdate = Date.now();
        this.alive;
        this.init()
    }

    init() {

        this.duck = getDuckByName(this.name);

        for (let animation of this.duck.animations) {
            let frame = new Image();
            frame.src = animation
            this.animationFrames.push(frame)
        }
        this.position.y += this.duck.size
        if (this.speed.x < 0) {
            this.position.x += this.duck.size
        }
        else {
            this.position.x -= this.duck.size
        }
        this.hp = this.duck.hp;
        this.alive = true;

    }

    update() {

        this.animate()
        this.acceleration.set(0, 0)
        this.acceleration.add(this.speed)
        for (let force of this.forces) {
            this.acceleration.add(force)
        }
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);

        ctx.save()

        ctx.translate(this.position.x, this.position.y);
        this.showHp();
        if (this.velocity.x > 0) {
            ctx.scale(-1, 1);
        }

        ctx.drawImage(this.animationFrames[this.currentFrame], -this.duck.size / 2, -this.duck.size / 2, this.duck.size, this.duck.size);

        // ctx.fillStyle = "#000000aa"
        // ctx.fillRect(-this.duck.size / 2, -10, this.duck.size, this.duck.size / 4);

        ctx.restore()

        if (this.position.x < -this.duck.size * 2 || this.position.x > width + this.duck.size * 2) {
            return 'delete'
        }

        // ctx.fillRect(this.position.x, this.position.y, this.duck.size, 30);
    }

    animate() {
        var now = Date.now();
        var dt = now - this.lastUpdate;

        if (dt > 100 - this.velocity.x * 5) {
            this.lastUpdate = now;
            this.currentFrame++;
            if (this.currentFrame > this.animationFrames.length - 1) {
                this.currentFrame = 0;
            }
        }
    }

    showHp() {
        let hp = this.hp * this.duck.size / this.duck.hp;
        if (hp <= 0) {
            hp = 0;
        }
        if (!this.alive) {
            return;
        }

        ctx.fillStyle = "#ff3333"
        ctx.fillRect(-this.duck.size / 2, -this.duck.size / 2, this.duck.size, 15);
        ctx.fillStyle = "#33ff33"
        ctx.fillRect(-this.duck.size / 2, -this.duck.size / 2, hp, 15);
        ctx.font = "14px Arial";
        ctx.fillStyle = "black"
        ctx.fillText(this.hp + "/" + this.duck.hp, -this.duck.size / 4 + 5, -this.duck.size / 2 + 12);

    }

    checkHit(arrowhead, damage) {
        // console.log(arrowhead);
        if (arrowhead.x > this.position.x - this.duck.size / 2 &&
            arrowhead.x < this.position.x - this.duck.size / 2 + this.duck.size &&
            arrowhead.y > this.position.y - 10 &&
            arrowhead.y < this.position.y - 10 + this.duck.size / 4
        ) {
            this.hp -= damage;
            // this.speed.mult(Math.random() * 5 + 3)
            if (this.hp <= 0) {
                this.die();
            }
            return true
        }

        return false;
    }

    applyForce(force) {
        this.forces.push(force)
    }

    die() {
        this.alive = false;
        this.applyForce(new Force('Gravity', new Vector(0, 1)))
    }
}