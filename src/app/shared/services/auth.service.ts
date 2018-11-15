import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/auth.reducer';
import * as AuthActions from '../store/auth.actions';
import { UserLoginData } from '../models/user.model';

@Injectable()
export class AuthService {
    user: Observable<firebase.User>;
    constructor(
        private firebaseAuth: AngularFireAuth,
        private router: Router,
        private store: Store<fromApp.State>
    ) {
        this.user = firebaseAuth.authState;
    }

    login(data: UserLoginData) {
        this.firebaseAuth.auth.signInWithEmailAndPassword(data.email, data.password).then(
            user => {
                this.store.dispatch(new AuthActions.Login());
                console.log('Success login', user);
            }
        ).catch(err => console.log('Error login', err.message));
    }

    registerUser(data: UserLoginData) {
        this.firebaseAuth.auth.createUserWithEmailAndPassword(data.email, data.password).then(
            user => {
                this.store.dispatch(new AuthActions.Login());
                console.log('Success register', user);
            }
        ).catch(err => console.log('Error register', err.message));
    }

    logout() {
        this.firebaseAuth.auth.signOut().then(
            res => {
                this.store.dispatch(new AuthActions.Logout());

            }
        );
    }
}
