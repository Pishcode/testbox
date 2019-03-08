import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, skipWhile, take } from 'rxjs/operators';

import * as fromAuth from '../store/auth/auth.reducer';
import * as fromApp from '../store/app.reducer';
import { Subscription } from 'rxjs';

@Injectable()
export class AuthGuardService {

    constructor(
        private router: Router,
        private store: Store<fromApp.AppState>
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select('auth').pipe(
            skipWhile(authState => !authState || authState.authenticated === null),
            map((authState: fromAuth.State) => {
                if (authState.authenticated) {
                    return true;
                }

                this.router.navigate(['/login']);
                return false;
            }),
            take(1)
        );
    }
}
