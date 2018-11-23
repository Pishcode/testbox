import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/internal/operators';

import * as fromAuth from '../store/auth.reducer';
import * as fromApp from '../store/app.reducer';
import {Observable, Subscription} from 'rxjs';

@Injectable()
export class AuthGuardService {

    authenticated$: Subscription;
    constructor(
        private router: Router,
        private store: Store<fromApp.AppState>

    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let isAuthenticated: boolean;

        this.authenticated$ = this.store.select('auth').pipe(
            tap((authState: fromAuth.State) => {
                isAuthenticated = authState.authenticated;
            })
        ).subscribe();

        if (isAuthenticated) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }

    onDestroy() {
        if (this.authenticated$) {
            this.authenticated$.unsubscribe();
        }
    }
}
