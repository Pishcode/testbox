import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../shared/store/app.reducer';
import * as fromAuth from '../shared/store/auth.reducer';

@Component({
    selector: 'app-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.sass']
})
export class SideNavComponent implements OnInit {
    authState: Observable<fromAuth.State>;

    isLoggedIn: Observable<boolean>;
    constructor(
        private authService: AuthService,
        private store: Store<fromApp.AppState>
    ) { }

    ngOnInit() {
        this.isLoggedIn = this.authService.isLoggedIn();

        this.authState = this.store.select('auth');
    }

    logout() {
        this.authService.logout();
    }
}
