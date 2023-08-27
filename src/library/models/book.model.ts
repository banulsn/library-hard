import { v4 as uuidv4 } from 'uuid';

export class Book {
    uuid?: string;
    title: string;
    author: string;
    image: string;
    description: string;
    quantity?: number;

    // Ma miec: Tytuł, Autora, uuid, losowe zdjęcie oraz krótki opis
    constructor(book: {title: string, author: string, image: string, description: string}) {
        this.uuid = uuidv4();
        this.title = book.title;
        this.author = book.author;
        this.image = book.image;
        this.description = book.description;
        this.quantity = 1;
    }
}
