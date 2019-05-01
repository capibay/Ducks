
class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(vec) {
        this.x += vec.x;
        this.y += vec.y;
    }

    sub(vec) {
        this.x -= vec.x;
        this.y -= vec.y;
    }

    mult(s) {
        this.x *= s;
        this.y *= s;
    }

    div(s) {
        this.x /= s;
        this.y /= s;
    }

    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize() {
        let s = this.mag()
        this.x /= s;
        this.y /= s;
        return this;
    }

    setMag(s) {
        this.normalize();
        this.mult(s)
    }

    clone() {
        return new Vector(this.x, this.y)
    }

    set(x, y) {
        this.x = x;
        this.y = y;
    }

    negate() {
        this.x = -x;
        this.y = -y;
    }
}