class ConnexionManager {
    static #instance = null;
    #connected = false;
    #token = null;
    #email = null;
    constructor() {
        ConnexionManager.#instance = this;
    }
    static get instance() {
        if (ConnexionManager.#instance === null) {
            new ConnexionManager();
        }
        return ConnexionManager.#instance;
    }
    static get connected() {
        return ConnexionManager.instance.#connected;
    }
    static get token() {
        return ConnexionManager.instance.#token;
    }
    static get email() {
        return ConnexionManager.instance.#email;
    }
    static connect(email, token, saveToLocalStorage = false) {
        ConnexionManager.instance.#email = email;
        ConnexionManager.instance.#token = token;
        ConnexionManager.instance.#connected = true;
        if (saveToLocalStorage)
            this.#saveToLocalStorage(email, token);
    }
    static disconnect() {
        ConnexionManager.instance.#email = null;
        ConnexionManager.instance.#token = null;
        ConnexionManager.instance.#connected = false;
        localStorage.removeItem('connection_token');
    }
    static tryLoginFromLocalStorage() {
        let result = this.#getFromLocalStorage();
        if (!result.founded)
            return false;
        this.connect(result.result.email, result.result.token);
        return true;
    }
    static #saveToLocalStorage(email, token) {
        let object = {
            email: email,
            token: token
        };
        localStorage.setItem('connection_token', JSON.stringify(object));
    }
    static #getFromLocalStorage() {
        let result = localStorage.getItem('connection_token');
        if (result === null)
            return { founded: false, result: null };
        return { founded: true, result: JSON.parse(result) };
    }
}
