class ViewManager {
    static #instance;
    #currentView = null;
    #views;
    constructor(views) {
        ViewManager.#instance = this;
        this.#views = new Set(views);
    }
    static get instance() {
        if (this.#instance === null)
            throw new Error('Il n\'existe aucune instance de ViewManager !');
        return this.#instance;
    }
    static get views() {
        return ViewManager.instance.#views;
    }
    static get currentView() {
        return this.instance.#currentView;
    }
    static setCurrentView(name) {
        let view = ViewManager.#findViewByName(name);
        view.enable();
        ViewManager.instance.#currentView = view;
    }
    static #findViewByName(name) {
        let view = Array.from(ViewManager.views).find(v => v.name === name);
        if (view === null)
            throw new Error(`Il n'existe pas de vue avec le nom ${name} !`);
        return view;
    }
}
