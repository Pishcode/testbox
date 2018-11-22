import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {BookService} from '../../shared/services/book.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-book-detail',
    templateUrl: './book-detail.component.html',
    styleUrls: ['./book-detail.component.sass']
})
export class BookDetailComponent implements OnInit {

    book: Observable<any>;
    bookId: number;

    constructor(
        private bookService: BookService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(
            (params: Params) => {
                this.bookId = +params['id'];
                this.book = this.bookService.getBook(this.bookId);
            }
        );
    }

}
