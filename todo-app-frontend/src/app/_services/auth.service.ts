import { Injectable, signal } from "@angular/core";
import { SignUpDto } from "../_dtos/signup-dto";
import { lastValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment.development";
import { LoginDto } from "../_dtos/login-dto";
import { ResponseData, UserProfile } from "../_dtos/user-profile-dto";
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _baseUrl = environment.apiUrl + '/api/user';
    isLoggedIn = false;
    loggedInUser = signal<UserProfile | null>(null);

    constructor(private _http: HttpClient) { }

    signup(dto: SignUpDto): Promise<SignUpDto> {
        return lastValueFrom(this._http.post<SignUpDto>(this._baseUrl + '/register', dto));
    }

    login(dto: LoginDto) {
        return lastValueFrom(this._http.post<ResponseData<UserProfile>>(this._baseUrl + '/login', dto));
    }
}
