class ConnexionManager{
    static #instance : ConnexionManager = null;
    #connected : boolean = false;
    #token : string = null;
    #email: string = null;

    constructor() {
        ConnexionManager.#instance = this;
    }

    static get instance() : ConnexionManager{
        if (ConnexionManager.#instance === null){
            new ConnexionManager();
        }

        return ConnexionManager.#instance;
    }
    static get connected() : boolean{
        return ConnexionManager.instance.#connected;
    }
    static get token() : string{
        return ConnexionManager.instance.#token;
    }
    static get email() : string{
        return ConnexionManager.instance.#email;
    }

    static connect(email:string, token:string, saveToLocalStorage:boolean = false){
        ConnexionManager.instance.#email = email;
        ConnexionManager.instance.#token = token;
        ConnexionManager.instance.#connected = true;
        if (saveToLocalStorage) this.#saveToLocalStorage(email, token);
    }
    static disconnect(){
        ConnexionManager.instance.#email = null;
        ConnexionManager.instance.#token = null;
        ConnexionManager.instance.#connected = false;
        localStorage.removeItem('connection_token');
    }

    static tryLoginFromLocalStorage() : boolean{
        let result = this.#getFromLocalStorage();
        if (!result.founded) return false;

        this.connect(result.result.email, result.result.token);
        return true;
    }
    static #saveToLocalStorage(email:string, token:string){
        let object = {
            email: email,
            token: token
        };

        localStorage.setItem('connection_token', JSON.stringify(object));
    }
    static #getFromLocalStorage() : any{
        let result = localStorage.getItem('connection_token');
        if (result === null) return {founded:false, result: null};
        return {founded:true, result: JSON.parse(result)};
    }
}