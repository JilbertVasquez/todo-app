import { Injectable, signal } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { StatusDto } from "../_dtos/status-dto";

@Injectable({
    providedIn: 'root'
})
export class StatusService {
    private _baseUrl = environment.apiUrl + '/api/status';
    status = signal<StatusDto[]>([]);

    constructor(private _http: HttpClient) { }

    async getStatus(): Promise<StatusDto[]> {
        return await lastValueFrom(this._http.get<StatusDto[]>(this._baseUrl));
    }

    async loadStatus() {
        const status = await this.getStatus();
        this.status.set(status);
    }
}
