import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class BookService {
  constructor(private db: AngularFireDatabase) { }

  getBooks() {
      return this.db.list('books').valueChanges();
  }

  getBook(id: number) {
    return this.db.object('books/' + id).valueChanges();
  }
}
