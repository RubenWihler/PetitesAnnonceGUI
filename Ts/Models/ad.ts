class Ad{
    id: number;
    title: string;
    description: string;
    price: Price;
    editable: boolean;

    constructor( title:string, description:string, price:Price){
        this.title = title;
        this.description = description;
        this.price = price;
    }

    toJsonForCreate() : string{
        const copy = {
            title: this.title,
            description: this.description,
            price: this.price
        }

        return JSON.stringify(copy);
    }
}