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
        return this.instance.#views;
    }
    static get currentView(): View{
        return this.instance.#currentView;
    }

    static onHashChange(event : HashChangeEvent){
        const url = event.newURL;
        const index = url.lastIndexOf("#");
        const id_vue = url.substring(index + 1);
        if (!ViewManager.setCurrentView(id_vue)){
            window.location.assign(event.oldURL);
        }
    }
    static setCurrentView(name:string) : boolean{
        let result = ViewManager.#findViewByName(name);

        if (!result.founded) {
            console.log('not founded');
            return false;
        }

        this.views.forEach(v => {
            v.disable();
        });

        const url = location.href;
        let clean_url: string;
        if (!url.includes("#")){
            clean_url = url + "#";
        }
        else{
            const index = url.lastIndexOf("#");
            clean_url = url.substring(0, index + 1);
        }
        clean_url += name;
        window.location.href = clean_url;

        result.view.enable();
        ViewManager.instance.#currentView = result.view;
        return true;
    }
    static #findViewByName(name: string){
        let view = Array.from(ViewManager.views).find(v => v.name === name);
        if (view === undefined) return {founded:false, view:null}
        return {founded:true, view:view};
    }
}