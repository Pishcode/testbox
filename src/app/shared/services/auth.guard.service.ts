import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/internal/operators';

import * as fromAuth from '../store/auth.reducer';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class AuthGuardService {

    constructor(
        private router: Router,
        private store: Store<fromApp.AppState>

    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const isAuthenticated = this.store.select('auth').pipe(
            map((authState: fromAuth.State) => {
                return authState.authenticated;
            })
        );

        if (isAuthenticated) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
