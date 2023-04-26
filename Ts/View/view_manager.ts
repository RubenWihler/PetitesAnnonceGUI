class ViewManager{
    static #instance: ViewManager;
    #currentView: View = null;
    #views: Set<View>;

    constructor(views:View[]){
        ViewManager.#instance = this;
        this.#views = new Set(views);
    }

    static get instance(): ViewManager{
        if (this.#instance === null) 
            throw new Error('Il n\'existe aucune instance de ViewManager !');
        
            return this.#instance;
    }
    static get views() : Set<View>{
        return ViewManager.instance.#views;
    }
    static get currentView(): View{
        return this.instance.#currentView;
    }

    static setCurrentView(name:string){
        let view = ViewManager.#findViewByName(name);
        view.enable();
        ViewManager.instance.#currentView = view;
    }
    static #findViewByName(name: string): View{
        let view = Array.from(ViewManager.views).find(v => v.name === name);
        if (view === null) throw new Error(`Il n'existe pas de vue avec le nom ${name} !`);
        return view;
    }
}