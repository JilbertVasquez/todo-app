import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {Router, RouterModule} from '@angular/router';

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
    isLoggedIn = true;

    constructor(private _router: Router) {}

    login() {
        this.isLoggedIn = !this.isLoggedIn;
    }

    logout() {
        this.isLoggedIn = !this.isLoggedIn;
        this._router.navigate(['/']);
    }
}
