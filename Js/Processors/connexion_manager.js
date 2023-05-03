class ConnexionManager {
    static get apiBaseUrl() {
        return 'https://michaelmathieu.net/smallAds/';
    }
    static get accountToken() {
        //gerer la connexion si l'utilisateur est connecté et tout ca la
        return {
            isConnected: false,
            token: null
        };
    }
}
