import { Action } from '@ngrx/store';

export const REGISTER = 'REGISTER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';

export class Register implements Action {
    readonly type = REGISTER;
}

export class Login implements Action {
    readonly type = LOGIN;
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class SetToken implements Action {
    readonly type = SET_TOKEN;

    constructor(public payload: { token: string }) { }
}

export type AuthActions = Register | Login | Logout | SetToken;
