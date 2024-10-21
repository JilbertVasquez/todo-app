import { Injectable } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { DialogService } from "../_services/dialog.service";


@Injectable({
    providedIn: 'root'
})
export class AuthGuard {

    constructor(private _auth: AuthService, private _dialogService: DialogService) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        if(!this._auth.isLoggedIn) {
            this._dialogService.error('Login first.');
            return false;
        }
        return this._auth.isLoggedIn;
    }
}