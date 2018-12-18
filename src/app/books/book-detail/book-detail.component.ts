import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BookService } from '../../shared/services/book.service';
import { Observable, of } from 'rxjs';
import { Book } from '../../shared/models/book.model';
import { ReviewService } from '../../shared/services/review.service';
import { Review } from '../../shared/models/review.model';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../../shared/services/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../shared/store/app.reducer';
import * as fromAuth from '../../shared/store/auth.reducer';

@Component({
    selector: 'app-book-detail',
    templateUrl: './book-detail.component.html',
    styleUrls: ['./book-detail.component.sass']
})
export class BookDetailComponent implements OnInit {

    book$: Observable<Book>;
    reviews$: Observable<Review[]>;
    isAuthenticated$: Observable<boolean>;
    averageRating$: Observable<number>;
    hasUserBookReview$ = of(false);
    bookId: string;

    constructor(
        private auth: AuthService,
        private bookService: BookService,
        private reviewService: ReviewService,
        private store: Store<fromApp.AppState>,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(
            (params: Params) => {
                this.bookId = params['id'];
                this.book$ = this.bookService.getBook(this.bookId);
            }
        );

        this.isAuthenticated$ = this.store.select('auth').pipe(
            map((authState: fromAuth.State) => authState.authenticated),
            tap(authenticated => {
                if (authenticated) {
                    this.hasUserBookReview$ = this.reviewService.hasUserBookReview(this.bookId, this.auth.userId);
                }
            })
        );

        this.reviews$ = this.reviewService.getBookReviews(this.bookId);

        this.averageRating$ = this.reviewService.getBookAvagareRating(this.bookId);


    }

}
