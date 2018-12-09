import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

import * as fromApp from '../store/auth.reducer';
import * as AuthActions from '../store/auth.actions';
import { User, UserLoginData } from '../models/user.model';

@Injectable()
export class AuthService {
    user: Observable<User | null>;

    constructor(
        private firestore: AngularFirestore,
        private firebaseAuth: AngularFireAuth,
        private router: Router,
        private store: Store<fromApp.State>
    ) {
        firebaseAuth.auth.setPersistence('local').then(
            () => console.log('Persistence Local')
        );

        this.user = firebaseAuth.authState.pipe(
            switchMap(
                user => {
                    if (user) {
                        this.store.dispatch(new AuthActions.Login());
                        return this.getUser(user.uid);
                    }

                    return of(null);
                }
            )
        );
    }

    private getUser(uid: string) {
        return this.firestore.doc<User>(`users/${uid}`).valueChanges();
    }

    private storeToken() {
        firebase.auth().currentUser.getIdToken().then(
            (token: string) => {
                this.store.dispatch(new AuthActions.SetToken({'token': token}));
            }
        );
    }

    login(data: UserLoginData) {
        this.firebaseAuth.auth.signInWithEmailAndPassword(data.email, data.password).then(
            user => {
                this.store.dispatch(new AuthActions.Login());
                console.log('Success login', user);
                this.router.navigate(['/']);

                this.storeToken();
            }
        ).catch(err => console.log('Error login', err.message));
    }

    registerUser(data: UserLoginData) {
        this.firebaseAuth.auth.createUserWithEmailAndPassword(data.email, data.password).then(
            user => {
                this.store.dispatch(new AuthActions.Register());
                console.log('Success register', user);
                this.router.navigate(['/']);
                this.storeToken();
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
