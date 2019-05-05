
let arrows = [
    {
        name: 'Arrow1',
        src: './assets/arrows/arrow.png',
        size: 66,
        damage: 10
    }
]

function getArrowByName(name) {
    for (let arrow of arrows) {
        if (arrow.name == name) {
            return arrow;
        }
    }
}
// let ctx2 = canvas.getContext('2d');

class Arrow {
    constructor(name) {
        this.position = new Vector(0, 0);
        this.acceleration = new Vector();
        this.velocity = new Vector(0, 0);
        this.mass = 1;
        this.forces = [];
        this.isFlying = false;
        this.arrow;
        this.name = name;
        this.angle;

        this.init()
    }

    init() {
        let arrow = getArrowByName(this.name)
        this.arrow = arrow;
        this.arrow.image = new Image();
        this.arrow.image.src = arrow.src

        this.applyForce(new Force('Gravity', new Vector(0, 2)))
    }

    update() {

        if (!this.isFlying) return;
        // this.acceleration.mult(0);
        this.forces[1].div(1.055)
        for (let force of this.forces) {
            let f = force.clone();
            if (force.name != 'Gravity')
                f.div(this.mass);
            this.acceleration.add(f);
        }

        // let force = enviroment.calcForces(this.forces, this.mass);
        // this.acceleration.add(force)
        this.angle = new Vector(0, -1).angleBetween360(this.acceleration);
        this.velocity.add(this.acceleration);
        this.velocity.div(2);
        this.position.add(this.velocity);

        ctx.save();
        ctx.translate(this.position.x + this.arrow.size / 2, this.position.y)
        // ctx.fillStyle = 'red';
        // ctx.fillRect(0, 0, 10, 10)
        ctx.rotate(this.angle)
        ctx.drawImage(this.arrow.image, -this.arrow.size / 2, -this.arrow.size / 2, this.arrow.size, this.arrow.size);
        ctx.restore()

        this.getArrowheadPosition()
        if (this.position.y + this.arrow.size > height) {
            return 'delete'
        }
    }

    setOnBow(pos, tension) {
        this.position.x = pos.x - (this.arrow.size / 2)
        this.position.y = pos.y - this.arrow.size + tension
        ctx.drawImage(this.arrow.image, this.position.x, this.position.y, this.arrow.size, this.arrow.size);

    }

    relase(force, y) {
        this.isFlying = true;
        this.applyForce(new Force('Normal', force));
        this.velocity.add(force)
        this.position.y = y

    }

    applyForce(force) {
        this.forces.push(force)

    }

    getArrowheadPosition() {
        let pos = this.position.clone();
        pos.add(new Vector(this.arrow.size / 2, 0))
        let arr = this.velocity.clone();
        arr.normalize()
        arr.setMag(this.arrow.size / 2)
        pos.add(arr)
        // ctx.fillRect(pos.x, pos.y, 5, 5)
        return pos;

    }

    getDamage() {
        return this.arrow.damage;
    }
}