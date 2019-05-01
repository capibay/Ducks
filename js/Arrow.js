
let arrows = [
    {
        name: 'Arrow1',
        src: './arrow2.png',
        size: 100
    }
]

function getArrowByName(name) {
    for (let arrow of arrows) {
        if (arrow.name == name) {
            return arrow;
        }
    }
}
let ctx2 = canvas.getContext('2d');

class Arrow {
    constructor(name) {
        this.position = new Vector(0, 0);
        this.acceleration = new Vector();
        this.velocity = new Vector(0, 0);
        this.mass = 100;
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
    }

    update() {
        console.log(this.position.y);

        if (!this.isFlying) return;

        // ctx.save();
        // ctx.translate(this.position.x + this.arrow.size / 2, this.position.y)
        // ctx.fillStyle = 'red';

        // ctx.fillRect(0, 0, 4, 4)
        // ctx.rotate(this.angle)
        // ctx.drawImage(this.arrow.image, -this.arrow.size / 2, -this.arrow.size / 2, this.arrow.size, this.arrow.size);
        // ctx.restore()

        ctx.save();
        ctx.translate(this.position.x + this.arrow.size / 2, this.position.y)
        ctx.fillStyle = 'red';

        ctx.fillRect(0, 0, 4, 4)
        ctx.rotate(this.angle)
        ctx.drawImage(this.arrow.image, -this.arrow.size / 2, -this.arrow.size / 2, this.arrow.size, this.arrow.size);
        ctx.restore()


        this.acceleration.set(0, 0)
        let force = enviroment.calcForces(this.forces, this.mass);
        this.acceleration.add(force)
        this.angle = new Vector(0, -1).angleBetween360(force)

        this.velocity.add(this.acceleration)
        this.position.add(this.velocity)
    }

    setOnBow(pos, tension) {
        this.position.x = pos.x - (this.arrow.size / 2)
        this.position.y = pos.y - this.arrow.size + tension
        ctx.drawImage(this.arrow.image, this.position.x, this.position.y, this.arrow.size, this.arrow.size);
        console.log(this.position.y);


    }

    relase(force, y) {
        this.isFlying = true;
        this.applyForce(new Force('Normal', force));
        this.position.y = y
        // this.angle = new Vector(0, -1).angleBetween360(force)


    }

    applyForce(force) {
        this.forces.push(force)

    }


}