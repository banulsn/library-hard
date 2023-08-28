import moment from 'moment';
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
    addBookToLibrary(book: Book): void {
      this.books = this.addBookToLibraryGivenList(structuredClone(book), this.books);
      this.availableBooks = this.addBookToLibraryGivenList(structuredClone(book), this.availableBooks);
      this.manageBookQuantityOnBookingList('increase', structuredClone(book));
    }

    private addBookToLibraryGivenList(bookToAdd: Book, booksList: Book[]): Book[] {
      let currentQuantity = 1;
      booksList.forEach((book) => {
        if (book.author === bookToAdd.author && book.title === bookToAdd.title) {
          book.quantity++;
          currentQuantity = book.quantity;
        }
      });
      bookToAdd.quantity = currentQuantity;
      return this.addBookToGivenList(bookToAdd, booksList);
    }

    private addBookToGivenList(bookToAdd: Book, booksList: Book[]): Book[] {
      booksList.push(bookToAdd);
      return booksList;
    }

    removeBookFromLibrary(book: Book): void {
      this.books = this.removeBookFromGivenListFromLibrary(structuredClone(book), this.books);
      this.availableBooks = this.removeBookFromGivenListFromLibrary(structuredClone(book), this.availableBooks);
      this.manageBookQuantityOnBookingList('decrease', structuredClone(book));
    }

    private removeBookFromGivenListFromLibrary(bookToRemove: Book, booksList: Book[]): Book[] {
      booksList = this.removeBookFromGivenList(bookToRemove, booksList)
      booksList.forEach((book) => {
        if (book.author === bookToRemove.author && book.title === bookToRemove.title) {
          book.quantity--;
        }
      });
      return booksList;
    }

    private removeBookFromGivenList(bookToRemove: Book, booksList: Book[]): Book[] {
      const index = booksList.findIndex(book => book.uuid === bookToRemove.uuid);
      if (index > -1) {
        booksList.splice(index, 1);
      }
      return booksList;
    }

    private manageBookQuantityOnBookingList(quantity: 'increase' | 'decrease', addedBook: Book) {
      this.bookingsList.forEach((bookingList) => {
        bookingList.listOfBorowedBook.forEach((book) => {
          if (book.author === addedBook.author && book.title === addedBook.title) {
            switch(quantity) {
              case 'increase':
                book.quantity++;
                break;
                case 'decrease':
                book.quantity--
                break;
            }
          }
        });
      });
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
        const userBooking = this.bookingsList[findIndexUserOnBookingList];
        userBooking.removeBookFromBorowedList(book);
        this.addBookToGivenList(book, this.availableBooks);
        this.manageLatePaymentPenalty(userBooking);
        if (!userBooking.listOfBorowedBook.length && userBooking.latePaymentPenalty === 0) {
          this.bookingsList.splice(findIndexUserOnBookingList, 1);
          this.removeBookUser(user.uuid);
        }
      }
    }

    private manageLatePaymentPenalty(userBooking: Booking) {
      if (userBooking.bookingDate > userBooking.bookReturnDate) {
        userBooking.latePaymentPenalty = moment.duration(moment().startOf('day').diff(userBooking.bookReturnDate)).asDays() * 2;
      }
    }

    private removeBookUser(userUuid: string) {
      const findIndexUserOnUsersList = this.bookUsersList.findIndex(existingUser => existingUser.uuid === userUuid);
      if (findIndexUserOnUsersList > -1) {
        this.bookUsersList.splice(findIndexUserOnUsersList, 1);
      }
    }
}
