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

    this.library.addBook(this.book1);

  }

 

  addBook() {

    this.library.addBook(this.book2);

    this.library.addBook(this.book3);

  }

 

  addBooking() {

    this.library.addBooking(this.library.availableBooks[1], this.user);

  }

 

  removeBook() {

    this.library.removeBook(this.library.books[1]);

  }

 

}

 