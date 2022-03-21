class SpectrumVisualizer {
    #fft = null;
    name = "spectrum";

    #frames = [];
    #frameCount = 0;
    #voltage = 0;

    constructor(fft) {
        this.#fft = fft;
    }

    draw() {
        push();
        const spectrum = this.#fft.analyze();

        let frame = [];
        let lastFrame = this.#frames[this.#frames.length - 1] || {};
        let hasPeek = false;

        for (let i = 0; i < spectrum.length; i += 10) {
            const v = {
                value: spectrum[i],
                index: this.#frameCount,
            };
            hasPeek = hasPeek || v.value > 140;
            frame.push(v);
        }

        frame.hasPeek = hasPeek && !lastFrame.hasPeek;
        this.#frames.push(frame);
        if (frame.hasPeek) {
            this.#voltage++;
        } else {
            this.#voltage = Math.max(0, this.#voltage - 0.5);
        }

        background(0, 0, this.#voltage * 10, 100);

        this.#frames.forEach((f) => {
            f.forEach((v, i) => {
                const spent = this.#frameCount - v.index;
                const v1 = (v.value / (spent * 2 + 1)) * (f.hasPeak ? 2 : 1);
                const x = map(i, 0, f.length, 0, width);
                const h = -height + map(v.value, 0, 255, height, -height / 2);

                strokeWeight(0.7);

                const alpha = Math.max(255 - (spent * spent + 1), 0);
                const col = color(
                    Math.min(255, 100 + spent * spent * 10),
                    Math.min(255, 140 + spent * spent * 10),
                    map(
                        Math.min(255, v.value + spent * spent * 10),
                        0,
                        255,
                        100,
                        500
                    ),
                    alpha
                );
                stroke(col);
                noFill();
                if (f.hasPeak && spent > 0) {
                    noStroke();
                    fill(col);
                }
                ellipse(x + spent * spent * 3 + random(50), height + h, v1, v1);

                const step = 30;
                const x2 =
                    Math.round((x + spent * spent * 3 + 60) / step) * step;
                const y2 = Math.round((height + h) / step) * step;
                const col2 = color(
                    Math.min(255, 100 + spent * spent * 10),
                    Math.min(255, 140 + spent * spent * 10),
                    map(spent * spent, 0, 255, 100, 500),
                    alpha
                );
                stroke(col2);
                if (random(100) > 80) {
                    rect(x2, y2, step * random(3), step * random(3));
                }
            });
        });

        const num = 30;
        if (this.#frames.length > num) {
            this.#frames = this.#frames.slice(
                this.#frames.length - num,
                this.#frames.length
            );
        }

        this.#frameCount++;

        pop();
    }
}
