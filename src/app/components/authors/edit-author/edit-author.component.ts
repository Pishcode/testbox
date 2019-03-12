import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AuthorService } from '../../../shared/services/author.service';
import { Author } from '../../../shared/models/author.model';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DEFAULT_APP_FORMAT } from '../../../shared/date.formats';

@Component({
    selector: 'app-edit-author',
    templateUrl: './edit-author.component.html',
    styleUrls: ['./edit-author.component.sass'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: DEFAULT_APP_FORMAT},
    ],
})
export class EditAuthorComponent implements OnInit {

    authorId: string;
    author$: Observable<Author>;
    form: FormGroup;
    formData: Author = <Author>{
        name: '',
        dateOfBirth: '',
        placeOfBirth: ''
    };

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authorService: AuthorService,
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


        this.author$.pipe(
            filter(x => !!x),
            tap((author: Author) => {
                this.form.patchValue(author);
            })
        ).subscribe();

        this.form = this.fb.group({
            'name': [this.formData.name, Validators.required],
            'dateOfBirth': [this.formData.dateOfBirth, Validators.required],
            'placeOfBirth': [this.formData.placeOfBirth, Validators.required],
            'description': [this.formData.description],
            'image': [this.formData.image],
            'website': [this.formData.website],
        });


        this.form.valueChanges.subscribe(
            data => {
                this.formData.name = data.name;
                this.formData.dateOfBirth = typeof data.dateOfBirth === 'string' ? data.dateOfBirth : data.dateOfBirth.format();
                this.formData.placeOfBirth = data.placeOfBirth;
                this.formData.description = data.description;
                this.formData.image = data.image;
                this.formData.website = data.website;
            }
        );
    }

    onSubmit() {
        this.authorService.updateAuthor(this.authorId, this.formData).then( () => {
            this.router.navigate(['/author', this.authorId]);
        });
    }

}
