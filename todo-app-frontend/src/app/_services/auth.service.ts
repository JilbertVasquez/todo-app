import { Injectable } from "@angular/core";
import { SignUpDto } from "../_dtos/signup-dto";
import { lastValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment.development";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _baseUrl = environment.apiUrl + 'auth/';

    constructor(private _http: HttpClient) { }

    signup(dto: SignUpDto): Promise<SignUpDto> {
        return lastValueFrom(this._http.post<SignUpDto>(this._baseUrl + 'register/', dto));
    }
}
