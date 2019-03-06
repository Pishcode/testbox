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
            if (state.cartItems.findIndex(item => item.id === action.payload.id) !== -1) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => {
                        return x.id === action.payload.id ? {...x, count: x.count + 1 } : x;
                    })
                };
            }

            return {
                ...state,
                cartItems: [...state.cartItems, action.payload]
            };
        case(CartActions.REMOVE_ITEM):
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (item) => item.id !== action.payload
                )
            };
    }

    return state;
}
