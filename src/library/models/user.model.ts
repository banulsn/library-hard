import { v4 as uuidv4 } from 'uuid';

export class User {
    uuid?: string;
    name: string;
    surname: string;

    // Ma miec: Imie, Nazwisko, uuid
    constructor(user: {name: string, surname: string, uuid?: string}) {
        this.uuid = user.uuid ? user.uuid : uuidv4();
        this.name = user.name;
        this.surname = user.surname;
    }
}
