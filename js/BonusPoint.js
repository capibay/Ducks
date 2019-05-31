
class BonusPoint {
    constructor(x, y, points) {
        this.position = new Vector(x, y)
        this.velocity = new Vector();
        this.acceleration = new Vector(0, -0.1);
        this.points = points;

        this.time = 1000;//czas ile "żyje" punkt 
        this.lastUpdate = Date.now();//czas utworzenia obiektu bonus point

        this.init();
    }

    init() {

    }

    update() {
        var now = Date.now();
        var dt = now - this.lastUpdate;

        this.velocity.add(this.acceleration)
        this.position.add(this.velocity)
        ctx.save();
        ctx.font = "14px Arial";
        ctx.fillStyle = "yellow"
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#FF0000";
        ctx.strokeText(this.points, this.position.x, this.position.y);//1 argument tekst 2 i 3 to pozycje tekstu
        ctx.fillText(this.points, this.position.x, this.position.y);
        ctx.restore();

        if (dt > this.time) {
            return 'delete'
        }

    }
}
