
//Do rozbudowy

// class Enviroment {
//     constructor() {
//         this.forces = []
//     }

//     calcForces(forces, mass) {
//         let force = new Vector();

//         for (let f of this.forces) {
//             force.add(this.calc(f, mass));
//         }

//         for (let f of forces) {
//             force.add(this.calc(f, mass));
//         }

//         return force;
//     }

//     applyForce(force) {
//         this.forces.push(force)
//     }

//     removeForce(name) {
//         for (let i = 0; i < this.forces.length; i++) {
//             if (this.forces[i].name == name) {
//                 this.forces.splice(i, 1)
//             }
//         }
//     }

//     calc(force, mass) {
//         let f = force.clone()
//         if (force.name != 'Gravity')
//             f.div(mass)

//         return f;
//     }
// }

// let enviroment = new Enviroment();
// enviroment.applyForce(new Force('Gravity', new Vector(0, 1)))