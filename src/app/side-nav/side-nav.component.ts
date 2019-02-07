import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../shared/store/app.reducer';
import * as fromAuth from '../shared/store/auth/auth.reducer';
import { map } from 'rxjs/internal/operators';

@Component({
    selector: 'app-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.sass']
})
export class SideNavComponent implements OnInit {
    isAuthenticated: Observable<boolean>;

    constructor(
        private authService: AuthService,
        private store: Store<fromApp.AppState>
    ) { }

    ngOnInit() {
        this.isAuthenticated = this.store.select('auth').pipe(
            map((authState: fromAuth.State) => authState.authenticated)
        );
    }

    logout() {
        this.authService.logout();
    }
}
