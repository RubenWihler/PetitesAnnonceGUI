class Ad {
    id;
    title;
    description;
    price;
    editable;
    constructor(title, description, price) {
        this.title = title;
        this.description = description;
        this.price = price;
    }
    toJsonForCreate() {
        const copy = {
            title: this.title,
            description: this.description,
            price: this.price
        };
        return JSON.stringify(copy);
    }
}
