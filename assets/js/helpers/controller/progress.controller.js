/*
 * Constructor class to handle on progress bar.
 */
class ProgressController {
    #progressPanel = null
    #progressSlider = null

    constructor() {
        this.#progressPanel = select("#progress-panel")
        this.#progressPanel.mouseMoved(this.#mouseMovedProgressPanel.bind(this))
        this.#progressPanel.mousePressed(this.#mousePressedProgressSlider.bind(this))

        this.#progressSlider = select("#progress-slider")
    }

    draw() {
        const progressPercent = (sound.currentTime() / sound.duration()) * 100
        this.#drawProgressSlider(progressPercent)
    }

    #drawProgressSlider(progress) {
        const progressPanelBounds = this.#progressPanel.elt.getBoundingClientRect()
        const progressSliderBounds = this.#progressSlider.elt.getBoundingClientRect()

        const maxProgressPanelWidth = progressPanelBounds.width - progressSliderBounds.width
        const maxProgressPanelWidthPercent = (maxProgressPanelWidth / progressPanelBounds.width) * 100

        let progressPercent = (progress / 100) * maxProgressPanelWidthPercent
        if (progressPercent < 0) progressPercent = 0
        if (progressPercent > maxProgressPanelWidthPercent) progressPercent = maxProgressPanelWidthPercent

        this.#progressSlider.style("left", `${progressPercent}%`)
    }

    #mouseMovedProgressPanel() {
        if (mouseIsPressed) this.#mousePressedProgressSlider()
    }

    #mousePressedProgressSlider() {
        const progressPanelBounds = this.#progressPanel.elt.getBoundingClientRect()
        const progressSliderBounds = this.#progressSlider.elt.getBoundingClientRect()

        const maxProgressPanelWidth = progressPanelBounds.width - progressSliderBounds.width

        sound.jump(sound.duration() * ((mouseX - progressSliderBounds.width) / maxProgressPanelWidth))
    }
}