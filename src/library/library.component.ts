import { Component, OnInit } from '@angular/core';
import { Library } from './models/library.model';
import { Book } from './models/book.model';

@Component({
  selector: 'library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']

})

export class LibraryComponent implements OnInit {
  library = new Library();

  book1 = {
    title: 'Ksiazka pierwsza',
    author: 'Jan Kowalski',
    image: 'img1.jpg',
    description: 'opis1 opis1 opis1 opis1 opis1'
  };

  book2 = {
    title: 'Ksiazka pierwsza',
    author: 'Jan Kowalski',
    image: 'img1.jpg',
    description: 'opis1 opis1 opis1 opis1 opis1'
  };

  book3 = {
    title: 'Ksiazka pierwsza',
    author: 'Jan Kowalski',
    image: 'img1.jpg',
    description: 'opis1 opis1 opis1 opis1 opis1'
  };

  user = {
    name:'Kamil',
    surname: 'Nowak'
  }

  ngOnInit(): void {
    this.book1 = new Book(this.book1);
    this.book2 = new Book(this.book2);
    this.book3 = new Book(this.book3);
    this.library.addBookToLibrary(this.book1);
  }

  addBook() {
    this.library.addBookToLibrary(this.book2);
    this.library.addBookToLibrary(this.book3);
  }
  
  removeBook() {
    this.library.removeBookFromLibrary(this.library.books[1]);
  }

  addBooking() {
    this.library.addBooking(this.library.availableBooks[1], this.user);
  }

  removeBooking() {
    this.library.removeBooking(this.library.bookingsList[0].listOfBorowedBook[0], this.library.bookUsersList[0]);
  }

}
