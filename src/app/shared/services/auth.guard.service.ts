import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';

import * as fromAuth from '../store/auth.reducer';
import * as fromApp from '../store/app.reducer';
import { Subscription } from 'rxjs';

@Injectable()
export class AuthGuardService {
    authenticated$: Subscription;

    constructor(
        private router: Router,
        private store: Store<fromApp.AppState>
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select('auth').pipe(
            take(1),
            map((authState: fromAuth.State) => {
                if (authState.authenticated) {
                    return true;
                }

                this.router.navigate(['/login']);
                return false;
            })
        );
    }

    onDestroy() {
        if (this.authenticated$) {
            this.authenticated$.unsubscribe();
        }
    }
}
