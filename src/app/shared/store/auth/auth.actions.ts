import { Action } from '@ngrx/store';
import { UserLoginData, UserRegisterData } from '../../models/user.model';

export const TRY_REGISTER = 'DO_REGISTER';
export const REGISTER = 'REGISTER';
export const TRY_LOGIN = 'DO_LOGIN';
export const LOGIN = 'LOGIN';
export const TRY_LOGOUT = 'DO_LOGOUT';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';

export class TryRegister implements Action {
    readonly type = TRY_REGISTER;

    constructor(public payload: UserRegisterData) {}
}
export class TryLogin implements Action {
    readonly type = TRY_LOGIN;

    constructor(public payload: UserLoginData) {}
}

export class TryLogout implements Action {
    readonly type = TRY_LOGOUT;
}

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

export type AuthActions = Register | Login | Logout | SetToken | TryRegister | TryLogin | TryLogout;
