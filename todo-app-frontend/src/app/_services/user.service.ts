import { Injectable, signal } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { UserProfile } from "../_dtos/user-profile-dto";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class UserService {
    private _baseUrl = environment.apiUrl + '/api/admin/';

    userList = signal<UserProfile[]>([]);

    constructor(private _http: HttpClient) { }

    getUserList() {
        return lastValueFrom(this._http.get<UserProfile[]>(`${this._baseUrl}userlist`));
    }

    async loadUserList() {
        const userList = await this.getUserList();
        this.userList.set(userList);
        console.log(this.userList());
    }
}
