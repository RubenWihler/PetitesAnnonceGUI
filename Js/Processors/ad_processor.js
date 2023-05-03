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
        console.log(requestOptions);
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
    static async modifyAsync() {
        return;
    }
    static async deleteAsync() {
    }
}
