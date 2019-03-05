import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from './auth/auth.reducer';
import * as fromCart from './cart/cart.reducer';

export interface AppState {
    auth: fromAuth.State;
    cart: fromCart.State;
}

export const reducers: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer,
    cart: fromCart.cartReducer
};
