import { Injectable, signal } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { TaskListDto } from "../_dtos/task-list-dto";
import { TaskDto } from "../_dtos/task-dto";
import { CreateTaskDto } from "../_dtos/create-task-dto";
import { UpdateTaskDto } from "../_dtos/update-task-dto";

@Injectable({
    providedIn: "root"
})

export class TasksService {
    private _baseUrl = environment.apiUrl + '/api/task/';

    taskList = signal<TaskListDto[]>([]);

    constructor(private _http: HttpClient) {}

    async getTasks(userId: number) {
        return await lastValueFrom(this._http.post<TaskListDto[]>(`${this._baseUrl}list`, { userId }));
    }

    async loadTasks(userId: number) {
        const taskList = await this.getTasks(userId);
        this.taskList.set(taskList);
    }

    getTaskDetails(taskId: number) {
        return lastValueFrom(this._http.get<TaskDto>(`${this._baseUrl}task-details?taskId=${taskId}`));
    }

    createTask(createTask: CreateTaskDto) {
        return lastValueFrom(this._http.post(`${this._baseUrl}create`, createTask));
    }

    updateTaskDetails(taskDetails: UpdateTaskDto) {
        return lastValueFrom(this._http.put(`${this._baseUrl}edit/${taskDetails.taskId}`, taskDetails));
    }

    deleteTask(taskId: number) {
        return lastValueFrom(this._http.delete<boolean>(`${this._baseUrl}delete/${taskId}`));
    }
}
