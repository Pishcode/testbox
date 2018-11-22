import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { BookService } from '../shared/services/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.sass']
})
export class BooksComponent implements OnInit {
  books: Observable<any[]>;
  booksCollection: Observable<any[]>;

  constructor(
      private bookService: BookService
  ) {
  }

  ngOnInit() {
    this.booksCollection = this.bookService.getBooks();
  }

}
