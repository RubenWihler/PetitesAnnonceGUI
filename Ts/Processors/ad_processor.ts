class AdProcessor{

    static async getAsync(token:string = '') : Promise<Ad[]> {
        
        var jsonResult;
        var header = new Headers();
        header.append("Authorization", `Token ${token}`);
        const url = ConnexionManager.apiBaseUrl + 'ads/';
    

        var requestOptions = {
        method: 'GET',
        headers: header,
        };
        
        await fetch(url, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    return response.text().then(text => {
                         throw new Error(JSON.parse(text).message) 
                    })
                }
                
                return response.text();
            })
            .then(result => jsonResult = result)
            .catch(error => {throw error});

        return JSON.parse(jsonResult);
    }

    static async createAsync(Ad: Ad, token:string) : Promise<number>{
        let jsonResult : string;
        const url = ConnexionManager.apiBaseUrl + 'ad/';
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
                         throw new Error(JSON.parse(text).message) 
                    })
                }
                
                return response.text();
            })
            .then(result => jsonResult = result)
            .catch(error => {throw error});

        return JSON.parse(jsonResult);
    }

    static async modifyAsync() : Promise<number>{

        return;
    }

    static async deleteAsync(){

    }
}