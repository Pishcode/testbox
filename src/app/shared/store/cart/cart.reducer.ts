import * as CartActions from './cart.actions';
import { CartItem } from '../../models/cart.model';

export interface State {
    cartItems: CartItem[];
}

const initialState = {
    cartItems: [],
};

export function cartReducer(state = initialState, action: CartActions.CartActions) {

    switch (action.type) {
        case(CartActions.ADD_ITEM):
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload]
            };
        case(CartActions.REMOVE_ITEM):
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (el) => el.id !== action.payload
                )
            };
    }

    return state;
}
