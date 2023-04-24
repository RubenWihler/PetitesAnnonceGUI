class Account{
    email : string;
    password : string;

    constructor(email:string, password:string){
        this.email = email;
        this.password = password;
    }

    toJson() : string{
        return JSON.stringify(this);
    }
}