import { ResolveFn } from "@angular/router";
import { TaskListDto } from "../_dtos/task-list-dto";
import { TasksService } from "../_services/tasks.service";
import { inject } from "@angular/core";
import { AuthService } from "../_services/auth.service";

export const loadTasksResolver: ResolveFn<TaskListDto[]> = async () => {
    const authService = inject(AuthService);
    const taskService = inject(TasksService);

    if (taskService.taskList().length) return taskService.taskList();

    await taskService.loadTasks(authService.loggedInUser()!.userId);
    return taskService.taskList();
}
