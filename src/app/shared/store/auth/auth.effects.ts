import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { fromPromise } from 'rxjs/internal-compatibility';
import { UserLoginData, UserRegisterData, User } from '../../models/user.model';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
    private userCollection: AngularFirestoreCollection<User>;

    @Effect()
    authRegister = this.actions$.pipe(
        ofType(AuthActions.TRY_REGISTER),
        map((action: AuthActions.TryRegister) => action.payload),
        switchMap((authData: UserRegisterData) => {
            return fromPromise(
                firebase.auth().createUserWithEmailAndPassword(authData.email, authData.password)
            ).pipe(
                switchMap(
                    userObj => {
                        return fromPromise(
                            this.userCollection.doc(userObj.user.uid).set({name: authData.name})
                        );
                    }
                )
            );
        }),
        switchMap(() => {
            return fromPromise(firebase.auth().currentUser.getIdToken());
        }),
        mergeMap((token: string) => {
            this.router.navigate(['/']);

            return [
                {
                    type: AuthActions.REGISTER
                },
                {
                    type: AuthActions.SET_TOKEN,
                    payload: token
                }
            ];
        })
    );

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.TRY_LOGIN),
        map((action: AuthActions.TryLogin) => action.payload),
        switchMap((authData: UserLoginData) => {
            return fromPromise(
                firebase.auth().signInWithEmailAndPassword(authData.email, authData.password)
            );
        }),
        switchMap(() => fromPromise(firebase.auth().currentUser.getIdToken())),
        mergeMap((token: string) => {
            this.router.navigate(['/']);

            return [
                {
                    type: AuthActions.LOGIN
                },
                {
                    type: AuthActions.SET_TOKEN,
                    payload: token
                }
            ];
        })
    );

    @Effect()
    authLogout = this.actions$.pipe(
        ofType(AuthActions.TRY_LOGOUT),
        switchMap((authData: UserLoginData) => {
            return fromPromise(
                firebase.auth().signOut()
            );
        }),
        switchMap(() => {
            this.router.navigate(['/']);

            return [
                {
                    type: AuthActions.LOGOUT
                }
            ];
        })
    );

    constructor(
        private actions$: Actions,
        private router: Router,
        private firestore: AngularFirestore
    ) {
        this.userCollection = this.firestore.collection('users');
    }
}
