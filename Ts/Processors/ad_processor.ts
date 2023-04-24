class AdProcessor{

    static async getAsync(token:string = '', id:number = null) : Promise<Ad[]> {
        
        var jsonResult;
        var header = new Headers();
        const url = id == null ?
            ConnexionManager.apiBaseUrl + 'ads/' 
            : ConnexionManager.apiBaseUrl + `/ads.php?id=${id}`;

        if (token.length > 0){
            header.append("Authorization", `Token ${token}`);
        }

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

    static async createAsync(Ad: Ad) : Promise<number>{

        return;
    }

    static async modifyAsync() : Promise<number>{

        return;
    }

    static async deleteAsync(){

    }
}