import { Component, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { AuthService } from './shared/services/auth.service';
import { map } from 'rxjs/operators';
import * as fromCart from './shared/store/cart/cart.reducer';
import { Store } from '@ngrx/store';
import * as fromApp from './shared/store/app.reducer';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
    navOpened = true;
    title = 'Pishcode';
    user$$: Subscription;
    cartItemsCount: Observable<number>;

    constructor(
        private store: Store<fromApp.AppState>,
        private auth: AuthService
    ) { }

    ngOnInit() {
        this.user$$ = this.auth.user.subscribe();

        this.cartItemsCount = this.store.select('cart').pipe(
            map((cartState: fromCart.State) => {
                if (!cartState.cartItems.length) {
                  return 0;
                }
                const arrayCount = cartState.cartItems.map(x => x.count);
                return arrayCount.reduce((accumulator, item) => accumulator + item);
            })
        );
    }
}
