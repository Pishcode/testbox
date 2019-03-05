import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookService } from '../shared/services/book.service';
import * as CartActions from '../shared/store/cart/cart.actions';
import { CartItem } from '../shared/models/cart.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../shared/store/app.reducer';
import { map } from 'rxjs/operators';
import * as fromAuth from '../shared/store/auth/auth.reducer';

@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.sass']
})
export class BooksComponent implements OnInit {
    books: Observable<any[]>;
    booksCollection: Observable<any[]>;
    isAuthenticated: Observable<boolean>;

    constructor(
        private store: Store<fromApp.AppState>,
        private bookService: BookService
    ) { }

    ngOnInit() {
        this.booksCollection = this.bookService.getBooks();

        this.isAuthenticated = this.store.select('auth').pipe(
            map((authState: fromAuth.State) => authState.authenticated)
        );
    }

    addToCart(bookId: string, price: number) {
        const item: CartItem = {
            id: bookId,
            count: 1,
            price: price
        };

        this.store.dispatch(new CartActions.AddItem(item));
    }

}
