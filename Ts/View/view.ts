class View{
    name: string;
    onEnable: Function;
    onDisable: Function;

    #isActive: boolean = true;
    #element: HTMLDivElement;

    constructor(name:string, onEnable: Function = null, onDisable: Function = null){
        this.name = name;
        this.#element = document.querySelector(`#${name}`);
        this.onEnable == onEnable !== null ? onEnable : () => {};
        this.onDisable == onDisable !== null ? onDisable : () => {};
        this.isActive = false;
    }

    get isActive(): boolean{
        return this.#isActive;
    }

    set isActive(value: boolean){
        if (value === this.#isActive) return;
        this.#isActive = value;
        this.#element.style.display = value ? 'flex' : 'none';
    }

    enable(){
        if (this.#isActive) return;
        this.isActive = true;
        this.onEnable(this);
    }

    disable(){
        if (!this.#isActive) return;
        this.isActive = false;
        this.onDisable(this);
    }
}