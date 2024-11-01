import { Injectable } from "@angular/core"
import { AuthService } from "../_services/auth.service"
import { DialogService } from "../_services/dialog.service"
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router"

@Injectable({
    providedIn: "root"
})
export class AdminGuard {
    constructor(private _authService: AuthService, private _dialogService: DialogService) { }
    canActivate (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        if (this._authService.getUserRole().toLowerCase() !== 'admin') {
            this._dialogService.error('Unauthorize User.');
            return false;
        }
        return true;
    }
}
