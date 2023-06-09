class AccountProcessor{
    static async createAsync(account:Account) : Promise<string>{
        let jsonResult;
        const url = ApiConnexionManager.apiBaseUrl + 'user/';
        let raw = account.toJson();
        let requestOptions = {
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
    static async loginAsync(account:Account) : Promise<string>{

        let jsonResult;
        const url = ApiConnexionManager.apiBaseUrl + 'login/'

        let raw = account.toJson();

        let requestOptions = {
          method: 'POST',
          body: raw,
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
    static async logOutAsync(connectionToken:string){
        let url = ApiConnexionManager.apiBaseUrl + 'logout/';

        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Token " + connectionToken);
        
        let requestOptions = {
          method: 'DELETE',
          headers: myHeaders,
        };
        
        await fetch(url, requestOptions)
          .then((response) => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(text);
                })
            }
            
            return response.text();
          })
          .catch(error => {throw error});
    }
}