/*
 * Constructor class to handle on time display.
 */
class TimeController {
    #timeCurrent = null
    #timeDuration = null

    constructor() {
        this.#timeCurrent = select("#time-current")
        this.#timeCurrent.html(this.#msToTime(sound.currentTime()))

        this.#timeDuration = select("#time-duration")
        this.#timeDuration.html(this.#msToTime(sound.duration()))
    }

    draw() {
        this.#timeCurrent.html(this.#msToTime(sound.currentTime()))
    }

    #msToTime(ms) {
        // NOTE: this will broke if duration is greater than 24 hours
        return new Date(ms * 1000).toISOString().slice(11, -5)
    }
}