/// <reference path="../../node_modules/@types/p5/global.d.ts" />

// p5 sound object
let sound = null;
// controller object
let controller = null;
// visualizer object
let visualizer = null;

function preload() {
    sound = loadSound("assets/sounds/photo_id.mp3");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    visualizer = new Visualizer();
    visualizer.add(new RaindropVisualizer());
    visualizer.add(new SpectrumVisualizer());

    controller = new Controller();
    controller.add(new MenuController(visualizer));
    controller.add(new PlaybackController());
    controller.add(new ProgressController());
    controller.add(new TimeController());
    controller.add(new VolumeController());
}

function draw() {
    controller.controllers.forEach((c) => c.draw?.());
    visualizer.selectedVis.draw?.();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
