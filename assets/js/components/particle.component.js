class Particle {
    constructor(pos) {
        this.pos = pos;
        this.scale = random(0, 1);
        this.nextPos = createVector(0, random(0, 10));
        this.col = color(random(0, 255), random(0, 255), random(0, 255));
        if (random(2) <= 1) {
            this.col = color(0);
        } else {
            const randNum = random(50, 500);
            this.col = color(
                Math.min(255, randNum / (2 + (random(10) / 10) * 1)),
                Math.min(255, randNum / (1 + (random(10) / 10) * 1)),
                Math.min(255, randNum)
            );
        }
    }

    update(lvl) {
        this.pos.y += this.nextPos.y / (lvl * 2);
        if (this.pos.y > height) {
            this.pos.y = 0;
        }
        this.diameter = map(lvl, 0, 1, 0, 200) * this.scale;
    }

    draw() {
        fill(this.col);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.diameter);
    }
}
