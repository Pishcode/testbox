import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Book } from '../models/book.model';
import { map } from 'rxjs/internal/operators';
import { Observable } from 'rxjs';

@Injectable()
export class BookService {
    private books: Observable;
    private booksCollection: AngularFirestoreCollection<Book>;
    private bookDoc: AngularFirestoreDocument<Book>;

    constructor(
        private db: AngularFireDatabase,
        private af: AngularFirestore
    ) {
        this.booksCollection = af.collection('books');
        this.books = af.collection('books').valueChanges();
    }

    getBooks() {
        return this.booksCollection.snapshotChanges().pipe(
            map(
                actions => {
                    return actions.map(
                        a => {
                            const data = a.payload.doc.data() as Book;
                            const id = a.payload.doc.id;
                            return {id, ...data};
                        }
                    );
                }
            )
        );
    }

    getBook(id: string) {
        return this.af.doc<Book>(`books/${id}`).valueChanges();
    }

    addBook(book: Book) {
        this.booksCollection.add(book);
    }

    updateBook(id: string, book: Book) {
        this.bookDoc = this.af.doc<Book>(`books/${id}`);
        this.bookDoc.update(book);
    }
}
