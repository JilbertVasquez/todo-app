import { Injectable, signal } from "@angular/core";
import { SignUpDto } from "../_dtos/signup-dto";
import { lastValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { LoginDto } from "../_dtos/login-dto";
import { ResponseData, UserProfile } from "../_dtos/user-profile-dto";
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _baseUrl = environment.apiUrl + '/api/user';
    private _TodoAppTokenKey = 'Todo-App-Token';
    isLoggedIn = signal(false);
    loggedInUser = signal<UserProfile | null>(null);

    constructor(private _http: HttpClient, private _jwtHelper: JwtHelperService) {
        const token = this._getToken();
        if (!token) return;
        this.isLoggedIn.set(!this._jwtHelper.isTokenExpired(token));
    }

    signup(dto: SignUpDto): Promise<SignUpDto> {
        return lastValueFrom(this._http.post<SignUpDto>(this._baseUrl + '/register', dto));
    }

    login(dto: LoginDto) {
        return lastValueFrom(this._http.post(this._baseUrl + '/login', dto));
    }

    getUser() {
        const token = this._getToken();
        if (!token) {
            this.loggedInUser.set(null);
            return;
        }
        const user = this._decodeToken(token);
        const userProfile: UserProfile = {
            userId: user.nameid,
            username: user.unique_name
        }
        this.loggedInUser.set(userProfile);
    }

    getUserRole() {
        const token = this._getToken();
        if (!token) return;
        const userRole = this._decodeToken(token);
        return userRole.role;
    }

    private _getToken() {
        return localStorage.getItem(this._TodoAppTokenKey);
    }

    private _decodeToken(token: string) {
        return this._jwtHelper.decodeToken(token);
    }
}
