
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

class Arrow {
    constructor(name) {
        this.position = new Vector(0, 0);
        this.acceleration = new Vector();
        this.velocity = new Vector(0.1, -0.3);
        this.mass = 300;
        this.forces = [];
        this.isFlying = false;
        this.arrow;
        this.name = name;

        this.init()
    }

    init() {
        let arrow = getArrowByName(this.name)
        // if (!arrow) return
        this.arrow = arrow;
        this.arrow.image = new Image();
        this.arrow.image.src = arrow.src
    }

    update() {
        if (!this.isFlying) return;
        // console.log(this);

        this.acceleration.set(0, 0)

        // for (let force of this.forces) {
        //     let f = force.clone()
        //     if (force.name != 'Gravity')
        //         f.div(this.mass)
        //     this.acceleration.add(f)
        // }

        // this.velocity.add(this.acceleration)
        this.position.add(this.velocity)

        ctx.drawImage(this.arrow.image, this.position.x, this.position.y, this.arrow.size, this.arrow.size);
    }

    setOnBow(pos, tension) {
        this.position.x = pos.x - this.arrow.size / 2
        this.position.y = pos.y - this.arrow.size + tension
        ctx.drawImage(this.arrow.image, this.position.x, this.position.y, this.arrow.size, this.arrow.size);



    }

    relase(force) {
        this.isFlying = true;
        this.applyForce(new Force('Normal', new Vector(0, 0)));



    }

    applyForce(force) {
        this.forces.push(force)

    }


}