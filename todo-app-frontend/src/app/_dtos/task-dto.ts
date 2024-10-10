import { CreateTaskDto } from "./create-task-dto";

export interface TaskDto extends CreateTaskDto {
    id: number,
}
