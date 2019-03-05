import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';

import * as fromApp from '../shared/store/app.reducer';
import * as fromCart from '../shared/store/cart/cart.reducer';
import { CartItem } from '../shared/models/cart.model';
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

    constructor(
        private bookService: BookService,
        private store: Store<fromApp.AppState>
    ) {
    }

    ngOnInit() {
        this.cart = this.store.select('cart').pipe(
            map((cartState: fromCart.State) => {
                return cartState.cartItems;
            })
        );

        this.cartSummary = this.store.select('cart').pipe(
            map((cartState: fromCart.State) => {
                if (!cartState.cartItems.length) {
                    return 0;
                }
                const arrayCount = cartState.cartItems.map(x => x.price * 100);
                return arrayCount.reduce((accumulator: number, item: number) => {
                    return accumulator + item;
                }) / 100;
            })
        );
    }

    removeFromCart(id: string) {
        this.store.dispatch(new CartActions.RemoveItem(id));
    }

}
