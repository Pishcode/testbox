import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Book } from '../models/book.model';
import { filter, map } from 'rxjs/internal/operators';
import { Observable } from 'rxjs';
import { AuthorService } from './author.service';

@Injectable()
export class BookService {
    private books: Observable<any[]>;
    private booksCollection: AngularFirestoreCollection<Book>;
    private bookDoc: AngularFirestoreDocument<Book>;

    constructor(
        private db: AngularFireDatabase,
        private firestore: AngularFirestore,
        private authorService: AuthorService
    ) {
        this.booksCollection = firestore.collection('books');
        this.books = firestore.collection('books').valueChanges();
    }

    getBooks(orderBy = 'title') {
        return this.firestore.collection('books', ref => ref.orderBy(orderBy)).snapshotChanges().pipe(
            filter(x => !!x),
            map(
                documents => documents.map(
                    book => {
                        const bookData = book.payload.doc.data() as Book;
                        return {
                            id: book.payload.doc.id,
                            authorRef: this.authorService.getAuthor(bookData.author),
                            ...bookData
                        };
                    }
                )
            )
        );
    }

    getBook(id: string) {
        return this.firestore.doc<Book>(`books/${id}`).valueChanges().pipe(
            map( book => {
                return {
                    authorRef: this.authorService.getAuthor(book.author),
                    ...book
                };
            })
        );
    }

    addBook(book: Book) {
        return this.booksCollection.add(book);
    }

    updateBook(id: string, book: Book) {
        this.bookDoc = this.firestore.doc<Book>(`books/${id}`);
        return this.bookDoc.update(book);
    }
}
