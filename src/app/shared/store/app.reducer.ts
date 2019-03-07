import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';

import * as fromAuth from './auth/auth.reducer';
import * as fromCart from './cart/cart.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';

export interface AppState {
    auth: fromAuth.State;
    cart: fromCart.State;
}

export const reducers: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer,
    cart: fromCart.cartReducer
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({keys: ['cart'], rehydrate: true})(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
