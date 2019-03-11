import { Component, OnInit, OnDestroy } from '@angular/core';
import {
    FormBuilder, FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { Book } from '../../shared/models/book.model';
import { BookService } from '../../shared/services/book.service';
import { AuthorService } from '../../shared/services/author.service';
import { Observable, Subscription } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';

@Component({
    selector: 'app-add-book',
    templateUrl: './add-book.component.html',
    styleUrls: ['./add-book.component.sass']
})
export class AddBookComponent implements OnInit, OnDestroy {
    authors$$: Subscription;
    authors = [];
    filteredAuthors$: Observable<any[]>;
    authorControl: FormControl = new FormControl('', Validators.required);
    form: FormGroup;
    formData: Book = <Book>{
        author: '',
        country: '',
        language: '',
        title: '',
        published: 0,
    };

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private bookService: BookService,
        private authorService: AuthorService
    ) { }

    ngOnInit() {
        this.authors$$ = this.authorService.getAuthors().subscribe(authors => {
            this.authors = authors;

            this.filteredAuthors$ = this.authorControl.valueChanges.pipe(
                startWith({name: ''}),
                map(value => {
                    console.log(value);
                    return this.filterAuthors(value.name);
                })
            );

            this.form.addControl('author', this.authorControl);
        });

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
                this.formData.author = data.author.id;
                this.formData.country = data.country;
                this.formData.description = data.description;
                this.formData.image = data.image;
                this.formData.language = data.language;
                this.formData.title = data.title;
                this.formData.published = parseInt(data.published, 0);
                this.formData.pages = parseInt(data.pages, 0);
                this.formData.price = parseFloat(data.price);
            }
        );
    }

    onSubmit() {
        this.bookService.addBook(this.formData).then( ref => {
            if (ref.id) {
                this.router.navigate(['/book', ref.id]);
            }
        });
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
