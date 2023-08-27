import moment from 'moment';
import { User } from './user.model';
import { Book } from './book.model';


export class Booking {
    user: User;
    bookingDate: Date;
    bookReturnDate: Date;
    listOfBorowedBook: Book[];
    latePaymentPenalty: number;
    // Booking dostaje użytkownika w constructorze
    // Ma mieć: datę wypożyczenia, datę zwrotu (+7d od wypożyczenia), listę wypożyczonych książek, kara

    constructor(bookUser: User) {
        this.user = bookUser;
        this.bookingDate = moment().startOf('day').toDate();
        this.bookReturnDate = moment().add(7,'days').endOf('day').toDate();
        this.listOfBorowedBook = [];
        this.latePaymentPenalty = 0;
    }

    // Ma umożliwiać:
    // - usuwanie i dodawanie książki do listy wypożyczonych książek
    // - zwrot - jeśli odbędzie się terminowo kara jest 0 - jesli nie -
    // każdy dzień zwłoki to naliczenie jakiejś kary. 2 zł za dzień

    addBookToBorowedList(book: Book): void {
        this.listOfBorowedBook.push(book);
    }

    removeBookFromBorowedList(book: Book): void {
        const index = this.listOfBorowedBook.findIndex(bookOnList => bookOnList.uuid === book.uuid);
        if (index > -1) {
          this.listOfBorowedBook.splice(index, 1);
        }
        if (this.bookingDate > this.bookReturnDate) {
          this.latePaymentPenalty = moment.duration(moment().startOf('day').diff(this.bookReturnDate)).asDays() * 2;
        }
      }
}
