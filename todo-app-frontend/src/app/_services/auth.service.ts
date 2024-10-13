import { Injectable } from "@angular/core";
import { SignUpDto } from "../_dtos/signup-dto";
import { lastValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment.development";
import { LoginDto } from "../_dtos/login-dto";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _baseUrl = environment.apiUrl + 'auth/';

    constructor(private _http: HttpClient) { }

    signup(dto: SignUpDto): Promise<SignUpDto> {
        return lastValueFrom(this._http.post<SignUpDto>(this._baseUrl + 'register/', dto));
    }

    async login(dto: LoginDto) {
        // const user = await lastValueFrom(this._http.post(this._baseUrl + 'login/', dto));
        const user = await lastValueFrom(this._http.post('assets/dummy-login.json', dto));

        console.log(user);
    }
}
