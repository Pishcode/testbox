import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromApp from '../shared/store/app.reducer';
import * as fromCart from '../shared/store/cart/cart.reducer';
import * as CartActions from '../shared/store/cart/cart.actions';
import { BookService } from '../shared/services/book.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {
    cart: Observable<any>;
    cartSummary: Observable<number>;
    displayedColumns: string[] = ['count', 'image', 'title', 'author', 'price', 'remove'];

    constructor(
        private bookService: BookService,
        private store: Store<fromApp.AppState>
    ) {
    }

    ngOnInit() {
        this.cart = this.store.select('cart').pipe(
            map((cartState: fromCart.State) => {
                return cartState.cartItems.map(item => {
                    return { ...item, book: this.bookService.getBook(item.id)};
                });
            })
        );

        this.cartSummary = this.store.select('cart').pipe(
            map((cartState: fromCart.State) => {
                if (!cartState.cartItems.length) {
                    return 0;
                }

                return cartState.cartItems.reduce((accumulator, item) => {
                    return accumulator + (item.price * 100 * item.count);
                }, 0) / 100;
            })
        );
    }

    removeFromCart(id: string) {
        this.store.dispatch(new CartActions.RemoveItem(id));
    }

}
