import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../../shared/services/author.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../shared/store/app.reducer';
import { map } from 'rxjs/operators';
import * as fromAuth from '../../shared/store/auth/auth.reducer';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.sass']
})
export class AuthorsComponent implements OnInit {
  authors: Observable<any[]>;
  authorsCollection: Observable<any[]>;
  isAuthenticated: Observable<boolean>;

  constructor(
      private store: Store<fromApp.AppState>,
      private authorService: AuthorService) { }

  ngOnInit() {
    this.authorsCollection = this.authorService.getAuthors();

    this.isAuthenticated = this.store.select('auth').pipe(
        map((authState: fromAuth.State) => authState.authenticated)
    );
  }

}
