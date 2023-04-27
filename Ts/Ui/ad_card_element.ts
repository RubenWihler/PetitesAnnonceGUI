class AdCardElement{
    readonly editable: boolean;
    readonly onEditClick: Function;
    #ad: Ad;
    #element: HTMLDivElement;

    constructor(ad: Ad, parent: HTMLElement, onEditClick: Function = null) {
        this.#ad = ad;
        this.editable = ad.e;
        this.onEditClick = onEditClick !== null ? onEditClick : () => {};
        this.#generateHtmlElement(parent);
    }

    #generateHtmlElement(parent: HTMLElement){
        this.#element = document.createElement('div');
        this.#element.classList.add('ad-card');

        const text_container = document.createElement('div');
        text_container.classList.add('ad-card-text-container');

        const title = document.createElement('span');
        const description = document.createElement('p');

        const details_container = document.createElement('div');
        details_container.classList.add('ad-card-details');

        const email = document.createElement('span');
        email.classList.add('ad-card-email');
        const price = document.createElement('span');
        price.classList.add('ad-card-price');

        text_container.appendChild(title);
        text_container.appendChild(description);
        details_container.appendChild(email);
        details_container.appendChild(price);
        this.#element.appendChild(text_container);
        this.#element.appendChild(details_container);

        if (this.editable){
            const edit_button = document.createElement('button');
            const icon = document.createElement('i');
            edit_button.onclick = () => this.onEditClick(this);
            icon.classList.add('fas');
            icon.classList.add('fa-pen');
            edit_button.appendChild(icon);
            this.#element.appendChild(edit_button);
        }
    }
}