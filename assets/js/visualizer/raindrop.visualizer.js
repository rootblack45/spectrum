const smoothing = 0.8;
const binCount = 1024;

class RaindropVisualizer {
    #fft = null;
    name = "raindrop";

    #particles = new Array(binCount);

    constructor() {
        this.#fft = new p5.FFT(smoothing, binCount);
        for (let i = 0; i < this.#particles.length; i++) {
            const x = map(i, 0, binCount, 0, width * 2);
            const y = random(0, height);
            const pos = createVector(x, y);
            this.#particles[i] = new Particle(pos);
        }
    }

    draw() {
        push();
        const spectrum = this.#fft.analyze(binCount);
        for (var i = 0; i < binCount; i++) {
            const p = this.#particles[i];
            const lvl = map(spectrum[i], 0, 255, 0, 1);
            p.update(lvl);
            p.draw();
            p.pos.x = map(i, 0, binCount, 0, width * 2) + random(-4, 4);
        }
        pop();
    }
}
