import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import { Store } from '@ngrx/store';

import { UserLoginData } from '../shared/models/user.model';
import * as  fromApp from '../shared/store/app.reducer';
import * as  AuthActions from '../shared/store/auth/auth.actions';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
    hide = true;
    form: FormGroup;
    formData: UserLoginData = {
        email: '',
        password: ''
    };
    email = new FormControl(this.formData.email, Validators.required);

    constructor(
        private store: Store<fromApp.AppState>,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.form = this.fb.group({
            'email': this.email,
            'password': [this.formData.password, Validators.required]
        });

        this.form.valueChanges.subscribe(
            data => {
                this.formData.email = data.email;
                this.formData.password = data.password;
            }
        );
    }

    onSubmit() {
        this.store.dispatch(new AuthActions.TryLogin(this.formData));
    }

}
