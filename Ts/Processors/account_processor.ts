class AccountProcessor{

    static async createAsync(account:Account) : Promise<number>{
        var jsonResult;
        const url = ConnexionManager.apiBaseUrl + 'user/';
        var raw = account.toJson();
        var requestOptions = {
          method: 'POST',
          body: raw
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

        return JSON.parse(jsonResult).token;
    }

    static async loginAsync(account:Account) : Promise<number>{

        return;
    }

    static async logOutAsync(connectionToken:string){

        return;
    }
}