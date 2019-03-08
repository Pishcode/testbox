import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

import * as fromApp from '../store/auth/auth.reducer';
import * as AuthActions from '../store/auth/auth.actions';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {
    user: Observable<User | null>;
    userId: string;

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
                        this.userId = user.uid;
                        this.storeToken();
                        return this.getUser(user.uid);
                    }

                    this.store.dispatch(new AuthActions.Logout());
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

    logout() {
        this.store.dispatch(new AuthActions.TryLogout());
    }
}
