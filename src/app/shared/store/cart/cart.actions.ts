import { Action } from '@ngrx/store';
import { CartItem } from '../../models/cart.model';

export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';

export class AddItem implements Action {
    readonly type = ADD_ITEM;

    constructor(public payload: CartItem) {}
}

export class RemoveItem implements Action {
    readonly type = REMOVE_ITEM;

    constructor(public payload: string) {}
}

export type CartActions = AddItem | RemoveItem;
