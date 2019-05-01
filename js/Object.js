class Objecte {
    constructor() {

        this.position = new Vector(Math.random() * height, 20);
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0, 0)
        this.r = 30;
        this.mass = this.r;
        this.color = "#ddeedd"
        this.forces = [];

        this.init();
        this.events();
    }

    init() {
        this.applyForce(new Force('Gravity', new Vector(0, 2)))
    }

    update() {


        this.acceleration.set(0, 0)
        for (let force of this.forces) {
            let f = force.clone()
            if (force.name != 'Gravity')
                f.div(this.mass)
            this.acceleration.add(f)
        }
        this.materialResistance();

        this.edges()
        this.velocity.add(this.acceleration)
        this.position.add(this.velocity)

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.r * 2, 0, 2 * Math.PI);
        ctx.fill()
        ctx.stroke();

    }


    events() {
        window.addEventListener('mousedown', () => {
            this.acceleration.x = 0.3;
        })

        window.addEventListener('mouseup', () => {

            this.acceleration.x = -0.3;
        })
    }

    applyForce(f) {
        for (let force of this.forces) {
            if (force.name == f.name) {
                return false;
            }
        }
        this.forces.push(f)
        return true;

    }

    deleteForce(name) {
        for (let i = 0; i < this.forces.length; i++) {
            if (this.forces[i].name == name) {
                this.forces.splice(i, 1)
            }
        }
    }

    materialResistance() {
        this.deleteForce('Air Resistance')
        this.color = "#ddeedd"
        if (this.position.y > height / 2) {
            let c = 0.2;

            let dMag = Math.pow(this.velocity.mag(), 2) * c;
            let dVec = this.velocity.clone();
            dVec.mult(-1);
            dVec.normalize();
            dVec.mult(dMag)

            this.applyForce(new Force('Air Resistance', dVec))
            this.color = "red"
        }
        else {
            this.deleteForce('Air Resistance')

        }
    }

    edges() {
        if (this.position.x - this.r < 0 || this.position.x + this.r > width) {
            this.velocity.x = -this.velocity.x
            if (this.position.x - this.r < 0) {
                this.position.x = this.r;
            }
            else {
                this.position.x = width - this.r;
            }

        }

        if (this.position.y - this.r < 0 || this.position.y + this.r > height) {
            this.velocity.y = -this.velocity.y
            if (this.position.y - this.r < 0) {
                this.position.y = this.r;
            }
            else {
                this.position.y = height - this.r;
            }

        }


    }
    getForces() {
        return this.forces;
    }
}