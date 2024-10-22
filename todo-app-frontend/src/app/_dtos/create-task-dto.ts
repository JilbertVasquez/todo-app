import { PriorityDto } from "./priority-dto";
import { StatusDto } from "./status-dto";

export interface CreateTaskDto {
    title: string,
    note: string,
    status: StatusDto,
    priority: PriorityDto
}
