import { ResolveFn } from "@angular/router";
import { TaskListDto } from "../_dtos/task-list-dto";
import { TasksService } from "../_services/tasks.service";
import { inject } from "@angular/core";

export const loadTasksResolver: ResolveFn<TaskListDto[]> = async () => {
    const taskService = inject(TasksService);

    if (taskService.taskList().length) return taskService.taskList();

    await taskService.loadTasks();
    return taskService.taskList();
}