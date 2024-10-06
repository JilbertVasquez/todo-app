import { Injectable, signal } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { TaskListDto } from "../_dtos/task-list-dto";

@Injectable({
    providedIn: "root"
})

export class TasksService {
    private _baseUrl = environment.apiUrl;

    taskList = signal<TaskListDto[]>([]);

    constructor(private _http: HttpClient) {}

    async getTasks() {
        return await lastValueFrom(this._http.get<TaskListDto[]>(this._baseUrl + '/assets/dummy-task-list.json'));
    }

    async loadTasks() {
        const taskList = await this.getTasks();
        this.taskList.set(taskList);
    }
}