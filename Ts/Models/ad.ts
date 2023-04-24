class Ad{
    id: number;
    title: string;
    description: string;
    price: Price;

    constructor( title:string, description:string, price:Price){
        this.title = title;
        this.description = description;
        this.price = price;
    }
}