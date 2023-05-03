class View {
    name;
    onEnable;
    onDisable;
    #isActive = true;
    #element;
    constructor(name, onEnable = null, onDisable = null) {
        this.name = name;
        this.#element = document.querySelector(`#${name}`);
        this.onEnable = onEnable !== null ? onEnable : () => { };
        this.onDisable = onDisable !== null ? onDisable : () => { };
        this.isActive = false;
    }
    get isActive() {
        return this.#isActive;
    }
    set isActive(value) {
        if (value === this.#isActive)
            return;
        this.#isActive = value;
        this.#element.style.display = value ? 'flex' : 'none';
    }
    enable() {
        if (this.#isActive)
            return;
        this.isActive = true;
        this.onEnable(this);
    }
    disable() {
        if (!this.#isActive)
            return;
        this.isActive = false;
        this.onDisable(this);
    }
}
