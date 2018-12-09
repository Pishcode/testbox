import {Component, OnInit} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import {Book} from '../../shared/models/book.model';
import {BookService} from '../../shared/services/book.service';

@Component({
    selector: 'app-add-book',
    templateUrl: './add-book.component.html',
    styleUrls: ['./add-book.component.sass']
})
export class AddBookComponent implements OnInit {

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
        private bookService: BookService
    ) { }

    ngOnInit() {
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
        this.bookService.addBook(this.formData);
    }
}
