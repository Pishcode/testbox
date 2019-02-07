export interface User {
    uid: string;
    email: string;
    name: string;
}

export interface UserLoginData {
    email: string;
    password: string;
}

export interface UserRegisterData {
    email: string;
    name: string;
    password: string;
}
