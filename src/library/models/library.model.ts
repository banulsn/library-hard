import { Book } from "./book.model";
import { Booking } from "./booking.model";
import { User } from "./user.model";

export class Library {
    books: Book[];
    availableBooks: Book[];
    bookingsList: Booking[];
    bookUsersList: User[];

    // Ma miec: listę książek, listę książek dostępnych (które nie zostały wypożyczone),
    // lista wypożyczeń, lista użytkowników
    constructor() {
        this.books = [];
        this.availableBooks = [];
        this.bookingsList = [];
        this.bookUsersList = [];
    }

    // Ma umożliwiać:
    // - dodawanie książek do listy
    // - usuwanie książek z listy
    // - wypożyczanie książki dla usera X
    // - oddanie wypożyczania książki
    addBook(book: Book): void {
      book = new Book(book);
      this.books = this.addBookToGivenList(structuredClone(book), this.books);
      this.availableBooks = this.addBookToGivenList(structuredClone(book), this.availableBooks);
    }

    private addBookToGivenList(bookToAdd: Book, booksList: Book[]): Book[] {
      booksList.push(bookToAdd);
      const duplicatedBooksUuidList = [];
      booksList.forEach((book) => {
        if (book.author === bookToAdd.author && book.title === bookToAdd.title) {
          duplicatedBooksUuidList.push(book.uuid);
        }
      });
      if (duplicatedBooksUuidList.length) {
        booksList.forEach((book) => {
          if (duplicatedBooksUuidList.indexOf(book.uuid) > -1) {
            book.quantity = duplicatedBooksUuidList.length;
          }
        });
      }
      return booksList;
    }

    removeBook(book: Book): void {
      this.books = this.removeBookFromGivenList(structuredClone(book), this.books);
      this.availableBooks = this.removeBookFromGivenList(structuredClone(book), this.availableBooks);
    }

    private removeBookFromGivenList(bookToRemove: Book, booksList: Book[]): Book[] {
      const index = booksList.findIndex(book => book.uuid === bookToRemove.uuid);
      if (index > -1) {
        booksList.splice(index, 1);
        booksList.forEach((book) => {
          if (book.author === bookToRemove.author && book.title === bookToRemove.title) {
            book.quantity--;
          }
        });
      }
      return booksList;
    }

    addBooking(book: Book, user: User): void {
      if (!user.uuid) {
        user = new User(user);
        this.bookUsersList.push(user);
      }
      const findIndexUserOnBookingList = this.bookingsList.findIndex(booking => booking.user.uuid === user.uuid);
      if (findIndexUserOnBookingList > -1) {
        this.bookingsList[findIndexUserOnBookingList].addBookToBorowedList(book);
      } else {
        const newBooking = new Booking(user);
        newBooking.addBookToBorowedList(book);
        this.bookingsList.push(newBooking);
      }
      this.removeBookFromGivenList(book, this.availableBooks);
    }

    removeBooking(book: Book, user: User) {
      const findIndexUserOnBookingList = this.bookingsList.findIndex(booking => booking.user.uuid === user.uuid);
      if (findIndexUserOnBookingList > -1) {
        this.bookingsList[findIndexUserOnBookingList].removeBookFromBorowedList(book);
        this.addBookToGivenList(book, this.availableBooks);
        if (!this.bookingsList[findIndexUserOnBookingList].listOfBorowedBook.length && this.bookingsList[findIndexUserOnBookingList].latePaymentPenalty === 0) {
          this.bookingsList.splice(findIndexUserOnBookingList, 1);
          const findIndexUserOnUsersList = this.bookUsersList.findIndex(existingUser => existingUser.uuid === user.uuid);
          if (findIndexUserOnBookingList > -1) {
            this.bookUsersList.splice(findIndexUserOnUsersList, 1);
          }
        }
      }
    }
}
