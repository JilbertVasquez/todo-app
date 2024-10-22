import { Injectable, signal } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment.development";
import { PriorityDto } from "../_dtos/priority-dto";

@Injectable({
    providedIn: 'root'
})
export class PriorityService {
    private _baseUrl = environment.apiUrl + '/api/priority';
    priority = signal<PriorityDto[]>([]);

    constructor(private _http: HttpClient) { }

    async getPriorities(): Promise<PriorityDto[]> {
        return await lastValueFrom(this._http.get<PriorityDto[]>(this._baseUrl));
    }

    async loadPriorities() {
        const status = await this.getPriorities();
        this.priority.set(status);
    }
}
