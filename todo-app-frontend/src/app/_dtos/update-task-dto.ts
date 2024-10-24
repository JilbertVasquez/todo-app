import { PriorityDto } from "./priority-dto";
import { StatusDto } from "./status-dto";

export interface UpdateTaskDto {
    taskId: number
    title: string,
    note: string,
    status: StatusDto,
    priority: PriorityDto
}
