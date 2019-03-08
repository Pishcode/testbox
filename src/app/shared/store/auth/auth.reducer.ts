import * as AuthActions from './auth.actions';

export interface State {
    token: string;
    authenticated: boolean | null;
}

const initialState: State = {
    token: null,
    authenticated: null
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {

    switch (action.type) {
        case(AuthActions.REGISTER):
        case(AuthActions.LOGIN):
            return {
                ...state,
                authenticated: true
            };
        case(AuthActions.SET_TOKEN):
            return {
                ...state,
                token: action.payload.token,
            };
        case(AuthActions.LOGOUT):
            return {
                ...state,
                token: null,
                authenticated: false
            };
    }

    return state;
}
