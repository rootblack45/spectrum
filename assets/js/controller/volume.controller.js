/*
 * Constructor class to handle on volume button.
 */
class VolumeController {
    #muteBtn = null;
    #muted = false;

    #volumeArea = null;
    #volumePanel = null;
    #volumeSlider = null;
    #volume = 1;

    constructor() {
        this.#muteBtn = select("#mute-btn");
        this.#muteBtn.mousePressed(this.#mousePressedMute.bind(this));

        this.#volumeArea = select("#volume-area");
        this.#volumeArea.mouseOver(this.#mouseOverVolumeArea.bind(this));
        this.#volumeArea.mouseOut(this.#mouseOutVolumeArea.bind(this));
        this.#volumeArea.mouseMoved(this.#mouseMovedVolumeArea.bind(this));

        this.#volumePanel = select("#volume-panel");
        this.#volumePanel.mousePressed(
            this.#mousePressedVolumeSlider.bind(this)
        );

        this.#volumeSlider = select("#volume-slider");
    }

    draw() {
        if (this.#muted || this.#volume === 0) {
            this.#volumeSlider.style("left", `0%`);
        } else {
            const volumePanelBounds =
                this.#volumePanel.elt.getBoundingClientRect();
            const volumeSliderBounds =
                this.#volumeSlider.elt.getBoundingClientRect();

            const maxVolumePanelWidth =
                volumePanelBounds.width - volumeSliderBounds.width;
            const maxVolumePanelWidthPercent =
                (maxVolumePanelWidth / volumePanelBounds.width) * 100;

            this.#volumeSlider.style(
                "left",
                `${this.#volume * maxVolumePanelWidthPercent}%`
            );
        }

        this.#muteBtn.html(this.#currentVolumeIcon());
    }

    #mousePressedMute() {
        this.#muted ? this.#updateVolume(this.#volume) : sound.setVolume(0);
        this.#muted = !this.#muted;
    }

    #mouseOverVolumeArea() {
        if (this.#volumePanel.hasClass("w-0")) {
            this.#volumePanel.removeClass("w-0");
            this.#volumePanel.addClass("w-20");
            this.#muteBtn.addClass("pr-5");
        }
    }

    #mouseOutVolumeArea() {
        if (this.#volumePanel.hasClass("w-20")) {
            this.#volumePanel.removeClass("w-20");
            this.#volumePanel.addClass("w-0");
            this.#muteBtn.removeClass("pr-5");
        }
    }

    #mouseMovedVolumeArea() {
        if (mouseIsPressed) this.#mousePressedVolumeSlider();
    }

    #mousePressedVolumeSlider() {
        const volumePanelBounds = this.#volumePanel.elt.getBoundingClientRect();
        const volumeSliderBounds =
            this.#volumeSlider.elt.getBoundingClientRect();

        const maxVolumePanelWidth =
            volumePanelBounds.width - volumeSliderBounds.width;

        let volume =
            (mouseX - volumeSliderBounds.width / 2 - volumePanelBounds.left) /
            maxVolumePanelWidth;
        if (volume < 0) volume = 0;
        if (volume > 1) volume = 1;
        if (volume > 0) this.#muted = false;

        this.#updateVolume(volume);
    }

    #updateVolume(volume) {
        sound.setVolume(volume);
        this.#volume = volume;
    }

    #currentVolumeIcon() {
        if (this.#muted || this.#volume === 0) {
            return `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>`;
        }
        if (this.#volume > 0.5) {
            return `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>`;
        } else {
            return `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/></svg>`;
        }
    }
}
