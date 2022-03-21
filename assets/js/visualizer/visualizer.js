/*
 * Constructor class to handle music visualization.
 */
class Visualizer {
    visualizers = []
    selectedVis = null

    add(visualizer) {
        this.visualizers.push(visualizer)
        if (!this.selectedVis) this.selectedVis = visualizer
    }

    use(name) {
        this.selectedVis = this.visualizers.find((v) => v.name === name)
    }
}
