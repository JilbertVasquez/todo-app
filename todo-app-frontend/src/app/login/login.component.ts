import {Component} from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { LoginDto } from '../_dtos/login-dto';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DialogService } from '../_services/dialog.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [MatCardModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule, FormsModule, ReactiveFormsModule, CommonModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent {
    form: FormGroup;
    isBusy = false;

    constructor(private _fb: FormBuilder, private _router: Router, private _dialog: DialogService, private _auth: AuthService) {
        this.form = this._fb.group({
            username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(18)]],
            password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(36)]],
        });
    }

    ngOnInit() { }

    submit() {
        if (!this.isValidFields()) return;

        this.isBusy = true;

        const username = this.form.get('username')!.value;
        const password = this.form.get('password')!.value;

        const dto: LoginDto = {
            username: username,
            password: password
        }

        const response = this._auth.login(dto);
        // response.then((user: LoginDto) => {
        //     this._dialog.message('Successfully registered ' + user.username);
        //     this.isBusy = false;
        // })
        // .catch((error) => {
        //     this._dialog.error(error);
        // })
        this._router.navigate(['/']);
        this.isBusy = false;
    }

    private isValidFields(): boolean {
        const username = this.form.get('username')?.value;
        const password = this.form.get('password')?.value;

        if (username === null || username.length < 3 || username > 18) {
            this._dialog.error('Username is invalid');
            return false;
        }

        if (password === null || password.length < 3 || password > 36) {
            this._dialog.error('Password is invalid');
            return false;
        }

        return true;
    }
}
