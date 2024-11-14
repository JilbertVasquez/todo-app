import { Injectable, signal } from "@angular/core";
import { environment } from "../../environments/environment";
import { UserProfile } from "../_dtos/user-profile-dto";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { DialogService } from "./dialog.service";
import { UserForListDto } from "../_dtos/user-for-list-dto";

@Injectable({
    providedIn: "root"
})
export class UserService {
    private _baseUrl = environment.apiUrl + '/api/admin/';

    userList = signal<UserForListDto[]>([]);

    constructor(private _http: HttpClient, private _dialogService: DialogService) { }

    getUserList() {
        return lastValueFrom(this._http.get<UserForListDto[]>(`${this._baseUrl}userlist`));
    }

    async loadUserList() {
        const userList = await this.getUserList();
        this.userList.set(userList);
        console.log(userList);
    }
}
