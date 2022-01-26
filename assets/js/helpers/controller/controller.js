/*
 * Constructor class to handle on screen menu and mouse control.
 */
class Controller {
    controllers = []
    constructor() {
        this.controllers = [
            new ProgressController(),
            new PlaybackController(),
            new VolumeController(),
            new TimeController()
        ]
    }
}