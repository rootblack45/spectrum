/// <reference path="../../node_modules/@types/p5/global.d.ts" />

// p5 sound object
let sound = null
// controller object
let controller = null

function preload() {
    sound = loadSound("assets/sounds/photo_id.mp3")
}

function setup() {
    createCanvas(windowWidth, windowHeight)

    controller = new Controller()
}

function draw() {
    controller.controllers.forEach(c => c.draw?.())
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}