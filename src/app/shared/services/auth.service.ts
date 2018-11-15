import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {BehaviorSubject, Observable} from 'rxjs';
import { UserLoginData } from '../models/user.model';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
    user: Observable<firebase.User>;
    token = '';
    isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
    constructor(
        private firebaseAuth: AngularFireAuth,
        private router: Router
    ) {
        this.user = firebaseAuth.authState;
    }

    login(data: UserLoginData) {
        this.firebaseAuth.auth.signInWithEmailAndPassword(data.email, data.password).then(
            res => {
              this.firebaseAuth.auth.currentUser.getIdToken().then(
                  (token: string) => {
                      this.token = token;
                      this.isLoginSubject.next(true);
                      this.router.navigate(['/']);
                  }
              );
              console.log('Success login', res);
            }
        ).catch(err => console.log('Error login', err.message));
    }

    registerUser(data: UserLoginData) {
        this.firebaseAuth.auth.createUserWithEmailAndPassword(data.email, data.password).then(
            value => console.log('Success register', value)
        ).catch(err => console.log('Error register', err.message));
    }

    hasToken() {
        return !!this.token;
    }

    getToken() {
        return firebase.auth().currentUser.getIdToken();
    }

    logout() {
      this.firebaseAuth.auth.signOut().then(
          res => {
              this.token = '';
              this.isLoginSubject.next(false);

          }
      );
    }

    isLoggedIn(): Observable<boolean> {
        return this.isLoginSubject.asObservable();
    }
}
