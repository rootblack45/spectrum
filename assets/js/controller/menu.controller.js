class MenuController {
    #menusEle = null;
    #visualizer = null;

    constructor(visualizer) {
        this.#menusEle = select("#menus");

        this.#visualizer = visualizer;
    }

    draw() {
        this.#menusEle.html("");

        for (let i = 0; i < this.#visualizer.visualizers.length; i++) {
            const menuEl = createDiv("");
            menuEl.class(
                "px-5 pt-2 pb-3 bg-gray-700 rounded-tl-lg rounded-tr-lg cursor-pointer"
            );
            menuEl.id(this.#visualizer.visualizers[i].name);
            menuEl.html(i + 1);
            menuEl.mousePressed(this.#mousePressedMenu.bind(this, menuEl));
            this.#menusEle.child(menuEl);
        }
    }

    #mousePressedMenu(el) {
        this.#visualizer.use(el.id());
    }
}
