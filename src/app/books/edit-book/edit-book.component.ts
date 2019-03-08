import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import { Book } from '../../shared/models/book.model';
import { BookService } from '../../shared/services/book.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/internal/operators';

@Component({
    selector: 'app-edit-book',
    templateUrl: './edit-book.component.html',
    styleUrls: ['./edit-book.component.sass']
})
export class EditBookComponent implements OnInit {

    bookId: string;
    book$: Observable<Book>;
    form: FormGroup;
    formData: Book = <Book>{
        author: '',
        country: '',
        language: '',
        title: '',
    };

    constructor(
        private fb: FormBuilder,
        private bookService: BookService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.params.subscribe(
            (params: Params) => {
                this.bookId = params['id'];
                this.book$ = this.bookService.getBook(this.bookId);
            }
        );

        this.book$.pipe(
            filter(x => !!x),
            tap((book: Book) => {
                this.form.patchValue(book);
            })
        ).subscribe();

        this.form = this.fb.group({
            'author': [this.formData.author, Validators.required],
            'country': [this.formData.country],
            'description': [this.formData.description],
            'image': [this.formData.image],
            'language': [this.formData.language],
            'title': [this.formData.title, Validators.required],
            'published': [this.formData.published],
            'pages': [this.formData.pages],
            'price': [this.formData.price],
        });


        this.form.valueChanges.subscribe(
            data => {
                this.formData.author = data.author;
                this.formData.country = data.country;
                this.formData.description = data.description;
                this.formData.image = data.image;
                this.formData.language = data.language;
                this.formData.title = data.title;
                this.formData.published = data.published ? parseInt(data.published, 16) : 0;
                this.formData.pages = data.pages ? parseInt(data.pages, 16) : 0;
                this.formData.price = parseFloat(data.price);
            }
        );
    }


    onSubmit() {
        this.bookService.updateBook(this.bookId, this.formData);
    }
}
