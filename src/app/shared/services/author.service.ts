import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { filter, map } from 'rxjs/operators';

import { Author } from '../models/author.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private authors: Observable<any[]>;
  private authorCollection: AngularFirestoreCollection<Author>;
  private authorDoc: AngularFirestoreDocument<Author>;

  constructor(
      private db: AngularFireDatabase,
      private firestore: AngularFirestore
  ) {
    this.authorCollection = firestore.collection('authors');
    this.authors = firestore.collection('authors').valueChanges();
  }

  getAuthors(orderBy = 'name') {
    return this.firestore.collection('authors', ref => ref.orderBy(orderBy)).snapshotChanges().pipe(
        filter(x => !!x),
        map(
            documents => documents.map(
                item => {
                  return {
                    id: item.payload.doc.id,
                    ...item.payload.doc.data()
                  };
                }
            )
        )
    );
  }

  getAuthor(id: string) {
    return this.firestore.doc<Author>(`authors/${id}`).valueChanges();
  }

  addAuthor(author: Author) {
    return this.authorCollection.add(author);
  }

  updateAuthor(id: string, author: Author) {
    this.authorDoc = this.firestore.doc<Author>(`authors/${id}`);
    return this.authorDoc.update(author);
  }
}
