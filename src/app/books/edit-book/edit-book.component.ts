import { Component, OnInit, OnDestroy } from '@angular/core';
import {
    FormBuilder, FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import { Book } from '../../shared/models/book.model';
import { BookService } from '../../shared/services/book.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, map, startWith, tap } from 'rxjs/internal/operators';
import { AuthorService } from '../../shared/services/author.service';
import { Author } from '../../shared/models/author.model';

@Component({
    selector: 'app-edit-book',
    templateUrl: './edit-book.component.html',
    styleUrls: ['./edit-book.component.sass']
})
export class EditBookComponent implements OnInit, OnDestroy {
    authors$$: Subscription;
    authors = [];
    filteredAuthors$: Observable<any[]>;
    authorControl: FormControl = new FormControl('', Validators.required);
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
        private authorService: AuthorService,
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

                this.authors$$ = this.authorService.getAuthors().subscribe(authors => {
                    this.authors = authors;

                    const author = authors.find(x => {
                        return x.id === book.author;
                    });

                    this.authorControl.setValue(author ? author : {name: book.author});

                    this.filteredAuthors$ = this.authorControl.valueChanges.pipe(
                        map(value => {
                            if (value. name) {
                                return this.filterAuthors(value.name);
                            }

                            return this.filterAuthors(value);
                        })
                    );

                    this.form.addControl('author', this.authorControl);
                });
            })
        ).subscribe();

        this.form = this.fb.group({
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
                if (data.author) {
                    if (data.author.hasOwnProperty('id')) {
                        this.formData.author = data.author.id;
                    }
                    if (data.author.hasOwnProperty('name')) {
                        this.formData.author = data.author.name;
                    }
                }
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

    filterAuthors(value: string) {
        const filterValue = value.toLowerCase();
        return this.authors.filter(author => author.name.toLowerCase().indexOf(filterValue) === 0);
    }

    showName(author) {
        return author ? author.name : '';
    }

    ngOnDestroy() {
        if (this.authors$$) {
            this.authors$$.unsubscribe();
        }
    }
}
