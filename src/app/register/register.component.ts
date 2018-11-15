import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import { UserLoginData } from '../shared/models/user.model';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
    hide = true;
    form: FormGroup;
    formData: UserLoginData = {
        email: '',
        password: ''
    };
    email = new FormControl(this.formData.email, Validators.required);

    constructor(
        private authService: AuthService,
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
        this.authService.registerUser(this.formData);
    }

}
