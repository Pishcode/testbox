import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.sass']
})
export class BooksComponent implements OnInit {
  books: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
  }

  ngOnInit() {
    this.books = this.db.list('/books').valueChanges();
  }

}
