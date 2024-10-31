import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {Router, RouterModule} from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        MatToolbarModule,
        RouterModule,
        MatButtonModule,
        CommonModule,
        MatIconModule,
        MatMenuModule,
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent {

    constructor(private _router: Router, public authSerivce: AuthService) { }

    login() {
        this._router.navigate(['/login']);
    }

    signup() {
        this._router.navigate(['signup']);
    }

    logout() {
        localStorage.removeItem('Todo-App-Token');
        this.authSerivce.isLoggedIn.set(false);
        this._router.navigate(['/']);
    }
}
