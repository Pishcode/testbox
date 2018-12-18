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
        description: '',
        image: '',
        language: '',
        title: '',
        published: 0,
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
                this.form.setValue({
                    author: book.author,
                    country: book.country,
                    description: book.description,
                    image: book.image,
                    language: book.language,
                    title: book.title,
                    published: book.published
                });
            })
        ).subscribe();

        this.form = this.fb.group({
            'author': [this.formData.author, Validators.required],
            'country': [this.formData.country],
            'description': [this.formData.description],
            'image': [this.formData.image],
            'language': [this.formData.language],
            'title': [this.formData.title, Validators.required],
            'published': [this.formData.published]
        });


        this.form.valueChanges.subscribe(
            data => {
                this.formData.author = data.author;
                this.formData.country = data.country;
                this.formData.description = data.description;
                this.formData.image = data.image;
                this.formData.language = data.language;
                this.formData.title = data.title;
                this.formData.published = data.published;
            }
        );
    }


    onSubmit() {
        this.bookService.updateBook(this.bookId, this.formData);
    }
}
