class AdProcessor {
    static async getAsync(token = '') {
        let jsonResult;
        let header = new Headers();
        if (token.length > 0) {
            header.append("Authorization", `Token ${token}`);
        }
        const url = ApiConnexionManager.apiBaseUrl + 'ads/';
        let requestOptions = {
            method: 'GET',
            headers: header,
        };
        await fetch(url, requestOptions)
            .then((response) => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(JSON.parse(text).message);
                });
            }
            return response.text();
        })
            .then(result => jsonResult = result)
            .catch(error => { throw error; });
        await new Promise(r => setTimeout(r, 1000));
        return JSON.parse(jsonResult);
    }
    static async createAsync(Ad, token) {
        let jsonResult;
        const url = ApiConnexionManager.apiBaseUrl + 'ad/';
        let header = new Headers();
        header.append("Authorization", 'Token ' + token);
        let requestOptions = {
            method: 'POST',
            headers: header,
            body: Ad.toJsonForCreate()
        };
        await fetch(url, requestOptions)
            .then((response) => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(JSON.parse(text).message);
                });
            }
            return response.text();
        })
            .then(result => jsonResult = result)
            .catch(error => { throw error; });
        return JSON.parse(jsonResult);
    }
    static async modifyAsync(token, idAd, ad) {
        const url = ApiConnexionManager.apiBaseUrl + 'ad/' + idAd;
        var header = new Headers();
        header.append("Authorization", "Token " + token);
        var raw = ad.toJsonForCreate();
        var requestOptions = {
            method: 'PUT',
            headers: header,
            body: raw
        };
        await fetch(url, requestOptions)
            .then((response) => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(JSON.parse(text).message);
                });
            }
            return response.text();
        })
            .catch((e) => { throw e; });
    }
    static async deleteAsync(token, idAd) {
        const url = ApiConnexionManager.apiBaseUrl + 'ad/' + idAd;
        var header = new Headers();
        header.append("Authorization", 'Token ' + token);
        var requestOptions = {
            method: 'DELETE',
            headers: header,
        };
        await fetch(url, requestOptions)
            .then((response) => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(JSON.parse(text).message);
                });
            }
            return response.text();
        })
            .catch(error => { throw error; });
    }
}
