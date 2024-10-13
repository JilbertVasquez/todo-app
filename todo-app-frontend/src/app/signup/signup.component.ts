import {Component, OnInit} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService } from '../_services/dialog.service';
import { SignUpDto } from '../_dtos/signup-dto';
import { last } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [MatCardModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule, FormsModule, ReactiveFormsModule, CommonModule],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
    form: FormGroup;
    isBusy = false;

    constructor(private _fb: FormBuilder, private _router: Router, private _dialog: DialogService, private _auth: AuthService) {
        this.form = this._fb.group({
            firstname: ['', [Validators.required]],
            lastname: ['', [Validators.required]],
            username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(18)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(36)]],
            retypePassword: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(36)]],
        });
    }

    ngOnInit() { }

    submit() {
        if (!this.isValidFields()) return;

        this.isBusy = true;

        const firstname = this.form.get('firstname')!.value;
        const lastname = this.form.get('lastname')!.value;
        const username = this.form.get('username')!.value;
        const email = this.form.get('email')!.value;
        const password = this.form.get('password')!.value;

        const dto: SignUpDto = {
            firstname: firstname,
            lastname: lastname,
            username: username,
            email: email,
            password: password
        }

        const response = this._auth.signup(dto);
        response.then((user: SignUpDto) => {
            this._dialog.message('Successfully registered ' + user.username);
            this.isBusy = false;
        })
        .catch((error) => {
            this._dialog.error(error);
        })
    }

    private isValidFields(): boolean {
        const firstname = this.form.get('firstname')?.value;
        const lastname = this.form.get('lastname')?.value;
        const username = this.form.get('username')?.value;
        const email = this.form.get('email')?.value;
        const password = this.form.get('password')?.value;
        const retypePassword = this.form.get('retypePassword')?.value;

        if (firstname === null || lastname === null) {
            this._dialog.error('Please enter your name');
            return false;
        }

        if (username === null || username.length < 3 || username > 18) {
            this._dialog.error('Username is invalid');
            return false;
        }

        if (password === null || password.length < 3 || password > 36 || retypePassword === null || retypePassword.length < 3 || retypePassword > 36) {
            this._dialog.error('Password is invalid');
            return false;
        }

        if (password !== retypePassword) {
            this._dialog.error('Password does not match');
            return false;
        }

        if (email === null) {
            this._dialog.error('Email is invalid');
            return false;
        }

        return true;
    }
}
