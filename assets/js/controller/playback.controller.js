/*
 * Constructor class to handle on playback button.
 */
class PlaybackController {
    #playBtn = null;

    constructor() {
        this.#playBtn = select("#play-btn");
        this.#playBtn.mousePressed(this.mousePressed.bind(this));
    }

    draw() {
        if (sound.isPlaying()) {
            this.#playBtn.html(
                `<svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`
            );
        } else {
            this.#playBtn.html(
                `<svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M8 5v14l11-7z"/></svg>`
            );
        }
    }

    mousePressed() {
        sound.isPlaying() ? sound.pause() : sound.play();
    }
}
