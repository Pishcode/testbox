import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../shared/store/app.reducer';
import { AuthorService } from '../../../shared/services/author.service';
import { Observable } from 'rxjs';
import { Author } from '../../../shared/models/author.model';
import { map } from 'rxjs/operators';
import * as fromAuth from '../../../shared/store/auth/auth.reducer';

@Component({
    selector: 'app-author-detail',
    templateUrl: './author-detail.component.html',
    styleUrls: ['./author-detail.component.sass']
})
export class AuthorDetailComponent implements OnInit {
    authorId: string;
    author$: Observable<Author>;
    isAuthenticated$: Observable<boolean>;

    constructor(
        private authorService: AuthorService,
        private store: Store<fromApp.AppState>,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(
            (params: Params) => {
                this.authorId = params['id'];
                this.author$ = this.authorService.getAuthor(this.authorId);
            }
        );

        this.isAuthenticated$ = this.store.select('auth').pipe(
            map((authState: fromAuth.State) => authState.authenticated)
        );
    }
}
