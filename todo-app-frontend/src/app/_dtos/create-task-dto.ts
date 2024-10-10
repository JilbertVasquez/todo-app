import { PrioritiesType, StatusType } from "../tasks/tasks-dashboard/tasks-details/tasks-details.component";

export interface CreateTaskDto {
    title: string,
    note: string,
    status: StatusType,
    priorityType: PrioritiesType
}
