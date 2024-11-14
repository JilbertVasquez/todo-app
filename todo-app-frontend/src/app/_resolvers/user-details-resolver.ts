import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { UserProfile } from '../_dtos/user-profile-dto';

@Injectable({
    providedIn: 'root'
})
export class UserDetailsResolver implements Resolve<void> {
    constructor(private authService: AuthService) { }

    resolve() {
        this.authService.getUser();
    }
}
