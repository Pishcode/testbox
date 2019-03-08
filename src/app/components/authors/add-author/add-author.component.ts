import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

import { Author } from '../../../shared/models/author.model';
import { AuthorService } from '../../../shared/services/author.service';
import { DEFAULT_APP_FORMAT } from '../../../shared/date.formats';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.sass'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: DEFAULT_APP_FORMAT},
  ],
})
export class AddAuthorComponent implements OnInit {


  form: FormGroup;
  formData: Author = <Author>{
    name: '',
    dateOfBirth: '',
    placeOfBirth: ''
  };

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private authorService: AuthorService
  ) { }

  ngOnInit() {

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
          this.formData.dateOfBirth = data.dateOfBirth;
          this.formData.placeOfBirth = data.placeOfBirth;
          this.formData.description = data.description;
          this.formData.image = data.image;
          this.formData.website = data.website;
        }
    );
  }

  onSubmit() {
    this.authorService.addAuthor(this.formData).then( ref => {
      if (ref.id) {
        // this.router.navigate(['/authors', ref.id]);
      }
    });
  }

}
