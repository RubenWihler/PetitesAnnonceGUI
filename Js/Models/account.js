class Account {
    email;
    password;
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
    toJson() {
        return JSON.stringify(this);
    }
}
