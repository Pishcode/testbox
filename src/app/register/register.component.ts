import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';

import { UserRegisterData } from '../shared/models/user.model';
import * as  fromApp from '../shared/store/app.reducer';
import * as  AuthActions from '../shared/store/auth/auth.actions';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
    hide = true;
    form: FormGroup;
    formData: UserRegisterData = {
        name: '',
        email: '',
        password: ''
    };
    email = new FormControl(this.formData.email, Validators.required);

    constructor(
        private store: Store<fromApp.AppState>,
        private fb: FormBuilder
    ) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            'name': this.formData.name,
            'email': this.email,
            'password': [this.formData.password, Validators.required]
        });

        this.form.valueChanges.subscribe(
            data => {
                this.formData.name = data.name;
                this.formData.email = data.email;
                this.formData.password = data.password;
            }
        );
    }

    onSubmit() {
        this.store.dispatch(new AuthActions.TryRegister(this.formData));
    }

}
